//
//  activity.tsx
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
import { Awaitable } from '@o2ter/utils-js';
import { useState } from '../state';
import { ElementNode, SetStateAction } from '../../types/common';
import { Context, createContext, useContext } from '../context';
import { uniqueId } from '../../utils';
import { useMemo } from '../memo';

type ActivityContextValue = {
  setTasks: (dispatch: SetStateAction<string[]>) => void;
  defaultDelay: number;
};

const contextMap: WeakMap<any, Context<ActivityContextValue>> = new WeakMap();

export const createActivity = ({
  defaultDelay: _defaultDelay = 250,
}: {
  defaultDelay?: number;
} = {}) => {
  const Context = createContext<ActivityContextValue>({
    setTasks: () => { },
    defaultDelay: _defaultDelay,
  });
  const component = ({
    defaultDelay = _defaultDelay,
    children,
  }: {
    defaultDelay?: number;
    children: ((tasks: number) => ElementNode);
  }) => {
    const [tasks, setTasks] = useState<string[]>([]);
    const value = useMemo(() => ({ setTasks, defaultDelay }), []);
    return (
      <Context value={value}>
        {children(tasks.length)}
      </Context>
    );
  };
  contextMap.set(component, Context);
  return component;
};

export const useActivity = (component: ReturnType<typeof createActivity>) => {
  const context = contextMap.get(component);
  if (!context) throw new Error('Invalid activity component');
  const { setTasks, defaultDelay } = useContext(context);
  return async <T extends any>(callback: () => Awaitable<T>, delay?: number) => {
    const id = uniqueId();
    let timeout;
    const _delay = delay ?? defaultDelay;
    if (_.isNumber(_delay) && _delay > 0) {
      timeout = setTimeout(() => {
        setTasks(tasks => [...tasks, id]);
      }, _delay);
    } else {
      setTasks(tasks => [...tasks, id]);
    }
    try {
      return await callback();
    } finally {
      if (timeout) clearTimeout(timeout);
      setTasks(tasks => _.filter(tasks, x => x !== id));
    }
  };
};
