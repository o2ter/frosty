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
import { ClassNames, StyleProp } from '../styles/types';
import { CSSProperties } from './css';

export type PropMap<M extends Record<string, any>> = {
  [x in keyof M]?: M[x] extends PropValue<infer T, any> ? T : M[x];
};

export class PropValue<T, U = T> {

  _varify?: (x: any) => x is T;
  _encode?: (x: T) => U;

  constructor(options: {
    varify?: (x: any) => x is T,
    encode?: (x: T) => U,
  }) {
    this._varify = options.varify;
    this._encode = options.encode;
  }

  varify(x: any) {
    return this._varify ? this._varify(x) : true;
  }

  encode(x: T) {
    return this._encode?.(x);
  }

  /**
   * HTML attribute values
   */

  static string = new PropValue({
    varify: _.isString,
    encode: x => x,
  });
  static number = new PropValue({
    varify: _.isNumber,
    encode: x => x,
  });
  static boolean = new PropValue({
    varify: _.isBoolean,
    encode: x => x,
  });
  static style = new PropValue<StyleProp<PropMap<typeof CSSProperties>>>({});
  static className = new PropValue<ClassNames>({});

  static oneOf<T>(values: T[]) {
    return new PropValue({
      varify: (x): x is T => _.includes(values, x),
      encode: x => x,
    });
  }

  static any = new PropValue<any>({});

  /**
   * CSS values
   */

  static color = new PropValue({
    varify: _.isString,
    encode: x => x,
  });
}
