export namespace Frosty {
  export interface ARIAMixin {
    ariaAtomic?: string;
    ariaAutoComplete?: string;
    ariaBrailleLabel?: string;
    ariaBrailleRoleDescription?: string;
    ariaBusy?: string;
    ariaChecked?: string;
    ariaColCount?: string;
    ariaColIndex?: string;
    ariaColIndexText?: string;
    ariaColSpan?: string;
    ariaControls?: string;
    ariaCurrent?: string;
    ariaDescribedBy?: string;
    ariaDescription?: string;
    ariaDetails?: string;
    ariaDisabled?: string;
    ariaErrorMessage?: string;
    ariaExpanded?: string;
    ariaFlowTo?: string;
    ariaHasPopup?: string;
    ariaHidden?: string;
    ariaInvalid?: string;
    ariaKeyShortcuts?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaLevel?: string;
    ariaLive?: string;
    ariaModal?: string;
    ariaMultiLine?: string;
    ariaMultiSelectable?: string;
    ariaOrientation?: string;
    ariaOwns?: string;
    ariaPlaceholder?: string;
    ariaPosInSet?: string;
    ariaPressed?: string;
    ariaReadOnly?: string;
    ariaRelevant?: string;
    ariaRequired?: string;
    ariaRoleDescription?: string;
    ariaRowCount?: string;
    ariaRowIndex?: string;
    ariaRowIndexText?: string;
    ariaRowSpan?: string;
    ariaSelected?: string;
    ariaSetSize?: string;
    ariaSort?: string;
    ariaValueMax?: string;
    ariaValueMin?: string;
    ariaValueNow?: string;
    ariaValueText?: string;
    role?: string;
  }
  export interface ElementAttributes extends ARIAMixin {
  }
  export interface SVGElementInstance {
    about?: string;
    content?: string;
    datatype?: string;
    id?: string;
    lang?: string;
    property?: string;
    rel?: string;
    resource?: string;
    rev?: string;
    tabindex?: string;
    typeof?: string;
  }
  export interface SVGAttributes extends ElementAttributes, SVGElementInstance {
  }
  export interface SVGTests {
    fill?: string;
  }
  export interface SVGGraphicsAttributes extends SVGAttributes, SVGTests {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGFitToViewBox {
    externalResourcesRequired?: string;
    preserveAspectRatio?: string;
    viewBox?: string;
  }
  export interface SVGSVGAttributes extends SVGGraphicsAttributes, SVGFitToViewBox {
    baseProfile?: string;
    contentScriptType?: string;
    contentStyleType?: string;
    focusable?: string;
    focusHighlight?: string;
    height?: number | string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    playbackorder?: string;
    playbackOrder?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    snapshotTime?: string;
    syncBehaviorDefault?: string;
    syncToleranceDefault?: string;
    systemLanguage?: string;
    timelinebegin?: string;
    timelineBegin?: string;
    transform?: string;
    version?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
    zoomAndPan?: string;
  }
  export interface SVGGAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
  }
  export interface SVGDefsAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    systemLanguage?: string;
    transform?: string;
  }
  export interface SVGDescAttributes extends SVGAttributes {
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
  }
  export interface SVGTitleAttributes extends SVGAttributes {
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
  }
  export interface SVGSymbolAttributes extends SVGGraphicsAttributes, SVGFitToViewBox {
    height?: string;
    refX?: string;
    refY?: string;
    width?: string;
    x?: string;
    y?: string;
  }
  export interface SVGUseAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    height?: number | string;
    href?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGImageAttributes extends SVGGraphicsAttributes {
    crossOrigin?: string;
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    height?: number | string;
    href?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    preserveAspectRatio?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
    type?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGSwitchAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
  }
  export interface LinkStyle {
    media?: string;
    type?: string;
  }
  export interface SVGStyleAttributes extends SVGAttributes, LinkStyle {
    title?: string;
  }
  export interface SVGGeometryAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    pathLength?: number;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
  }
  export interface SVGPathData {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    d?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    focusable?: string;
    focusHighlight?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    opacity?: string;
    overflow?: string;
    pathLength?: number;
    pointerEvents?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    systemLanguage?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    transform?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGPathAttributes extends SVGGeometryAttributes, SVGPathData {
  }
  export interface SVGRectAttributes extends SVGGeometryAttributes {
    height?: number | string;
    rx?: number | string;
    ry?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGCircleAttributes extends SVGGeometryAttributes {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
  }
  export interface SVGEllipseAttributes extends SVGGeometryAttributes {
    cx?: number | string;
    cy?: number | string;
    rx?: number | string;
    ry?: number | string;
  }
  export interface SVGLineAttributes extends SVGGeometryAttributes {
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
  }
  export interface SVGAnimatedPoints {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    focusable?: string;
    focusHighlight?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    opacity?: string;
    overflow?: string;
    pathLength?: number;
    pointerEvents?: string;
    points?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    systemLanguage?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    transform?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGPolylineAttributes extends SVGGeometryAttributes, SVGAnimatedPoints {
  }
  export interface SVGPolygonAttributes extends SVGGeometryAttributes, SVGAnimatedPoints {
  }
  export interface SVGTextContentAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    lengthAdjust?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    systemLanguage?: string;
    textLength?: string;
  }
  export interface SVGTextPositioningAttributes extends SVGTextContentAttributes {
    dx?: number;
    dy?: number;
    focusable?: string;
    focusHighlight?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    rotate?: string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGTextAttributes extends SVGTextPositioningAttributes {
    editable?: string;
    transform?: string;
  }
  export interface SVGTSpanAttributes extends SVGTextPositioningAttributes {
  }
  export interface SVGTextPathAttributes extends SVGTextContentAttributes {
    href?: string;
    method?: string;
    path?: string;
    side?: string;
    spacing?: string;
    startOffset?: number | string;
  }
  export interface SVGMarkerAttributes extends SVGAttributes, SVGFitToViewBox {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: string;
    markerWidth?: number | string;
    mask?: string;
    opacity?: string;
    orient?: string;
    overflow?: string;
    pointerEvents?: string;
    refX?: number | string;
    refY?: number | string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGGradientAttributes extends SVGAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    gradientTransform?: string;
    gradientUnits?: string;
    href?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    shapeRendering?: string;
    spreadMethod?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGLinearGradientAttributes extends SVGGradientAttributes {
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
  }
  export interface SVGRadialGradientAttributes extends SVGGradientAttributes {
    cx?: number | string;
    cy?: number | string;
    fr?: number | string;
    fx?: number | string;
    fy?: number | string;
    r?: number | string;
  }
  export interface SVGStopAttributes extends SVGAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    offset?: number;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGPatternAttributes extends SVGAttributes, SVGFitToViewBox {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    height?: number | string;
    href?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    patternContentUnits?: string;
    patternTransform?: string;
    patternUnits?: string;
    pointerEvents?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    systemLanguage?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    width?: number | string;
    wordSpacing?: string;
    writingMode?: string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGClipPathAttributes extends SVGAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipPathUnits?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    systemLanguage?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    transform?: string;
    unicodeBidi?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGMaskAttributes extends SVGAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    height?: number | string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    maskContentUnits?: string;
    maskUnits?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    systemLanguage?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    width?: number | string;
    wordSpacing?: string;
    writingMode?: string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGFilterAttributes extends SVGAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    externalResourcesRequired?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    filterRes?: string;
    filterUnits?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    height?: number | string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    primitiveUnits?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    width?: number | string;
    wordSpacing?: string;
    writingMode?: string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGFEDistantLightAttributes extends SVGAttributes {
    azimuth?: number;
    elevation?: number;
  }
  export interface SVGFEPointLightAttributes extends SVGAttributes {
    x?: number;
    y?: number;
    z?: number;
  }
  export interface SVGFESpotLightAttributes extends SVGAttributes {
    limitingConeAngle?: number;
    pointsAtX?: number;
    pointsAtY?: number;
    pointsAtZ?: number;
    specularExponent?: number;
    x?: number;
    y?: number;
    z?: number;
  }
  export interface SVGFilterPrimitiveStandardAttributes {
    alignmentBaseline?: string;
    baselineShift?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    height?: number | string;
    imageRendering?: string;
    kerning?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    result?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    visibility?: string;
    width?: number | string;
    wordSpacing?: string;
    writingMode?: string;
    x?: number | string;
    y?: number | string;
  }
  export interface SVGFEBlendAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    in2?: string;
    mode?: string;
  }
  export interface SVGFEColorMatrixAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    type?: string;
    values?: string;
  }
  export interface SVGFEComponentTransferAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
  }
  export interface SVGComponentTransferFunctionAttributes extends SVGAttributes {
    amplitude?: string;
    exponent?: string;
    intercept?: string;
    offset?: number;
    slope?: string;
    tableValues?: string;
    type?: string;
  }
  export interface SVGFEFuncRAttributes extends SVGComponentTransferFunctionAttributes {
  }
  export interface SVGFEFuncGAttributes extends SVGComponentTransferFunctionAttributes {
  }
  export interface SVGFEFuncBAttributes extends SVGComponentTransferFunctionAttributes {
  }
  export interface SVGFEFuncAAttributes extends SVGComponentTransferFunctionAttributes {
  }
  export interface SVGFECompositeAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    in2?: string;
    k1?: number;
    k2?: number;
    k3?: number;
    k4?: number;
    operator?: string;
  }
  export interface SVGFEConvolveMatrixAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    bias?: number;
    divisor?: number;
    edgeMode?: string;
    in?: string;
    kernelMatrix?: string;
    kernelUnitLength?: string;
    order?: string;
    preserveAlpha?: boolean;
    targetX?: number;
    targetY?: number;
  }
  export interface SVGFEDiffuseLightingAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    diffuseConstant?: number;
    in?: string;
    kernelUnitLength?: string;
    surfaceScale?: number;
  }
  export interface SVGFEDisplacementMapAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    in2?: string;
    scale?: number;
    xChannelSelector?: string;
    yChannelSelector?: string;
  }
  export interface SVGFEFloodAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
  }
  export interface SVGFEGaussianBlurAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    edgeMode?: string;
    in?: string;
    stdDeviation?: string;
  }
  export interface SVGFEImageAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    crossOrigin?: string;
    externalResourcesRequired?: string;
    href?: string;
    preserveAspectRatio?: string;
  }
  export interface SVGFEMergeAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
  }
  export interface SVGFEMergeNodeAttributes extends SVGAttributes {
    in?: string;
  }
  export interface SVGFEMorphologyAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    operator?: string;
    radius?: string;
  }
  export interface SVGFEOffsetAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    dx?: number;
    dy?: number;
    in?: string;
  }
  export interface SVGFESpecularLightingAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
    kernelUnitLength?: string;
    specularConstant?: number;
    specularExponent?: number;
    surfaceScale?: number;
  }
  export interface SVGFETileAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    in?: string;
  }
  export interface SVGFETurbulenceAttributes extends SVGAttributes, SVGFilterPrimitiveStandardAttributes {
    baseFrequency?: string;
    numOctaves?: number;
    seed?: number;
    stitchTiles?: string;
    type?: string;
  }
  export interface SVGAAttributes extends SVGGraphicsAttributes {
    download?: string;
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    href?: string;
    hreflang?: string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    ping?: string;
    referrerPolicy?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    target?: string;
    transform?: string;
    type?: string;
  }
  export interface SVGViewAttributes extends SVGAttributes, SVGFitToViewBox {
    viewTarget?: string;
    zoomAndPan?: string;
  }
  export interface SVGScriptAttributes extends SVGAttributes {
    crossOrigin?: string;
    externalResourcesRequired?: string;
    href?: string;
    type?: string;
  }
  export interface SVGAnimationAttributes extends SVGAttributes, SVGTests {
    begin?: string;
    dur?: string;
    end?: string;
    externalResourcesRequired?: string;
    href?: string;
    max?: string;
    min?: string;
    repeatCount?: string;
    repeatDur?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    restart?: string;
    systemLanguage?: string;
    to?: string;
  }
  export interface SVGAnimateAttributes extends SVGAnimationAttributes {
    accumulate?: string;
    additive?: string;
    alignmentBaseline?: string;
    attributeName?: string;
    attributeType?: string;
    baselineShift?: string;
    by?: string;
    calcMode?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolation?: string;
    colorInterpolationFilters?: string;
    colorProfile?: string;
    colorRendering?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    enableBackground?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    floodColor?: string;
    floodOpacity?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    from?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    imageRendering?: string;
    kerning?: string;
    keySplines?: string;
    keyTimes?: string;
    letterSpacing?: string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: string;
    overflow?: string;
    pointerEvents?: string;
    shapeRendering?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    textAnchor?: string;
    textDecoration?: string;
    textRendering?: string;
    unicodeBidi?: string;
    values?: string;
    visibility?: string;
    wordSpacing?: string;
    writingMode?: string;
  }
  export interface SVGSetAttributes extends SVGAnimationAttributes {
    attributeName?: string;
    attributeType?: string;
  }
  export interface SVGAnimateMotionAttributes extends SVGAnimationAttributes {
    accumulate?: string;
    additive?: string;
    by?: string;
    calcMode?: string;
    from?: string;
    keyPoints?: string;
    keySplines?: string;
    keyTimes?: string;
    origin?: string;
    path?: string;
    rotate?: string;
    values?: string;
  }
  export interface SVGMPathAttributes extends SVGAttributes {
    externalResourcesRequired?: string;
    href?: string;
  }
  export interface SVGAnimateTransformAttributes extends SVGAnimationAttributes {
    accumulate?: string;
    additive?: string;
    attributeName?: string;
    attributeType?: string;
    by?: string;
    calcMode?: string;
    from?: string;
    keySplines?: string;
    keyTimes?: string;
    type?: string;
    values?: string;
  }
  export interface SVGMetadataAttributes extends SVGAttributes {
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
  }
  export interface SVGForeignObjectAttributes extends SVGGraphicsAttributes {
    externalResourcesRequired?: string;
    focusable?: string;
    focusHighlight?: string;
    height?: number | string;
    navDown?: string;
    navDownLeft?: string;
    navDownRight?: string;
    navLeft?: string;
    navNext?: string;
    navPrev?: string;
    navRight?: string;
    navUp?: string;
    navUpLeft?: string;
    navUpRight?: string;
    requiredExtensions?: string;
    requiredFeatures?: string;
    requiredFonts?: string;
    requiredFormats?: string;
    systemLanguage?: string;
    transform?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }
  export interface ElementContentEditable {
    accessKey?: string;
    autocapitalize?: string;
    autocorrect?: boolean;
    autofocus?: string;
    contenteditable?: string;
    dir?: string;
    draggable?: boolean;
    enterkeyhint?: string;
    exportparts?: string;
    hidden?: boolean | number | string;
    id?: string;
    inert?: boolean;
    inputmode?: string;
    is?: string;
    itemid?: string;
    itemprop?: string;
    itemref?: string;
    itemscope?: string;
    itemtype?: string;
    lang?: string;
    nonce?: string;
    part?: string;
    popover?: string;
    slot?: string;
    spellcheck?: boolean;
    tabindex?: string;
    title?: string;
    translate?: boolean;
    writingSuggestions?: string;
  }
  export interface HTMLAttributes extends ElementAttributes, ElementContentEditable {
  }
  export interface HTMLHtmlAttributes extends HTMLAttributes {
    manifest?: string;
    version?: string;
  }
  export interface HTMLHeadAttributes extends HTMLAttributes {
    profile?: string;
  }
  export interface HTMLTitleAttributes extends HTMLAttributes {
  }
  export interface HTMLBaseAttributes extends HTMLAttributes {
    href?: string;
    target?: string;
  }
  export interface HTMLLinkAttributes extends HTMLAttributes, LinkStyle {
    as?: string;
    blocking?: string;
    charset?: string;
    color?: string;
    crossOrigin?: string;
    disabled?: boolean;
    fetchPriority?: string;
    href?: string;
    hreflang?: string;
    imageSizes?: string;
    imageSrcset?: string;
    integrity?: string;
    referrerPolicy?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
  }
  export interface HTMLMetaAttributes extends HTMLAttributes {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    media?: string;
    name?: string;
    scheme?: string;
  }
  export interface HTMLStyleAttributes extends HTMLAttributes, LinkStyle {
    blocking?: string;
  }
  export interface HTMLBodyAttributes extends HTMLAttributes {
    aLink?: string;
    background?: string;
    bgColor?: string;
    link?: string;
    text?: string;
    vLink?: string;
  }
  export interface HTMLHeadingAttributes extends HTMLAttributes {
    align?: string;
  }
  export interface HTMLParagraphAttributes extends HTMLAttributes {
    align?: string;
  }
  export interface HTMLHRAttributes extends HTMLAttributes {
    align?: string;
    noShade?: boolean;
    size?: string;
    width?: string;
  }
  export interface HTMLPreAttributes extends HTMLAttributes {
    width?: number;
  }
  export interface HTMLQuoteAttributes extends HTMLAttributes {
    cite?: string;
  }
  export interface HTMLOListAttributes extends HTMLAttributes {
    compact?: boolean;
    reversed?: boolean;
    start?: number;
    type?: string;
  }
  export interface HTMLUListAttributes extends HTMLAttributes {
    compact?: boolean;
    type?: string;
  }
  export interface HTMLMenuAttributes extends HTMLAttributes {
    compact?: boolean;
  }
  export interface HTMLLIAttributes extends HTMLAttributes {
    type?: string;
    value?: number;
  }
  export interface HTMLDListAttributes extends HTMLAttributes {
    compact?: boolean;
  }
  export interface HTMLDivAttributes extends HTMLAttributes {
    align?: string;
  }
  export interface HTMLAttributionSrcElementUtils {
    referrerPolicy?: string;
  }
  export interface HTMLHyperlinkElementUtils {
    coords?: string;
    download?: string;
    href?: string;
    hreflang?: string;
    ping?: string;
    referrerPolicy?: string;
    rel?: string;
    shape?: string;
    target?: string;
    type?: string;
  }
  export interface HTMLAnchorAttributes extends HTMLAttributes, HTMLAttributionSrcElementUtils, HTMLHyperlinkElementUtils {
    charset?: string;
    name?: string;
    rev?: string;
  }
  export interface HTMLDataAttributes extends HTMLAttributes {
    value?: string;
  }
  export interface HTMLTimeAttributes extends HTMLAttributes {
    dateTime?: string;
  }
  export interface HTMLSpanAttributes extends HTMLAttributes {
  }
  export interface HTMLBRAttributes extends HTMLAttributes {
    clear?: string;
  }
  export interface HTMLModAttributes extends HTMLAttributes {
    cite?: string;
    dateTime?: string;
  }
  export interface HTMLPictureAttributes extends HTMLAttributes {
  }
  export interface HTMLSourceAttributes extends HTMLAttributes {
    height?: number;
    media?: string;
    sizes?: string;
    src?: string;
    srcset?: string;
    type?: string;
    width?: number;
  }
  export interface HTMLSharedStorageWritableElementUtils {
    align?: string;
    height?: number;
    loading?: string;
    longDesc?: string;
    name?: string;
    referrerPolicy?: string;
    src?: string;
    width?: string;
  }
  export interface HTMLImageAttributes extends HTMLAttributes, HTMLAttributionSrcElementUtils, HTMLSharedStorageWritableElementUtils {
    alt?: string;
    border?: string;
    crossOrigin?: string;
    decoding?: string;
    fetchPriority?: string;
    hspace?: number;
    isMap?: boolean;
    sizes?: string;
    srcset?: string;
    useMap?: string;
    vspace?: number;
  }
  export interface HTMLIFrameAttributes extends HTMLAttributes, HTMLSharedStorageWritableElementUtils {
    allow?: string;
    allowFullscreen?: boolean;
    allowpaymentrequest?: string;
    allowusermedia?: string;
    frameBorder?: string;
    marginHeight?: string;
    marginWidth?: string;
    sandbox?: string;
    scrolling?: string;
    srcdoc?: string;
  }
  export interface HTMLEmbedAttributes extends HTMLAttributes {
    height?: string;
    src?: string;
    type?: string;
    width?: string;
  }
  export interface HTMLObjectAttributes extends HTMLAttributes {
    align?: string;
    archive?: string;
    border?: string;
    classid?: string;
    codeBase?: string;
    codeType?: string;
    data?: string;
    declare?: boolean;
    form?: string;
    height?: string;
    hspace?: number;
    name?: string;
    standby?: string;
    type?: string;
    typemustmatch?: string;
    useMap?: string;
    vspace?: number;
    width?: string;
  }
  export interface HTMLMediaAttributes extends HTMLAttributes {
    autoplay?: string;
    controls?: string;
    crossOrigin?: string;
    loop?: string;
    muted?: string;
    preload?: string;
    src?: string;
  }
  export interface HTMLVideoAttributes extends HTMLMediaAttributes {
    height?: number;
    playsInline?: boolean;
    poster?: string;
    width?: number;
  }
  export interface HTMLAudioAttributes extends HTMLMediaAttributes {
  }
  export interface HTMLTrackAttributes extends HTMLAttributes {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srclang?: string;
  }
  export interface HTMLMapAttributes extends HTMLAttributes {
    name?: string;
  }
  export interface HTMLAreaAttributes extends HTMLAttributes, HTMLAttributionSrcElementUtils, HTMLHyperlinkElementUtils {
    alt?: string;
    noHref?: boolean;
  }
  export interface HTMLTableAttributes extends HTMLAttributes {
    align?: string;
    bgColor?: string;
    border?: string;
    cellPadding?: string;
    cellSpacing?: string;
    frame?: string;
    rules?: string;
    summary?: string;
    width?: string;
  }
  export interface HTMLTableCaptionAttributes extends HTMLAttributes {
    align?: string;
  }
  export interface HTMLTableColAttributes extends HTMLAttributes {
    align?: string;
    char?: string;
    charoff?: string;
    span?: number;
    vAlign?: string;
    width?: string;
  }
  export interface HTMLTableSectionAttributes extends HTMLAttributes {
    align?: string;
    char?: string;
    charoff?: string;
    vAlign?: string;
  }
  export interface HTMLTableRowAttributes extends HTMLAttributes {
    align?: string;
    bgColor?: string;
    char?: string;
    charoff?: string;
    vAlign?: string;
  }
  export interface HTMLTableCellAttributes extends HTMLAttributes {
    abbr?: string;
    align?: string;
    axis?: string;
    bgColor?: string;
    char?: string;
    charoff?: string;
    colSpan?: number;
    headers?: string;
    height?: string;
    noWrap?: boolean;
    rowSpan?: number;
    scope?: string;
    vAlign?: string;
    width?: string;
  }
  export interface HTMLFormAttributes extends HTMLAttributes {
    accept?: string;
    acceptCharset?: string;
    action?: string;
    autocomplete?: string;
    enctype?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
  }
  export interface HTMLLabelAttributes extends HTMLAttributes {
    for?: string;
    form?: string;
  }
  export interface PopoverInvokerAttributes {
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEnctype?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    popovertarget?: string;
    popovertargetaction?: string;
    type?: string;
    value?: number;
  }
  export interface HTMLInputAttributes extends HTMLAttributes, PopoverInvokerAttributes {
    accept?: string;
    align?: string;
    alpha?: boolean;
    alt?: string;
    autocomplete?: string;
    checked?: boolean;
    colorSpace?: string;
    dirName?: string;
    height?: number;
    ismap?: string;
    list?: string;
    max?: string;
    maxLength?: number;
    min?: string;
    minLength?: number;
    multiple?: boolean;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: string;
    useMap?: string;
    width?: number;
  }
  export interface HTMLButtonAttributes extends HTMLAttributes, PopoverInvokerAttributes {
    command?: string;
    commandfor?: string;
  }
  export interface HTMLSelectAttributes extends HTMLAttributes {
    autocomplete?: string;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
  }
  export interface HTMLDataListAttributes extends HTMLAttributes {
  }
  export interface HTMLOptGroupAttributes extends HTMLAttributes {
    disabled?: boolean;
    label?: string;
  }
  export interface HTMLOptionAttributes extends HTMLAttributes {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
  }
  export interface HTMLTextAreaAttributes extends HTMLAttributes {
    autocomplete?: string;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    wrap?: string;
  }
  export interface HTMLOutputAttributes extends HTMLAttributes {
    for?: string;
    form?: string;
    name?: string;
  }
  export interface HTMLProgressAttributes extends HTMLAttributes {
    max?: number;
    value?: number;
  }
  export interface HTMLMeterAttributes extends HTMLAttributes {
    high?: number;
    low?: number;
    max?: number;
    min?: number;
    optimum?: number;
    value?: number;
  }
  export interface HTMLFieldSetAttributes extends HTMLAttributes {
    disabled?: boolean;
    form?: string;
    name?: string;
  }
  export interface HTMLLegendAttributes extends HTMLAttributes {
    align?: string;
  }
  export interface HTMLSelectedContentAttributes extends HTMLAttributes {
  }
  export interface HTMLDetailsAttributes extends HTMLAttributes {
    name?: string;
    open?: boolean;
  }
  export interface HTMLDialogAttributes extends HTMLAttributes {
    closedBy?: string;
    open?: boolean;
  }
  export interface HTMLScriptAttributes extends HTMLAttributes, HTMLAttributionSrcElementUtils {
    async?: boolean;
    blocking?: string;
    charset?: string;
    crossOrigin?: string;
    defer?: boolean;
    fetchPriority?: string;
    integrity?: string;
    language?: string;
    noModule?: boolean;
    src?: string;
    type?: string;
  }
  export interface HTMLTemplateAttributes extends HTMLAttributes {
    shadowRootClonable?: boolean;
    shadowRootCustomElementRegistry?: string;
    shadowRootDelegatesFocus?: boolean;
    shadowRootMode?: string;
    shadowRootSerializable?: boolean;
  }
  export interface HTMLSlotAttributes extends HTMLAttributes {
    name?: string;
  }
  export interface HTMLCanvasAttributes extends HTMLAttributes {
    height?: number;
    width?: number;
  }
  export interface HTMLUnknownAttributes extends HTMLAttributes {
    align?: string;
    alt?: string;
    archive?: string;
    code?: string;
    codebase?: string;
    height?: string;
    hspace?: string;
    name?: string;
    object?: string;
    vspace?: string;
    width?: string;
  }
  export interface HTMLDirectoryAttributes extends HTMLAttributes {
    compact?: boolean;
  }
  export interface HTMLFrameAttributes extends HTMLAttributes {
    frameBorder?: string;
    longDesc?: string;
    marginHeight?: string;
    marginWidth?: string;
    name?: string;
    noResize?: boolean;
    scrolling?: string;
    src?: string;
  }
  export interface HTMLFrameSetAttributes extends HTMLAttributes {
    cols?: string;
    rows?: string;
  }
  export interface HTMLParamAttributes extends HTMLAttributes {
    name?: string;
    type?: string;
    value?: string;
    valueType?: string;
  }
  export interface HTMLFontAttributes extends HTMLAttributes {
    color?: string;
    face?: string;
    size?: string;
  }
  export interface HTMLMarqueeAttributes extends HTMLAttributes {
  }
  export interface MathMLAttributes extends ElementAttributes {
  }
  export interface HTMLElementAttributeTagNameMap {
    'article': HTMLAttributes;
    'html': HTMLHtmlAttributes;
    'head': HTMLHeadAttributes;
    'title': HTMLTitleAttributes;
    'base': HTMLBaseAttributes;
    'link': HTMLLinkAttributes;
    'meta': HTMLMetaAttributes;
    'style': HTMLStyleAttributes;
    'body': HTMLBodyAttributes;
    'h1': HTMLHeadingAttributes;
    'p': HTMLParagraphAttributes;
    'hr': HTMLHRAttributes;
    'pre': HTMLPreAttributes;
    'blockquote': HTMLQuoteAttributes;
    'ol': HTMLOListAttributes;
    'ul': HTMLUListAttributes;
    'menu': HTMLMenuAttributes;
    'li': HTMLLIAttributes;
    'dl': HTMLDListAttributes;
    'div': HTMLDivAttributes;
    'a': HTMLAnchorAttributes;
    'data': HTMLDataAttributes;
    'time': HTMLTimeAttributes;
    'span': HTMLSpanAttributes;
    'br': HTMLBRAttributes;
    'ins': HTMLModAttributes;
    'picture': HTMLPictureAttributes;
    'source': HTMLSourceAttributes;
    'img': HTMLImageAttributes;
    'iframe': HTMLIFrameAttributes;
    'embed': HTMLEmbedAttributes;
    'object': HTMLObjectAttributes;
    'video': HTMLVideoAttributes;
    'audio': HTMLAudioAttributes;
    'track': HTMLTrackAttributes;
    'map': HTMLMapAttributes;
    'area': HTMLAreaAttributes;
    'table': HTMLTableAttributes;
    'caption': HTMLTableCaptionAttributes;
    'colgroup': HTMLTableColAttributes;
    'tbody': HTMLTableSectionAttributes;
    'tr': HTMLTableRowAttributes;
    'td': HTMLTableCellAttributes;
    'form': HTMLFormAttributes;
    'label': HTMLLabelAttributes;
    'input': HTMLInputAttributes;
    'button': HTMLButtonAttributes;
    'select': HTMLSelectAttributes;
    'datalist': HTMLDataListAttributes;
    'optgroup': HTMLOptGroupAttributes;
    'option': HTMLOptionAttributes;
    'textarea': HTMLTextAreaAttributes;
    'output': HTMLOutputAttributes;
    'progress': HTMLProgressAttributes;
    'meter': HTMLMeterAttributes;
    'fieldset': HTMLFieldSetAttributes;
    'legend': HTMLLegendAttributes;
    'selectedcontent': HTMLSelectedContentAttributes;
    'details': HTMLDetailsAttributes;
    'dialog': HTMLDialogAttributes;
    'script': HTMLScriptAttributes;
    'template': HTMLTemplateAttributes;
    'slot': HTMLSlotAttributes;
    'canvas': HTMLCanvasAttributes;
    'applet': HTMLUnknownAttributes;
    'dir': HTMLDirectoryAttributes;
    'frame': HTMLFrameAttributes;
    'frameset': HTMLFrameSetAttributes;
    'param': HTMLParamAttributes;
    'font': HTMLFontAttributes;
    'marquee': HTMLMarqueeAttributes;
  }
  export interface SVGElementAttributeTagNameMap {
    'svg': SVGSVGAttributes;
    'g': SVGGAttributes;
    'defs': SVGDefsAttributes;
    'desc': SVGDescAttributes;
    'title': SVGTitleAttributes;
    'symbol': SVGSymbolAttributes;
    'use': SVGUseAttributes;
    'image': SVGImageAttributes;
    'switch': SVGSwitchAttributes;
    'style': SVGStyleAttributes;
    'path': SVGPathAttributes;
    'rect': SVGRectAttributes;
    'circle': SVGCircleAttributes;
    'ellipse': SVGEllipseAttributes;
    'line': SVGLineAttributes;
    'polyline': SVGPolylineAttributes;
    'polygon': SVGPolygonAttributes;
    'text': SVGTextAttributes;
    'tspan': SVGTSpanAttributes;
    'textPath': SVGTextPathAttributes;
    'marker': SVGMarkerAttributes;
    'linearGradient': SVGLinearGradientAttributes;
    'radialGradient': SVGRadialGradientAttributes;
    'stop': SVGStopAttributes;
    'pattern': SVGPatternAttributes;
    'clipPath': SVGClipPathAttributes;
    'mask': SVGMaskAttributes;
    'filter': SVGFilterAttributes;
    'feDistantLight': SVGFEDistantLightAttributes;
    'fePointLight': SVGFEPointLightAttributes;
    'feSpotLight': SVGFESpotLightAttributes;
    'feBlend': SVGFEBlendAttributes;
    'feColorMatrix': SVGFEColorMatrixAttributes;
    'feComponentTransfer': SVGFEComponentTransferAttributes;
    'feFuncR': SVGFEFuncRAttributes;
    'feFuncG': SVGFEFuncGAttributes;
    'feFuncB': SVGFEFuncBAttributes;
    'feFuncA': SVGFEFuncAAttributes;
    'feComposite': SVGFECompositeAttributes;
    'feConvolveMatrix': SVGFEConvolveMatrixAttributes;
    'feDiffuseLighting': SVGFEDiffuseLightingAttributes;
    'feDisplacementMap': SVGFEDisplacementMapAttributes;
    'feFlood': SVGFEFloodAttributes;
    'feGaussianBlur': SVGFEGaussianBlurAttributes;
    'feImage': SVGFEImageAttributes;
    'feMerge': SVGFEMergeAttributes;
    'feMergeNode': SVGFEMergeNodeAttributes;
    'feMorphology': SVGFEMorphologyAttributes;
    'feOffset': SVGFEOffsetAttributes;
    'feSpecularLighting': SVGFESpecularLightingAttributes;
    'feTile': SVGFETileAttributes;
    'feTurbulence': SVGFETurbulenceAttributes;
    'a': SVGAAttributes;
    'view': SVGViewAttributes;
    'script': SVGScriptAttributes;
    'animate': SVGAnimateAttributes;
    'set': SVGSetAttributes;
    'animateMotion': SVGAnimateMotionAttributes;
    'mpath': SVGMPathAttributes;
    'animateTransform': SVGAnimateTransformAttributes;
    'metadata': SVGMetadataAttributes;
    'foreignObject': SVGForeignObjectAttributes;
  }
}
export const HTMLElementAttributeMaps = {
  "*": [
    "accesskey",
    "autocapitalize",
    "autocorrect",
    "autofocus",
    "class",
    "contenteditable",
    "dir",
    "draggable",
    "enterkeyhint",
    "exportparts",
    "hidden",
    "id",
    "inert",
    "inputmode",
    "is",
    "itemid",
    "itemprop",
    "itemref",
    "itemscope",
    "itemtype",
    "lang",
    "nonce",
    "part",
    "popover",
    "slot",
    "spellcheck",
    "style",
    "tabindex",
    "title",
    "translate",
    "writingsuggestions"
  ],
  "a": [
    "charset",
    "coords",
    "download",
    "href",
    "hreflang",
    "name",
    "ping",
    "referrerpolicy",
    "rel",
    "rev",
    "shape",
    "target",
    "type"
  ],
  "applet": [
    "align",
    "alt",
    "archive",
    "code",
    "codebase",
    "height",
    "hspace",
    "name",
    "object",
    "vspace",
    "width"
  ],
  "area": [
    "alt",
    "coords",
    "download",
    "href",
    "hreflang",
    "nohref",
    "ping",
    "referrerpolicy",
    "rel",
    "shape",
    "target",
    "type"
  ],
  "audio": [
    "autoplay",
    "controls",
    "crossorigin",
    "loop",
    "muted",
    "preload",
    "src"
  ],
  "base": [
    "href",
    "target"
  ],
  "basefont": [
    "color",
    "face",
    "size"
  ],
  "blockquote": [
    "cite"
  ],
  "body": [
    "alink",
    "background",
    "bgcolor",
    "link",
    "text",
    "vlink"
  ],
  "br": [
    "clear"
  ],
  "button": [
    "command",
    "commandfor",
    "disabled",
    "form",
    "formaction",
    "formenctype",
    "formmethod",
    "formnovalidate",
    "formtarget",
    "name",
    "popovertarget",
    "popovertargetaction",
    "type",
    "value"
  ],
  "canvas": [
    "height",
    "width"
  ],
  "caption": [
    "align"
  ],
  "col": [
    "align",
    "char",
    "charoff",
    "span",
    "valign",
    "width"
  ],
  "colgroup": [
    "align",
    "char",
    "charoff",
    "span",
    "valign",
    "width"
  ],
  "data": [
    "value"
  ],
  "del": [
    "cite",
    "datetime"
  ],
  "details": [
    "name",
    "open"
  ],
  "dialog": [
    "closedby",
    "open"
  ],
  "dir": [
    "compact"
  ],
  "div": [
    "align"
  ],
  "dl": [
    "compact"
  ],
  "embed": [
    "height",
    "src",
    "type",
    "width"
  ],
  "fieldset": [
    "disabled",
    "form",
    "name"
  ],
  "font": [
    "color",
    "face",
    "size"
  ],
  "form": [
    "accept",
    "accept-charset",
    "action",
    "autocomplete",
    "enctype",
    "method",
    "name",
    "novalidate",
    "target"
  ],
  "frame": [
    "frameborder",
    "longdesc",
    "marginheight",
    "marginwidth",
    "name",
    "noresize",
    "scrolling",
    "src"
  ],
  "frameset": [
    "cols",
    "rows"
  ],
  "h1": [
    "align"
  ],
  "h2": [
    "align"
  ],
  "h3": [
    "align"
  ],
  "h4": [
    "align"
  ],
  "h5": [
    "align"
  ],
  "h6": [
    "align"
  ],
  "head": [
    "profile"
  ],
  "hr": [
    "align",
    "noshade",
    "size",
    "width"
  ],
  "html": [
    "manifest",
    "version"
  ],
  "iframe": [
    "align",
    "allow",
    "allowfullscreen",
    "allowpaymentrequest",
    "allowusermedia",
    "frameborder",
    "height",
    "loading",
    "longdesc",
    "marginheight",
    "marginwidth",
    "name",
    "referrerpolicy",
    "sandbox",
    "scrolling",
    "src",
    "srcdoc",
    "width"
  ],
  "img": [
    "align",
    "alt",
    "border",
    "crossorigin",
    "decoding",
    "fetchpriority",
    "height",
    "hspace",
    "ismap",
    "loading",
    "longdesc",
    "name",
    "referrerpolicy",
    "sizes",
    "src",
    "srcset",
    "usemap",
    "vspace",
    "width"
  ],
  "input": [
    "accept",
    "align",
    "alpha",
    "alt",
    "autocomplete",
    "checked",
    "colorspace",
    "dirname",
    "disabled",
    "form",
    "formaction",
    "formenctype",
    "formmethod",
    "formnovalidate",
    "formtarget",
    "height",
    "ismap",
    "list",
    "max",
    "maxlength",
    "min",
    "minlength",
    "multiple",
    "name",
    "pattern",
    "placeholder",
    "popovertarget",
    "popovertargetaction",
    "readonly",
    "required",
    "size",
    "src",
    "step",
    "type",
    "usemap",
    "value",
    "width"
  ],
  "ins": [
    "cite",
    "datetime"
  ],
  "isindex": [
    "prompt"
  ],
  "label": [
    "for",
    "form"
  ],
  "legend": [
    "align"
  ],
  "li": [
    "type",
    "value"
  ],
  "link": [
    "as",
    "blocking",
    "charset",
    "color",
    "crossorigin",
    "disabled",
    "fetchpriority",
    "href",
    "hreflang",
    "imagesizes",
    "imagesrcset",
    "integrity",
    "media",
    "referrerpolicy",
    "rel",
    "rev",
    "sizes",
    "target",
    "type"
  ],
  "map": [
    "name"
  ],
  "menu": [
    "compact"
  ],
  "meta": [
    "charset",
    "content",
    "http-equiv",
    "media",
    "name",
    "scheme"
  ],
  "meter": [
    "high",
    "low",
    "max",
    "min",
    "optimum",
    "value"
  ],
  "object": [
    "align",
    "archive",
    "border",
    "classid",
    "codebase",
    "codetype",
    "data",
    "declare",
    "form",
    "height",
    "hspace",
    "name",
    "standby",
    "type",
    "typemustmatch",
    "usemap",
    "vspace",
    "width"
  ],
  "ol": [
    "compact",
    "reversed",
    "start",
    "type"
  ],
  "optgroup": [
    "disabled",
    "label"
  ],
  "option": [
    "disabled",
    "label",
    "selected",
    "value"
  ],
  "output": [
    "for",
    "form",
    "name"
  ],
  "p": [
    "align"
  ],
  "param": [
    "name",
    "type",
    "value",
    "valuetype"
  ],
  "pre": [
    "width"
  ],
  "progress": [
    "max",
    "value"
  ],
  "q": [
    "cite"
  ],
  "script": [
    "async",
    "blocking",
    "charset",
    "crossorigin",
    "defer",
    "fetchpriority",
    "integrity",
    "language",
    "nomodule",
    "referrerpolicy",
    "src",
    "type"
  ],
  "select": [
    "autocomplete",
    "disabled",
    "form",
    "multiple",
    "name",
    "required",
    "size"
  ],
  "slot": [
    "name"
  ],
  "source": [
    "height",
    "media",
    "sizes",
    "src",
    "srcset",
    "type",
    "width"
  ],
  "style": [
    "blocking",
    "media",
    "type"
  ],
  "table": [
    "align",
    "bgcolor",
    "border",
    "cellpadding",
    "cellspacing",
    "frame",
    "rules",
    "summary",
    "width"
  ],
  "tbody": [
    "align",
    "char",
    "charoff",
    "valign"
  ],
  "td": [
    "abbr",
    "align",
    "axis",
    "bgcolor",
    "char",
    "charoff",
    "colspan",
    "headers",
    "height",
    "nowrap",
    "rowspan",
    "scope",
    "valign",
    "width"
  ],
  "template": [
    "shadowrootclonable",
    "shadowrootcustomelementregistry",
    "shadowrootdelegatesfocus",
    "shadowrootmode",
    "shadowrootserializable"
  ],
  "textarea": [
    "autocomplete",
    "cols",
    "dirname",
    "disabled",
    "form",
    "maxlength",
    "minlength",
    "name",
    "placeholder",
    "readonly",
    "required",
    "rows",
    "wrap"
  ],
  "tfoot": [
    "align",
    "char",
    "charoff",
    "valign"
  ],
  "th": [
    "abbr",
    "align",
    "axis",
    "bgcolor",
    "char",
    "charoff",
    "colspan",
    "headers",
    "height",
    "nowrap",
    "rowspan",
    "scope",
    "valign",
    "width"
  ],
  "thead": [
    "align",
    "char",
    "charoff",
    "valign"
  ],
  "time": [
    "datetime"
  ],
  "tr": [
    "align",
    "bgcolor",
    "char",
    "charoff",
    "valign"
  ],
  "track": [
    "default",
    "kind",
    "label",
    "src",
    "srclang"
  ],
  "ul": [
    "compact",
    "type"
  ],
  "video": [
    "autoplay",
    "controls",
    "crossorigin",
    "height",
    "loop",
    "muted",
    "playsinline",
    "poster",
    "preload",
    "src",
    "width"
  ]
};
export const SVGElementAttributeMaps = {
  "*": [
    "about",
    "class",
    "content",
    "datatype",
    "id",
    "lang",
    "property",
    "rel",
    "resource",
    "rev",
    "style",
    "tabindex",
    "typeof"
  ],
  "a": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "download",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "href",
    "hreflang",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "ping",
    "pointer-events",
    "referrerpolicy",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "target",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "type",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "altGlyph": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "format",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "glyphRef",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "rotate",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "altGlyphDef": [],
  "altGlyphItem": [],
  "animate": [
    "accumulate",
    "additive",
    "alignment-baseline",
    "attributeName",
    "attributeType",
    "baseline-shift",
    "begin",
    "by",
    "calcMode",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dur",
    "enable-background",
    "end",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "from",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "href",
    "image-rendering",
    "kerning",
    "keySplines",
    "keyTimes",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "max",
    "min",
    "opacity",
    "overflow",
    "pointer-events",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "to",
    "unicode-bidi",
    "values",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "animateColor": [
    "accumulate",
    "additive",
    "alignment-baseline",
    "attributeName",
    "attributeType",
    "baseline-shift",
    "begin",
    "by",
    "calcMode",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dur",
    "enable-background",
    "end",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "from",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "keySplines",
    "keyTimes",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "max",
    "min",
    "opacity",
    "overflow",
    "pointer-events",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "to",
    "unicode-bidi",
    "values",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "animateMotion": [
    "accumulate",
    "additive",
    "begin",
    "by",
    "calcMode",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "from",
    "href",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "max",
    "min",
    "origin",
    "path",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "rotate",
    "systemLanguage",
    "to",
    "values"
  ],
  "animateTransform": [
    "accumulate",
    "additive",
    "attributeName",
    "attributeType",
    "begin",
    "by",
    "calcMode",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "from",
    "href",
    "keySplines",
    "keyTimes",
    "max",
    "min",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "systemLanguage",
    "to",
    "type",
    "values"
  ],
  "animation": [
    "begin",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "focusHighlight",
    "focusable",
    "height",
    "initialVisibility",
    "max",
    "min",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "preserveAspectRatio",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "syncBehavior",
    "syncMaster",
    "syncTolerance",
    "systemLanguage",
    "transform",
    "width",
    "x",
    "y"
  ],
  "audio": [
    "begin",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "max",
    "min",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "syncBehavior",
    "syncMaster",
    "syncTolerance",
    "systemLanguage",
    "type"
  ],
  "canvas": [
    "preserveAspectRatio",
    "requiredExtensions",
    "systemLanguage"
  ],
  "circle": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "cx",
    "cy",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "r",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "clipPath": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "clipPathUnits",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "color-profile": [
    "local",
    "name",
    "rendering-intent"
  ],
  "cursor": [
    "externalResourcesRequired",
    "requiredExtensions",
    "requiredFeatures",
    "systemLanguage",
    "x",
    "y"
  ],
  "defs": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "desc": [
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage"
  ],
  "discard": [
    "begin",
    "href",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage"
  ],
  "ellipse": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "cx",
    "cy",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "rx",
    "ry",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "feBlend": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "in2",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "mode",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feColorMatrix": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "type",
    "unicode-bidi",
    "values",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feComponentTransfer": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feComposite": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "in2",
    "k1",
    "k2",
    "k3",
    "k4",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "operator",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feConvolveMatrix": [
    "alignment-baseline",
    "baseline-shift",
    "bias",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "divisor",
    "dominant-baseline",
    "edgeMode",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kernelMatrix",
    "kernelUnitLength",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "order",
    "overflow",
    "pointer-events",
    "preserveAlpha",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "targetX",
    "targetY",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feDiffuseLighting": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "diffuseConstant",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kernelUnitLength",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "surfaceScale",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feDisplacementMap": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "in2",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "scale",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "xChannelSelector",
    "y",
    "yChannelSelector"
  ],
  "feDistantLight": [
    "azimuth",
    "elevation"
  ],
  "feDropShadow": [
    "dx",
    "dy",
    "height",
    "in",
    "result",
    "stdDeviation",
    "width",
    "x",
    "y"
  ],
  "feFlood": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feFuncA": [
    "amplitude",
    "exponent",
    "intercept",
    "offset",
    "slope",
    "tableValues",
    "type"
  ],
  "feFuncB": [
    "amplitude",
    "exponent",
    "intercept",
    "offset",
    "slope",
    "tableValues",
    "type"
  ],
  "feFuncG": [
    "amplitude",
    "exponent",
    "intercept",
    "offset",
    "slope",
    "tableValues",
    "type"
  ],
  "feFuncR": [
    "amplitude",
    "exponent",
    "intercept",
    "offset",
    "slope",
    "tableValues",
    "type"
  ],
  "feGaussianBlur": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "edgeMode",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stdDeviation",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feImage": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "crossorigin",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "preserveAspectRatio",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feMerge": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feMergeNode": [
    "in"
  ],
  "feMorphology": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "operator",
    "overflow",
    "pointer-events",
    "radius",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feOffset": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "fePointLight": [
    "x",
    "y",
    "z"
  ],
  "feSpecularLighting": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kernelUnitLength",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "specularConstant",
    "specularExponent",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "surfaceScale",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feSpotLight": [
    "limitingConeAngle",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "specularExponent",
    "x",
    "y",
    "z"
  ],
  "feTile": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "in",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "feTurbulence": [
    "alignment-baseline",
    "baseFrequency",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "numOctaves",
    "opacity",
    "overflow",
    "pointer-events",
    "result",
    "seed",
    "shape-rendering",
    "stitchTiles",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "type",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "filter": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "filterRes",
    "filterUnits",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "primitiveUnits",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "font": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "horiz-origin-y",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "font-face": [
    "accent-height",
    "alphabetic",
    "ascent",
    "bbox",
    "cap-height",
    "descent",
    "externalResourcesRequired",
    "font-family",
    "font-size",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "hanging",
    "ideographic",
    "mathematical",
    "overline-position",
    "overline-thickness",
    "panose-1",
    "slope",
    "stemh",
    "stemv",
    "strikethrough-position",
    "strikethrough-thickness",
    "underline-position",
    "underline-thickness",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "widths",
    "x-height"
  ],
  "font-face-format": [
    "string"
  ],
  "font-face-name": [
    "name"
  ],
  "font-face-src": [],
  "font-face-uri": [
    "externalResourcesRequired"
  ],
  "foreignObject": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "g": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "glyph": [
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "d",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "orientation",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode",
    "unicode-bidi",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "glyphRef": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "format",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "glyphRef",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "handler": [
    "externalResourcesRequired",
    "type"
  ],
  "hkern": [
    "g1",
    "g2",
    "k",
    "u1",
    "u2"
  ],
  "iframe": [
    "requiredExtensions",
    "systemLanguage"
  ],
  "image": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "crossorigin",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "preserveAspectRatio",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "type",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "line": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x1",
    "x2",
    "y1",
    "y2"
  ],
  "linearGradient": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "gradientTransform",
    "gradientUnits",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "spreadMethod",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x1",
    "x2",
    "y1",
    "y2"
  ],
  "listener": [
    "defaultAction",
    "event",
    "handler",
    "observer",
    "phase",
    "propagate",
    "target"
  ],
  "marker": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "mask",
    "opacity",
    "orient",
    "overflow",
    "pointer-events",
    "preserveAspectRatio",
    "refX",
    "refY",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "viewBox",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "mask": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "maskContentUnits",
    "maskUnits",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "metadata": [
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage"
  ],
  "missing-glyph": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "d",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "mpath": [
    "externalResourcesRequired",
    "href"
  ],
  "path": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "d",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "pattern": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointer-events",
    "preserveAspectRatio",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "viewBox",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "polygon": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "points",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "polyline": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "points",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "prefetch": [
    "bandwidth",
    "mediaCharacterEncoding",
    "mediaContentEncodings",
    "mediaSize",
    "mediaTime"
  ],
  "radialGradient": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "cx",
    "cy",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "fr",
    "fx",
    "fy",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "gradientTransform",
    "gradientUnits",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "r",
    "shape-rendering",
    "spreadMethod",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "rect": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pathLength",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "rx",
    "ry",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "script": [
    "crossorigin",
    "externalResourcesRequired",
    "href",
    "type"
  ],
  "set": [
    "attributeName",
    "attributeType",
    "begin",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "href",
    "max",
    "min",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "systemLanguage",
    "to"
  ],
  "solidColor": [],
  "stop": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "offset",
    "opacity",
    "overflow",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "style": [
    "media",
    "title",
    "type"
  ],
  "svg": [
    "alignment-baseline",
    "baseProfile",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "contentScriptType",
    "contentStyleType",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "playbackOrder",
    "playbackorder",
    "pointer-events",
    "preserveAspectRatio",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "snapshotTime",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "syncBehaviorDefault",
    "syncToleranceDefault",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "timelineBegin",
    "timelinebegin",
    "transform",
    "unicode-bidi",
    "version",
    "viewBox",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y",
    "zoomAndPan"
  ],
  "switch": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "symbol": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "preserveAspectRatio",
    "refX",
    "refY",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "viewBox",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "tbreak": [
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage"
  ],
  "text": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "editable",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "lengthAdjust",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "rotate",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textLength",
    "transform",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "textArea": [
    "editable",
    "focusHighlight",
    "focusable",
    "height",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage",
    "transform",
    "width",
    "x",
    "y"
  ],
  "textPath": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "href",
    "image-rendering",
    "kerning",
    "lengthAdjust",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "method",
    "opacity",
    "overflow",
    "path",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "shape-rendering",
    "side",
    "spacing",
    "startOffset",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textLength",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode"
  ],
  "title": [
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "systemLanguage"
  ],
  "tref": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "lengthAdjust",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "rotate",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textLength",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "tspan": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "dx",
    "dy",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "image-rendering",
    "kerning",
    "lengthAdjust",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "rotate",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textLength",
    "unicode-bidi",
    "visibility",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "unknown": [
    "requiredExtensions",
    "systemLanguage"
  ],
  "use": [
    "alignment-baseline",
    "baseline-shift",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "enable-background",
    "externalResourcesRequired",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "focusHighlight",
    "focusable",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "height",
    "href",
    "image-rendering",
    "kerning",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "opacity",
    "overflow",
    "pointer-events",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "systemLanguage",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "unicode-bidi",
    "visibility",
    "width",
    "word-spacing",
    "writing-mode",
    "x",
    "y"
  ],
  "video": [
    "begin",
    "dur",
    "end",
    "externalResourcesRequired",
    "fill",
    "focusHighlight",
    "focusable",
    "height",
    "initialVisibility",
    "max",
    "min",
    "nav-down",
    "nav-down-left",
    "nav-down-right",
    "nav-left",
    "nav-next",
    "nav-prev",
    "nav-right",
    "nav-up",
    "nav-up-left",
    "nav-up-right",
    "overlay",
    "preserveAspectRatio",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "requiredFonts",
    "requiredFormats",
    "restart",
    "syncBehavior",
    "syncMaster",
    "syncTolerance",
    "systemLanguage",
    "transform",
    "transformBehavior",
    "type",
    "width",
    "x",
    "y"
  ],
  "view": [
    "externalResourcesRequired",
    "preserveAspectRatio",
    "viewBox",
    "viewTarget",
    "zoomAndPan"
  ],
  "vkern": [
    "g1",
    "g2",
    "k",
    "u1",
    "u2"
  ]
};
export const tags = {
  "svg": [
    "svg",
    "g",
    "defs",
    "desc",
    "title",
    "symbol",
    "use",
    "image",
    "switch",
    "style",
    "path",
    "rect",
    "circle",
    "ellipse",
    "line",
    "polyline",
    "polygon",
    "text",
    "tspan",
    "textPath",
    "marker",
    "linearGradient",
    "radialGradient",
    "stop",
    "pattern",
    "clipPath",
    "mask",
    "filter",
    "feDistantLight",
    "fePointLight",
    "feSpotLight",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feFuncR",
    "feFuncG",
    "feFuncB",
    "feFuncA",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feFlood",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "feSpecularLighting",
    "feTile",
    "feTurbulence",
    "a",
    "view",
    "script",
    "animate",
    "set",
    "animateMotion",
    "mpath",
    "animateTransform",
    "metadata",
    "foreignObject",
    "svg",
    "g",
    "defs",
    "symbol",
    "use",
    "switch",
    "title",
    "desc",
    "metadata",
    "style",
    "path",
    "rect",
    "circle",
    "ellipse",
    "line",
    "polyline",
    "polygon",
    "text",
    "tspan",
    "textPath",
    "image",
    "foreignObject",
    "marker",
    "linearGradient",
    "radialGradient",
    "stop",
    "pattern",
    "script",
    "a",
    "view",
    "animate",
    "set",
    "discard",
    "animateMotion",
    "mpath",
    "animateTransform",
    "path"
  ],
  "html": [
    "html",
    "head",
    "title",
    "base",
    "link",
    "meta",
    "style",
    "body",
    "article",
    "section",
    "nav",
    "aside",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "header",
    "footer",
    "address",
    "p",
    "hr",
    "pre",
    "blockquote",
    "ol",
    "ul",
    "menu",
    "li",
    "dl",
    "dt",
    "dd",
    "figure",
    "figcaption",
    "main",
    "search",
    "div",
    "a",
    "em",
    "strong",
    "small",
    "s",
    "cite",
    "q",
    "dfn",
    "abbr",
    "ruby",
    "rt",
    "rp",
    "data",
    "time",
    "code",
    "var",
    "samp",
    "kbd",
    "sub",
    "sup",
    "i",
    "b",
    "u",
    "mark",
    "bdi",
    "bdo",
    "span",
    "br",
    "wbr",
    "ins",
    "del",
    "picture",
    "source",
    "img",
    "iframe",
    "embed",
    "object",
    "video",
    "audio",
    "track",
    "map",
    "area",
    "table",
    "caption",
    "colgroup",
    "col",
    "tbody",
    "thead",
    "tfoot",
    "tr",
    "td",
    "th",
    "form",
    "label",
    "input",
    "button",
    "select",
    "datalist",
    "optgroup",
    "option",
    "textarea",
    "output",
    "progress",
    "meter",
    "fieldset",
    "legend",
    "selectedcontent",
    "details",
    "summary",
    "dialog",
    "script",
    "noscript",
    "template",
    "slot",
    "canvas",
    "applet",
    "acronym",
    "bgsound",
    "dir",
    "frame",
    "frameset",
    "noframes",
    "isindex",
    "keygen",
    "listing",
    "menuitem",
    "nextid",
    "noembed",
    "param",
    "plaintext",
    "rb",
    "rtc",
    "strike",
    "xmp",
    "basefont",
    "big",
    "blink",
    "center",
    "font",
    "marquee",
    "multicol",
    "nobr",
    "spacer",
    "tt"
  ],
  "mathml": [
    "math",
    "mtext",
    "mi",
    "mn",
    "mo",
    "mspace",
    "ms",
    "mrow",
    "mfrac",
    "msqrt",
    "mroot",
    "mstyle",
    "merror",
    "mpadded",
    "mphantom",
    "msub",
    "msup",
    "msubsup",
    "munder",
    "mover",
    "munderover",
    "mmultiscripts",
    "mprescripts",
    "mtable",
    "mtr",
    "mtd",
    "maction",
    "semantics",
    "annotation",
    "annotation-xml"
  ]
};
