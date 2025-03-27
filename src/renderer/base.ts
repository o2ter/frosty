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
import { mergeRefs } from '../common/utils';
import { equalDeps } from '../reconciler/utils';

export abstract class _Renderer<T> {

  /** @internal */
  abstract _createElement(node: VNode, stack: VNode[]): T;

  /** @internal */
  abstract _updateElement(node: VNode, element: T, stack: VNode[]): void;

  /** @internal */
  abstract _replaceChildren(node: VNode, element: T, children: (T | string)[]): void;

  /** @internal */
  abstract get _server(): boolean;

  private _createRoot(
    root: T | null,
    component: ComponentNode,
    options?: {
      skipMount?: boolean;
    },
  ) {

    const runtime = reconciler.buildVNodes(component, { server: this._server });

    type _State = {
      hook: string;
      deps: any;
      unmount?: () => void;
    };

    let elements = new Map<VNode, T>();
    const mountState = new Map<VNode, _State[]>();

    const children = (node: VNode): (string | T)[] => {
      return _.flatMap(node.children, x => _.isString(x) ? x : elements.get(x) ?? children(x));
    };

    const commit = (elements: Map<VNode, T>) => {

      const _mount = (
        node: VNode,
      ) => {
        const element = elements.get(node);
        if (element) mergeRefs(node.props.ref)(element);
        for (const item of node.children) {
          if (item instanceof VNode) _mount(item);
        }
        const state: _State[] = [];
        const prevState = mountState.get(node) ?? [];
        const curState = node.state;
        for (const i of _.range(Math.max(prevState.length, curState.length))) {
          const unmount = prevState[i]?.unmount;
          if (unmount &&
            (prevState[i].hook !== curState[i]?.hook || !equalDeps(prevState[i].deps, curState[i]?.deps))
          ) unmount();
          state.push({
            hook: curState[i].hook,
            deps: curState[i].deps,
            unmount: options?.skipMount ? undefined : curState[i].mount?.(),
          });
        }
        mountState.set(node, state);
        if (element) this._replaceChildren(node, element, children(node));
      };

      for (const [node, state] of mountState) {
        if (elements.has(node)) continue;
        for (const { unmount } of state) unmount?.();
        mountState.delete(node);
      }
      _mount(runtime.node);
      if (root) this._replaceChildren(runtime.node, root, _.castArray(elements.get(runtime.node) ?? children(runtime.node)));
    };

    const update = () => {
      const map = new Map<VNode, T>();
      for (const { node, stack, updated } of runtime.excute()) {
        if (_.isFunction(node.type)) continue;
        if (updated) {
          let elem = elements.get(node);
          if (elem) {
            this._updateElement(node, elem, stack);
          } else {
            elem = this._createElement(node, stack);
          }
          map.set(node, elem);
        } else {
          map.set(node, elements.get(node) ?? this._createElement(node, stack));
        }
      }
      elements = map;
    };

    let update_count = 0;
    let render_count = 0;
    let destroyed = false;

    const listener = runtime.event.register('onchange', () => {
      if (render_count !== update_count++) return;
      nextick(() => {
        if (destroyed) return;
        render_count = update_count;
        update();
        commit(elements);
      });
    });
    update();
    commit(elements);

    return {
      get root() {
        if (root) return root;
        const elems = _.castArray(elements.get(runtime.node) ?? children(runtime.node));
        const nodes = _.filter(elems, x => !_.isString(x)) as T[];
        return nodes.length === 1 ? nodes[0] : nodes;
      },
      destroy: () => {
        if (root) this._replaceChildren(runtime.node, root, []);
        destroyed = true;
        listener.remove();
        for (const state of mountState.values()) {
          for (const { unmount } of state) unmount?.();
        }
      },
    };
  }

  createRoot(root?: T) {
    let state: ReturnType<typeof this._createRoot> | undefined;
    return {
      get root() {
        return state?.root;
      },
      mount: (
        component: ComponentNode,
        options?: {
          skipMount?: boolean;
        },
      ) => {
        state = this._createRoot(root ?? null, component, options);
      },
      unmount: () => {
        state?.destroy();
        state = undefined;
      },
    };
  }
}