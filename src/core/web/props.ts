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
import { svgProps, htmlProps } from '../../../generated/elements';
import { OmitType } from '@o2ter/utils-js';

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

type MapPropValue<T> = T extends keyof typeof _propValue
  ? _PropValue[typeof _propValue[T]]
  : T extends readonly [infer S]
  ? MapPropValue<S>
  : T extends readonly [infer S, ...infer R]
  ? MapPropValue<S> | MapPropValue<R>
  : never;

type AllHTMLElementTagNameMap = HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap;

export type _HTMLElementTagNameMap = {
  [x in keyof AllHTMLElementTagNameMap]: {
    type: AllHTMLElementTagNameMap[x];
    props: OmitType<{
      -readonly [p in keyof typeof htmlProps['*']]: MapPropValue<typeof htmlProps['*'][p]['type']>;
    } & {
      -readonly [p in keyof typeof htmlProps[x]]: typeof htmlProps[x][p] extends { type: infer T } ? MapPropValue<T> : never;
    }, never>;
  };
};

export type _SVGElementTagNameMap = {
  [x in keyof SVGElementTagNameMap]: {
    type: SVGElementTagNameMap[x];
    props: OmitType<{
      -readonly [p in keyof typeof svgProps['*']]: MapPropValue<typeof svgProps['*'][p]['type']>;
    } & (x extends keyof typeof htmlProps ? {
      -readonly [p in keyof typeof htmlProps[x]]: typeof htmlProps[x][p] extends { type: infer T } ? MapPropValue<T> : never;
    } : {}) & (x extends keyof typeof svgProps ? {
      -readonly [p in keyof typeof svgProps[x]]: typeof svgProps[x][p] extends { type: infer T } ? MapPropValue<T> : never;
    } : {}), never>;
  };
};

export type _MathMLElementTagNameMap = {
  [x in keyof MathMLElementTagNameMap]: {
    type: MathMLElementTagNameMap[x];
  };
}
