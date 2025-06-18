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
import { ClassName, StyleProp } from './style';
import { _CSSProperties, CSSProperties } from '../web/styles/css';
import { globalEvents } from '../web/event';
import { ComponentNode, NativeElementType } from './component';
import { _HTMLElementTagNameMap, _MathMLElementTagNameMap, _SVGElementTagNameMap } from '../web/props';

export type _ElementType = string | ComponentType<any>;

export type _IntrinsicAttributes = {
  key?: string | number;
};

export type PropsType = Record<string, any>;

type EventHandler<E extends Event, C, T = EventTarget> = (event: E & {
  currentTarget: C;
  target: T;
 }) => void;
type EventMap = {
  [ev in typeof globalEvents[number]]: ev extends `on${infer x}`
  ? Lowercase<x> extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[Lowercase<x>] : Event
  : never;
};

type _PropsOfInstance<Instance> = Omit<
  PickType<{
    [k in WritableKeys<Instance>]: Instance[k];
  }, boolean | number | string | null | undefined>,
  'className' | 'style' | 'innerText' | 'outerText' | 'outerHTML' | 'nodeValue'
> & {
  [x in keyof EventMap]?: EventHandler<EventMap[x], Instance>;
} & {
  [x in keyof EventMap as `${x}Capture`]?: EventHandler<EventMap[x], Instance>;
};

type Combine<T, R> = Omit<T, keyof R> & R;

type _ElementProps<ElementMap extends { [x: string]: { type: any; props?: any; } }> = {
  [x in keyof ElementMap]: PropsWithChildren<
    Partial<
      RefAttribute<ElementMap[x]['type'] | null | undefined>
      & {
        className?: ClassName;
        style?: StyleProp<CSSProperties>;
        inlineStyle?: _CSSProperties;
      }
      & Combine<ElementMap[x]['props'], _PropsOfInstance<ElementMap[x]['type']>>
    >
  >
};

export type _IntrinsicElements = MergeObject<
  | _ElementProps<_HTMLElementTagNameMap>
  | _ElementProps<_SVGElementTagNameMap>
  | _ElementProps<_MathMLElementTagNameMap>
> & { [x: string]: any; };

export const _createElement = (
  type: _ElementType | typeof NativeElementType,
  props: PropsType
) => {
  const { key, ..._props } = props;
  return new ComponentNode(type, _props, key);
}

export const createElement = (
  type: _ElementType,
  props?: PropsType | null,
  ...children: ElementNode[]
) => _createElement(type, { ...props ?? {}, children });
