import _ from 'lodash';
import { ComponentNode } from '~/common/types/component';
import { Context } from '~/common/types/context';
import { reconciler } from './state';
import { myersSync } from 'myers.js';

export type VNodeState = {
  hook: string;
  deps: any;
  data?: any;
  mount?: () => () => void;
  unmount?: () => void;
};

export class VNode {

  /** @internal */
  _component: ComponentNode;

  /** @internal */
  _parent?: VNode;

  /** @internal */
  _children: (VNode | string)[] = [];

  /** @internal */
  _state?: VNodeState[];

  /** @internal */
  _dirty = true;

  /** @internal */
  _listens = new WeakSet<Context<any>>();

  constructor(component: ComponentNode) {
    this._component = component;
  }

  /** @internal */
  static _resolve_children(child: any): (VNode | string)[] {
    if (_.isBoolean(child) || _.isNil(child)) return [];
    if (_.isString(child)) return [child];
    if (_.isNumber(child)) return [`${child}`];
    if (_.isArrayLikeObject(child)) return _.flatMap(child, x => this._resolve_children(x));
    if (child instanceof ComponentNode) return [new VNode(child)];
    throw Error(`${child} are not valid as a child.`);
  }

  get component() {
    return this._component;
  }

  get parent() {
    return this._parent;
  }

  get children() {
    return this._children;
  }

  get dirty() {
    return this._dirty;
  }

  setDirty() {
    this._dirty = true;
  }

  destory() {
    for (const state of this._state ?? []) {
      state.unmount?.();
      state.unmount = undefined;
    }
  }

  updateIfNeed() {
    if (!this._dirty) return;
    try {
      const { type, props } = this._component;
      let children: (VNode | string)[];
      if (_.isFunction(type)) {
        const { rendered, state } = reconciler.withHookState({
          onStateChange: () => { this.setDirty(); },
          state: this._state,
        }, (state) => ({ rendered: type(props), state }));
        this._state = state.newState;
        this._listens = state.listens;
        children = VNode._resolve_children(rendered);
      } else {
        children = VNode._resolve_children(props.children);
      }
      const diff = myersSync(this._children, children, {
        compare: (lhs, rhs) => {
          if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
          if (lhs instanceof VNode && rhs instanceof VNode) return lhs.component._equal(rhs.component);
          return false;
        },
      });
      this._children = _.flatMap(diff, x => x.equivalent ?? x.insert ?? []);
      for (const { remove = [] } of diff) {
        for (const item of remove) {
          if (_.isString(item)) continue;
          item.destory();
        }
      }
      for (const item of this._children) {
        if (item instanceof VNode) item._parent = this;
      }
    } finally {
      this._dirty = false;
    }
  }
}
