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
import { _ContextState, VNode, VNodeState } from './vnode';
import { EventEmitter } from './events';

class HookState {

  server: boolean;

  contextValue: Map<Context<any>, _ContextState>;
  prevState?: VNodeState[];
  state: VNodeState[] = [];
  stack: VNode[] = [];
  node?: VNode;

  listens = new WeakSet<Context<any>>();

  constructor(options: {
    server: boolean;
    node: VNode;
    stack: VNode[];
    state?: VNodeState[];
    contextValue: Map<Context<any>, _ContextState>;
  }) {
    this.server = options.server;
    this.node = options.node;
    this.stack = options.stack;
    this.prevState = options.state;
    this.contextValue = options.contextValue ?? new Map();
  }
}

export const reconciler = new class {

  /** @internal */
  _registry = new WeakMap<any, string>();

  /** @internal */
  _contextDefaultValue = new Map<Context<any>, any>();

  /** @internal */
  _currentHookState: HookState | undefined;

  get contextDefaultValue() {
    return this._contextDefaultValue;
  }

  get currentHookState() {
    return this._currentHookState;
  }

  isContext(type: any): type is Context<any> {
    return _.isFunction(type) && this._contextDefaultValue.has(type as any);
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

  buildVNodes(component: ComponentNode, options: {
    server: boolean;
  }) {
    const event = new EventEmitter();
    const root = new VNode(component, event);
    const excute = function* () {
      const items: {
        node: VNode;
        stack: VNode[];
        contextValue: Map<Context<any>, _ContextState>;
      }[] = [{
        node: root,
        stack: [],
        contextValue: new Map(reconciler.contextDefaultValue.entries().map(([k, v]) => [k, { value: v, state: 0, node: root }])),
        }]; 
      let item;
      while (item = items.shift()) {

        const { node, stack, contextValue } = item;
        yield {
          node,
          stack,
          updated: node.updateIfNeed({
            server: options.server,
            stack,
            contextValue
          }),
        };

        let _contextValue = contextValue;
        if (reconciler.isContext(node.type)) {
          _contextValue = new Map(_contextValue);
          _contextValue.set(node.type, {
            value: node.props.value,
            state: node._content_state,
            node: node,
          });
        }

        const _stack = [...stack, node];
        for (const item of node.children) {
          if (item instanceof VNode) {
            items.push({
              node: item,
              stack: _stack,
              contextValue: _contextValue,
            });
          }
        }
      }
    };
    return { node: root, event, excute };
  }
};
