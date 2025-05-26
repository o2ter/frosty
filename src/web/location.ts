//
//  location.ts
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
import { useMemo } from '../core/hooks/memo';
import { useCallback } from '../core/hooks/callback';
import { useSyncExternalStore } from '../core/hooks/sync';
import { EventEmitter } from '../core/reconciler/events';
import { useDocument } from './document';

const emitters = new WeakMap<Document, EventEmitter>();

/**
 * A hook that provides the current browser location and methods to manipulate the browser history.
 *
 * @returns An object with the following properties and methods:
 * - `hash`: The fragment identifier of the URL.
 * - `host`: The hostname and port number.
 * - `hostname`: The domain name.
 * - `href`: The full URL.
 * - `origin`: The protocol, hostname, and port.
 * - `pathname`: The path of the URL.
 * - `port`: The port number.
 * - `protocol`: The protocol scheme.
 * - `search`: The query string.
 * - `state`: The current state object associated with the history entry.
 * - `back()`: Navigates to the previous entry in the history stack.
 * - `forward()`: Navigates to the next entry in the history stack.
 * - `pushState(data, url)`: Pushes a new entry onto the history stack.
 * - `replaceState(data, url)`: Replaces the current history entry.
 *
 * The hook subscribes to changes in the browser's history and location, causing components to re-render when navigation occurs.
 *
 * @example
 * const location = useLocation();
 * console.log(location.pathname); // e.g., "/about"
 * location.pushState({ some: 'state' }, '/new-path');
 */
export const useLocation = () => {
  const document = useDocument();
  if (!emitters.has(document)) emitters.set(document, new EventEmitter());
  const emitter = emitters.get(document)!;
  const result = (history?: History) => ({
    ..._.pick(document.location, 'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search'),
    state: history?.state ?? null,
    back: () => {
      history?.back();
    },
    forward: () => {
      history?.forward();
      emitter.emit('change');
    },
    pushState: (data: any, url?: string | URL | null) => {
      history?.pushState(data, '', url);
      emitter.emit('change');
    },
    replaceState: (data: any, url?: string | URL | null) => {
      history?.replaceState(data, '', url);
      emitter.emit('change');
    },
  });
  return useSyncExternalStore((onStoreChange) => {
    const callback = () => { onStoreChange(); };
    window.addEventListener('popstate', callback);
    const event = emitter.register('change', callback);
    return () => {
      window.removeEventListener('popstate', callback);
      event.remove();
    }
  }, () => result(window.history), () => result());
}

type URLSearchParamsInit = ConstructorParameters<typeof URLSearchParams>[0];

/**
 * A hook for reading and updating the URL's query string (search parameters).
 *
 * @returns A tuple:
 *   - The first element is a `URLSearchParams` instance representing the current query string.
 *   - The second element is a function to update the search parameters, which accepts any valid
 *     `URLSearchParams` initializer (string, array, or object).
 *
 * Updating the search parameters will push a new history entry and update the URL in the address bar.
 *
 * @example
 * const [searchParams, setSearchParams] = useSearchParams();
 * const page = searchParams.get('page');
 * setSearchParams({ page: '2', filter: 'active' });
 */
export const useSearchParams = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const setSearchParams = useCallback((params: URLSearchParamsInit) => {
    const newParams = new URLSearchParams(params);
    location.pushState(location.state, `?${newParams.toString()}`);
  });
  return [searchParams, setSearchParams];
}
