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
 * Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */

const globalAttrs = {
  // Standard SVG Attributes
  className: PropValue.className(),
  id: PropValue.string(),
  style: PropValue.style(),
};

export const SVGElementTagNameMap = {
  "a": {
    type: SVGAElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "animate": {
    type: SVGAnimateElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "animateMotion": {
    type: SVGAnimateMotionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "animateTransform": {
    type: SVGAnimateTransformElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "circle": {
    type: SVGCircleElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "clipPath": {
    type: SVGClipPathElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "defs": {
    type: SVGDefsElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "desc": {
    type: SVGDescElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ellipse": {
    type: SVGEllipseElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feBlend": {
    type: SVGFEBlendElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feColorMatrix": {
    type: SVGFEColorMatrixElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feComponentTransfer": {
    type: SVGFEComponentTransferElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feComposite": {
    type: SVGFECompositeElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feConvolveMatrix": {
    type: SVGFEConvolveMatrixElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feDiffuseLighting": {
    type: SVGFEDiffuseLightingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feDisplacementMap": {
    type: SVGFEDisplacementMapElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feDistantLight": {
    type: SVGFEDistantLightElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feDropShadow": {
    type: SVGFEDropShadowElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feFlood": {
    type: SVGFEFloodElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feFuncA": {
    type: SVGFEFuncAElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feFuncB": {
    type: SVGFEFuncBElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feFuncG": {
    type: SVGFEFuncGElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feFuncR": {
    type: SVGFEFuncRElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feGaussianBlur": {
    type: SVGFEGaussianBlurElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feImage": {
    type: SVGFEImageElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feMerge": {
    type: SVGFEMergeElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feMergeNode": {
    type: SVGFEMergeNodeElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feMorphology": {
    type: SVGFEMorphologyElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feOffset": {
    type: SVGFEOffsetElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "fePointLight": {
    type: SVGFEPointLightElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feSpecularLighting": {
    type: SVGFESpecularLightingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feSpotLight": {
    type: SVGFESpotLightElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feTile": {
    type: SVGFETileElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "feTurbulence": {
    type: SVGFETurbulenceElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "filter": {
    type: SVGFilterElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "foreignObject": {
    type: SVGForeignObjectElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "g": {
    type: SVGGElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "image": {
    type: SVGImageElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "line": {
    type: SVGLineElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "linearGradient": {
    type: SVGLinearGradientElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "marker": {
    type: SVGMarkerElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mask": {
    type: SVGMaskElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "metadata": {
    type: SVGMetadataElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mpath": {
    type: SVGMPathElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "path": {
    type: SVGPathElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "pattern": {
    type: SVGPatternElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "polygon": {
    type: SVGPolygonElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "polyline": {
    type: SVGPolylineElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "radialGradient": {
    type: SVGRadialGradientElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "rect": {
    type: SVGRectElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "script": {
    type: SVGScriptElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "set": {
    type: SVGSetElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "stop": {
    type: SVGStopElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "style": {
    type: SVGStyleElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "svg": {
    type: SVGSVGElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "switch": {
    type: SVGSwitchElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "symbol": {
    type: SVGSymbolElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "text": {
    type: SVGTextElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "textPath": {
    type: SVGTextPathElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "title": {
    type: SVGTitleElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "tspan": {
    type: SVGTSpanElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "use": {
    type: SVGUseElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "view": {
    type: SVGViewElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
} as const;
