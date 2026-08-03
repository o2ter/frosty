//
//  transition.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2026 O2ter Limited. All rights reserved.
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
import { useCallback } from '../callback';
import { uniqueId } from '~/core/utils';

/**
 * A hook that provides a way to manage transitions in a React component.
 * It returns a boolean indicating whether a transition is currently in progress and a callback function to initiate a transition.
 * 
 * @returns A tuple containing a boolean indicating if a transition is in progress and a callback function to initiate a transition.
 */
export const useTransition = (): [boolean, (cb: () => Awaitable<void>) => void] => {
  const [tasks, setTasks] = useState<string[]>([]);
  const callback = useCallback(async (cb: () => Awaitable<void>) => {
    const taskId = uniqueId();
    setTasks(prev => [...prev, taskId]);
    try {
      await cb();
    } finally {
      setTasks(prev => prev.filter(id => id !== taskId))
    }
  });
  return [!_.isEmpty(tasks), callback];
};
