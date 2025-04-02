//
//  style.ts
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
import { CSSProperties } from '../core/web/styles/css';
import { processCss } from '../core/web/styles/process';

type Rule = {
  name: string;
  style: CSSProperties;
  _style: string;
};

export class StyleBuilder {

  private _registry: Rule[] = [];

  private _cache?: Rule[];
  private _cached_css?: string;

  get registry() {
    return this._registry;
  }

  set registry(value: Rule[]) {
    this._registry = value;
    if (!_.isEqual(this._registry, this._cache)) {
      this.clearCache();
    }
  }

  clearCache() {
    this._cache = undefined;
    this._cached_css = undefined;
  }

  get css() {
    if (this._cached_css) return this._cached_css;
    const _style: any = {};
    for (const { name, style } of this.registry) {
      const keyframes = style['@keyframes'];
      const animationName = keyframes ? `__a_${_.uniqueId()}` : undefined;
      _style[`.${name}`] = {
        ..._.omit(style, '@keyframes'),
        ...animationName ? { animationName } : {},
      };
      if (animationName) {
        _style[`@keyframes ${animationName}`] = keyframes;
      }
    }
    const { css } = processCss(_style);
    this._cached_css = css;
    return css;
  }

  select(names: string[]) {
    names = _.uniq(names);
    this.registry = _.filter(this.registry, x => _.includes(names, x.name));
  }

  get isEmpty() {
    return _.isEmpty(this.registry);
  }

  buildStyle(styles: CSSProperties[]) {
    const className: string[] = [];
    let searchIdx = 0;
    for (const style of styles) {
      const _style = JSON.stringify(style);
      const found = _.findIndex(this.registry, x => x._style === _style, searchIdx);
      searchIdx = found === -1 ? this.registry.length : found;
      if (found === -1) {
        const name = `__v_${_.uniqueId()}`;
        this.registry.push({ name, style, _style });
        this.clearCache();
        className.push(name);
      } else {
        className.push(this.registry[found].name);
      }
    }
    return className;
  }
}
