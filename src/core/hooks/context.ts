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

import _ from 'lodash';
import { reconciler } from '../reconciler/state';
import { ComponentType, ElementNode } from '../types/common';

export const _contextDefaultValue = new WeakMap<Context<any>, any>();

export const isContext = (type: any): type is Context<any> => {
  return _contextDefaultValue.has(type as any);
};

export type Context<Value> = ReturnType<typeof _createContext<Value>>;
export type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never;

const _createContext = <Value extends unknown>(defaultValue: Value) => {
  const _context: ComponentType<{
    value: Value;
    children?: ElementNode | ((value: Value) => ElementNode);
  }> = ({ value, children }) => {
    return _.isFunction(children) ? children(value) : children;
  };
  const Consumer: ComponentType<{
    children: (value: Value) => ElementNode;
  }> = ({ children }) => {
    const value = useContext(_context as Context<Value>);
    return children(value);
  };
  _contextDefaultValue.set(_context as Context<Value>, defaultValue);
  return _.assign(_context, { Consumer });
};

/**
 * Creates a new context object with an optional default value.
 *
 * A context object allows you to share a value across a component tree
 * without explicitly passing it as a prop to every level.
 *
 * @template Value - The type of the value to be stored in the context.
 * @param - The default value for the context.
 * @returns A context object that can be used to provide and consume the value.
 */

export function createContext<Value>(defaultValue: Value): Context<Value>;
export function createContext<Value = undefined>(): Context<Value | undefined>;

export function createContext(defaultValue?: any) {
  return _createContext(defaultValue);
}

/**
 * A hook that retrieves the current value of a context and optionally applies
 * a selector function to transform the context value. This hook ensures that the component
 * subscribes to the context and re-renders when the context value changes.
 *
 * @template T - The type of the context value.
 * @template R - The type of the transformed value returned by the selector.
 * @param context - The context object to retrieve the value from.
 * @param selector - An optional selector function to transform the context value.
 *                   Defaults to an identity function.
 * @returns - The current value of the context, optionally transformed by the selector.
 *
 * @throws - Throws an error if the provided context is invalid or if the hook
 *           is used outside of a render function.
 *
 * @example
 * const MyContext = createContext({ user: null });
 * 
 * function MyComponent() {
 *   const user = useContext(MyContext, context => context.user);
 *   return <div>{user ? `Hello, ${user.name}` : 'Hello, Guest'}</div>;
 * }
 */
export const useContext = <T, R = T>(
  context: Context<T>,
  selector: (state: T) => R = v => v as any
) => {
  if (!isContext(context)) throw Error(`Invalid type of ${context}`);
  const state = reconciler.currentHookState;
  if (!state) throw Error('useContext must be used within a render function.');
  const { contextValue, listens } = state;
  listens.add(context);
  const { value = _contextDefaultValue.get(context) } = contextValue.get(context) ?? {};
  return selector(value);
};
