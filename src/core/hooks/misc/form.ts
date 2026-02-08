//
//  form.ts
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
import { useState } from '../state';
import { useMemo } from '../memo';
import { SetStateAction } from '../../../core/types/common';
import { createActivity, useActivity } from './activity';
import { useEffect } from '../effect';
import { uniqueId } from '../../../core/utils';
import { _useCallbacks } from '../callback';

export const FormActivity = createActivity();

type FormAction = 'submit' | 'reset' | string & {};

type FormState<V extends Record<string, any>> = {
  readonly dirty: boolean;
  readonly values: V;
  readonly loading: string[];
  readonly count: Record<string, number>;
  readonly setValues: (update: SetStateAction<V>) => void;
  setValue: (path: string, value: any) => void;
  perform: (action: FormAction) => Promise<void>;
  addEventListener: (callback: (action: string, state: FormState<V>) => Awaitable<void>) => void;
  removeEventListener: (callback: (action: string, state: FormState<V>) => Awaitable<void>) => void;
};

const cloneValue = (x: any): any => {
  if (_.isArray(x)) return x.map(v => cloneValue(v));
  if (_.isPlainObject(x)) return _.mapValues(x, v => cloneValue(v));
  return x;
};

export const useFormState = <V extends Record<string, any>>({
  initialValues,
  activity,
  callback,
}: {
  initialValues: V,
  activity?: boolean | { actions?: string[]; delay?: number; };
  callback: (action: FormAction | 'error', state: FormState<V>, error?: any) => Awaitable<void>,
}): FormState<V> => {
  const [state, setState] = useState<{
    values?: V;
    loading?: Record<string, string[]>;
    count?: Record<string, number>;
    listeners?: ((action: string, state: FormState<V>) => void)[];
  }>({});
  const startActivity = useActivity(FormActivity);
  const [nextTick, setNextTick] = useState<((state: FormState<V>) => void)[]>([]);
  const {
    setValues,
    setListeners,
    perform,
  } = _useCallbacks({
    setValues: (update: SetStateAction<V>) => setState(s => ({ ...s, values: _.isFunction(update) ? update(s.values ?? initialValues) : update })),
    setListeners: (update: SetStateAction<((action: string, state: FormState<V>) => void)[]>) => setState(s => ({ ...s, listeners: _.isFunction(update) ? update(s.listeners ?? []) : update })),
    perform: (action: string) => {
      const perform = async () => {
        const taskId = uniqueId();
        const _callback = async (state: FormState<V>) => {
          if (action === 'reset') setState(s => _.omit(s, 'values'));
          await callback(action, state);
          setState(s => ({
            ...s,
            count: { ...s.count, [action]: (s.count?.[action] ?? 0) + 1 },
          }))
        };
        try {
          setState(s => ({
            ...s,
            loading: { ...s.loading, [action]: [...(s.loading?.[action] ?? []), taskId] },
          }));
          const resolved = await Promise.all(_.map(state.listeners, l => l(action, formState)));
          if (_.isEmpty(resolved)) {
            await _callback(formState);
          } else {
            await new Promise((resolve, reject) => {
              setNextTick(v => [...v, (formState) => { _callback(formState).then(resolve, reject); }]);
            });
          }
        } catch (error) {
          callback('error', formState, error);
        } finally {
          setState(s => ({
            ...s,
            loading: { ...s.loading, [action]: _.without(s.loading?.[action] ?? [], taskId) },
          }));
        }
      };
      if (_.isBoolean(activity) ? activity : activity?.actions?.includes(action)) {
        return startActivity(perform, _.isBoolean(activity) ? undefined : activity?.delay);
      } else {
        return perform();
      }
    },
  });
  const formState = useMemo(() => ({
    get dirty() { return !_.isNil(state.values) },
    get values() { return state.values ?? initialValues },
    get loading() { return _.keys(_.pickBy(state.loading, x => !_.isEmpty(x))) },
    get count() { return state.count ?? {} },
    get setValues() { return setValues },
    setValue: (path: string, value: any) => setValues(
      values => _.set(cloneValue(values), path, _.isFunction(value) ? value(_.get(values, path)) : value)
    ),
    perform: (action: FormAction) => perform(action),
    addEventListener: (callback: (action: string, state: FormState<V>) => Awaitable<void>) => setListeners(v => [...v, callback]),
    removeEventListener: (callback: (action: string, state: FormState<V>) => Awaitable<void>) => setListeners(v => _.filter(v, x => x !== callback)),
  }), [state, initialValues]);
  useEffect(() => {
    if (_.isEmpty(nextTick)) return;
    for (const callback of nextTick) callback(formState);
    setNextTick(v => _.filter(v, x => _.every(nextTick, c => c !== x)));
  }, [nextTick]);
  return formState;
};
