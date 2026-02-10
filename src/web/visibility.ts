//
//  visibility.ts
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
import { useDocument } from './document';
import { _useSharedSyncExternalStore } from './utils';

/**
 * A hook to get the current visibility state of the document.
 * It listens to the 'visibilitychange' event to update the state.
 * 
 * @returns A string indicating the current visibility state: 'active', 'inactive', 'background', or 'unknown'.
 */
export const useVisibility = () => {
  const document = useDocument();
  return _useSharedSyncExternalStore(
    'useVisibility',
    (onStoreChange) => {
      document.addEventListener('visibilitychange', onStoreChange);
      return () => {
        document.removeEventListener('visibilitychange', onStoreChange);
      }
    },
    () => {
      if (document.hasFocus()) {
        return 'active' as const;
      } else if (document.visibilityState === 'visible') {
        return 'inactive' as const;
      } else {
        return 'background' as const;
      }
    }, () => 'unknown' as const
  );
}
