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
import { useSyncExternalStore } from '../core/hooks/sync';
import { useCallback } from '../core/hooks/callback';
import { SetStateAction } from '../core/types/common';
import { EventEmitter } from '../core/reconciler/events';

const emitters = new WeakMap<Storage, EventEmitter>();
const emitterFor = (storage: Storage) => {
  if (!emitters.has(storage)) emitters.set(storage, new EventEmitter());
  return emitters.get(storage)!;
}

const _useStorage = (
  storage: () => Storage,
  key: string,
  initialValue?: string | null
) => {
  const state = useSyncExternalStore((onStoreChange) => {
    const _storage = storage();
    const emitter = emitterFor(_storage);
    const callback = (ev: StorageEvent) => { 
      if (!ev.storageArea || ev.storageArea === _storage) onStoreChange();
    };
    window.addEventListener('storage', callback);
    const event = emitter.register('change', onStoreChange);
    return () => {
      window.removeEventListener('storage', callback);
      event.remove();
    }
  }, () => storage().getItem(key), () => undefined);
  const setState = useCallback((v: SetStateAction<string | null | undefined>) => {
    try {
      const _storage = storage();
      const newValue = _.isFunction(v) ? v(state) : v;
      if (_.isNil(newValue)) {
        _storage.removeItem(key);
      } else {
        _storage.setItem(key, newValue);
      }
      const emitter = emitterFor(_storage);
      emitter.emit('change');
    } catch (e) {
      console.error(e);
    }
  }, [key]);
  return [state ?? initialValue ?? null, setState] as const;
}

export const useLocalStorage = (
  key: string,
  initialValue?: string | null
) => _useStorage(() => window.localStorage, key, initialValue);

export const useSessionStorage = (
  key: string,
  initialValue?: string | null
) => _useStorage(() => window.sessionStorage, key, initialValue);
