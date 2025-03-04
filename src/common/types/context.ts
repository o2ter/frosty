//
//  context.ts
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
import { ComponentType, ElementNode } from './basic';
import { reconciler } from '../../reconciler/state';

export type Context<Value> = ReturnType<typeof _createContext<Value>>;
export type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never;

const _createContext = <Value>(defaultValue: Value) => {
  const context: ComponentType<{
    value: Value;
    children?: ElementNode | ((value: Value) => ElementNode);
  }> = ({ value, children }) => {
    return _.isFunction(children) ? children(value) : children;
  };
  reconciler.contextDefaultValue.set(context, defaultValue);
  reconciler.registry.set(context, 'CONTEXT');
  return context;
}

export function createContext<Value>(defaultValue: Value): Context<Value>;
export function createContext<Value = undefined>(): Context<Value | undefined>;

export function createContext(defaultValue?: any) {
  return _createContext(defaultValue);
}
