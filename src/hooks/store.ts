//
//  store.ts
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
import { SetStateAction } from '../core/types/common';
import { useSyncExternalStore } from '../core/hooks/sync';

/**
 * A class representing a store that holds a value and allows for subscription
 * to changes in that value.
 *
 * @template T - The type of the value stored in the store.
 *
 * @example
 * const store = createStore(0);
 * store.setValue(1);
 * store.subscribe((oldVal, newVal) => {
 *   console.log(`Value changed from ${oldVal} to ${newVal}`);
 * });
 */
class Store<T> {

  #listeners = new Set<(oldVal: T, newVal: T) => void>();
  #value: T;

  /** @internal */
  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  /**
   * Gets the current value of the store.
   * 
   * @returns The current value of the store.
   */
  get value() {
    return this.#value;
  }

  /**
   * Sets the value of the store and notifies all subscribers.
   * 
   * @param dispatch - The new value or a function that returns the new value.
   */
  setValue(dispatch: SetStateAction<T>) {
    const oldVal = this.#value;
    dispatch = _.isFunction(dispatch) ? dispatch(this.#value) : this.#value;
    this.#listeners.forEach(listener => void listener(oldVal, this.#value));
  }

  /**
   * Sets the value of the store and notifies all subscribers.
   * 
   * @param dispatch - The new value or a function that returns the new value.
   */
  subscribe(callback: (oldVal: T, newVal: T) => void) {
    this.#listeners.add(callback);
    return () => { this.#listeners.delete(callback); };
  }
}

/**
 * Creates a new store with the given initial value.
 * 
 * @param initialValue - The initial value to be stored.
 * @returns {Store<T>} A new store instance.
 *
 * @example
 * const counterStore = createStore(0);
 */
export const createStore = <T extends unknown = any>(initialValue: T) => new Store(initialValue);

/**
 * A hook to subscribe to a store and select a slice of its state.
 * The component will re-render when the selected state changes.
 * 
 * @param store - The store instance to subscribe to.
 * @param selector - A function to select a part of the store's state. Defaults to the entire state.
 * @param equal - A function to compare selected values for equality. Defaults to deep equality.
 * @returns The selected slice of the store's state.
 *
 * @example
 * const count = useStore(counterStore);
 *
 * @example
 * // Using a selector
 * const userName = useStore(userStore, user => user.name);
 */
export const useStore = <T extends unknown = any, S = T>(
  store: Store<T>,
  selector: (state: T) => S = v => v as any,
  equal: (value: S, other: S) => boolean = _.isEqual,
): S => useSyncExternalStore(
  (onStoreChange) => store.subscribe((oldVal, newVal) => {
    if (equal(selector(oldVal), selector(newVal))) onStoreChange();
  }),
  () => selector(store.value)
);
