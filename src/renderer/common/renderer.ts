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
import { VNode } from '../../core/reconciler/vnode';
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

  private _window: Window | DOMWindow;
  private _namespace_map = new WeakMap<VNode, string | undefined>();

  private _tracked_head_children: (string | Element | DOMNativeNode)[] = [];
  private _tracked_style = new StyleBuilder();
  /** @internal */
  _tracked_server_resource = new Map<string, string>();
  private _tracked_elements = new Map<Element | DOMNativeNode, { props: string[]; className: string[]; }>();

  constructor(window: Window | DOMWindow) {
    super();
    this._window = window;
  }

  get document() {
    return this.window.document;
  }

  get window() {
    return this._window;
  }

  /** @internal */
  _beforeUpdate() {
    if (this._server) {
      this._tracked_head_children = [];
      this._tracked_server_resource = new Map<string, string>();
    }
  }

  /** @internal */
  _afterUpdate() {
    this._tracked_style.select([...this._tracked_elements.values().flatMap(({ className }) => className)]);
    const head = this.document.head ?? this.document.createElementNS(HTML_NS, 'head');
    const styleElem = this.document.querySelector('style[data-frosty-style]') ?? this.document.createElementNS(HTML_NS, 'style');
    styleElem.setAttribute('data-frosty-style', '');
    if (styleElem.textContent !== this._tracked_style.css)
      styleElem.textContent = this._tracked_style.css;
    if (this._server) {
      const ssrData = this._tracked_server_resource.size ? this.document.createElementNS(HTML_NS, 'script') : undefined;
      if (ssrData) {
        ssrData.setAttribute('data-frosty-ssr-data', '');
        ssrData.setAttribute('type', 'text/plain');
        ssrData.innerHTML = compress(JSON.stringify(Object.fromEntries(this._tracked_server_resource)));
      }
      DOMNativeNode.Utils.replaceChildren(head, _.compact([
        ...this._tracked_head_children,
        styleElem.textContent && styleElem,
        ssrData,
      ]), (x) => this._tracked_elements.has(x as any));
    } else if (styleElem.parentNode !== head && styleElem.textContent) {
      head.appendChild(styleElem);
    }
    if (!this.document.head) {
      this.document.documentElement.insertBefore(head, this.document.body);
    }
  }

  /** @internal */
  _createElement(node: VNode, stack: VNode[]) {
    const { type } = node;
    if (!_.isString(type) && type.prototype instanceof DOMNativeNode) {
      const ElementType = type as typeof DOMNativeNode;
      const elem = ElementType.createElement(this.document, this);
      this._tracked_elements.set(elem, {
        props: [],
        className: [],
      });
      this._updateElement(node, elem, stack);
      return elem;
    }
    if (!_.isString(type)) throw Error('Invalid type');
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
    const parent = _.last(stack);
    const ns = _ns_list.length > 1 ? parent && _.first(_.intersection([this._namespace_map.get(parent)], _ns_list)) : _.first(_ns_list);
    const elem = ns ? this.document.createElementNS(ns, type) : this.document.createElement(type);
    this._namespace_map.set(node, ns);
    this._tracked_elements.set(elem, {
      props: [],
      className: [],
    });
    this._updateElement(node, elem, stack);
    return elem;
  }

  private __createBuiltClassName(
    element: Element | DOMNativeNode,
    className: ClassName,
    style: StyleProp<ExtendedCSSProperties>,
  ) {
    const _className = _.compact(_.flattenDeep([className]));
    const built = this._tracked_style.buildStyle(_.compact(_.flattenDeep([style])));
    const tracked = this._tracked_elements.get(element);
    if (tracked) tracked.className = built;
    return [..._className, ...built].join(' ');
  }

  /** @internal */
  _updateElement(node: VNode, element: Element | DOMNativeNode, stack: VNode[]) {

    if (element instanceof DOMNativeNode) {
      const {
        props: { ref, className, style, inlineStyle, ..._props }
      } = node;
      if (ref) mergeRefs(ref)(element.target);
      const builtClassName = this.__createBuiltClassName(element, className, style);
      const { css } = processCss(inlineStyle);
      element.update({
        className: builtClassName ? builtClassName : undefined,
        style: css ? css : undefined,
        ..._props
      });
      return;
    }

    const {
      type,
      props: { ref, className, style, inlineStyle, innerHTML, ..._props }
    } = node;

    if (!_.isString(type)) throw Error('Invalid type');
    switch (type) {
      case 'html': return;
      case 'head': return;
      case 'body': return;
      default: break;
    }

    if (ref) mergeRefs(ref)(element);

    const tracked = this._tracked_elements.get(element);
    if (!tracked) return;
    const removed = _.difference(tracked.props, _.keys(_props));
    tracked.props = _.keys(_props);

    const builtClassName = this.__createBuiltClassName(element, className, style);
    if (!_.isEmpty(innerHTML) && element.innerHTML !== innerHTML) element.innerHTML = innerHTML;

    DOMNativeNode.Utils.update(element, {
      className: builtClassName,
      style: inlineStyle ? processCss(inlineStyle).css : undefined,
      ..._props,
      ..._.fromPairs(_.map(removed, x => [x, undefined])),
    });
  }

  /** @internal */
  _replaceChildren(node: VNode, element: Element | DOMNativeNode, children: (string | Element | DOMNativeNode)[], stack: VNode[], force?: boolean) {
    if (element instanceof DOMNativeNode) {
      element.replaceChildren(children);
    } else {
      const {
        type,
        props: { innerHTML }
      } = node;
      if (type === 'head') {
        this._tracked_head_children.push(...children);
      } else if (_.isEmpty(innerHTML)) {
        DOMNativeNode.Utils.replaceChildren(element, children, (x) => !!force || this._tracked_elements.has(x as any));
      }
    }
  }

  /** @internal */
  _destroyElement(node: VNode, element: Element | DOMNativeNode) {
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
      return str.startsWith('<html>') ? `<!DOCTYPE html>${str}` : str;
    } finally {
      root.unmount();
    }
  }
}
