//
//  props.ts
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
import { svgProps, htmlProps, ElementTagNameMap } from '../../../generated/elements';
import { OmitType } from '@o2ter/utils-js';

type _ElementTagNameMap<K extends keyof ElementTagNameMap> = ElementTagNameMap[K][keyof ElementTagNameMap[K]];
type _HTMLElementTagNameMap = _ElementTagNameMap<'html'>;
type _SVGElementTagNameMap = _ElementTagNameMap<'svg'>;
type _MathMLElementTagNameMap = _ElementTagNameMap<'mathml'>;

export const _propValue = {

  'DOMString': 'string',
  'SVGAnimatedTransformList': 'string',
  'SVGStringList': 'string',
  'SVGAnimatedRect': 'string',
  'SVGAnimatedPreserveAspectRatio': 'string',
  'SVGAnimatedString': 'string',
  'SVGPointList': 'string',
  'SVGAnimatedLengthList': 'string',
  'SVGAnimatedNumberList': 'string',
  'SVGAnimatedEnumeration': 'string',
  'USVString': 'string',
  'DOMTokenList': 'string',
  'TrustedHTML': 'string',
  'HTMLFormElement': 'string',
  'HTMLDataListElement': 'string',

  'SVGAnimatedLength': 'length',

  'SVGAnimatedNumber': 'number',
  'SVGAnimatedInteger': 'number',
  'unrestricted double': 'number',
  'double': 'number',
  'unsigned long': 'number',
  'long': 'number',

  'SVGAnimatedBoolean': 'boolean',
  'boolean': 'boolean',

} as const;

type _PropValue = {
  'string': string,
  'number': number,
  'length': number | string,
  'boolean': boolean,
};

export type ARIAMixin = {
  role: Element['role'];
} & OmitType<{
  [x in keyof Element]: x extends `aria${string}` ? Element[x] : never;
}, never>;

type MapPropValue<T> = T extends keyof typeof _propValue
  ? _PropValue[typeof _propValue[T]]
  : T extends readonly [infer S]
  ? MapPropValue<S>
  : T extends readonly [infer S, ...infer R]
  ? MapPropValue<S> | MapPropValue<R>
  : never;

export type HTMLElementTagNameMap = {
  [x in keyof _HTMLElementTagNameMap]: {
    type: _HTMLElementTagNameMap[x]['type'];
    props: OmitType<{
      -readonly [p in keyof typeof htmlProps['*']]: MapPropValue<typeof htmlProps['*'][p]['type']>;
    } & {
      -readonly [p in keyof typeof htmlProps[x]]: typeof htmlProps[x][p] extends { type: infer T } ? MapPropValue<T> : never;
    }, never>;
  };
};

export type SVGElementTagNameMap = {
  [x in keyof _SVGElementTagNameMap]: {
    type: _SVGElementTagNameMap[x]['type'];
    props: OmitType<{
      -readonly [p in keyof typeof svgProps['*']]: MapPropValue<typeof svgProps['*'][p]['type']>;
    } & {
      -readonly [p in keyof typeof svgProps[x]]: typeof svgProps[x][p] extends { type: infer T } ? MapPropValue<T> : never;
    }, never>;
  };
};

export type MathMLElementTagNameMap = {
  [x in keyof _MathMLElementTagNameMap]: {
    type: _MathMLElementTagNameMap[x]['type'];
  };
}
