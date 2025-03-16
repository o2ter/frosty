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
import { StyleProp } from '../common/styles/types';
import { SVGProperties } from './css';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */

const svgAttrs = {
  // Attributes which also defined in HTMLAttributes
  className: PropValue.className(),
  color: PropValue.string(),
  height: PropValue.stringOrNumber(),
  id: PropValue.string(),
  lang: PropValue.string(),
  max: PropValue.stringOrNumber(),
  media: PropValue.string(),
  method: PropValue.string(),
  min: PropValue.stringOrNumber(),
  name: PropValue.string(),
  style: new PropValue<StyleProp<SVGProperties>>({}),
  target: PropValue.string(),
  type: PropValue.string(),
  width: PropValue.stringOrNumber(),

  // Other HTML properties supported by SVG elements in browsers
  role: PropValue.ariaRole(),
  tabIndex: PropValue.number({ attr: 'tabindex' }),
  crossOrigin: PropValue.crossOrigin(),

  // SVG Specific attributes
  accentHeight: PropValue.stringOrNumber(),
  accumulate: PropValue.oneOf(['none', 'sum'] as const),
  additive: PropValue.oneOf(['replace', 'sum'] as const),
  alignmentBaseline: PropValue.string<
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'>(),
  allowReorder: PropValue.oneOf(['yes', 'no'] as const),
  alphabetic: PropValue.stringOrNumber(),
  amplitude: PropValue.stringOrNumber(),
  arabicForm: PropValue.oneOf(['initial', 'medial', 'terminal', 'isolated'] as const),
  ascent: PropValue.stringOrNumber(),
  attributeName: PropValue.string(),
  attributeType: PropValue.string(),
  autoReverse: PropValue.boolean(),
  azimuth: PropValue.stringOrNumber(),
  baseFrequency: PropValue.stringOrNumber(),
  baselineShift: PropValue.stringOrNumber(),
  baseProfile: PropValue.stringOrNumber(),
  bbox: PropValue.stringOrNumber(),
  begin: PropValue.stringOrNumber(),
  bias: PropValue.stringOrNumber(),
  by: PropValue.stringOrNumber(),
  calcMode: PropValue.stringOrNumber(),
  capHeight: PropValue.stringOrNumber(),
  clip: PropValue.stringOrNumber(),
  clipPath: PropValue.string(),
  clipPathUnits: PropValue.stringOrNumber(),
  clipRule: PropValue.stringOrNumber(),
  colorInterpolation: PropValue.stringOrNumber(),
  colorInterpolationFilters: PropValue.oneOf(['auto', 'sRGB', 'linearRGB', 'inherit'] as const),
  colorProfile: PropValue.stringOrNumber(),
  colorRendering: PropValue.stringOrNumber(),
  contentScriptType: PropValue.stringOrNumber(),
  contentStyleType: PropValue.stringOrNumber(),
  cursor: PropValue.stringOrNumber(),
  cx: PropValue.stringOrNumber(),
  cy: PropValue.stringOrNumber(),
  d: PropValue.string(),
  decelerate: PropValue.stringOrNumber(),
  descent: PropValue.stringOrNumber(),
  diffuseConstant: PropValue.stringOrNumber(),
  direction: PropValue.stringOrNumber(),
  display: PropValue.stringOrNumber(),
  divisor: PropValue.stringOrNumber(),
  dominantBaseline: PropValue.stringOrNumber(),
  dur: PropValue.stringOrNumber(),
  dx: PropValue.stringOrNumber(),
  dy: PropValue.stringOrNumber(),
  edgeMode: PropValue.stringOrNumber(),
  elevation: PropValue.stringOrNumber(),
  enableBackground: PropValue.stringOrNumber(),
  end: PropValue.stringOrNumber(),
  exponent: PropValue.stringOrNumber(),
  externalResourcesRequired: PropValue.boolean(),
  fill: PropValue.string(),
  fillOpacity: PropValue.stringOrNumber(),
  fillRule: PropValue.oneOf(['nonzero', 'evenodd', 'inherit'] as const),
  filter: PropValue.string(),
  filterRes: PropValue.stringOrNumber(),
  filterUnits: PropValue.stringOrNumber(),
  floodColor: PropValue.stringOrNumber(),
  floodOpacity: PropValue.stringOrNumber(),
  focusable: PropValue.oneOf([true, false, 'auto'] as const),
  fontFamily: PropValue.string(),
  fontSize: PropValue.stringOrNumber(),
  fontSizeAdjust: PropValue.stringOrNumber(),
  fontStretch: PropValue.stringOrNumber(),
  fontStyle: PropValue.stringOrNumber(),
  fontVariant: PropValue.stringOrNumber(),
  fontWeight: PropValue.stringOrNumber(),
  format: PropValue.stringOrNumber(),
  fr: PropValue.stringOrNumber(),
  from: PropValue.stringOrNumber(),
  fx: PropValue.stringOrNumber(),
  fy: PropValue.stringOrNumber(),
  g1: PropValue.stringOrNumber(),
  g2: PropValue.stringOrNumber(),
  glyphName: PropValue.stringOrNumber(),
  glyphOrientationHorizontal: PropValue.stringOrNumber(),
  glyphOrientationVertical: PropValue.stringOrNumber(),
  glyphRef: PropValue.stringOrNumber(),
  gradientTransform: PropValue.string(),
  gradientUnits: PropValue.string(),
  hanging: PropValue.stringOrNumber(),
  horizAdvX: PropValue.stringOrNumber(),
  horizOriginX: PropValue.stringOrNumber(),
  href: PropValue.string(),
  ideographic: PropValue.stringOrNumber(),
  imageRendering: PropValue.stringOrNumber(),
  in2: PropValue.stringOrNumber(),
  in: PropValue.string(),
  intercept: PropValue.stringOrNumber(),
  k1: PropValue.stringOrNumber(),
  k2: PropValue.stringOrNumber(),
  k3: PropValue.stringOrNumber(),
  k4: PropValue.stringOrNumber(),
  k: PropValue.stringOrNumber(),
  kernelMatrix: PropValue.stringOrNumber(),
  kernelUnitLength: PropValue.stringOrNumber(),
  kerning: PropValue.stringOrNumber(),
  keyPoints: PropValue.stringOrNumber(),
  keySplines: PropValue.stringOrNumber(),
  keyTimes: PropValue.stringOrNumber(),
  lengthAdjust: PropValue.stringOrNumber(),
  letterSpacing: PropValue.stringOrNumber(),
  lightingColor: PropValue.stringOrNumber(),
  limitingConeAngle: PropValue.stringOrNumber(),
  local: PropValue.stringOrNumber(),
  markerEnd: PropValue.string(),
  markerHeight: PropValue.stringOrNumber(),
  markerMid: PropValue.string(),
  markerStart: PropValue.string(),
  markerUnits: PropValue.stringOrNumber(),
  markerWidth: PropValue.stringOrNumber(),
  mask: PropValue.string(),
  maskContentUnits: PropValue.stringOrNumber(),
  maskUnits: PropValue.stringOrNumber(),
  mathematical: PropValue.stringOrNumber(),
  mode: PropValue.stringOrNumber(),
  numOctaves: PropValue.stringOrNumber(),
  offset: PropValue.stringOrNumber(),
  opacity: PropValue.stringOrNumber(),
  operator: PropValue.stringOrNumber(),
  order: PropValue.stringOrNumber(),
  orient: PropValue.stringOrNumber(),
  orientation: PropValue.stringOrNumber(),
  origin: PropValue.stringOrNumber(),
  overflow: PropValue.stringOrNumber(),
  overlinePosition: PropValue.stringOrNumber(),
  overlineThickness: PropValue.stringOrNumber(),
  paintOrder: PropValue.stringOrNumber(),
  panose1: PropValue.stringOrNumber(),
  path: PropValue.string(),
  pathLength: PropValue.stringOrNumber(),
  patternContentUnits: PropValue.string(),
  patternTransform: PropValue.stringOrNumber(),
  patternUnits: PropValue.string(),
  pointerEvents: PropValue.stringOrNumber(),
  points: PropValue.string(),
  pointsAtX: PropValue.stringOrNumber(),
  pointsAtY: PropValue.stringOrNumber(),
  pointsAtZ: PropValue.stringOrNumber(),
  preserveAlpha: PropValue.boolean(),
  preserveAspectRatio: PropValue.string(),
  primitiveUnits: PropValue.stringOrNumber(),
  r: PropValue.stringOrNumber(),
  radius: PropValue.stringOrNumber(),
  refX: PropValue.stringOrNumber(),
  refY: PropValue.stringOrNumber(),
  renderingIntent: PropValue.stringOrNumber(),
  repeatCount: PropValue.stringOrNumber(),
  repeatDur: PropValue.stringOrNumber(),
  requiredExtensions: PropValue.stringOrNumber(),
  requiredFeatures: PropValue.stringOrNumber(),
  restart: PropValue.stringOrNumber(),
  result: PropValue.string(),
  rotate: PropValue.stringOrNumber(),
  rx: PropValue.stringOrNumber(),
  ry: PropValue.stringOrNumber(),
  scale: PropValue.stringOrNumber(),
  seed: PropValue.stringOrNumber(),
  shapeRendering: PropValue.stringOrNumber(),
  slope: PropValue.stringOrNumber(),
  spacing: PropValue.stringOrNumber(),
  specularConstant: PropValue.stringOrNumber(),
  specularExponent: PropValue.stringOrNumber(),
  speed: PropValue.stringOrNumber(),
  spreadMethod: PropValue.string(),
  startOffset: PropValue.stringOrNumber(),
  stdDeviation: PropValue.stringOrNumber(),
  stemh: PropValue.stringOrNumber(),
  stemv: PropValue.stringOrNumber(),
  stitchTiles: PropValue.stringOrNumber(),
  stopColor: PropValue.string(),
  stopOpacity: PropValue.stringOrNumber(),
  strikethroughPosition: PropValue.stringOrNumber(),
  strikethroughThickness: PropValue.stringOrNumber(),
  string: PropValue.stringOrNumber(),
  stroke: PropValue.string(),
  strokeDasharray: PropValue.stringOrNumber(),
  strokeDashoffset: PropValue.stringOrNumber(),
  strokeLinecap: PropValue.oneOf(['butt', 'round', 'square', 'inherit'] as const),
  strokeLinejoin: PropValue.oneOf(['miter', 'round', 'bevel', 'inherit'] as const),
  strokeMiterlimit: PropValue.stringOrNumber(),
  strokeOpacity: PropValue.stringOrNumber(),
  strokeWidth: PropValue.stringOrNumber(),
  surfaceScale: PropValue.stringOrNumber(),
  systemLanguage: PropValue.stringOrNumber(),
  tableValues: PropValue.stringOrNumber(),
  targetX: PropValue.stringOrNumber(),
  targetY: PropValue.stringOrNumber(),
  textAnchor: PropValue.string(),
  textDecoration: PropValue.stringOrNumber(),
  textLength: PropValue.stringOrNumber(),
  textRendering: PropValue.stringOrNumber(),
  to: PropValue.stringOrNumber(),
  transform: PropValue.string(),
  u1: PropValue.stringOrNumber(),
  u2: PropValue.stringOrNumber(),
  underlinePosition: PropValue.stringOrNumber(),
  underlineThickness: PropValue.stringOrNumber(),
  unicode: PropValue.stringOrNumber(),
  unicodeBidi: PropValue.stringOrNumber(),
  unicodeRange: PropValue.stringOrNumber(),
  unitsPerEm: PropValue.stringOrNumber(),
  vAlphabetic: PropValue.stringOrNumber(),
  values: PropValue.string(),
  vectorEffect: PropValue.stringOrNumber(),
  version: PropValue.string(),
  vertAdvY: PropValue.stringOrNumber(),
  vertOriginX: PropValue.stringOrNumber(),
  vertOriginY: PropValue.stringOrNumber(),
  vHanging: PropValue.stringOrNumber(),
  vIdeographic: PropValue.stringOrNumber(),
  viewBox: PropValue.string(),
  viewTarget: PropValue.stringOrNumber(),
  visibility: PropValue.stringOrNumber(),
  vMathematical: PropValue.stringOrNumber(),
  widths: PropValue.stringOrNumber(),
  wordSpacing: PropValue.stringOrNumber(),
  writingMode: PropValue.stringOrNumber(),
  x1: PropValue.stringOrNumber(),
  x2: PropValue.stringOrNumber(),
  x: PropValue.stringOrNumber(),
  xChannelSelector: PropValue.string(),
  xHeight: PropValue.stringOrNumber(),
  xlinkActuate: PropValue.string(),
  xlinkArcrole: PropValue.string(),
  xlinkHref: PropValue.string(),
  xlinkRole: PropValue.string(),
  xlinkShow: PropValue.string(),
  xlinkTitle: PropValue.string(),
  xlinkType: PropValue.string(),
  xmlBase: PropValue.string(),
  xmlLang: PropValue.string(),
  xmlns: PropValue.string(),
  xmlnsXlink: PropValue.string(),
  xmlSpace: PropValue.string(),
  y1: PropValue.stringOrNumber(),
  y2: PropValue.stringOrNumber(),
  y: PropValue.stringOrNumber(),
  yChannelSelector: PropValue.string(),
  z: PropValue.stringOrNumber(),
  zoomAndPan: PropValue.string(),
};

export const SVGElementTagNameMap = {
  "a": {
    type: SVGAElement,
    props: svgAttrs,
  },
  "animate": {
    type: SVGAnimateElement,
    props: svgAttrs,
  },
  "animateMotion": {
    type: SVGAnimateMotionElement,
    props: svgAttrs,
  },
  "animateTransform": {
    type: SVGAnimateTransformElement,
    props: svgAttrs,
  },
  "circle": {
    type: SVGCircleElement,
    props: svgAttrs,
  },
  "clipPath": {
    type: SVGClipPathElement,
    props: svgAttrs,
  },
  "defs": {
    type: SVGDefsElement,
    props: svgAttrs,
  },
  "desc": {
    type: SVGDescElement,
    props: svgAttrs,
  },
  "ellipse": {
    type: SVGEllipseElement,
    props: svgAttrs,
  },
  "feBlend": {
    type: SVGFEBlendElement,
    props: svgAttrs,
  },
  "feColorMatrix": {
    type: SVGFEColorMatrixElement,
    props: svgAttrs,
  },
  "feComponentTransfer": {
    type: SVGFEComponentTransferElement,
    props: svgAttrs,
  },
  "feComposite": {
    type: SVGFECompositeElement,
    props: svgAttrs,
  },
  "feConvolveMatrix": {
    type: SVGFEConvolveMatrixElement,
    props: svgAttrs,
  },
  "feDiffuseLighting": {
    type: SVGFEDiffuseLightingElement,
    props: svgAttrs,
  },
  "feDisplacementMap": {
    type: SVGFEDisplacementMapElement,
    props: svgAttrs,
  },
  "feDistantLight": {
    type: SVGFEDistantLightElement,
    props: svgAttrs,
  },
  "feDropShadow": {
    type: SVGFEDropShadowElement,
    props: svgAttrs,
  },
  "feFlood": {
    type: SVGFEFloodElement,
    props: svgAttrs,
  },
  "feFuncA": {
    type: SVGFEFuncAElement,
    props: svgAttrs,
  },
  "feFuncB": {
    type: SVGFEFuncBElement,
    props: svgAttrs,
  },
  "feFuncG": {
    type: SVGFEFuncGElement,
    props: svgAttrs,
  },
  "feFuncR": {
    type: SVGFEFuncRElement,
    props: svgAttrs,
  },
  "feGaussianBlur": {
    type: SVGFEGaussianBlurElement,
    props: svgAttrs,
  },
  "feImage": {
    type: SVGFEImageElement,
    props: svgAttrs,
  },
  "feMerge": {
    type: SVGFEMergeElement,
    props: svgAttrs,
  },
  "feMergeNode": {
    type: SVGFEMergeNodeElement,
    props: svgAttrs,
  },
  "feMorphology": {
    type: SVGFEMorphologyElement,
    props: svgAttrs,
  },
  "feOffset": {
    type: SVGFEOffsetElement,
    props: svgAttrs,
  },
  "fePointLight": {
    type: SVGFEPointLightElement,
    props: svgAttrs,
  },
  "feSpecularLighting": {
    type: SVGFESpecularLightingElement,
    props: svgAttrs,
  },
  "feSpotLight": {
    type: SVGFESpotLightElement,
    props: svgAttrs,
  },
  "feTile": {
    type: SVGFETileElement,
    props: svgAttrs,
  },
  "feTurbulence": {
    type: SVGFETurbulenceElement,
    props: svgAttrs,
  },
  "filter": {
    type: SVGFilterElement,
    props: svgAttrs,
  },
  "foreignObject": {
    type: SVGForeignObjectElement,
    props: svgAttrs,
  },
  "g": {
    type: SVGGElement,
    props: svgAttrs,
  },
  "image": {
    type: SVGImageElement,
    props: svgAttrs,
  },
  "line": {
    type: SVGLineElement,
    props: svgAttrs,
  },
  "linearGradient": {
    type: SVGLinearGradientElement,
    props: svgAttrs,
  },
  "marker": {
    type: SVGMarkerElement,
    props: svgAttrs,
  },
  "mask": {
    type: SVGMaskElement,
    props: svgAttrs,
  },
  "metadata": {
    type: SVGMetadataElement,
    props: svgAttrs,
  },
  "mpath": {
    type: SVGMPathElement,
    props: svgAttrs,
  },
  "path": {
    type: SVGPathElement,
    props: svgAttrs,
  },
  "pattern": {
    type: SVGPatternElement,
    props: svgAttrs,
  },
  "polygon": {
    type: SVGPolygonElement,
    props: svgAttrs,
  },
  "polyline": {
    type: SVGPolylineElement,
    props: svgAttrs,
  },
  "radialGradient": {
    type: SVGRadialGradientElement,
    props: svgAttrs,
  },
  "rect": {
    type: SVGRectElement,
    props: svgAttrs,
  },
  "script": {
    type: SVGScriptElement,
    props: svgAttrs,
  },
  "set": {
    type: SVGSetElement,
    props: svgAttrs,
  },
  "stop": {
    type: SVGStopElement,
    props: svgAttrs,
  },
  "style": {
    type: SVGStyleElement,
    props: svgAttrs,
  },
  "svg": {
    type: SVGSVGElement,
    props: svgAttrs,
  },
  "switch": {
    type: SVGSwitchElement,
    props: svgAttrs,
  },
  "symbol": {
    type: SVGSymbolElement,
    props: svgAttrs,
  },
  "text": {
    type: SVGTextElement,
    props: svgAttrs,
  },
  "textPath": {
    type: SVGTextPathElement,
    props: svgAttrs,
  },
  "title": {
    type: SVGTitleElement,
    props: svgAttrs,
  },
  "tspan": {
    type: SVGTSpanElement,
    props: svgAttrs,
  },
  "use": {
    type: SVGUseElement,
    props: svgAttrs,
  },
  "view": {
    type: SVGViewElement,
    props: svgAttrs,
  },
} as const;
