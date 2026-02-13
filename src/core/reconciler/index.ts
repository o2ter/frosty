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
import { ComponentNode, NativeElementType } from '../types/component';
import { uniqueId } from '../utils';
import { Context, isContext } from '../hooks/context';
import { PropsProvider } from '../types/props';
import { ErrorBoundary } from '../types/error';
import { _Renderer } from '../renderer';
import { myersSync } from 'myers.js';
import { equalDeps, equalProps } from './utils';
import { PropsType } from '../types/runtime';
import { _ParentComponent } from '../components/pairs';

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
  private _refresh: (x: UpdateManager, force: boolean) => Promise<void>;

  constructor(refresh: (x: UpdateManager, force: boolean) => Promise<void>) {
    this._refresh = refresh;
  }

  async refresh(force: boolean = false) {
    await this._refresh(this, force);
  }

  _setDirty(node: VNode) {
    if (!this._dirty[node.level]) this._dirty[node.level] = new Set();
    this._dirty[node.level].add(node);
  }

  setDirty(node: VNode) {
    this._setDirty(node);
    this.refresh();
  }

  get isDirty() {
    return this._dirty.some(x => !!x.size);
  }
}

export class VNode {

  #component: ComponentNode;
  
  #id = uniqueId();
  #props: PropsType = {};
  #error?: any;
  #children: (VNode | string)[] = [];

  #state?: VNodeState[];

  #context: Set<VNode> = new Set();
  #content_listeners: Set<VNode> = new Set();
  #content_value?: any;

  #parent?: VNode;
  #nativeParent?: VNode;
  #level = 0;

  /** @internal */
  constructor(component: ComponentNode) {
    this.#component = component;
  }

  get id() {
    return this.#id;
  }

  /** @internal */
  get component() {
    return this.#component;
  }

  get type() {
    return this.#component.type;
  }

  get props() {
    return this.#props;
  }

  get key() {
    return this.#component.key;
  }

  /** @internal */
  get state() {
    return this.#state;
  }

  get children() {
    return this.#children;
  }

  get error() {
    return this.#error;
  }

  get parent() {
    return this.#parent;
  }

  get stack() {
    let node: VNode | undefined = this;
    return (function* () {
      while (node) {
        yield node;
        node = node.#parent;
      }
    })();
  }

  get level() {
    return this.#level;
  }

  /** @internal */
  async* _render(event: UpdateManager, renderer: _Renderer<any>) {

    const _resolve_props = () => {
      const self = this;
      const { type, props: _props } = this.#component;
      if (type === PropsProvider) return _props;
      let props = { ..._props };
      for (const node of this.stack.drop(1)) {
        if (node.type === PropsProvider) {
          props = node.props.callback({ type, props });
        }
      }
      return _.mapValues(props, (v, k) => _.isFunction(v) ? function (this: any, ...args: any[]) {
        const current = self.#component.props[k];
        return _.isFunction(current) ? current.call(this, ...args) : v.call(this, ...args);
      } : v);
    };

    const _resolve_children = (child: any): (VNode | string)[] => {
      if (_.isBoolean(child) || _.isNil(child)) return [];
      if (_.isString(child)) return [child];
      if (_.isNumber(child) || typeof child === 'bigint') return [`${child}`];
      if (child instanceof ComponentNode) return [new VNode(child)];
      if (_.isArrayLikeObject(child)) return _.flatMap(child, x => _resolve_children(x));
      if (typeof child[Symbol.iterator] === 'function') return _.flatMap([...child], x => _resolve_children(x));
      throw Error(`${child} are not valid as a child.`);
    };

    try {
      const { type } = this.#component;
      this.#props = _resolve_props();
      let children: (VNode | string)[];
      let native = this.#nativeParent;
      if (_.isString(type) || type?.prototype instanceof NativeElementType) {
        children = _resolve_children(this.#props.children);
        if (_.isString(type) || !(type?.prototype instanceof _ParentComponent)) {
          native = this;
        }
        yield { mount: this };
      } else if (isContext(type)) {
        const { value } = this.#props;
        if (!equalDeps(this.#content_value, value)) {
          for (const node of this.#content_listeners) {
            yield { dirty: node };
          }
        }
        this.#content_value = value;
        children = _resolve_children(type(this.#props as any));
      } else if (_.isFunction(type)) {
        while (true) {
          const state = new HookState(this, event, renderer);
          reconciler._currentHookState = state;
          const rendered = type(this.#props);
          for (const node of this.#context.difference(state.context)) {
            node.#content_listeners.delete(this);
          }
          for (const node of state.context.difference(this.#context)) {
            node.#content_listeners.add(this);
          }
          this.#state = state.state;
          this.#context = state.context;
          if (_.isEmpty(state.tasks)) {
            children = _resolve_children(rendered);
            break;
          }
          await Promise.all(state.tasks);
        }
        yield { mount: this };
      } else {
        throw Error(`Invalid node type ${type}`);
      }
      const diff = myersSync(this.#children, children, {
        compare: (lhs, rhs) => {
          if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
          if (lhs instanceof VNode && rhs instanceof VNode) return lhs.#component.equalType(rhs.#component);
          return false;
        },
      });
      this.#children = _.flatMap(diff, x => x.equivalent ?? x.insert ?? []);
      this.#error = undefined;
      for (const [lhs, rhs] of _.zip(this.#children, children)) {
        if (!(lhs instanceof VNode) || !(rhs instanceof VNode)) continue;
        if (_.isNil(lhs.#state)) {
          yield { dirty: lhs };
        } else if (!equalProps(lhs.#component.props, rhs.#component.props)) {
          yield { dirty: lhs };
        }
        lhs.#component = rhs.#component;
        lhs.#parent = this;
        lhs.#nativeParent = native;
        lhs.#level = this.#level + 1;
      }
      for (const item of _.flatMap(diff, x => x.remove ?? [])) {
        if (item instanceof VNode) yield { removed: item };
      }
      if (_.some(diff, x => !x.equivalent) && this.#nativeParent && this.#nativeParent !== this) {
        yield { mount: this.#nativeParent };
      }
    } catch (error) {
      for (const item of this.#children) {
        if (item instanceof VNode) yield { removed: item };
      }
      this.#children = [];
      this.#error = error;
      (async () => {
        try {
          const { onError, silent } = this.stack.drop(1).find(node => node.type === ErrorBoundary)?.props ?? {};
          if (!silent) console.error(error);
          if (_.isFunction(onError)) await onError(error, this.#component, this.stack.map(x => x.#component));
        } catch (e) {
          console.error(e);
        }
      })();
      yield { removed: this };
      if (this.#nativeParent && this.#nativeParent !== this) {
        yield { mount: this.#nativeParent };
      }
    } finally {
      reconciler._currentHookState = undefined;
    }
  }

  /** @internal */
  _release() {
    for (const context of this.#context) {
      context.#content_listeners.delete(this);
    }
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
    return this.node.state;
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
