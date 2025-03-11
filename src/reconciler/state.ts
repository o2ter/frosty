//
//  index.ts
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
import { ComponentNode } from '../common/types/component';
import { Context } from '../common/types/context';
import { VNode, VNodeState } from './vnode';
import { EventEmitter } from './events';

class HookState {

  contextValue = new WeakMap<Context<any>, any>();
  onStateChange: () => void;

  prevState?: VNodeState[];
  state: VNodeState[] = [];

  listens = new WeakSet<Context<any>>();

  constructor(options: {
    onStateChange: () => void;
    state?: VNodeState[];
  }) {
    this.onStateChange = options.onStateChange;
    this.prevState = options.state;
  }
}

export const reconciler = new class {

  /** @internal */
  _registry = new WeakMap<any, string>();

  /** @internal */
  _contextDefaultValue = new WeakMap<Context<any>, any>();

  /** @internal */
  _currentHookState: HookState | undefined;

  get registry() {
    return this._registry;
  }

  get contextDefaultValue() {
    return this._contextDefaultValue;
  }

  get currentHookState() {
    return this._currentHookState;
  }

  withHookState<R = void>(
    options: ConstructorParameters<typeof HookState>[0],
    callback: (state: HookState) => R,
  ) {
    try {
      const state = new HookState(options);
      reconciler._currentHookState = state;
      return callback(state);
    } finally {
      reconciler._currentHookState = undefined;
    }
  }

  buildVNodes(component: ComponentNode) {
    const event = new EventEmitter();
    const node = new VNode(component, event);
    const excute = function* () {
      node.updateIfNeed();
      yield node;
      const items = _.filter(node.children, x => x instanceof VNode);
      while (true) {
        const item = items.shift();
        if (!item) return;
        yield item;
        item.updateIfNeed();
        items.push(..._.filter(item.children, x => x instanceof VNode));
      }
    };
    return { node, event, excute };
  }
};
