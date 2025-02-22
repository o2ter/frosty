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
import {
  HTMLElementDeprecatedTagNameMap,
  HTMLElementTagNameMap,
  MathMLElementTagNameMap,
  SVGElementTagNameMap,
} from '../internals/web';

export type PropsWithChildren<
  P extends {} = {},
  C extends unknown = ElementNode
> = P & {
  children?: C;
};

type ElementNode =
  | ComponentNode
  | string
  | number
  | boolean
  | null
  | undefined
  | Iterable<ElementNode>;

export type ComponentType<
  P extends {} = {},
  N extends ElementNode = ElementNode
> = (props: P) => N;

export type ElementType = string | ComponentType;

type HTMLElementProps = {
  [x in keyof typeof HTMLElementTagNameMap]: PropsWithChildren<{}>;
} & {
  [x in keyof typeof HTMLElementDeprecatedTagNameMap]: PropsWithChildren<{}>;
};

type SVGElementProps = {
  [x in keyof typeof SVGElementTagNameMap]: PropsWithChildren<{}>;
};

type MathMLElementProps = {
  [x in keyof typeof MathMLElementTagNameMap]: PropsWithChildren<{}>;
};

export type _IntrinsicElements = HTMLElementProps & SVGElementProps & MathMLElementProps & {
  [x: string]: any;
};
