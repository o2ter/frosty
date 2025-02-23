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

import { PropType } from './props';

export const SVGElementTagNameMap = {
  "a": {
    type: SVGAElement,
    props: {},
  },
  "animate": {
    type: SVGAnimateElement,
    props: {},
  },
  "animateMotion": {
    type: SVGAnimateMotionElement,
    props: {},
  },
  "animateTransform": {
    type: SVGAnimateTransformElement,
    props: {},
  },
  "circle": {
    type: SVGCircleElement,
    props: {},
  },
  "clipPath": {
    type: SVGClipPathElement,
    props: {},
  },
  "defs": {
    type: SVGDefsElement,
    props: {},
  },
  "desc": {
    type: SVGDescElement,
    props: {},
  },
  "ellipse": {
    type: SVGEllipseElement,
    props: {},
  },
  "feBlend": {
    type: SVGFEBlendElement,
    props: {},
  },
  "feColorMatrix": {
    type: SVGFEColorMatrixElement,
    props: {},
  },
  "feComponentTransfer": {
    type: SVGFEComponentTransferElement,
    props: {},
  },
  "feComposite": {
    type: SVGFECompositeElement,
    props: {},
  },
  "feConvolveMatrix": {
    type: SVGFEConvolveMatrixElement,
    props: {},
  },
  "feDiffuseLighting": {
    type: SVGFEDiffuseLightingElement,
    props: {},
  },
  "feDisplacementMap": {
    type: SVGFEDisplacementMapElement,
    props: {},
  },
  "feDistantLight": {
    type: SVGFEDistantLightElement,
    props: {},
  },
  "feDropShadow": {
    type: SVGFEDropShadowElement,
    props: {},
  },
  "feFlood": {
    type: SVGFEFloodElement,
    props: {},
  },
  "feFuncA": {
    type: SVGFEFuncAElement,
    props: {},
  },
  "feFuncB": {
    type: SVGFEFuncBElement,
    props: {},
  },
  "feFuncG": {
    type: SVGFEFuncGElement,
    props: {},
  },
  "feFuncR": {
    type: SVGFEFuncRElement,
    props: {},
  },
  "feGaussianBlur": {
    type: SVGFEGaussianBlurElement,
    props: {},
  },
  "feImage": {
    type: SVGFEImageElement,
    props: {},
  },
  "feMerge": {
    type: SVGFEMergeElement,
    props: {},
  },
  "feMergeNode": {
    type: SVGFEMergeNodeElement,
    props: {},
  },
  "feMorphology": {
    type: SVGFEMorphologyElement,
    props: {},
  },
  "feOffset": {
    type: SVGFEOffsetElement,
    props: {},
  },
  "fePointLight": {
    type: SVGFEPointLightElement,
    props: {},
  },
  "feSpecularLighting": {
    type: SVGFESpecularLightingElement,
    props: {},
  },
  "feSpotLight": {
    type: SVGFESpotLightElement,
    props: {},
  },
  "feTile": {
    type: SVGFETileElement,
    props: {},
  },
  "feTurbulence": {
    type: SVGFETurbulenceElement,
    props: {},
  },
  "filter": {
    type: SVGFilterElement,
    props: {},
  },
  "foreignObject": {
    type: SVGForeignObjectElement,
    props: {},
  },
  "g": {
    type: SVGGElement,
    props: {},
  },
  "image": {
    type: SVGImageElement,
    props: {},
  },
  "line": {
    type: SVGLineElement,
    props: {},
  },
  "linearGradient": {
    type: SVGLinearGradientElement,
    props: {},
  },
  "marker": {
    type: SVGMarkerElement,
    props: {},
  },
  "mask": {
    type: SVGMaskElement,
    props: {},
  },
  "metadata": {
    type: SVGMetadataElement,
    props: {},
  },
  "mpath": {
    type: SVGMPathElement,
    props: {},
  },
  "path": {
    type: SVGPathElement,
    props: {},
  },
  "pattern": {
    type: SVGPatternElement,
    props: {},
  },
  "polygon": {
    type: SVGPolygonElement,
    props: {},
  },
  "polyline": {
    type: SVGPolylineElement,
    props: {},
  },
  "radialGradient": {
    type: SVGRadialGradientElement,
    props: {},
  },
  "rect": {
    type: SVGRectElement,
    props: {},
  },
  "script": {
    type: SVGScriptElement,
    props: {},
  },
  "set": {
    type: SVGSetElement,
    props: {},
  },
  "stop": {
    type: SVGStopElement,
    props: {},
  },
  "style": {
    type: SVGStyleElement,
    props: {},
  },
  "svg": {
    type: SVGSVGElement,
    props: {},
  },
  "switch": {
    type: SVGSwitchElement,
    props: {},
  },
  "symbol": {
    type: SVGSymbolElement,
    props: {},
  },
  "text": {
    type: SVGTextElement,
    props: {},
  },
  "textPath": {
    type: SVGTextPathElement,
    props: {},
  },
  "title": {
    type: SVGTitleElement,
    props: {},
  },
  "tspan": {
    type: SVGTSpanElement,
    props: {},
  },
  "use": {
    type: SVGUseElement,
    props: {},
  },
  "view": {
    type: SVGViewElement,
    props: {},
  },
} as const;
