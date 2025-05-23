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

const emitter = new EventEmitter();

export const useLocation = () => {
  const document = useDocument();
  const result = (history?: History) => ({
    ..._.pick(document.location, 'pathname', 'search', 'hash'),
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

export const useSearchParams = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const setSearchParams = useCallback((params: URLSearchParamsInit) => {
    const newParams = new URLSearchParams(params);
    location.pushState(location.state, `?${newParams.toString()}`);
  });
  return [searchParams, setSearchParams];
}
