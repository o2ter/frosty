//
//  server.ts
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
import { reconciler } from '../core/reconciler/state';
import { _DOMRenderer } from '../renderer/common';
import { decompress } from '../renderer/minify/decompress';

let decodedSsrData: any;

export const useServerResource = (key: string, resource: () => string): string | undefined => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useServerResource must be used within a render function.');
  if (state.renderer instanceof _DOMRenderer) {
    if (state.renderer._server) {
      const data = resource().toString();
      state.renderer._tracked_server_resource.set(key, data);
      return data;
    } else {
      if (_.isNil(decodedSsrData)) {
        const ssrData = state.renderer.document.querySelector('script[data-frosty-ssr-data]');
        if (ssrData instanceof HTMLElement) {
          try {
            decodedSsrData = JSON.parse(decompress(ssrData.innerText.trim()));
          } catch (e) {
            console.error(e);
            decodedSsrData = {};
          }
          ssrData.remove();
        } else {
          decodedSsrData = {};
        }
      }
      return decodedSsrData[key];
    }
  } else {
    throw Error('Unsupported renderer.');
  }
}
