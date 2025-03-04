import _ from 'lodash';
import { ComponentNode } from '~/common/types/component';
import { Context } from '~/common/types/context';
import { reconciler } from './state';

export type VNodeState = {
  id: string;
  hook: string;
  deps: any;
  data?: any;
  mount?: () => () => void;
  unmount?: () => void;
};

export class VNode {

  _component: ComponentNode;

  _parent?: VNode;
  _children: (VNode | string)[] = [];

  _state?: VNodeState[];
  _dirty = true;

  _listens = new WeakSet<Context<any>>();

  constructor(component: ComponentNode) {
    this._component = component;
  }

  static _resolve_children(child: any): (VNode | string)[] {
    if (_.isBoolean(child) || _.isNil(child)) return [];
    if (_.isString(child)) return [child];
    if (_.isNumber(child)) return [`${child}`];
    if (_.isArrayLikeObject(child)) return _.flatMap(child, x => this._resolve_children(x));
    if (child instanceof ComponentNode) return [new VNode(child)];
    throw Error(`${child} are not valid as a child.`);
  }

  updateIfNeed() {
    if (!this._dirty) return;
    try {
      const { type, props } = this._component;
      if (_.isFunction(type)) {
        const { rendered, state } = reconciler.withHookState({
          onStateChange: () => { this._dirty = true; },
          state: this._state,
        }, (state) => ({ rendered: type(props), state }));
        this._state = state.newState;
        this._listens = state.listens;
        this._children = VNode._resolve_children(rendered);
      } else {
        this._children = VNode._resolve_children(props.children);
      }
      for (const item of this._children) {
        if (item instanceof VNode) item._parent = this;
      }
    } finally {
      this._dirty = false;
    }
  }
}
