//
//  window.ts
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
import { useCallback } from '../common/hooks/callback';
import { useSyncExternalStore } from '../common/hooks/sync';

export const useWindowScroll = () => {
  const scrollTo = useCallback<{
    (options?: ScrollToOptions): void;
    (x: number, y: number): void;
  }>((...args: any[]) => {
    if (_.isObject(args[0])) {
      window.scrollTo(args[0]);
    } else if (_.isNumber(args[0]) && _.isNumber(args[1])) {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`
      );
    }
  }, []);
  const state = useSyncExternalStore((onStoreChange) => {
    window.addEventListener('scroll', onStoreChange);
    return () => window.removeEventListener('scroll', onStoreChange);
  }, () => typeof window === 'undefined' ? { x: 0, y: 0 } : ({
    x: window.scrollX,
    y: window.scrollY,
  }));
  return [state, scrollTo] as const;
}

export const useWindowSize = () => useSyncExternalStore((onStoreChange) => {
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
}, () => typeof window === 'undefined' ? { width: 0, height: 0 } : ({
  width: window.innerWidth,
  height: window.innerHeight,
}));