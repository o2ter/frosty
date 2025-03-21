//
//  dom.ts
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
import { VNode } from '../reconciler/vnode';
import { _Renderer } from './base';
import { globalEventHandlersEventMap } from '~/web/event';
import { myersSync } from 'myers.js';

class _DOMRenderer extends _Renderer<Element> {

  /** @internal */
  _createElement(node: VNode) {
    const { type } = node;
    if (!_.isString(type)) throw Error('Invalid type');
    const elem = document.createElement(type);

    for (const [key, value] of _.entries(node.props)) {
      switch (key) {
        case 'className':
          break;
        case 'style':
          break;
        case 'innerHTML':
          break;
        default:
          if (key in globalEventHandlersEventMap) {

            continue;
          }
          if (value === true) {
            elem.setAttribute(key, '');
          } else if (_.isNumber(value) || _.isString(value)) {
            elem.setAttribute(key, `${value}`);
          }
          break;
      }
    }

    return elem;
  }

  /** @internal */
  _updateElement(node: VNode, element: Element) {

  }

  /** @internal */
  _replaceChildren(element: Element, children: (string | Element)[]): void {
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
          const node = _.isString(child) ? document.createTextNode(child) : child;
          element.insertBefore(node, element.childNodes[i++]);
        }
      }
    }
  }
}

export const DOMRenderer = new _DOMRenderer;
