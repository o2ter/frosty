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

import _ from "lodash";
import { reconciler } from "./reconciler";

const _useHookState = (hook: string) => {
  const context = reconciler.currentHookState;
  if (!context) throw Error(`${hook} must be used within a render function.`);
  const { oldState, newState } = context;
  if (oldState && oldState[newState.length]?.hook !== hook) {
    console.warn([
      `Hook "${hook}" is called conditionally.`,
      'Hooks must be called in the exact same order in every component render.',
      'Did you accidentally call a hook after an early return?'
    ].join(' '));
  }
  return context;
};

export const _useEffect = (
  hook: string,
  effect: () => () => void,
  deps?: any
) => {
  const { oldState, newState } = _useHookState(hook);
  if (
    oldState?.[newState.length]?.hook === hook &&
    _.isEqual(oldState[newState.length].deps, deps)
  ) {
    newState.push(oldState[newState.length]);
    return;
  }
  newState.push({ hook, deps, mount: effect });
};

export const _useMemo = <T>(
  hook: string,
  factory: () => T,
  deps?: any
) => {
  const { oldState, newState } = _useHookState(hook);
  if (
    oldState?.[newState.length]?.hook === hook &&
    _.isEqual(oldState[newState.length].deps, deps)
  ) {
    newState.push(oldState[newState.length]);
    return oldState[newState.length].data;
  }
  const data = factory();
  newState.push({ hook, deps, data });
  return data;
};
