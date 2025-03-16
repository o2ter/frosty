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
import { ClassName, StyleProp } from '../common/styles/types';
import { CSSProperties } from './css';

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & {});

export type PropMap<M extends Record<string, any>> = {
  [x in keyof M]?: M[x] extends PropValue<infer T, any> ? T : M[x];
};

export class PropValue<T, U = T> {

  private _attr?: string;
  private _varify?: (x: any) => x is T;
  private _encode?: (x: T) => U;

  constructor(options: {
    attr: string,
    varify?: (x: any) => x is T,
    encode?: (x: T) => U,
  }) {
    this._attr = this.attr;
    this._varify = options.varify;
    this._encode = options.encode;
  }

  get attr() {
    return this._attr;
  }

  varify(x: any) {
    return this._varify ? this._varify(x) : true;
  }

  encode(x: any) {
    return this._encode ? this._encode(x) : x;
  }

  /**
   * HTML attribute values
   */

  static string = <T extends string>(opts: { attr: string }) => new PropValue<T>({
    ...opts,
    varify: (x): x is T => _.isString(x),
    encode: x => x,
  });
  static number = <T extends string>(opts: { attr: string }) => new PropValue<T>({
    ...opts,
    varify: (x): x is T => _.isNumber(x),
    encode: x => x,
  });
  static stringOrNumber = <T extends string | string>(opts: { attr: string }) => new PropValue<T>({
    ...opts,
    varify: (x): x is T => _.isString(x) || _.isNumber(x),
    encode: x => x,
  });
  static boolean = <T extends string>(opts: { attr: string }) => new PropValue<T>({
    ...opts,
    varify: (x): x is T => _.isBoolean(x),
    encode: x => x,
  });

  static function = <T extends Function = Function>(opts: { attr: string }) => new PropValue<T>({
    ...opts,
    varify: (x): x is T => _.isFunction(x),
    encode: x => x,
  });

  static className = () => new PropValue<ClassName>({ attr: 'class' });

  static oneOf = <T>(values: T[], opts: { attr: string }) => new PropValue({
    ...opts,
    varify: (x): x is T => _.includes(values, x),
    encode: x => x,
  });

  static crossOrigin = (opts: { attr: string }) => this.string<
    | ''
    | 'anonymous'
    | 'use-credentials'>(opts);
  static ariaRole = (opts: { attr: string }) => this.string<AriaRole>(opts);

  static any = (opts: { attr: string }) => new PropValue<any>({
    ...opts,
  });
}
