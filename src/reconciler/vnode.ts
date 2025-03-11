import _ from 'lodash';
import { ComponentNode } from '~/common/types/component';
import { Context } from '~/common/types/context';
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

  /** @internal */
  _component: ComponentNode;

  /** @internal */
  _event: EventEmitter;

  /** @internal */
  _children: (VNode | string)[] = [];

  /** @internal */
  _state?: VNodeState[];

  /** @internal */
  _dirty = true;

  /** @internal */
  _counter = 0;

  /** @internal */
  _listens = new Map<Context<any>, any>();

  constructor(component: ComponentNode, event: EventEmitter) {
    this._component = component;
    this._event = event;
  }

  /** @internal */
  _resolve_children(child: any): (VNode | string)[] {
    if (_.isBoolean(child) || _.isNil(child)) return [];
    if (_.isString(child)) return [child];
    if (_.isNumber(child)) return [`${child}`];
    if (_.isArrayLikeObject(child)) return _.flatMap(child, x => this._resolve_children(x));
    if (child instanceof ComponentNode) return [new VNode(child, this._event)];
    throw Error(`${child} are not valid as a child.`);
  }

  get component() {
    return this._component;
  }

  get children() {
    return this._children;
  }

  get dirty() {
    return this._dirty;
  }

  setDirty() {
    this._dirty = true;
    this._counter += 1;
    this._event.emit('onchange');
  }

  updateIfNeed(options: {
    contextValue: Map<Context<any>, any>;
  }) {
    if (this._listens.entries().every(([k, v]) => _.isEqual(options.contextValue.get(k), v)) && !this._dirty) return;
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
    } finally {
      this._dirty = false;
    }
  }
}
