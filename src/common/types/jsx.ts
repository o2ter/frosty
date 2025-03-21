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

import { MergeObject } from '@o2ter/utils-js';
import { ComponentType, PropsWithChildren, RefAttribute } from './basic';
import { ClassName, StyleProp } from '../styles/types';
import { CSSProperties, SVGProperties } from '../../web/css';
import { globalEventHandlersEventMap } from '../../web/event';
import { HTMLElementTagNameMap, MathMLElementTagNameMap, SVGElementTagNameMap } from '../../../generated/elements';

export type _ElementType = string | ComponentType;

export type _IntrinsicAttributes<T = any> = RefAttribute<T> & {
  key?: string | number;
};

type _ElementProps<ElementMap, Style> = {
  [x in keyof ElementMap]: PropsWithChildren<{
    className?: ClassName;
    style?: StyleProp<Style>;
    innerHTML?: string;
  } & RefAttribute<ElementMap[x]> & Partial<typeof globalEventHandlersEventMap>>
};

export type _IntrinsicElements = MergeObject<
  | _ElementProps<typeof HTMLElementTagNameMap, CSSProperties>
  | _ElementProps<typeof SVGElementTagNameMap, SVGProperties>
  | _ElementProps<typeof MathMLElementTagNameMap, CSSProperties>
> & { [x: string]: any; };
