//
//  pairs.ts
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

import _ from "lodash";
import { PropsWithChildren } from "../types/common";
import { NativeElementType } from "../types/component";
import { _createElement } from "../types/runtime";

export abstract class _ParentComponent extends NativeElementType {
  abstract isChildNode(child: any): boolean;
}

export abstract class _ChildComponent extends NativeElementType {
}

export const createPairs = ({ allowTextChildren }: {
  allowTextChildren?: boolean;
} = {}) => {
  class ChildComponent extends _ChildComponent {
  }
  class ParentComponent extends _ParentComponent {
    isChildNode(child: any) {
      if (allowTextChildren && _.isString(child)) return true;
      return child instanceof ChildComponent;
    }
  }
  return {
    Parent: ({ children }: PropsWithChildren<{}>) => _createElement(ParentComponent, { children }),
    Child: ({ children }: PropsWithChildren<{}>) => _createElement(ChildComponent, { children }),
  }
}
