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
import { ComponentNode, NativeElementType } from '../types/component';
import { uniqueId } from '../utils';
import { Context, isContext } from '../hooks/context';
import { PropsProvider } from '../types/props';
import { ErrorBoundary } from '../types/error';
import { _Renderer } from '../renderer';
import { myersSync } from 'myers.js';
import { equalDeps, equalProps } from './utils';

type VNodeState = {
  hook: string;
  deps: any;
  data?: any;
  mount?: () => () => void;
};

export class UpdateManager {

  /** @internal */
  _dirty: Set<VNode>[] = [];

  /** @internal */
  _remount: Set<VNode>[] = [];

  /** @internal */
  _removed: Set<VNode> = new Set();

  /** @internal */
  private _refresh: (x: UpdateManager, force: boolean) => Promise<void>;

  constructor(refresh: (x: UpdateManager, force: boolean) => Promise<void>) {
    this._refresh = refresh;
  }

  async refresh(force: boolean = false) {
    await this._refresh(this, force);
  }

  _setDirty(node: VNode) {
    if (!this._dirty[node._level]) this._dirty[node._level] = new Set();
    this._dirty[node._level].add(node);
  }

  setDirty(node: VNode) {
    this._setDirty(node);
    this.refresh();
  }

  remount(node: VNode) {
    if (!this._remount[node._level]) this._remount[node._level] = new Set();
    this._remount[node._level].add(node);
  }

  removed(node: VNode) {
    this._removed.add(node);
  }

  get isDirty() {
    return this._dirty.some(x => !!x.size) || this._remount.some(x => !!x.size);
  }
}

export class VNode {

  /** @internal */
  _component: ComponentNode;

  private _id = uniqueId();

  private _error?: any;
  private _children: (VNode | string)[] = [];

  /** @internal */
  _state?: VNodeState[];

  /** @internal */
  _content_listeners: Set<VNode> = new Set();
  private _content_value?: any;

  /** @internal */
  _context: Set<VNode> = new Set();

  /** @internal */
  _parent?: VNode;

  /** @internal */
  _nativeParent?: VNode;

  /** @internal */
  _level = 0;

  /** @internal */
  constructor(component: ComponentNode) {
    this._component = component;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._component.type;
  }

  get props() {
    return this._component.props;
  }

  get key() {
    return this._component.key;
  }

  get children() {
    return this._children;
  }

  get error() {
    return this._error;
  }

  get stack() {
    let node: VNode | undefined = this;
    return (function* () {
      while (node) {
        yield node;
        node = node._parent;
      }
    })();
  }

  /** @internal */
  async _render(event: UpdateManager, renderer: _Renderer<any>) {
    try {
      const { type } = this._component;
      const props = this._resolve_props();
      let children: (VNode | string)[];
      let native = this._nativeParent;
      if (_.isString(type) || type?.prototype instanceof NativeElementType) {
        children = this._resolve_children(props.children, event);
        event.remount(this);
        native = this;
      } else if (isContext(type)) {
        const { value } = props;
        if (!equalDeps(this._content_value, value)) {
          for (const node of this._content_listeners) {
            event.setDirty(node);
          }
        }
        this._content_value = value;
        children = this._resolve_children(type(props as any), event);
      } else if (_.isFunction(type)) {
        while (true) {
          const state = new HookState(this, event, renderer);
          reconciler._currentHookState = state;
          const rendered = type(props);
          for (const node of this._context.difference(state.context)) {
            node._content_listeners.delete(this);
          }
          for (const node of state.context.difference(this._context)) {
            node._content_listeners.add(this);
          }
          this._state = state.state;
          this._context = state.context;
          if (_.isEmpty(state.tasks)) {
            children = this._resolve_children(rendered, event);
            break;
          }
          await Promise.all(state.tasks);
        }
        event.remount(this);
      } else {
        throw Error(`Invalid node type ${type}`);
      }
      const diff = myersSync(this._children, children, {
        compare: (lhs, rhs) => {
          if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
          if (lhs instanceof VNode && rhs instanceof VNode) return lhs._component.equalType(rhs._component);
          return false;
        },
      });
      this._children = _.flatMap(diff, x => x.equivalent ?? x.insert ?? []);
      this._error = undefined;
      for (const [lhs, rhs] of _.zip(this._children, children)) {
        if (!(lhs instanceof VNode) || !(rhs instanceof VNode)) continue;
        if (lhs === rhs) {
          event.setDirty(lhs);
        } else {
          if (!equalProps(lhs.props, rhs.props)) event.setDirty(lhs);
          lhs._component = rhs._component;
        }
        lhs._parent = this;
        lhs._nativeParent = native;
        lhs._level = this._level + 1;
      }
      for (const removed of _.flatMap(diff, x => x.remove ?? [])) {
        if (removed instanceof VNode) {
          event.removed(removed);
        }
      }
      if (_.some(diff, x => !x.equivalent)) {
        this._children_updated(event);
      }
    } catch (error) {
      this._children = [];
      this._error = error;
      (async () => {
        try {
          const { onError, silent } = this._resolve_error_boundary() ?? {};
          if (!silent) console.error(error);
          if (_.isFunction(onError)) await onError(error, this._component, this.stack.map(x => x._component));
        } catch (e) {
          console.error(e);
        }
      })();
      this._children_updated(event);
    } finally {
      reconciler._currentHookState = undefined;
    }
  }

  private _children_updated(event: UpdateManager) {
    const node = this._nativeParent;
    if (node && node !== this) event.remount(node);
  }

  private _resolve_props() {
    const self = this;
    const { type, props: _props } = this._component;
    if (type === PropsProvider) return _props;
    let props = { ..._props };
    for (const node of this.stack.drop(1)) {
      if (node.type === PropsProvider) {
        props = node.props.callback({ type, props });
      }
    }
    return _.mapValues(props, (v, k) => _.isFunction(v) ? function (this: any, ...args: any[]) {
      const current = self._component.props[k];
      return _.isFunction(current) ? current.call(this, ...args) : v.call(this, ...args);
    } : v);
  }

  private _resolve_children(child: any, event: UpdateManager): (VNode | string)[] {
    if (_.isBoolean(child) || _.isNil(child)) return [];
    if (_.isString(child)) return [child];
    if (_.isNumber(child)) return [`${child}`];
    if (child instanceof ComponentNode) return [new VNode(child)];
    if (_.isArrayLikeObject(child)) return _.flatMap(child, x => this._resolve_children(x, event));
    if (typeof child[Symbol.iterator] === 'function') return _.flatMap([...child], x => this._resolve_children(x, event));
    throw Error(`${child} are not valid as a child.`);
  }

  private _resolve_error_boundary() {
    return this.stack.drop(1).find(node => node.type === ErrorBoundary)?.props;
  }
}

class HookState {

  node: VNode;
  event: UpdateManager;
  renderer: _Renderer<any>;

  state: VNodeState[] = [];
  tasks: PromiseLike<void>[] = [];
  context: Set<VNode> = new Set();

  constructor(
    node: VNode,
    event: UpdateManager,
    renderer: _Renderer<any>,
  ) {
    this.node = node;
    this.event = event;
    this.renderer = renderer;
  }

  get prevState() {
    return this.node._state;
  }

  get stack() {
    const [, ...stack] = this.node.stack;
    return stack;
  }

  setDirty() {
    this.event.setDirty(this.node);
  }

  resolveContextNode(context: Context<any>) {
    return this.stack.find(node => node.type === context);
  }
}

export const reconciler = new class {

  /** @internal */
  _registry = new WeakMap<any, string>();

  /** @internal */
  _currentHookState?: HookState;

  get currentHookState() {
    return this._currentHookState;
  }
};
