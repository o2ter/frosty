//
//  storage.ts
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
import { useSyncExternalStore } from '../common/hooks/sync';
import { useCallback } from '../common/hooks/callback';
import { SetStateAction } from '../common/types/common';

const _useStorage = (
  storage: () => Storage | undefined,
  key: string,
  initialValue: string
) => {
  const state = useSyncExternalStore((onStoreChange) => {
    const _storage = storage();
    if (!_storage) return;
    const callback = (ev: StorageEvent) => { 
      if (!ev.storageArea || ev.storageArea === _storage) onStoreChange();
    };
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }, () => storage()?.getItem(key));
  const setState = useCallback((v: SetStateAction<string | null | undefined>) => {
    try {
      const _storage = storage();
      if (!_storage) return;
      const newValue = _.isFunction(v) ? v(state) : v;
      if (newValue === undefined || newValue === null) {
        _storage.removeItem(key);
      } else {
        _storage.setItem(key, newValue);
      }
      window.dispatchEvent(new StorageEvent('storage', { key, newValue, storageArea: _storage }));
    } catch (e) {
      console.error(e);
    }
  }, [key]);
  return [state ?? initialValue, setState] as const;
}

export const useLocalStorage = (
  key: string,
  initialValue: string
) => _useStorage(() => typeof window === 'undefined' ? undefined : window.localStorage, key, initialValue);

export const useSessionStorage = (
  key: string,
  initialValue: string
) => _useStorage(() => typeof window === 'undefined' ? undefined : window.sessionStorage, key, initialValue);
