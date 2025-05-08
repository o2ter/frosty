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

import { Context } from '../types/context';
import { reconciler } from '../reconciler/state';

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
  if (!reconciler.isContext(context)) throw Error(`Invalid type of ${context}`);
  const state = reconciler.currentHookState;
  if (!state) throw Error('useContext must be used within a render function.');
  const { contextValue, listens } = state;
  listens.add(context);
  return selector(contextValue.get(context)?.value);
}
