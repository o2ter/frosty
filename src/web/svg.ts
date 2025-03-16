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
  color: PropValue.string({ attr: 'color' }),
  height: PropValue.stringOrNumber({ attr: 'height' }),
  id: PropValue.string({ attr: 'id' }),
  lang: PropValue.string({ attr: 'lang' }),
  max: PropValue.stringOrNumber({ attr: 'max' }),
  media: PropValue.string({ attr: 'media' }),
  method: PropValue.string({ attr: 'method' }),
  min: PropValue.stringOrNumber({ attr: 'min' }),
  name: PropValue.string({ attr: 'name' }),
  style: new PropValue<StyleProp<SVGProperties>>({ attr: 'style' }),
  target: PropValue.string({ attr: 'target' }),
  type: PropValue.string({ attr: 'type' }),
  width: PropValue.stringOrNumber({ attr: 'width' }),

  // Other HTML properties supported by SVG elements in browsers
  role: PropValue.ariaRole(),
  tabIndex: PropValue.number({ attr: 'tabindex' }),
  crossOrigin: PropValue.crossOrigin(),

  // SVG Specific attributes
  accentHeight: PropValue.stringOrNumber({ attr: 'accent-height' }),
  accumulate: PropValue.oneOf(['none', 'sum'] as const, { attr: 'accumulate' }),
  additive: PropValue.oneOf(['replace', 'sum'] as const, { attr: 'additive' }),
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
    | 'inherit'>({ attr: 'alignment-baseline' }),
  alphabetic: PropValue.stringOrNumber({ attr: 'alphabetic' }),
  amplitude: PropValue.stringOrNumber({ attr: 'amplitude' }),
  arabicForm: PropValue.oneOf(['initial', 'medial', 'terminal', 'isolated'] as const, { attr: 'arabic-form' }),
  ascent: PropValue.stringOrNumber({ attr: 'ascent' }),
  attributeName: PropValue.string({ attr: 'attributeName' }),
  attributeType: PropValue.string({ attr: 'attributeType' }),
  azimuth: PropValue.stringOrNumber({ attr: 'azimuth' }),
  baseFrequency: PropValue.stringOrNumber({ attr: 'baseFrequency' }),
  baselineShift: PropValue.stringOrNumber({ attr: 'baseline-shift' }),
  baseProfile: PropValue.stringOrNumber({ attr: 'baseProfile' }),
  bbox: PropValue.stringOrNumber({ attr: 'bbox' }),
  begin: PropValue.stringOrNumber({ attr: 'begin' }),
  bias: PropValue.stringOrNumber({ attr: 'bias' }),
  by: PropValue.stringOrNumber({ attr: 'by' }),
  calcMode: PropValue.stringOrNumber({ attr: 'calcMode' }),
  capHeight: PropValue.stringOrNumber(),
  clip: PropValue.stringOrNumber(),
  clipPath: PropValue.string({ attr: 'clip-path' }),
  clipPathUnits: PropValue.stringOrNumber({ attr: 'clipPathUnits' }),
  clipRule: PropValue.stringOrNumber({ attr: 'clip-rule' }),
  colorInterpolation: PropValue.stringOrNumber({ attr: 'color-interpolation' }),
  colorInterpolationFilters: PropValue.oneOf(['auto', 'sRGB', 'linearRGB', 'inherit'] as const),
  colorProfile: PropValue.stringOrNumber(),
  colorRendering: PropValue.stringOrNumber(),
  contentScriptType: PropValue.stringOrNumber(),
  contentStyleType: PropValue.stringOrNumber(),
  cursor: PropValue.stringOrNumber({ attr: 'cursor' }),
  cx: PropValue.stringOrNumber({ attr: 'cx' }),
  cy: PropValue.stringOrNumber({ attr: 'cy' }),
  d: PropValue.string({ attr: 'd' }),
  decelerate: PropValue.stringOrNumber(),
  descent: PropValue.stringOrNumber(),
  diffuseConstant: PropValue.stringOrNumber({ attr: 'diffuseConstant' }),
  direction: PropValue.stringOrNumber({ attr: 'direction' }),
  display: PropValue.stringOrNumber({ attr: 'display' }),
  divisor: PropValue.stringOrNumber({ attr: 'divisor' }),
  dominantBaseline: PropValue.stringOrNumber({ attr: 'dominant-baseline' }),
  dur: PropValue.stringOrNumber({ attr: 'dur' }),
  dx: PropValue.stringOrNumber({ attr: 'dx' }),
  dy: PropValue.stringOrNumber({ attr: 'dy' }),
  edgeMode: PropValue.stringOrNumber({ attr: 'edgeMode' }),
  elevation: PropValue.stringOrNumber({ attr: 'elevation' }),
  enableBackground: PropValue.stringOrNumber(),
  end: PropValue.stringOrNumber({ attr: 'end' }),
  exponent: PropValue.stringOrNumber({ attr: 'exponent' }),
  externalResourcesRequired: PropValue.boolean(),
  fill: PropValue.string({ attr: 'fill' }),
  fillOpacity: PropValue.stringOrNumber({ attr: 'fill-opacity' }),
  fillRule: PropValue.oneOf(['nonzero', 'evenodd', 'inherit'] as const),
  filter: PropValue.string({ attr: 'filter' }),
  filterRes: PropValue.stringOrNumber(),
  filterUnits: PropValue.stringOrNumber({ attr: 'filterUnits' }),
  floodColor: PropValue.stringOrNumber({ attr: 'flood-color' }),
  floodOpacity: PropValue.stringOrNumber({ attr: 'flood-opacity' }),
  focusable: PropValue.oneOf([true, false, 'auto'] as const),
  fontFamily: PropValue.string({ attr: 'font-family' }),
  fontSize: PropValue.stringOrNumber({ attr: 'font-size' }),
  fontSizeAdjust: PropValue.stringOrNumber({ attr: 'font-size-adjust' }),
  fontStretch: PropValue.stringOrNumber(),
  fontStyle: PropValue.stringOrNumber({ attr: 'font-style' }),
  fontVariant: PropValue.stringOrNumber({ attr: 'font-variant' }),
  fontWeight: PropValue.stringOrNumber({ attr: 'font-weight' }),
  format: PropValue.stringOrNumber(),
  fr: PropValue.stringOrNumber({ attr: 'fr' }),
  from: PropValue.stringOrNumber({ attr: 'from' }),
  fx: PropValue.stringOrNumber({ attr: 'fx' }),
  fy: PropValue.stringOrNumber({ attr: 'fy' }),
  g1: PropValue.stringOrNumber(),
  g2: PropValue.stringOrNumber(),
  glyphName: PropValue.stringOrNumber(),
  glyphOrientationHorizontal: PropValue.stringOrNumber(),
  glyphOrientationVertical: PropValue.stringOrNumber(),
  glyphRef: PropValue.stringOrNumber(),
  gradientTransform: PropValue.string({ attr: 'gradientTransform' }),
  gradientUnits: PropValue.string({ attr: 'gradientUnits' }),
  hanging: PropValue.stringOrNumber(),
  horizAdvX: PropValue.stringOrNumber(),
  horizOriginX: PropValue.stringOrNumber(),
  href: PropValue.string({ attr: 'href' }),
  ideographic: PropValue.stringOrNumber(),
  imageRendering: PropValue.stringOrNumber({ attr: 'image-rendering' }),
  in2: PropValue.stringOrNumber({ attr: 'in2' }),
  in: PropValue.string({ attr: 'in' }),
  intercept: PropValue.stringOrNumber({ attr: 'intercept' }),
  k1: PropValue.stringOrNumber({ attr: 'k1' }),
  k2: PropValue.stringOrNumber({ attr: 'k2' }),
  k3: PropValue.stringOrNumber({ attr: 'k3' }),
  k4: PropValue.stringOrNumber({ attr: 'k4' }),
  k: PropValue.stringOrNumber(),
  kernelMatrix: PropValue.stringOrNumber({ attr: 'kernelMatrix' }),
  kernelUnitLength: PropValue.stringOrNumber({ attr: 'kernelUnitLength' }),
  kerning: PropValue.stringOrNumber(),
  keyPoints: PropValue.stringOrNumber({ attr: 'keyPoints' }),
  keySplines: PropValue.stringOrNumber({ attr: 'keySplines' }),
  keyTimes: PropValue.stringOrNumber({ attr: 'keyTimes' }),
  lengthAdjust: PropValue.stringOrNumber({ attr: 'lengthAdjust' }),
  letterSpacing: PropValue.stringOrNumber({ attr: 'letter-spacing' }),
  lightingColor: PropValue.stringOrNumber({ attr: 'lighting-color' }),
  limitingConeAngle: PropValue.stringOrNumber({ attr: 'limitingConeAngle' }),
  local: PropValue.stringOrNumber(),
  markerEnd: PropValue.string({ attr: 'marker-end' }),
  markerHeight: PropValue.stringOrNumber({ attr: 'markerHeight' }),
  markerMid: PropValue.string({ attr: 'marker-mid' }),
  markerStart: PropValue.string({ attr: 'marker-start' }),
  markerUnits: PropValue.stringOrNumber({ attr: 'markerUnits' }),
  markerWidth: PropValue.stringOrNumber({ attr: 'markerWidth' }),
  mask: PropValue.string({ attr: 'mask' }),
  maskContentUnits: PropValue.stringOrNumber({ attr: 'maskContentUnits' }),
  maskUnits: PropValue.stringOrNumber({ attr: 'maskUnits' }),
  mathematical: PropValue.stringOrNumber(),
  mode: PropValue.stringOrNumber({ attr: 'mode' }),
  numOctaves: PropValue.stringOrNumber({ attr: 'numOctaves' }),
  offset: PropValue.stringOrNumber(),
  opacity: PropValue.stringOrNumber({ attr: 'opacity' }),
  operator: PropValue.stringOrNumber({ attr: 'operator' }),
  order: PropValue.stringOrNumber({ attr: 'order' }),
  orient: PropValue.stringOrNumber({ attr: 'orient' }),
  orientation: PropValue.stringOrNumber(),
  origin: PropValue.stringOrNumber({ attr: 'origin' }),
  overflow: PropValue.stringOrNumber({ attr: 'overflow' }),
  overlinePosition: PropValue.stringOrNumber({ attr: 'overline-position' }),
  overlineThickness: PropValue.stringOrNumber({ attr: 'overline-thickness' }),
  paintOrder: PropValue.stringOrNumber({ attr: 'paint-order' }),
  panose1: PropValue.stringOrNumber(),
  path: PropValue.string({ attr: 'path' }),
  pathLength: PropValue.stringOrNumber({ attr: 'pathLength' }),
  patternContentUnits: PropValue.string({ attr: 'patternContentUnits' }),
  patternTransform: PropValue.stringOrNumber({ attr: 'patternTransform' }),
  patternUnits: PropValue.string({ attr: 'patternUnits' }),
  pointerEvents: PropValue.stringOrNumber({ attr: 'pointer-events' }),
  points: PropValue.string({ attr: 'points' }),
  pointsAtX: PropValue.stringOrNumber({ attr: 'pointsAtX' }),
  pointsAtY: PropValue.stringOrNumber({ attr: 'pointsAtY' }),
  pointsAtZ: PropValue.stringOrNumber({ attr: 'pointsAtZ' }),
  preserveAlpha: PropValue.boolean({ attr: 'preserveAlpha' }),
  preserveAspectRatio: PropValue.string({ attr: 'preserveAspectRatio' }),
  primitiveUnits: PropValue.stringOrNumber({ attr: 'primitiveUnits' }),
  r: PropValue.stringOrNumber({ attr: 'r' }),
  radius: PropValue.stringOrNumber({ attr: 'radius' }),
  refX: PropValue.stringOrNumber({ attr: 'refX' }),
  refY: PropValue.stringOrNumber({ attr: 'refY' }),
  renderingIntent: PropValue.stringOrNumber(),
  repeatCount: PropValue.stringOrNumber({ attr: 'repeatCount' }),
  repeatDur: PropValue.stringOrNumber({ attr: 'repeatDur' }),
  requiredExtensions: PropValue.stringOrNumber(),
  requiredFeatures: PropValue.stringOrNumber(),
  restart: PropValue.stringOrNumber({ attr: 'restart' }),
  result: PropValue.string({ attr: 'result' }),
  rotate: PropValue.stringOrNumber(),
  rx: PropValue.stringOrNumber({ attr: 'rx' }),
  ry: PropValue.stringOrNumber({ attr: 'ry' }),
  scale: PropValue.stringOrNumber({ attr: 'scale' }),
  seed: PropValue.stringOrNumber({ attr: 'seed' }),
  shapeRendering: PropValue.stringOrNumber({ attr: 'shape-rendering' }),
  slope: PropValue.stringOrNumber({ attr: 'slope' }),
  spacing: PropValue.stringOrNumber({ attr: 'spacing' }),
  specularConstant: PropValue.stringOrNumber({ attr: 'specularConstant' }),
  specularExponent: PropValue.stringOrNumber({ attr: 'specularExponent' }),
  speed: PropValue.stringOrNumber(),
  spreadMethod: PropValue.string({ attr: 'spreadMethod' }),
  startOffset: PropValue.stringOrNumber({ attr: 'startOffset' }),
  stdDeviation: PropValue.stringOrNumber({ attr: 'stdDeviation' }),
  stemh: PropValue.stringOrNumber(),
  stemv: PropValue.stringOrNumber(),
  stitchTiles: PropValue.stringOrNumber({ attr: 'stitchTiles' }),
  stopColor: PropValue.string({ attr: 'stop-color' }),
  stopOpacity: PropValue.stringOrNumber({ attr: 'stop-opacity' }),
  strikethroughPosition: PropValue.stringOrNumber({ attr: 'strikethrough-position' }),
  strikethroughThickness: PropValue.stringOrNumber({ attr: 'strikethrough-thickness' }),
  string: PropValue.stringOrNumber(),
  stroke: PropValue.string({ attr: 'stroke' }),
  strokeDasharray: PropValue.stringOrNumber({ attr: 'stroke-dasharray' }),
  strokeDashoffset: PropValue.stringOrNumber({ attr: 'stroke-dashoffset' }),
  strokeLinecap: PropValue.oneOf(['butt', 'round', 'square', 'inherit'] as const),
  strokeLinejoin: PropValue.oneOf(['miter', 'round', 'bevel', 'inherit'] as const),
  strokeMiterlimit: PropValue.stringOrNumber({ attr: 'stroke-miterlimit' }),
  strokeOpacity: PropValue.stringOrNumber({ attr: 'stroke-opacity' }),
  strokeWidth: PropValue.stringOrNumber({ attr: 'stroke-width' }),
  surfaceScale: PropValue.stringOrNumber({ attr: 'surfaceScale' }),
  systemLanguage: PropValue.stringOrNumber({ attr: 'systemLanguage' }),
  tableValues: PropValue.stringOrNumber({ attr: 'tableValues' }),
  targetX: PropValue.stringOrNumber({ attr: 'targetX' }),
  targetY: PropValue.stringOrNumber({ attr: 'targetY' }),
  textAnchor: PropValue.string({ attr: 'text-anchor' }),
  textDecoration: PropValue.stringOrNumber({ attr: 'text-decoration' }),
  textLength: PropValue.stringOrNumber({ attr: 'textLength' }),
  textRendering: PropValue.stringOrNumber({ attr: 'text-rendering' }),
  to: PropValue.stringOrNumber({ attr: 'to' }),
  transform: PropValue.string({ attr: 'transform' }),
  u1: PropValue.stringOrNumber(),
  u2: PropValue.stringOrNumber(),
  underlinePosition: PropValue.stringOrNumber({ attr: 'underline-position' }),
  underlineThickness: PropValue.stringOrNumber({ attr: 'underline-thickness' }),
  unicode: PropValue.stringOrNumber(),
  unicodeBidi: PropValue.stringOrNumber({ attr: 'unicode-bidi' }),
  unicodeRange: PropValue.stringOrNumber(),
  unitsPerEm: PropValue.stringOrNumber(),
  vAlphabetic: PropValue.stringOrNumber(),
  values: PropValue.string({ attr: 'values' }),
  vectorEffect: PropValue.stringOrNumber({ attr: 'vector-effect' }),
  version: PropValue.string(),
  vertAdvY: PropValue.stringOrNumber(),
  vertOriginX: PropValue.stringOrNumber(),
  vertOriginY: PropValue.stringOrNumber(),
  vHanging: PropValue.stringOrNumber(),
  vIdeographic: PropValue.stringOrNumber(),
  viewBox: PropValue.string({ attr: 'viewBox' }),
  viewTarget: PropValue.stringOrNumber(),
  visibility: PropValue.stringOrNumber({ attr: 'visibility' }),
  vMathematical: PropValue.stringOrNumber(),
  widths: PropValue.stringOrNumber(),
  wordSpacing: PropValue.stringOrNumber({ attr: 'word-spacing' }),
  writingMode: PropValue.stringOrNumber({ attr: 'writing-mode' }),
  x1: PropValue.stringOrNumber({ attr: 'x1' }),
  x2: PropValue.stringOrNumber({ attr: 'x2' }),
  x: PropValue.stringOrNumber({ attr: 'x' }),
  xChannelSelector: PropValue.string({ attr: 'xChannelSelector' }),
  xHeight: PropValue.stringOrNumber(),
  xlinkActuate: PropValue.string({ attr: 'xlink:actuate' }),
  xlinkArcrole: PropValue.string({ attr: 'xlink:arcrole' }),
  xlinkHref: PropValue.string({ attr: 'xlink:href' }),
  xlinkRole: PropValue.string({ attr: 'xlink:role' }),
  xlinkShow: PropValue.string({ attr: 'xlink:show' }),
  xlinkTitle: PropValue.string({ attr: 'xlink:title' }),
  xlinkType: PropValue.string({ attr: 'xlink:type' }),
  xmlBase: PropValue.string({ attr: 'xml:base' }),
  xmlLang: PropValue.string({ attr: 'xml:lang' }),
  xmlns: PropValue.string({ attr: 'xmlns' }),
  xmlnsXlink: PropValue.string({ attr: 'xmlns:xlink' }),
  xmlSpace: PropValue.string({ attr: 'xml:space' }),
  y1: PropValue.stringOrNumber({ attr: 'y1' }),
  y2: PropValue.stringOrNumber({ attr: 'y2' }),
  y: PropValue.stringOrNumber({ attr: 'y' }),
  yChannelSelector: PropValue.string({ attr: 'yChannelSelector' }),
  z: PropValue.stringOrNumber({ attr: 'z' }),
  zoomAndPan: PropValue.string({ attr: 'zoomAndPan' }),
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
