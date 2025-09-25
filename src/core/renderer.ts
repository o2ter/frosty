//
//  renderer.ts
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
import { VNode } from './reconciler/vnode';
import { ComponentNode, NativeElementType } from './types/component';
import { reconciler } from './reconciler/state';
import nextick from 'nextick';
import { equalDeps } from './reconciler/utils';
import { _ChildComponent, _ParentComponent } from './components/pairs';

export abstract class _Renderer<T> {

  protected abstract _beforeUpdate(): void;

  protected abstract _afterUpdate(): void;

  protected abstract _createElement(node: VNode, stack: VNode[]): T;

  protected abstract _updateElement(node: VNode, element: T, stack: VNode[]): void;

  protected abstract _destroyElement(node: VNode, element: T): void;

  protected abstract _replaceChildren(node: VNode, element: T, children: (T | string)[], stack: VNode[], force?: boolean): void;

  abstract get _server(): boolean;

  private async _createRoot(
    root: T | null,
    component: ComponentNode,
    options?: {
      skipMount?: boolean;
    },
  ) {

    const runtime = reconciler.buildVNodes(component, this);

    type _State = {
      hook: string;
      deps: any;
      unmount?: () => void;
    };

    const mountState = new Map<VNode, _State[]>();

    const children = (node: VNode, elements: Map<VNode, { native?: T }>): (string | T)[] => {
      return _.flatMap(node.children, x => {
        if (_.isString(x)) return x;
        if (_.isFunction(node.type) && (
          node.type.prototype instanceof _ParentComponent || node.type.prototype instanceof _ChildComponent
        )) {
          return x.children as (string | T)[];
        }
        return elements.get(x)?.native ?? children(x, elements);
      });
    };

    const commit = (elements: Map<VNode, { native?: T }>, force?: boolean) => {

      const _mount = (node: VNode, stack: VNode[]) => {
        for (const item of node.children) {
          if (item instanceof VNode) _mount(item, [...stack, node]);
        }
        const element = elements.get(node)?.native;
        if (element instanceof _ParentComponent || element instanceof _ChildComponent) {
          element._replaceChildren(children(node, elements));
        } else {
          if (element) {
            try {
              this._replaceChildren(node, element, children(node, elements), stack, force);
            } catch (e) {
              console.error(e);
            }
          }
          const state: _State[] = [];
          const prevState = mountState.get(node) ?? [];
          const curState = node.state;
          for (const i of _.range(Math.max(prevState.length, curState.length))) {
            const unmount = prevState[i]?.unmount;
            const changed = prevState[i]?.hook !== curState[i]?.hook || !equalDeps(prevState[i].deps, curState[i]?.deps);
            if (unmount && changed) {
              try {
                unmount();
              } catch (e) {
                console.error(e);
              }
            }
            state.push({
              hook: curState[i].hook,
              deps: curState[i].deps,
              unmount: options?.skipMount || !changed ? prevState[i]?.unmount : (() => {
                try {
                  return curState[i].mount?.();
                } catch (e) {
                  console.error(e);
                }
              })(),
            });
          }
          mountState.set(node, state);
        }
      };

      for (const [node, state] of mountState) {
        if (elements.has(node)) continue;
        for (const { unmount } of state) {
          try {
            unmount?.();
          } catch (e) {
            console.error(e);
          }
        }
        mountState.delete(node);
      }
      if (root) this._replaceChildren(
        runtime.node, root,
        _.castArray(elements.get(runtime.node)?.native ?? children(runtime.node, elements)),
        [],
        force,
      );
      _mount(runtime.node, []);
    };

    const update = async (elements?: Map<VNode, { native?: T }>, force?: boolean) => {
      try {
        this._beforeUpdate();
      } catch (e) {
        console.error(e);
      }
      const map = new Map<VNode, { native?: T }>();
      for await (const { node, stack, updated } of runtime.excute()) {
        if (node.error || !_.isFunction(node.type)) continue;
        if (!(node.type.prototype instanceof NativeElementType)) {
          map.set(node, {});
        // } else if (
        //   node.type.prototype instanceof _ParentComponent || node.type.prototype instanceof _ChildComponent
        // ) {
        //   let elem = elements?.get(node)?.native;
        //   if (!elem) {
        //     const Coponent = node.type as any;
        //     elem = new Coponent();
        //   }
        //   map.set(node, { native: elem });
        } else {
          try {
            if (updated) {
              let elem = elements?.get(node)?.native;
              if (elem) {
                this._updateElement(node, elem, stack);
              } else {
                elem = this._createElement(node, stack);
              }
              map.set(node, { native: elem });
            } else {
              map.set(node, { native: elements?.get(node)?.native ?? this._createElement(node, stack) });
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
      commit(map, force);
      if (elements) {
        for (const [node, element] of elements) {
          if (map.has(node) || !element.native) continue;
          try {
            this._destroyElement(node, element.native);
          } catch (e) {
            console.error(e);
          }
        }
      }
      try {
        this._afterUpdate();
      } catch (e) {
        console.error(e);
      }
      return map;
    };

    let update_count = 0;
    let render_count = 0;
    let destroyed = false;
    let elements = await update(undefined, true);

    const listener = runtime.event.register('onchange', () => {
      if (render_count !== update_count++) return;
      nextick(async () => {
        while (render_count !== update_count) {
          if (destroyed) return;
          const current = update_count;
          elements = await update(elements, false);
          render_count = current;
        }
      });
    });

    return {
      get root() {
        if (root) return root;
        const elems = _.castArray(elements.get(runtime.node)?.native ?? children(runtime.node, elements));
        const nodes = _.filter(elems, x => !_.isString(x)) as T[];
        return nodes.length === 1 ? nodes[0] : nodes;
      },
      destroy: () => {
        if (root) this._replaceChildren(runtime.node, root, [], [], true);
        destroyed = true;
        listener.remove();
        for (const state of mountState.values()) {
          for (const { unmount } of state) unmount?.();
        }
      },
    };
  }

  createRoot(root?: T) {
    let state: Awaited<ReturnType<typeof this._createRoot>> | undefined;
    return {
      get root() {
        return state?.root;
      },
      mount: async (
        component: ComponentNode,
        options?: {
          skipMount?: boolean;
        },
      ) => {
        state = await this._createRoot(root ?? null, component, options);
      },
      unmount: () => {
        state?.destroy();
        state = undefined;
      },
    };
  }
}