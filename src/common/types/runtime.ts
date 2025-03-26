//
//  basic.ts
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

import { MergeObject, PickType, WritableKeys } from '@o2ter/utils-js';
import { ComponentType, ElementNode, PropsWithChildren, RefAttribute } from './common';
import { ClassName, StyleProp } from '../styles/types';
import { CSSProperties, SVGProperties } from '../web/css';
import { globalEventHandlersEventMap } from '../web/event';
import { ComponentNode, NativeElementType } from './component';
import { HTMLElementTagNameMap, MathMLElementTagNameMap, SVGElementTagNameMap } from '../web/props';

export type _ElementType = string | ComponentType<any>;

export type _IntrinsicAttributes<T = any> = RefAttribute<T> & {
  key?: string | number;
};

type _ElementProps<ElementMap extends { [x: string]: { type: any; props?: any; } }, Style> = {
  [x in keyof ElementMap]: PropsWithChildren<
    Partial<
      RefAttribute<ElementMap[x]['type']>
      & {
        className?: ClassName;
        style?: StyleProp<Style>;
      }
      & ElementMap[x]['props']
      & typeof globalEventHandlersEventMap>
  >
};

export type _IntrinsicElements = MergeObject<
  | _ElementProps<HTMLElementTagNameMap, CSSProperties>
  | _ElementProps<SVGElementTagNameMap, SVGProperties>
  | _ElementProps<MathMLElementTagNameMap, CSSProperties>
  > & { [x: string]: any; };

export const _createElement = (
  type: _ElementType | NativeElementType,
  props: Record<string, any>
) => {
  const { key, ..._props } = props;
  return new ComponentNode(type, _props, key);
}

export const createElement = (
  type: _ElementType,
  props?: Record<string, any> | null,
  ...children: ElementNode[]
) => _createElement(type, { ...props ?? {}, children });
