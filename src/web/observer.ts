//
//  observer.ts
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
import { useEffect } from '../core/hooks/effect';
import { useCallback } from '../core/hooks/callback';

interface _Observer<T> {
  observe(target: Element, options?: T): void;
  unobserve(target: Element): void;
}

const createObserver = <E extends { target: Element; }, T>(
  constructor: new (callback: (entries: E[]) => void) => _Observer<T>
) => {
  const listeners = new WeakMap<Element, ((entry: E) => void)[]>();
  const observer = new constructor((entries) => {
    for (const entry of entries) {
      for (const listener of listeners.get(entry.target) ?? []) {
        (async () => {
          try {
            await listener(entry);
          } catch (e) {
            console.error(e);
          }
        })();
      }
    }
  });
  return {
    observe: (target: Element, callback: (entry: E) => void, options?: T) => {
      observer.observe(target, options);
      listeners.set(target, [...listeners.get(target) ?? [], callback]);
    },
    unobserve: (target: Element, callback: (entry: E) => void) => {
      const list = _.filter(listeners.get(target), x => x !== callback);
      listeners.set(target, list);
      if (_.isEmpty(list)) observer.unobserve?.(target);
    },
  };
};

const observer = typeof window === 'undefined' ? undefined : {
  resize: createObserver(ResizeObserver),
  intersection: createObserver(IntersectionObserver),
};

export const useResizeObserver = (
  target: Element | null | undefined,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions,
) => {
  const _callback = useCallback(callback);
  useEffect(() => {
    if (!observer || !target) return;
    observer.resize.observe(target, _callback, options);
    return () => observer.resize.unobserve(target, _callback);
  }, [target]);
}

export const useIntersectionObserver = (
  target: Element | null | undefined,
  callback: (entry: IntersectionObserverEntry) => void,
) => {
  const _callback = useCallback(callback);
  useEffect(() => {
    if (!observer || !target) return;
    observer.intersection.observe(target, _callback);
    return () => observer.intersection.unobserve(target, _callback);
  }, [target]);
}

export const useMutationObserver = (
  target: Node | null | undefined,
  callback: MutationCallback,
  options?: MutationObserverInit,
) => {
  const _callback = useCallback(callback);
  useEffect(() => {
    if (typeof window === 'undefined' || !target) return;
    const observer = new MutationObserver(_callback);
    observer.observe(target, options);
    return () => observer.disconnect();
  }, [target]);
}

export const usePerformanceObserver = (
  callback: PerformanceObserverCallback,
  options?: PerformanceObserverInit,
) => {
  const _callback = useCallback(callback);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new PerformanceObserver(_callback);
    observer.observe(options);
    return () => observer.disconnect();
  }, []);
}
