//
//  vnode.ts
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
import { reconciler } from './state';
import { myersSync } from 'myers.js';
import { EventEmitter } from './events';

export type VNodeState = {
  hook: string;
  deps: any;
  data?: any;
  mount?: () => () => void;
};

export class VNode {

  private _component: ComponentNode;
  private _event: EventEmitter;
  private _children: (VNode | string)[] = [];
  private _state?: VNodeState[];
  private _dirty = true;
  private _listens = new Map<Context<any>, any>();

  constructor(component: ComponentNode, event: EventEmitter) {
    this._component = component;
    this._event = event;
  }

  /** @internal */
  _resolve_children(child: any): (VNode | string)[] {
    if (_.isBoolean(child) || _.isNil(child)) return [];
    if (_.isString(child)) return [child];
    if (_.isNumber(child)) return [`${child}`];
    if (child instanceof ComponentNode) return [new VNode(child, this._event)];
    if (_.isArrayLikeObject(child)) return _.flatMap(child, x => this._resolve_children(x));
    if (typeof child[Symbol.iterator] === 'function') return _.flatMap([...child], x => this._resolve_children(x));
    throw Error(`${child} are not valid as a child.`);
  }

  get component() {
    return this._component;
  }

  get type() {
    return this._component.type;
  }

  get props() {
    return _.omit(this._component.props, 'children');
  }

  get key() {
    return this._component.key;
  }

  get state() {
    return this._state ?? [];
  }

  get children() {
    return this._children;
  }

  setDirty() {
    this._dirty = true;
    this._event.emit('onchange');
  }

  _check_context(values: Map<Context<any>, any>) {
    return this._listens.entries().every(([k, v]) => _.isEqual(values.get(k), v));
  }

  updateIfNeed(options: {
    contextValue: Map<Context<any>, any>;
  }) {
    if (!this._dirty && this._check_context(options.contextValue)) return;
    try {
      const { type, props } = this._component;
      let children: (VNode | string)[];
      if (_.isFunction(type)) {
        const { rendered, state } = reconciler.withHookState({
          state: this._state,
          contextValue: options.contextValue,
          onStateChange: () => { this.setDirty(); },
        }, (state) => ({ rendered: type(props), state }));
        this._state = state.state;
        this._listens = new Map(options.contextValue.entries().filter(([k]) => state.listens.has(k)));
        children = this._resolve_children(rendered);
      } else {
        children = this._resolve_children(props.children);
      }
      const diff = myersSync(this._children, children, {
        compare: (lhs, rhs) => {
          if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
          if (lhs instanceof VNode && rhs instanceof VNode) return lhs.component._equal(rhs.component);
          return false;
        },
      });
      this._children = _.flatMap(diff, x => x.equivalent ?? x.insert ?? []);
      for (const [i, item] of this._children.entries()) {
        if (!(item instanceof VNode)) continue;
        if (!(children[i] instanceof VNode)) continue;
        if (!_.isEqual(item.component.props, children[i].component.props)) item._dirty = true;
        item._component = children[i]._component;
      }
    } finally {
      this._dirty = false;
    }
  }
}
