//
//  index.ts
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

export const equalDeps = (lhs: any, rhs: any) => {
  if (lhs === rhs) return true;
  if (_.isArray(lhs) && _.isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;
    for (let i = 0; i < lhs.length; i++) {
      if (!equalDeps(lhs[i], rhs[i])) return false;
    }
    return true;
  }
  if (_.isPlainObject(lhs) && _.isPlainObject(rhs)) {
    const lkeys = _.keys(lhs);
    const rkeys = _.keys(rhs);
    if (lkeys.length !== rkeys.length) return false;
    for (const key of lkeys) {
      if (!equalDeps(lhs[key], rhs[key])) return false;
    }
    return true;
  }
  return false;
}

export const equalProps = (lhs: Record<string, any>, rhs: Record<string, any>) => {
  if (lhs === rhs) return true;
  const lkeys = _.keys(lhs);
  const rkeys = _.keys(rhs);
  if (lkeys.length !== rkeys.length) return false;
  for (const key of lkeys) {
    if (_.isFunction(lhs[key]) && _.isFunction(rhs[key])) continue;
    if (!equalDeps(lhs[key], rhs[key])) return false;
  }
  return true;
};
