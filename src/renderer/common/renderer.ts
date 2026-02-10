//
//  renderer.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import { VNode } from '../../core/reconciler';
import { ComponentNode } from '../../core/types/component';
import { tags } from '../../../generated/elements';
import { _propValue } from '../../core/web/props';
import { ClassName, StyleProp } from '../../core/types/style';
import { ExtendedCSSProperties } from '../../core/web/styles/css';
import { _Renderer } from '../../core/renderer';
import { processCss } from '../../core/web/styles/process';
import { StyleBuilder } from '../style';
import { mergeRefs } from '../../core/utils';
import type { DOMWindow } from 'jsdom';
import { compress } from '../minify/compress';
import { DOMNativeNode } from './node';

const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const MATHML_NS = 'http://www.w3.org/1998/Math/MathML';

export abstract class _DOMRenderer extends _Renderer<Element | DOMNativeNode> {

  #window: Window | DOMWindow;
  #namespace_map = new WeakMap<VNode, string | undefined>();

  #tracked_head_children = new Map<VNode, (string | Element | DOMNativeNode)[]>();
  #tracked_body_head_children = new Map<VNode, (string | Element | DOMNativeNode)[]>();
  #tracked_style = new StyleBuilder();
  /** @internal */
  _tracked_server_resource = new Map<string, string>();
  #tracked_elements = new Map<Element | DOMNativeNode, { props: string[]; className: string[]; }>();

  #server_head_elements: ChildNode[] = [];

  constructor(window: Window | DOMWindow) {
    super();
    this.#window = window;
  }

  get document() {
    return this.window.document;
  }

  get window() {
    return this.#window;
  }

  _beforeUpdate() {
    const head = this.document.head
    if (this._server) {
      this._tracked_server_resource = new Map();
    } else if (head) {
      const found_marker = _.findIndex(head.childNodes, x => x.nodeType === head.COMMENT_NODE && x.textContent === 'frosty-server-head-marker');
      if (found_marker > -1) {
        this.#server_head_elements = _.slice(head.childNodes, 0, found_marker);
      } else {
        const styleElem = this.document.querySelector('style[data-frosty-style]');
        const ssrDataElem = this.document.querySelector('script[data-frosty-ssr-data]');
        this.#server_head_elements = _.filter([...head.childNodes], x => !_.includes([styleElem, ssrDataElem], x));
      }
    }
  }

  _afterUpdate() {
    console.log({
      server_head_elements: this.#server_head_elements,
      tracked_head_children: [...this.#tracked_head_children.values()],
      tracked_body_head_children: [...this.#tracked_body_head_children.values()],
    })
    this.#tracked_style.select([...this.#tracked_elements.values().flatMap(({ className }) => className)]);
    const head = this.document.head ?? this.document.createElementNS(HTML_NS, 'head');
    const styleElem = this.document.querySelector('style[data-frosty-style]') ?? this.document.createElementNS(HTML_NS, 'style');
    styleElem.setAttribute('data-frosty-style', '');
    if (styleElem.textContent !== this.#tracked_style.css)
      styleElem.textContent = this.#tracked_style.css;
    if (this._server) {
      const ssrData = this._tracked_server_resource.size ? this.document.createElementNS(HTML_NS, 'script') : undefined;
      if (ssrData) {
        ssrData.setAttribute('data-frosty-ssr-data', '');
        ssrData.setAttribute('type', 'text/plain');
        ssrData.innerHTML = compress(JSON.stringify(Object.fromEntries(this._tracked_server_resource)));
      }
      const tracked_head_children = _.flattenDeep([...this.#tracked_body_head_children.values()]);
      const maker = this.document.createComment('frosty-server-head-marker');
      DOMNativeNode.Utils.replaceChildren(head, _.compact([
        ..._.flattenDeep([...this.#tracked_head_children.values()]),
        !_.isEmpty(tracked_head_children) && maker,
        ...tracked_head_children,
        styleElem.textContent && styleElem,
        ssrData,
      ]), (x) => this.#tracked_elements.has(x as any));
    } else {
      DOMNativeNode.Utils.replaceChildren(head, _.compact([
        ...this.#server_head_elements.filter(x => x !== styleElem),
        ..._.flattenDeep([...this.#tracked_body_head_children.values()]),
        styleElem.textContent && styleElem,
      ]), (x) => this.#tracked_elements.has(x as any));
    }
    if (!this.document.head) {
      this.document.documentElement.insertBefore(head, this.document.body);
    }
  }

  _createElement(node: VNode) {
    const { type } = node;
    if (!_.isString(type) && type.prototype instanceof DOMNativeNode) {
      const ElementType = type as typeof DOMNativeNode;
      const elem = ElementType.createElement(this.document, this);
      this.#tracked_elements.set(elem, {
        props: [],
        className: [],
      });
      return elem;
    }
    if (!_.isString(type)) throw Error(`Invalid type ${type}`);
    switch (type) {
      case 'html': return this.document.documentElement;
      case 'head': return this.document.head ?? this.document.createElementNS(HTML_NS, 'head');
      case 'body': return this.document.body ?? this.document.createElementNS(HTML_NS, 'body');
      default: break;
    }
    const _ns_list = _.compact([
      _.includes(tags.svg, type) && SVG_NS,
      _.includes(tags.html, type) && HTML_NS,
      _.includes(tags.mathml, type) && MATHML_NS,
    ]);
    const parent = _.last(node.stack.toArray());
    const ns = _ns_list.length > 1 ? parent && _.first(_.intersection([this.#namespace_map.get(parent)], _ns_list)) : _.first(_ns_list);
    const elem = ns ? this.document.createElementNS(ns, type) : this.document.createElement(type);
    this.#namespace_map.set(node, ns);
    this.#tracked_elements.set(elem, {
      props: [],
      className: [],
    });
    return elem;
  }

  #createBuiltClassName(
    element: Element | DOMNativeNode,
    className: ClassName,
    style: StyleProp<ExtendedCSSProperties>,
  ) {
    const _className = _.compact(_.flattenDeep([className]));
    const built = this.#tracked_style.buildStyle(_.compact(_.flattenDeep([style])));
    const tracked = this.#tracked_elements.get(element);
    if (tracked) tracked.className = built;
    return [..._className, ...built].join(' ');
  }

  _updateElement(
    node: VNode,
    element: Element | DOMNativeNode,
    children: (string | Element | DOMNativeNode)[],
    force?: boolean
  ) {

    if (node.type !== 'html') {
      children = _.filter(children, x => x !== this.document.head && x !== this.document.body);
    }

    if (element instanceof DOMNativeNode) {
      const {
        props: { ref, className, style, inlineStyle, ..._props }
      } = node;
      if (ref) mergeRefs(ref)(element.target);
      const builtClassName = this.#createBuiltClassName(element, className, style);
      const { css } = processCss(inlineStyle);
      element.update({
        className: builtClassName ? builtClassName : undefined,
        style: css ? css : undefined,
        ..._props
      }, children);
      return;
    }

    const {
      type,
      props: { ref, className, style, inlineStyle, innerHTML, ..._props }
    } = node;

    if (!_.isString(type)) {
      DOMNativeNode.Utils.replaceChildren(element, children, (x) => !!force || this.#tracked_elements.has(x as any));
      return;
    }
    switch (type) {
      case 'head': {
        const tracked = node.parent?.type === 'html'
          ? this.#tracked_head_children
          : this.#tracked_body_head_children;
        tracked.set(node, children);
        return;
      }
      default: break;
    }

    if (ref) mergeRefs(ref)(element);

    const tracked = this.#tracked_elements.get(element);
    const removed = tracked ? _.difference(tracked.props, _.keys(_props)) : [];
    if (tracked) tracked.props = _.keys(_props);

    const builtClassName = this.#createBuiltClassName(element, className, style);
    if (_.isNil(innerHTML)) {
      DOMNativeNode.Utils.replaceChildren(element, children, (x) => !!force || this.#tracked_elements.has(x as any));
    } else if (element.innerHTML !== innerHTML) {
      element.innerHTML = innerHTML;
    }

    DOMNativeNode.Utils.update(element, {
      className: builtClassName,
      style: inlineStyle ? processCss(inlineStyle).css : undefined,
      ..._props,
      ..._.fromPairs(_.map(removed, x => [x, undefined])),
    });
  }

  _destroyElement(node: VNode, element: Element | DOMNativeNode) {
    this.#tracked_head_children.delete(node);
    this.#tracked_body_head_children.delete(node);
    if (element instanceof DOMNativeNode) {
      element.destroy();
    } else {
      DOMNativeNode.Utils.destroy(element);
    }
  }

  async renderToString(component: ComponentNode) {
    const root = this.createRoot();
    try {
      await root.mount(component, { skipMount: true });
      const elements = _.flatMap(_.castArray(root.root ?? []), x => x instanceof DOMNativeNode ? x.target : x);
      const str = _.map(elements, x => x.outerHTML).join('');
      if (elements.length !== 1) return str;
      return elements[0].tagName.toLowerCase() === 'html' ? `<!DOCTYPE html>${str}` : str;
    } finally {
      root.unmount();
    }
  }
}
