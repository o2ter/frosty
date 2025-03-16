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

export const SVGElementTagNameMap = {
  "a": {
    type: SVGAElement,
  },
  "animate": {
    type: SVGAnimateElement,
  },
  "animateMotion": {
    type: SVGAnimateMotionElement,
  },
  "animateTransform": {
    type: SVGAnimateTransformElement,
  },
  "circle": {
    type: SVGCircleElement,
  },
  "clipPath": {
    type: SVGClipPathElement,
  },
  "defs": {
    type: SVGDefsElement,
  },
  "desc": {
    type: SVGDescElement,
  },
  "ellipse": {
    type: SVGEllipseElement,
  },
  "feBlend": {
    type: SVGFEBlendElement,
  },
  "feColorMatrix": {
    type: SVGFEColorMatrixElement,
  },
  "feComponentTransfer": {
    type: SVGFEComponentTransferElement,
  },
  "feComposite": {
    type: SVGFECompositeElement,
  },
  "feConvolveMatrix": {
    type: SVGFEConvolveMatrixElement,
  },
  "feDiffuseLighting": {
    type: SVGFEDiffuseLightingElement,
  },
  "feDisplacementMap": {
    type: SVGFEDisplacementMapElement,
  },
  "feDistantLight": {
    type: SVGFEDistantLightElement,
  },
  "feDropShadow": {
    type: SVGFEDropShadowElement,
  },
  "feFlood": {
    type: SVGFEFloodElement,
  },
  "feFuncA": {
    type: SVGFEFuncAElement,
  },
  "feFuncB": {
    type: SVGFEFuncBElement,
  },
  "feFuncG": {
    type: SVGFEFuncGElement,
  },
  "feFuncR": {
    type: SVGFEFuncRElement,
  },
  "feGaussianBlur": {
    type: SVGFEGaussianBlurElement,
  },
  "feImage": {
    type: SVGFEImageElement,
  },
  "feMerge": {
    type: SVGFEMergeElement,
  },
  "feMergeNode": {
    type: SVGFEMergeNodeElement,
  },
  "feMorphology": {
    type: SVGFEMorphologyElement,
  },
  "feOffset": {
    type: SVGFEOffsetElement,
  },
  "fePointLight": {
    type: SVGFEPointLightElement,
  },
  "feSpecularLighting": {
    type: SVGFESpecularLightingElement,
  },
  "feSpotLight": {
    type: SVGFESpotLightElement,
  },
  "feTile": {
    type: SVGFETileElement,
  },
  "feTurbulence": {
    type: SVGFETurbulenceElement,
  },
  "filter": {
    type: SVGFilterElement,
  },
  "foreignObject": {
    type: SVGForeignObjectElement,
  },
  "g": {
    type: SVGGElement,
  },
  "image": {
    type: SVGImageElement,
  },
  "line": {
    type: SVGLineElement,
  },
  "linearGradient": {
    type: SVGLinearGradientElement,
  },
  "marker": {
    type: SVGMarkerElement,
  },
  "mask": {
    type: SVGMaskElement,
  },
  "metadata": {
    type: SVGMetadataElement,
  },
  "mpath": {
    type: SVGMPathElement,
  },
  "path": {
    type: SVGPathElement,
  },
  "pattern": {
    type: SVGPatternElement,
  },
  "polygon": {
    type: SVGPolygonElement,
  },
  "polyline": {
    type: SVGPolylineElement,
  },
  "radialGradient": {
    type: SVGRadialGradientElement,
  },
  "rect": {
    type: SVGRectElement,
  },
  "script": {
    type: SVGScriptElement,
  },
  "set": {
    type: SVGSetElement,
  },
  "stop": {
    type: SVGStopElement,
  },
  "style": {
    type: SVGStyleElement,
  },
  "svg": {
    type: SVGSVGElement,
  },
  "switch": {
    type: SVGSwitchElement,
  },
  "symbol": {
    type: SVGSymbolElement,
  },
  "text": {
    type: SVGTextElement,
  },
  "textPath": {
    type: SVGTextPathElement,
  },
  "title": {
    type: SVGTitleElement,
  },
  "tspan": {
    type: SVGTSpanElement,
  },
  "use": {
    type: SVGUseElement,
  },
  "view": {
    type: SVGViewElement,
  },
} as const;
