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
import { ComponentNode, NativeElementType } from '../types/component';
import { Context, isContext } from '../hooks/context';
import { reconciler } from './state';
import { myersSync } from 'myers.js';
import { EventEmitter } from './events';
import { equalDeps } from './utils';
import { _Renderer } from '../renderer';
import { PropsType } from '../types/runtime';
import { uniqueId } from '../utils';

export type VNodeState = {
  hook: string;
  deps: any;
  data?: any;
  mount?: () => () => void;
};

export type _ContextState = {
  value: any;
  state: string;
  node: VNode;
};

export class VNode {

  /** @internal */
  _component: ComponentNode;

  private _id = uniqueId();

  private _event: EventEmitter;
  private _props: PropsType = {};
  private _error?: any;
  private _children: (VNode | string)[] = [];
  private _state?: VNodeState[];
  private _dirty = true;
  private _listens = new Map<Context<any>, Omit<_ContextState, 'value'>>();

  /** @internal */
  _content_state = uniqueId();
  private _content_value?: any;

  /** @internal */
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

  get id() {
    return this._id;
  }

  get type() {
    return this._component.type;
  }

  get props() {
    return this._props;
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

  get error() {
    return this._error;
  }

  /** @internal */
  _setDirty() {
    this._dirty = true;
    this._event.emit('onchange');
  }

  /** @internal */
  private _check_context(values: Map<Context<any>, Omit<_ContextState, 'value'>>) {
    return this._listens.entries().every(([k, v]) => {
      const { state, node } = values.get(k) ?? {};
      return state === v.state && node === v.node;
    });
  }

  /** @internal */
  _updateIfNeed(options: {
    renderer: _Renderer<any>;
    stack: VNode[];
    propsProvider: VNode[];
    errorBoundary?: VNode;
    contextValue: Map<Context<any>, _ContextState>;
  }) {
    if (!this._dirty && this._check_context(options.contextValue)) return false;
    try {
      const { type, props: _props } = this._component;
      const props = options.propsProvider.reduceRight((p, node) => node.props.callback({ type, props: p }), _props);
      let children: (VNode | string)[];
      if (_.isString(type) || type.prototype instanceof NativeElementType) {
        children = this._resolve_children(props.children);
      } else if (isContext(type)) {
        const { value } = props;
        if (!equalDeps(this._content_value, value)) this._content_state = uniqueId();
        this._content_value = value;
        children = this._resolve_children(type(props as any));
      } else if (_.isFunction(type)) {
        const { rendered, state } = reconciler.withHookState({
          renderer: options.renderer,
          node: this,
          state: this._state,
          stack: options.stack,
          contextValue: options.contextValue,
        }, (state) => ({ rendered: type(props), state }));
        this._state = state.state;
        this._listens = new Map(options.contextValue.entries().filter(([k]) => state.listens.has(k)));
        children = this._resolve_children(rendered);
      } else {
        throw Error(`Invalid node type ${type}`);
      }
      const diff = myersSync(this._children, children, {
        compare: (lhs, rhs) => {
          if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
          if (lhs instanceof VNode && rhs instanceof VNode) return lhs._component._equal(rhs._component);
          return false;
        },
      });
      this._props = _.omit(props, 'children');
      this._children = _.flatMap(diff, x => x.equivalent ?? x.insert ?? []);
      this._error = undefined;
      for (const [i, item] of this._children.entries()) {
        if (!(item instanceof VNode)) continue;
        if (!(children[i] instanceof VNode)) continue;
        if (!equalDeps(item._component.props, children[i]._component.props)) item._dirty = true;
        item._component = children[i]._component;
      }
    } catch (error) {
      this._props = {};
      this._children = [];
      this._error = error;
      (async () => {
        try {
          const { onError, silent } = options.errorBoundary?.props ?? {};
          if (!silent) console.error(error);
          if (_.isFunction(onError)) await onError(error, this._component, _.map(options.stack, x => x._component));
        } catch (e) {
          console.error(e);
        }
      })();
    } finally {
      this._dirty = false;
    }
    return true;
  }
}
