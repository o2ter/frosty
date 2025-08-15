//
//  common.ts
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
import { VNode } from '../core/reconciler/vnode';
import { myersSync } from 'myers.js';
import { globalEvents } from '../core/web/event';
import { ComponentNode, NativeElementType } from '../core/types/component';
import { svgProps, htmlProps, tags } from '../../generated/elements';
import { _propValue } from '../core/web/props';
import { ClassName, StyleProp } from '../core/types/style';
import { ExtendedCSSProperties } from '../core/web/styles/css';
import { _Renderer } from '../core/renderer';
import { processCss } from '../core/web/styles/process';
import { StyleBuilder } from './style';
import { mergeRefs } from '../core/utils';
import type { DOMWindow } from 'jsdom';
import { compress } from './minify/compress';

const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const MATHML_NS = 'http://www.w3.org/1998/Math/MathML';

const findPrototypeProperty = (object: any, propertyName: string) => {
  while (object && object.constructor && object.constructor.name !== 'Object') {
    let desc = Object.getOwnPropertyDescriptor(object, propertyName);
    if (desc) return desc;
    object = Object.getPrototypeOf(object);
  }
  return null;
};

const isWriteable = (object: any, propertyName: string) => {
  let desc = findPrototypeProperty(object, propertyName);
  if (!desc) {
    return false;
  }
  if (desc.writable && typeof desc.value !== 'function') {
    return true;
  }
  return !!desc.set;
};

export abstract class DOMNativeNode extends NativeElementType {

  static createElement: (doc: Document, renderer: _DOMRenderer) => DOMNativeNode;

  abstract get target(): Element | Element[];

  abstract update(props: Record<string, any> & {
    className?: string;
    style?: string;
  }): void;

  abstract replaceChildren(children: (string | Element | DOMNativeNode)[]): void;

  abstract destroy(): void;
}

export abstract class _DOMRenderer extends _Renderer<Element | DOMNativeNode> {

  private _window: Window | DOMWindow;
  private _namespace_map = new WeakMap<VNode, string | undefined>();

  private _tracked_head_children: (string | Element | DOMNativeNode)[] = [];
  private _tracked_style = new StyleBuilder();
  /** @internal */
  _tracked_server_resource = new Map<string, string>();
  private _tracked_elements = new Map<Element | DOMNativeNode, { props: string[]; className: string[]; listener: Record<string, EventListener | undefined>; }>();

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
      this.__replaceChildren(head, _.compact([...this._tracked_head_children, styleElem, ssrData]));
    } else if (styleElem.parentNode !== head) {
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
        listener: {},
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
      listener: {},
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

  private __updateEventListener(
    element: Element,
    key: string,
    listener: EventListener | undefined,
  ) {
    const event = key.endsWith('Capture') ? key.slice(2, -7).toLowerCase() : key.slice(2).toLowerCase();
    const tracked_listener = this._tracked_elements.get(element)?.listener;
    if (!tracked_listener) return;
    if (tracked_listener[key] !== listener) {
      const options = { capture: key.endsWith('Capture') };
      if (_.isFunction(tracked_listener[key])) element.removeEventListener(event, tracked_listener[key], options);
      if (_.isFunction(listener)) element.addEventListener(event, listener, options);
    }
    tracked_listener[key] = listener;
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

    const builtClassName = this.__createBuiltClassName(element, className, style);
    if (_.isEmpty(builtClassName)) {
      if (!_.isNil(element.getAttribute('class')))
        element.removeAttribute('class');
    } else if (element.className !== builtClassName) {
      element.className = builtClassName;
    }
    if (!_.isEmpty(innerHTML) && element.innerHTML !== innerHTML) element.innerHTML = innerHTML;

    if (inlineStyle) {
      const { css } = processCss(inlineStyle);
      const oldValue = element.getAttribute('style');
      const newValue = css.split('\n').join('');
      if (oldValue !== newValue)
        element.setAttribute('style', newValue);
    } else if (!_.isNil(element.getAttribute('style'))) {
      element.removeAttribute('style');
    }

    const tracked = this._tracked_elements.get(element);
    if (!tracked) return;
    const removed = _.difference(tracked.props, _.keys(_props));
    const props = {
      ..._props,
      ..._.fromPairs(_.map(removed, x => [x, undefined])),
    };
    tracked.props = _.keys(_props);

    for (const [key, value] of _.entries(props)) {
      if (_.includes(globalEvents, key)) {
        this.__updateEventListener(element, key, value);
      } else if (key.endsWith('Capture') && _.includes(globalEvents, key.slice(0, -7))) {
        this.__updateEventListener(element, key, value);
      } else if (key.startsWith('data-')) {
        const oldValue = element.getAttribute(key);
        if (value === false || _.isNil(value)) {
          if (!_.isNil(oldValue))
            element.removeAttribute(key);
        } else {
          const newValue = value === true ? '' : `${value}`;
          if (oldValue !== newValue)
            element.setAttribute(key, newValue);
        }
      } else {
        const { type: _type, attr } = (htmlProps as any)['*'][key]
          ?? (htmlProps as any)[type]?.[key]
          ?? (svgProps as any)['*'][key]
          ?? (svgProps as any)[type]?.[key]
          ?? {};
        const writeable = isWriteable(element, key);
        if (writeable && !_.isNil(value)) {
          if ((element as any)[key] !== value) (element as any)[key] = value;
        } else if (_type && attr && (_propValue as any)[_type]) {
          const oldValue = element.getAttribute(key);
          if (value === false || _.isNil(value)) {
            if (!_.isNil(oldValue))
              element.removeAttribute(key);
          } else {
            const newValue = value === true ? '' : `${value}`;
            if (oldValue !== newValue)
              element.setAttribute(key, newValue);
          }
        } else if (writeable) {
          if ((element as any)[key] !== value) (element as any)[key] = value;
        }
      }
    }
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
        this.__replaceChildren(element, children, force);
      }
    }
  }

  /** @internal */
  _destroyElement(node: VNode, element: Element | DOMNativeNode) {
    if (element instanceof DOMNativeNode) {
      element.destroy();
    } else {
      const tracked_listener = this._tracked_elements.get(element)?.listener;
      for (const [key, listener] of _.entries(tracked_listener)) {
        const event = key.endsWith('Capture') ? key.slice(2, -7).toLowerCase() : key.slice(2).toLowerCase();
        if (_.isFunction(listener)) {
          element.removeEventListener(event, listener, { capture: key.endsWith('Capture') });
        }
      }
    }
    this._tracked_elements.delete(element);
  }

  __replaceChildren(element: Element, children: (string | Element | DOMNativeNode)[], force?: boolean) {
    const diff = myersSync(
      _.map(element.childNodes, x => x.nodeType === this.document.TEXT_NODE ? x.textContent ?? '' : x),
      _.flatMap(children, x => x instanceof DOMNativeNode ? x.target : x),
      { compare: (a, b) => a === b },
    );
    let i = 0;
    for (const { remove, insert, equivalent } of diff) {
      if (equivalent) {
        i += equivalent.length;
      } else if (remove) {
        for (const child of remove) {
          if (force || _.isString(child) || this._tracked_elements.has(child as any)) {
            element.removeChild(element.childNodes[i]);
          } else {
            i++;
          }
        }
      }
      if (insert) {
        for (const child of insert) {
          const node = _.isString(child) ? this.document.createTextNode(child) : child;
          element.insertBefore(node, element.childNodes[i++]);
        }
      }
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
