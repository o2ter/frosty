//
//  index.ts
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

import { ComponentNode } from '../internals';
import { _IntrinsicAttributes, _IntrinsicElements, ElementType as _ElementType } from './../types';

export {
  Fragment,
  ComponentNode,
} from '../internals';
export {
  ComponentType,
  PropsWithChildren,
  ElementType,
  ElementNode,
} from './../types';

export declare namespace JSX {
  type IntrinsicElements = _IntrinsicElements;
  type IntrinsicAttributes = _IntrinsicAttributes;
  type ElementType = _ElementType;
  type Element = ComponentNode;
  type ElementChildrenAttribute = { children: {}; };
};

export const JSX = {
  Element: ComponentNode,
};

export function jsx<
  P extends Record<string, unknown> = any,
  T extends _ElementType = any
>(
  type: T, props: P, key?: string
): ComponentNode<P, T> {
  return new ComponentNode(type, props, key);
}
