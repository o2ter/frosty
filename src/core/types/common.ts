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

import { ComponentNode } from './component';
import { _IntrinsicElements } from './runtime';

export type SetStateAction<S, P = S> = S | ((prevState: P) => S);

export type PropsWithChildren<
  P extends Record<string, unknown> = {},
  C extends unknown = ElementNode
> = P & {
  children?: C;
};

export type ElementNode =
  | ComponentNode
  | string
  | number
  | boolean
  | null
  | undefined
  | Iterable<ElementNode>;

export type ComponentType<
  P extends Record<string, unknown> = {},
  N extends ElementNode = ElementNode
  > = (props: P) => N;

export type RefAttribute<T> = {
  ref?: Ref<T>;
};

type _ComponentProps<T> = T extends ComponentType<infer P, any> ? P : never;

export type ComponentProps<T> = T extends string ? _IntrinsicElements[T] : _ComponentProps<T>;
export type ComponentPropsWithoutRef<T> = Omit<ComponentProps<T>, 'ref'>;

export type RefObject<T> = {
  /**
   * The current value of the ref.
   */
  current: T;
}
export type RefCallback<T> = (ref: T) => void;
export type Ref<T> = RefCallback<T> | RefObject<T> | null;

export type ComponentRef<T> = ComponentProps<T> extends RefAttribute<infer R> ? R : never;
