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
import { globalAttrs, globalEventHandlersEventMap, HTMLElementTagNameMap } from '~/web/html';
import { SVGElementTagNameMap } from '~/web/svg';
import { MathMLElementTagNameMap } from '~/web/mathML';

class _DOMRenderer extends _Renderer<Element> {

  /** @internal */
  _createElement(node: VNode) {
    const { type } = node.component;
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
          for (const map of [HTMLElementTagNameMap, SVGElementTagNameMap, MathMLElementTagNameMap]) {
            if (!(type in HTMLElementTagNameMap)) continue;
            const { props } = map[type as keyof typeof map];
            if (!(key in props)) continue;
            const validator = globalAttrs[key as keyof typeof globalAttrs];
            if (validator.varify(value)) {
              const encoded = validator.encode(value);
              if (encoded === true) {
                elem.setAttribute(key, '');
              } else if (_.isNumber(encoded) || _.isString(encoded)) {
                elem.setAttribute(key, `${encoded}`);
              }
            }
            break;
          }
          break;
      }
    }

    return elem;
  }

  /** @internal */
  _updateElement(node: VNode, element: Element) {

  }
}

export const DOMRenderer = new _DOMRenderer;
