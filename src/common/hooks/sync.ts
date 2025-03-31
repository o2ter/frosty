//
//  sync.ts
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
import { Awaitable } from '@o2ter/utils-js';
import { _useEffect } from '../../reconciler/hooks';
import { reconciler } from '../../reconciler/state';

export const useSyncExternalStore = <Snapshot>(
  subscribe: (
    onStoreChange: () => void,
    signal: AbortSignal,
  ) => Awaitable<void | (() => Awaitable<void>)>,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot,
) => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useSyncExternalStore must be used within a render function.');
  _useEffect('useSyncExternalStore', ({ node }) => {
    const abort = new AbortController();
    try {
      const destructor = subscribe(() => { node?.setDirty(); }, abort.signal);
      return () => {
        abort.abort();
        (async () => {
          try {
            const _destructor = await destructor;
            if (_.isFunction(_destructor)) _destructor();
          } catch (e) {
            console.error(e);
          }
        })();
      };
    } catch (e) {
      console.error(e);
      return () => abort.abort();
    }
  }, null);
  if (getServerSnapshot && state.renderer._server) {
    return getServerSnapshot();
  }
  return getSnapshot();
};