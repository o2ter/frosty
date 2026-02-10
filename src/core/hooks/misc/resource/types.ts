//
//  types.ts
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
import { SetStateAction } from '../../../types/common';

/**
 * Represents a function to fetch asynchronous resources.
 * 
 * @template T - The type of the resource being fetched.
 * @template P - The type of the parameters passed to the fetch function.
 * 
 * @param x - An object containing:
 *   - `abortSignal`: An `AbortSignal` to handle cancellation of the fetch operation.
 *   - `param`: Optional parameters for the fetch operation, passed by the `refresh` or `next` function.
 *   - `prevState`: The previous state of the resource, if applicable. This is only populated when the `next` function is called.
 *   - `dispatch`: A function to update the resource state during the fetch process.
 * 
 * @returns A promise that resolves to the fetched resource or `void`.
 */
export type Fetch<T, P> = (x: {
  abortSignal: AbortSignal;
  param?: P;
  prevState?: T;
  dispatch: (value: SetStateAction<T, T | undefined>) => void;
}) => PromiseLike<void | T>;

/**
 * Represents a function to fetch asynchronous iterable resources, such as streams or paginated data.
 * 
 * @template T - The type of the resource items being fetched.
 * @template P - The type of the parameters passed to the fetch function.
 * 
 * @param x - An object containing:
 *   - `abortSignal`: An `AbortSignal` to handle cancellation of the fetch operation.
 *   - `param`: Optional parameters for the fetch operation, passed by the `refresh` or `next` function.
 * 
 * @returns An `AsyncIterable` that yields the fetched resource items.
 */
export type FetchWithIterable<T, P> = (x: {
  abortSignal: AbortSignal;
  param?: P;
}) => Awaitable<AsyncIterable<T>>;

/**
 * Configuration object for asynchronous resource fetching.
 * 
 * @template F - The type of the fetch function.
 * 
 * @property fetch - The fetch function to retrieve the resource.
 * @property debounce - Optional debounce settings to control the frequency of fetch calls.
 *   - `wait`: The number of milliseconds to delay.
 *   - Other settings as defined in `_.DebounceSettings`.
 */
export type Config<F> = {
  fetch: F,
  debounce?: _.DebounceSettings & { wait?: number; },
};
