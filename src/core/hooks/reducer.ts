//
//  reducer.ts
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
import { _useMemo } from '../reconciler/hooks';

/**
 * A utility function that manages state using a reducer pattern.
 * 
 * @template T The type of the state.
 * @template A The type of the action object (optional).
 * @param reducer A function that takes the current state and an action, and returns the new state.
 * @param initialState The initial state value or a function that returns the initial state.
 * @returns A tuple containing the current state and a dispatch function to update the state.
 */
export function useReducer<T>(
  reducer: (prevState: T) => T,
  initialState: T | (() => T),
): [T, (dispatch: () => void) => void];

export function useReducer<T, A = any>(
  reducer: (prevState: T, action: A) => T,
  initialState: T | (() => T),
): [T, (dispatch: (action: A) => void) => void];

export function useReducer<T = undefined>(
  reducer: (prevState: T | undefined) => T | undefined
): [T | undefined, (dispatch: () => void) => void];

export function useReducer<T = undefined, A = any>(
  reducer: (prevState: T | undefined, action: A) => T | undefined
): [T | undefined, (dispatch: (action: A) => void) => void];

export function useReducer(
  reducer: (prevState: any, action?: any) => any,
  initialState?: any,
) {
  const { value, dispatch } = _useMemo('useReducer', ({ node }) => {
    const state = {
      value: _.isFunction(initialState) ? initialState() : initialState,
      dispatch: (action?: any) => {
        state.value = reducer(state.value, action);
        node?._setDirty();
      },
    };
    return state;
  }, null);
  return [value, dispatch];
}
