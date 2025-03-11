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

interface _Element<C extends _Element<C>> {

  children: Iterable<C>;

  appendChild<T extends C>(node: T): T;

  remove(): void;
}

export abstract class _Renderer<T extends _Element<T>> {

  abstract _createElement(node: VNode): T
  abstract _updateElement(node: VNode, element: T): void

  createRoot(root: T) {
    let state: ReturnType<typeof reconciler.buildVNodes> | undefined;
    let elements = new Map<VNode, T>();
    let mountState = new Map<VNode, { deps: any; hook: string; unmount?: () => void; }[]>();
    return {
      mount: (component: ComponentNode) => {
        state = reconciler.buildVNodes(component);
        const nodes = state.excute();
        const updated = new Map<VNode, T>();
        for (const node of nodes) {
          const elem = elements.get(node);
          if (elem) {
            this._updateElement(node, elem);
            updated.set(node, elem);
          } else if (!_.isFunction(node.component.type)) {
            updated.set(node, this._createElement(node));
          }
        }
        elements = updated;
      },
      unmount: () => {
        for (const item of root.children) item.remove();
        state = undefined;
      },
    };
  }
}