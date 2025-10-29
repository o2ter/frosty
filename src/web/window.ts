//
//  window.ts
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
import { uniqueId } from '../core/utils';
import { reconciler } from '../core/reconciler/state';
import { _DOMRenderer } from '../renderer/common';
import { _useSharedSyncExternalStore } from './utils';

/**
 * Hook to access the current window object in a web renderer.
 * 
 * @returns The current window object.
 * @throws Error if used outside of a render function or with an unsupported renderer.
 */
export const useWindow = () => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useWindow must be used within a render function.');
  if (state.renderer instanceof _DOMRenderer) {
    return state.renderer.window;
  } else {
    throw Error('Unsupported renderer.');
  }
}

const emptyInsets = { top: 0, left: 0, right: 0, bottom: 0 };
const safeAreaInsets = (window: ReturnType<typeof useWindow>) => {
  let support;
  if (!('CSS' in window) || !_.isFunction(window.CSS.supports)) {
    return emptyInsets;
  }
  if (window.CSS.supports('top: env(safe-area-inset-top)')) {
    support = 'env'
  } else if (window.CSS.supports('top: constant(safe-area-inset-top)')) {
    support = 'constant'
  } else {
    return emptyInsets;
  }
  const id = uniqueId();
  const style = document.createElement('style');
  style.textContent = `:root {
    --${id}-top: ${support}(safe-area-inset-top);
    --${id}-left: ${support}(safe-area-inset-left);
    --${id}-right: ${support}(safe-area-inset-right);
    --${id}-bottom: ${support}(safe-area-inset-bottom);
  }`;
  document.head.appendChild(style);
  const computedStyle = getComputedStyle(document.documentElement);
  const insets = {
    top: computedStyle.getPropertyValue(`--${id}-top`),
    left: computedStyle.getPropertyValue(`--${id}-left`),
    right: computedStyle.getPropertyValue(`--${id}-right`),
    bottom: computedStyle.getPropertyValue(`--${id}-bottom`),
  };
  style.remove();
  return _.mapValues(insets, v => parseFloat(v));
}

/**
 * A hook that provides various metrics of the window object.
 * It listens to the 'resize' event to update the metrics.
 * 
 * @returns An object containing safe area insets, device pixel ratio, outer and inner dimensions of the window.
 */
export const useWindowMetrics = () => {
  const window = useWindow();
  return _useSharedSyncExternalStore(
    'useWindowMetrics',
    (onStoreChange) => {
      window.addEventListener('resize', onStoreChange);
      return () => {
        window.removeEventListener('resize', onStoreChange);
      };
    },
    () => ({
      safeAreaInsets: safeAreaInsets(window),
      devicePixelRatio: window.devicePixelRatio,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  );
};

/** 
 * A hook that provides metrics of the visual viewport.
 * It listens to the 'resize' event of the visual viewport to update the metrics.
 * 
 * @returns An object containing width, height, and scale of the visual viewport.
 */
export const useVisualViewportMetrics = () => {
  const { visualViewport } = useWindow();
  return _useSharedSyncExternalStore(
    'useVisualViewportMetrics',
    (onStoreChange) => {
      visualViewport?.addEventListener('resize', onStoreChange);
      return () => {
        visualViewport?.removeEventListener('resize', onStoreChange);
      };
    }, () => visualViewport && ({
      width: visualViewport.width,
      height: visualViewport.height,
      scale: visualViewport.scale,
    })
  );
};

/**
 * A hook that provides the current scroll position of the window.
 * It listens to the 'scroll' event to update the position.
 * 
 * @returns An object containing scrollX and scrollY values.
 */
export const useWindowScroll = () => {
  const window = useWindow();
  return _useSharedSyncExternalStore(
    'useWindowScroll',
    (onStoreChange) => {
      window.addEventListener('scroll', onStoreChange);
      return () => {
        window.removeEventListener('scroll', onStoreChange);
      };
    }, () => ({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    })
  );
};

const colorSchemeDarkCache = new WeakMap<ReturnType<typeof useWindow>, MediaQueryList | undefined>();

/**
 * A hook that detects the user's preferred color scheme (light or dark).
 * It listens to changes in the '(prefers-color-scheme: dark)' media query.
 * 
 * @returns A string indicating the current color scheme: 'light' or 'dark'.
 */
export const useColorScheme = () => {
  const window = useWindow();
  if (!colorSchemeDarkCache.has(window)) colorSchemeDarkCache.set(window, window.matchMedia?.('(prefers-color-scheme: dark)'));
  const colorSchemeDark = colorSchemeDarkCache.get(window);
  return _useSharedSyncExternalStore(
    'useColorScheme',
    (onStoreChange) => {
      colorSchemeDark?.addEventListener('change', onStoreChange);
      return () => {
        colorSchemeDark?.removeEventListener('change', onStoreChange);
      };
    }, () => colorSchemeDark?.matches ? 'dark' : 'light'
  );
};
