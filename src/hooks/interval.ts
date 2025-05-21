//
//  interval.ts
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

import { useEffect } from '../core/hooks/effect';

/**
 * A custom hook that repeatedly calls the provided callback function at the specified interval.
 * 
 * @param callback - The function to be executed at each interval.
 * @param ms - The delay in milliseconds between each call to the callback. If not provided, the interval will not be set.
 * @returns void
 * 
 * @example
 * useInterval(() => {
 *   // Code to run every 1000ms
 * }, 1000);
 */
export const useInterval = (
  callback: () => void,
  ms?: number,
) => useEffect(() => {
  const interval = setInterval(() => {
    callback();
  }, ms);
  return () => clearInterval(interval);
}, []);
