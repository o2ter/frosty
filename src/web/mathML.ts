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
import { PropValue } from './props';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute
 */

const globalAttrs = {
  // Standard SVG Attributes
  id: PropValue.string({ attr: 'id' }),
};

export const MathMLElementTagNameMap = {
  "annotation": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "annotation-xml": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "maction": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "math": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "merror": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mfrac": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mi": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mmultiscripts": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mn": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mo": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mover": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mpadded": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mphantom": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mprescripts": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mroot": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mrow": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ms": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mspace": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "msqrt": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mstyle": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "msub": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "msubsup": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "msup": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mtable": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mtd": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mtext": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mtr": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "munder": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "munderover": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "semantics": {
    type: MathMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
} as const;
