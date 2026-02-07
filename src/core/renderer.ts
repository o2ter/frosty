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
import { UpdateManager, VNode } from './reconciler';
import { ComponentNode } from './types/component';
import { equalDeps } from './reconciler/utils';
import { _ParentComponent } from './components/pairs';

export abstract class _Renderer<T> {

  protected abstract _beforeUpdate(): void;

  protected abstract _afterUpdate(): void;

  protected abstract _createElement(node: VNode, stack: VNode[]): T;

  protected abstract _updateElement(node: VNode, element: T, children: (T | string)[], stack: VNode[], force?: boolean): void;

  protected abstract _destroyElement(node: VNode, element: T): void;

  abstract get _server(): boolean;

  private _renderStorage = new Map<any, any>();

  get renderStorage() {
    return this._renderStorage;
  }

  private async _createRoot(
    root: T | null,
    component: ComponentNode,
    options?: {
      skipMount?: boolean;
    },
  ) {

    type MountState = {
      hook: string;
      deps: any;
      unmount?: () => void;
    };

    const elements = new Map<VNode, T>();
    const mountState = new Map<VNode, MountState[]>();

    const childrenDeep = function* (node: VNode): Iterable<VNode> {
      for (const child of node.children) {
        if (child instanceof VNode) {
          yield child;
          yield* childrenDeep(child);
        }
      }
    };

    const nativeChildren = function* (node: VNode, filter?: (x: string | VNode) => boolean): Iterable<T | string> {
      for (const child of node.children) {
        if (filter && !filter(child)) continue;
        if (_.isString(child)) {
          yield child;
        } else {
          const element = elements.get(child);
          if (element instanceof _ParentComponent) {
            yield* nativeChildren(child, x => element.isChildNode(x));
          } else if (element) {
            yield element;
          } else {
            yield* nativeChildren(child);
          }
        }
      }
    }

    const unmount = (nodes: Iterable<VNode>) => {
      for (const node of nodes) {
        for (const item of [node, ...childrenDeep(node)]) {
          const element = elements.get(item);
          if (element) {
            const state = mountState.get(item) ?? [];
            for (const { unmount } of state) {
              if (unmount) {
                try {
                  unmount();
                } catch (e) {
                  console.error(e);
                }
              }
            }
            try {
              this._destroyElement(item, element);
            } catch (e) {
              console.error(e);
            }
            elements.delete(item);
          }
        }
      }
    };

    const event = new UpdateManager(async () => {

      try {
        this._beforeUpdate();
      } catch (e) {
        console.error(e);
      }

      let updated = new Set<VNode>();
      while (true) {
        const dirty = event.dirty.difference(updated);
        if (dirty.size === 0) break;
        for (const node of _.sortBy([...dirty], x => x._level)) {
          await node._render(event, this);
          updated.add(node);
        }
      }

      for (const node of _.sortBy([...event.remount], x => -x._level)) {
        if (_.isFunction(node.type) && node.type.prototype instanceof _ParentComponent) {
          let elem: any = elements?.get(node);
          if (!elem) {
            const Component = node.type as any;
            elem = new Component();
          }
          elements.set(node, elem);
          continue;
        }
        const element = elements.get(node) ?? this._createElement(node, [...node.stack]);
        try {
          this._updateElement(node, element, [...nativeChildren(node)], [...node.stack], false);
        } catch (e) {
          console.error(e);
        }
        const state: MountState[] = [];
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
      event.remount.clear();

      unmount(event.removed);
      event.removed.clear();

      try {
        this._afterUpdate();
      } catch (e) {
        console.error(e);
      }

    });

    const rootNode = new VNode(component);
    await rootNode._render(event, this);

    return {
      get root() {
        if (root) return root;
        const elems = _.castArray(elements.get(rootNode) ?? [...nativeChildren(rootNode)]);
        const nodes = _.filter(elems, x => !_.isString(x)) as T[];
        return nodes.length === 1 ? nodes[0] : nodes;
      },
      destroy: () => {
        if (root) this._updateElement(rootNode, root, [], [], true);
        unmount(elements.keys());
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