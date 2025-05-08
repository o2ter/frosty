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
import { SetStateAction } from '../../core/types/common';
import { Config, Fetch, FetchWithIterable } from './types';
import { useState } from '../../core/hooks/state';
import { useEffect } from '../../core/hooks/effect';
import { useContext } from '../../core/hooks/context';
import { useCallback } from '../../core/hooks/callback';
import { useAsyncDebounce } from '../../core/hooks/debounce';
import { Context as ErrorContext } from './error';
export { ResourceErrors, useResourceErrors } from './error';

/**
 * A hook to manage asynchronous resources with support for debouncing, error handling, and state management.
 * 
 * @template T - The type of the resource being fetched.
 * @template P - The type of the parameters passed to the fetch function.
 * 
 * @param config - The fetch function or a configuration object containing the fetch function and optional debounce settings.
 * @param deps - An optional dependency array to control when the resource is refreshed.
 * 
 * @returns An object containing:
 * - `count`: The number of times the resource has been fetched.
 * - `refreshing`: A boolean indicating if the resource is currently being refreshed.
 * - `loading`: A boolean indicating if the resource is currently being loaded.
 * - `resource`: The fetched resource.
 * - `error`: Any error encountered during the fetch.
 * - `cancel`: A function to cancel the current fetch operation.
 * - `refresh`: A function to refresh the resource.
 * - `next`: A function to fetch the next set of data (for paginated resources).
 * - `setResource`: A function to manually update the resource state.
 */
export const useResource = <T, P = any>(
  config: Fetch<T, P> | Config<Fetch<T, P>>,
  deps?: any,
) => {

  const fetch = _.isFunction(config) ? config : config.fetch;
  const debounce = _.isFunction(config) ? {} : config.debounce;

  const [state, setState] = useState<{
    type?: 'refresh' | 'next';
    count?: number;
    flag?: boolean;
    resource?: T;
    error?: any;
    token?: string;
    abort?: AbortController;
  }>({});

  const _dispatch = (
    token: string,
    next: SetStateAction<typeof state>,
  ) => setState(state => state.token === token ? ({
    ...(_.isFunction(next) ? next(state.flag ? state : _.omit(state, 'resource', 'error')) : next),
    count: state.flag ? state.count : (state.count ?? 0) + 1,
    flag: true,
  }) : state);

  const _fetch = useAsyncDebounce(async (
    type: 'refresh' | 'next',
    abort: AbortController,
    reset: boolean,
    param?: P,
    prevState?: T,
  ) => {

    const token = _.uniqueId();
    setState(state => ({ ...state, type, token, abort, flag: !reset }));

    try {

      const resource = await fetch({
        param,
        prevState,
        abortSignal: abort.signal,
        dispatch: (next) => {
          _dispatch(token, state => ({
            ...state,
            resource: _.isFunction(next) ? next(state.resource) : next,
          }));
        },
      });

      _dispatch(token, state => ({ resource: resource ?? state.resource }));

    } catch (error) {

      _dispatch(token, state => ({
        resource: state.resource,
        error,
      }));
    }

  }, debounce ?? {});

  useEffect(() => {
    const controller = new AbortController();
    void _fetch('refresh', controller, true);
    return () => controller.abort();
  }, deps ?? []);

  const _cancelRef = useCallback((reason?: any) => { state.abort?.abort(reason) });
  const _refreshRef = useCallback((param?: P) => _fetch('refresh', new AbortController(), true, param));
  const _nextRef = useCallback((param?: P) => _fetch('next', new AbortController(), false, param, state.resource));
  const _setResRef = useCallback((resource: T | ((prevState?: T) => T)) => setState(state => ({
    ..._.omit(state, 'resource', 'error'),
    resource: _.isFunction(resource) ? resource(state.resource) : resource,
  })));

  const { setErrors } = useContext(ErrorContext);
  useEffect(() => {
    const { type, abort, token = _.uniqueId(), error } = state;
    if (!error) return;
    setErrors(v => [...v, {
      token,
      error,
      refresh: _refreshRef,
      refreshing: !_.isNil(abort) && type === 'refresh',
      loading: !_.isNil(abort),
    }]);
    return () => setErrors(v => _.filter(v, x => x.token !== token));
  }, [state]);

  return {
    count: state.count ?? 0,
    refreshing: !_.isNil(state.abort) && state.type === 'refresh',
    loading: !_.isNil(state.abort),
    resource: state.resource,
    error: state.error,
    cancel: _cancelRef,
    refresh: _refreshRef,
    next: _nextRef,
    setResource: _setResRef,
  };
}

/**
 * A hook to manage asynchronous iterable resources, such as streams or paginated data.
 * 
 * @template T - The type of the resource items being fetched.
 * @template P - The type of the parameters passed to the fetch function.
 * 
 * @param config - The fetch function or a configuration object containing the fetch function and optional debounce settings.
 * @param deps - An optional dependency array to control when the resource is refreshed.
 * 
 * @returns An object containing the same properties as `useResource`, but optimized for iterable resources.
 */
export const useIterableResource = <T, P = any>(
  config: FetchWithIterable<T, P> | Config<FetchWithIterable<T, P>>,
  deps?: any,
) => {
  const fetch = _.isFunction(config) ? config : config.fetch;
  const debounce = _.isFunction(config) ? {} : config.debounce;
  const { next, ...result } = useResource<T[]>({
    fetch: async ({ dispatch, abortSignal, param }) => {
      const resource = await fetch({ abortSignal, param });
      for await (const item of resource) {
        dispatch(items => items ? [...items, item] : [item]);
      }
    },
    debounce,
  }, deps);
  return result;
}
