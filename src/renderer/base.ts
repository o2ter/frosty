//
//  base.ts
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
import { VNode } from '../reconciler/vnode';
import { ComponentNode } from '../common/types/component';
import { reconciler } from '../reconciler/state';
import nextick from 'nextick';
import { mergeRefs } from '~/common/utils';

interface _Element<C extends _Element<C>> {

  children: Iterable<C>;

  parentElement: C | null;

  appendChild<T extends C>(node: T): T;

  remove(): void;
}

export abstract class _Renderer<T extends _Element<T>> {

  /** @internal */
  abstract _createElement(node: VNode): T;

  /** @internal */
  abstract _updateElement(node: VNode, element: T): void;

  private _createRoot(root: T, component: ComponentNode) {

    const runtime = reconciler.buildVNodes(component);

    type _State = {
      element?: T;
      state: {
        hook: string;
        deps: any;
        unmount?: () => void;
      }[];
    };

    let mountState = new Map<VNode, _State>();

    const children = (node: VNode): (string | T)[] => {
      return _.flatMap(node.children, x => _.isString(x) ? x : mountState.get(x)?.element ?? children(x));
    };

    const mount = (
      node: VNode,
      parent: T,
      nextState = new Map<VNode, _State>(),
    ) => {
      const element = mountState.get(node)?.element;
      if (element) mergeRefs(node.props.ref)(element);
      for (const item of node.children) {
        if (item instanceof VNode) mount(item, element ?? parent, nextState);
      }
      const state: _State['state'] = [];
      const prevState = mountState.get(node)?.state ?? [];
      const curState = node.state;
      for (const i of _.range(Math.max(prevState.length, curState.length))) {
        const unmount = prevState[i]?.unmount;
        if (unmount &&
          (!_.isEqual(prevState[i].hook, curState[i]?.hook) || !_.isEqual(prevState[i].deps, curState[i]?.deps))
        ) unmount();
        state.push({
          hook: curState[i].hook,
          deps: curState[i].deps,
          unmount: curState[i].mount?.(),
        });
      }
      nextState.set(node, { element, state });
      const _children = children(node);
      return nextState;
    };

    const update = () => {
      const updated = new Map<VNode, T>();
      for (const node of runtime.excute()) {
        if (_.isFunction(node.type)) continue;
        let elem = mountState.get(node)?.element;
        if (elem) {
          this._updateElement(node, elem);
        } else {
          elem = this._createElement(node);
        }
        updated.set(node, elem);
      }
      mountState = mount(runtime.node, root);
    };

    let update_count = 0;
    let render_count = 0;

    const listener = runtime.event.register('onchange', () => {
      if (render_count !== update_count++) return;
      nextick(() => {
        render_count = update_count;
        update();
      });
    });
    update();

    return {
      destory: () => {
        listener.remove();
      },
    };
  }

  createRoot(root: T) {
    let state: ReturnType<typeof this._createRoot> | undefined;
    return {
      mount: (component: ComponentNode) => {
        state = this._createRoot(root, component);
      },
      unmount: () => {
        for (const item of root.children) item.remove();
        state?.destory();
        state = undefined;
      },
    };
  }
}