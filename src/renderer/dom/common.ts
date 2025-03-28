//
//  _dom.ts
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
import { VNode } from '../../reconciler/vnode';
import { _Renderer } from '../base';
import { myersSync } from 'myers.js';
import { globalEventHandlersEventMap } from '../../common/web/event';
import { ComponentNode } from '../../common/types/component';
import { svgProps, htmlProps, tags } from '../../../generated/elements';
import { _propValue } from '~/common/web/props';

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
  if (desc.writable && typeof desc.value !== "function") {
    return true;
  }
  return !!desc.set;
};

export abstract class _DOMRenderer extends _Renderer<Element> {

  private _doc?: Document;
  private _namespace_map = new WeakMap<VNode, string | undefined>();

  private _tracked_props = new WeakMap<Element, string[]>();
  private _tracked_head_children: (string | Element)[] = [];

  constructor(doc?: Document) {
    super();
    this._doc = doc;
  }

  get doc() {
    return this._doc ?? document;
  }

  /** @internal */
  _beforeUpdate() {
    this._tracked_head_children = [];
  }

  /** @internal */
  _afterUpdate() {
    this.__replaceChildren(this.doc.head, this._tracked_head_children);
  }

  /** @internal */
  _createElement(node: VNode, stack: VNode[]) {
    const { type } = node;
    if (!_.isString(type)) throw Error('Invalid type');
    switch (type) {
      case 'html': return this.doc.documentElement;
      case 'head': return this.doc.head ?? this.doc.createElement('head');
      case 'body': return this.doc.body ?? this.doc.createElement('body');
      default: break;
    }
    const _ns_list = _.compact([
      _.includes(tags.svg, type) && 'http://www.w3.org/2000/svg',
      _.includes(tags.html, type) && 'http://www.w3.org/1999/xhtml',
      _.includes(tags.mathml, type) && 'http://www.w3.org/1998/Math/MathML',
    ]);
    const parent = _.last(stack);
    const ns = _ns_list.length > 1 ? parent && _.first(_.intersection([this._namespace_map.get(parent)], _ns_list)) : _.first(_ns_list);
    const elem = ns ? this.doc.createElementNS(ns, type) : this.doc.createElement(type);
    this._namespace_map.set(node, ns);
    this._updateElement(node, elem, stack);
    return elem;
  }

  /** @internal */
  _updateElement(node: VNode, element: Element, stack: VNode[]) {

    const {
      type,
      props: { className, style, innerHTML, ..._props }
    } = node;
    if (!_.isString(type)) throw Error('Invalid type');
    if (type === 'head') return;

    if (!_.isEmpty(innerHTML)) {
      element.innerHTML = innerHTML;
    }

    const removed = _.difference(this._tracked_props.get(element), _.keys(_props));
    const props = {
      ..._props,
      ..._.fromPairs(_.map(removed, x => [x, undefined])),
    };
    this._tracked_props.set(element, _.keys(_props));

    for (const [key, value] of _.entries(props)) {
      if (key in globalEventHandlersEventMap) {

      } else if (isWriteable(element, key)) {
        (element as any)[key] = value;
      } else if (key.startsWith('data-')) {
        if (value === false || _.isNil(value)) {
          element.removeAttribute(key);
        } else if (value === true) {
          element.setAttribute(key, '');
        } else if (_.isNumber(value) || _.isString(value)) {
          element.setAttribute(key, `${value}`);
        }
      } else {
        const { type: _type, attr } = (htmlProps as any)['*'][key]
          ?? (htmlProps as any)[type]?.[key]
          ?? (svgProps as any)['*'][key]
          ?? (svgProps as any)[type]?.[key]
          ?? {};
        if (_type && attr && (_propValue as any)[_type]) {
          if (value === false || _.isNil(value)) {
            element.removeAttribute(attr);
          } else if (value === true) {
            element.setAttribute(attr, '');
          } else if (_.isNumber(value) || _.isString(value)) {
            element.setAttribute(attr, `${value}`);
          }
        }
      }
    }
  }

  /** @internal */
  _replaceChildren(node: VNode, element: Element, children: (string | Element)[]) {
    const {
      type,
      props: { innerHTML }
    } = node;
    if (!_.isString(type)) throw Error('Invalid type');
    if (type === 'head') {
      this._tracked_head_children.push(...children);
    } else if (_.isEmpty(innerHTML)) {
      this.__replaceChildren(element, children);
    }
  }

  private __replaceChildren(element: Element, children: (string | Element)[]) {
    const diff = myersSync(
      _.map(element.childNodes, x => x.nodeType === this.doc.TEXT_NODE ? x.textContent ?? '' : x),
      children,
      { compare: (a, b) => a === b },
    );
    let i = 0;
    for (const { remove, insert, equivalent } of diff) {
      if (equivalent) {
        i += equivalent.length;
      } else if (remove) {
        for (const child of remove) {
          element.removeChild(element.childNodes[i]);
        }
      }
      if (insert) {
        for (const child of insert) {
          const node = _.isString(child) ? this.doc.createTextNode(child) : child;
          element.insertBefore(node, element.childNodes[i++]);
        }
      }
    }
  }

  renderToString(component: ComponentNode) {
    const root = this.createRoot();
    try {
      root.mount(component, { skipMount: true });
      const str = _.map(_.castArray(root.root ?? []), x => x.outerHTML).join('');
      return str.startsWith('<html>') ? `<!DOCTYPE html>${str}` : str;
    } finally {
      root.unmount();
    }
  }
}
