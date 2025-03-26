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
import { tags } from '../../../generated/elements';

export abstract class _DOMRenderer extends _Renderer<Element> {

  private _doc?: Document;
  private _namespace_map = new WeakMap<VNode, string | undefined>();

  constructor(doc?: Document) {
    super();
    this._doc = doc;
  }

  get doc() {
    return this._doc ?? document;
  }

  /** @internal */
  _createElement(node: VNode, stack: VNode[]) {
    const { type } = node;
    if (!_.isString(type)) throw Error('Invalid type');
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

    const { className, style, innerHTML, ...props } = node.props;

    if (!_.isEmpty(innerHTML)) {
      element.innerHTML = innerHTML;
    }

    for (const [key, value] of _.entries(props)) {
      if (key in globalEventHandlersEventMap) {

      } else if (key in element) {
        (element as any)[key] = value ?? undefined;
      } else if (key.startsWith('data-')) {
        if (value === false || _.isNil(value)) {
          element.removeAttribute(key);
        } else if (value === true) {
          element.setAttribute(key, '');
        } else if (_.isNumber(value) || _.isString(value)) {
          element.setAttribute(key, `${value}`);
        }
      }
    }
  }

  /** @internal */
  _replaceChildren(node: VNode, element: Element, children: (string | Element)[]): void {
    if (!_.isEmpty(node.props['innerHTML'])) return;
    const diff = myersSync(
      _.map(element.childNodes, x => x.nodeType === Node.TEXT_NODE ? x.textContent ?? '' : x),
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
