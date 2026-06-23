//
//  index.ts
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
import { match, Opts } from '@formatjs/intl-localematcher';
import { useMemo } from '../core/hooks/memo';
import { useCallback } from '../core/hooks/callback';

type I18nStateOPts = Partial<Opts> & {
  locales: string[];
  availableLocales: string[];
  preferredLocale?: string;
  fallback: string;
};

export const useI18nState = (opts: I18nStateOPts) => useMemo(() => {
  const { locales, availableLocales, preferredLocale, fallback: defaultLocale, ...options } = opts;
  if (preferredLocale && _.includes(availableLocales, preferredLocale)) {
    return preferredLocale;
  }
  return match(locales, availableLocales, defaultLocale, {
    algorithm: 'best fit',
    ...options,
  });
}, [opts]);

export const useLocalize = (opts: I18nStateOPts) => {
  const i18nState = useI18nState(opts);
  return useCallback(<TObject extends unknown>(
    strings: Record<string, TObject>,
    selector?: _.PropertyPath,
  ) => selector ? _.get(strings[i18nState], selector) : strings[i18nState]);
};