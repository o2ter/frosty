
export type ColorValue = null | string;
export type DimensionValue = null | number | string;

type NumberOrString = number | string;

type AnimationDirection =
  | 'alternate'
  | 'alternate-reverse'
  | 'normal'
  | 'reverse';
type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationIterationCount = number | 'infinite';
type AnimationKeyframes = string | Object;
type AnimationPlayState = 'paused' | 'running';

type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';

type BorderRadiusValue = number | string;
type BorderStyleValue = 'solid' | 'dotted' | 'dashed';

type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type CursorValue =
  | 'alias'
  | 'all-scroll'
  | 'auto'
  | 'cell'
  | 'context-menu'
  | 'copy'
  | 'crosshair'
  | 'default'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'text'
  | 'vertical-text'
  | 'move'
  | 'none'
  | 'no-drop'
  | 'not-allowed'
  | 'zoom-in'
  | 'zoom-out'
  | 'col-resize'
  | 'e-resize'
  | 'ew-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'ns-resize'
  | 'nw-resize'
  | 'row-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'nesw-resize'
  | 'nwse-resize';

type TouchActionValue =
  | 'auto'
  | 'inherit'
  | 'manipulation'
  | 'none'
  | 'pan-down'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pan-x'
  | 'pan-y'
  | 'pinch-zoom';

type UserSelect = 'all' | 'auto' | 'contain' | 'none' | 'text';

type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
type VisiblilityValue = 'hidden' | 'visible';

export type Styles = {

  animationDelay?: string | string[];
  animationDirection?: AnimationDirection | AnimationDirection[];
  animationDuration?: string | string[];
  animationFillMode?: AnimationFillMode | AnimationFillMode[];
  animationIterationCount?: AnimationIterationCount | AnimationIterationCount[];
  animationKeyframes?: AnimationKeyframes | AnimationKeyframes[];
  animationPlayState?: AnimationPlayState | AnimationPlayState[];
  animationTimingFunction?: string | string[];
  transitionDelay?: string | string[];
  transitionDuration?: string | string[];
  transitionProperty?: string | string[];
  transitionTimingFunction?: string | string[];

  /**
   * Border
   */

  borderColor?: ColorValue;
  borderBlockColor?: ColorValue;
  borderBlockEndColor?: ColorValue;
  borderBlockStartColor?: ColorValue;
  borderBottomColor?: ColorValue;
  borderInlineColor?: ColorValue;
  borderInlineEndColor?: ColorValue;
  borderInlineStartColor?: ColorValue;
  borderLeftColor?: ColorValue;
  borderRightColor?: ColorValue;
  borderTopColor?: ColorValue;
  borderRadius?: BorderRadiusValue;
  borderEndEndRadius?: BorderRadiusValue;
  borderEndStartRadius?: BorderRadiusValue;
  borderStartEndRadius?: BorderRadiusValue;
  borderStartStartRadius?: BorderRadiusValue;
  borderBottomLeftRadius?: BorderRadiusValue;
  borderBottomRightRadius?: BorderRadiusValue;
  borderTopLeftRadius?: BorderRadiusValue;
  borderTopRightRadius?: BorderRadiusValue;
  borderStyle?: BorderStyleValue;
  borderBlockStyle?: BorderStyleValue;
  borderBlockEndStyle?: BorderStyleValue;
  borderBlockStartStyle?: BorderStyleValue;
  borderBottomStyle?: BorderStyleValue;
  borderInlineStyle?: BorderStyleValue;
  borderInlineEndStyle?: BorderStyleValue;
  borderInlineStartStyle?: BorderStyleValue;
  borderLeftStyle?: BorderStyleValue;
  borderRightStyle?: BorderStyleValue;
  borderTopStyle?: BorderStyleValue;
  borderEndColor?: ColorValue;
  borderStartColor?: ColorValue;
  borderEndStyle?: BorderStyleValue;
  borderStartStyle?: BorderStyleValue;
  borderBottomEndRadius?: BorderRadiusValue;
  borderBottomStartRadius?: BorderRadiusValue;
  borderTopEndRadius?: BorderRadiusValue;
  borderTopStartRadius?: BorderRadiusValue;

  /**
   * Interactions
   */

  cursor?: CursorValue;
  touchAction?: TouchActionValue;
  userSelect?: UserSelect;
  willChange?: string;

  /**
   * Layout
   */

  alignContent?:
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'stretch';
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
  alignSelf?:
  | 'auto'
  | 'baseline'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'stretch';
  aspectRatio?: NumberOrString;
  backfaceVisibility?: VisiblilityValue;
  borderWidth?: DimensionValue;
  borderBlockWidth?: DimensionValue;
  borderBlockEndWidth?: DimensionValue;
  borderBlockStartWidth?: DimensionValue;
  borderBottomWidth?: DimensionValue;
  borderInlineWidth?: DimensionValue;
  borderInlineEndWidth?: DimensionValue;
  borderInlineStartWidth?: DimensionValue;
  borderLeftWidth?: DimensionValue;
  borderRightWidth?: DimensionValue;
  borderTopWidth?: DimensionValue;
  bottom?: DimensionValue;
  boxSizing?: 'border-box' | 'content-box' | 'padding-box';
  columnGap?: DimensionValue;
  direction?: 'inherit' | 'ltr' | 'rtl';
  display?: string;
  flex?: number;
  flexBasis?: DimensionValue;
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: DimensionValue;
  height?: DimensionValue;
  inset?: DimensionValue;
  insetBlock?: DimensionValue;
  insetBlockEnd?: DimensionValue;
  insetBlockStart?: DimensionValue;
  insetInline?: DimensionValue;
  insetInlineEnd?: DimensionValue;
  insetInlineStart?: DimensionValue;
  justifyContent?:
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
  left?: DimensionValue;
  margin?: DimensionValue;
  marginBlock?: DimensionValue;
  marginBlockEnd?: DimensionValue;
  marginBlockStart?: DimensionValue;
  marginBottom?: DimensionValue;
  marginInline?: DimensionValue;
  marginInlineEnd?: DimensionValue;
  marginInlineStart?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginTop?: DimensionValue;
  maxHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  minHeight?: DimensionValue;
  minWidth?: DimensionValue;
  order?: number;
  overflow?: OverflowValue;
  overflowX?: OverflowValue;
  overflowY?: OverflowValue;
  padding?: DimensionValue;
  paddingBlock?: DimensionValue;
  paddingBlockEnd?: DimensionValue;
  paddingBlockStart?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingInline?: DimensionValue;
  paddingInlineEnd?: DimensionValue;
  paddingInlineStart?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingTop?: DimensionValue;
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
  right?: DimensionValue;
  rowGap?: DimensionValue;
  top?: DimensionValue;
  visibility?: VisiblilityValue;
  width?: DimensionValue;
  zIndex?: number;
  gridAutoColumns?: string;
  gridAutoFlow?: string;
  gridAutoRows?: string;
  gridColumnEnd?: string;
  gridColumnGap?: string;
  gridColumnStart?: string;
  gridRowEnd?: string;
  gridRowGap?: string;
  gridRowStart?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  borderEndWidth?: DimensionValue;
  borderStartWidth?: DimensionValue;
  end?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginEnd?: DimensionValue;
  marginStart?: DimensionValue;
  marginVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingStart?: DimensionValue;
  paddingEnd?: DimensionValue;
  paddingVertical?: DimensionValue;
  start?: DimensionValue;

  /**
   * Shadows
   */

  shadowColor?: ColorValue;
  shadowOffset?: {
    width?: DimensionValue;
    height?: DimensionValue
  };
  shadowOpacity?: number;
  shadowRadius?: DimensionValue;
  boxShadow?: string;

  /**
   * Transforms
   */

  perspective?: NumberOrString;
  perspectiveOrigin?: string;
  transform?:
  | string
  | Array<
    | { perspective: NumberOrString }
    | { rotate: string }
    | { rotateX: string }
    | { rotateY: string }
    | { rotateZ: string }
    | { scale: number }
    | { scaleX: number }
    | { scaleY: number }
    | { scaleZ: number }
    | { scale3d: string }
    | { skewX: string }
    | { skewY: string }
    | { translateX: NumberOrString }
    | { translateY: NumberOrString }
    | { translateZ: NumberOrString }
    | { translate3d: string }
  >;
  transformOrigin?: string | NumberOrString[];
  transformStyle?: 'flat' | 'preserve-3d';

  backdropFilter?: string;
  backgroundAttachment?: string;
  backgroundBlendMode?: string;
  backgroundClip?: string;
  backgroundColor?: ColorValue;
  backgroundImage?: string;
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box';
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;

  clip?: string;
  filter?: string;
  opacity?: number;
  outlineColor?: ColorValue;
  outlineOffset?: NumberOrString;
  outlineStyle?: string;
  outlineWidth?: NumberOrString;
  overscrollBehavior?: OverscrollBehaviorValue;
  overscrollBehaviorX?: OverscrollBehaviorValue;
  overscrollBehaviorY?: OverscrollBehaviorValue;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  scrollbarWidth?: 'auto' | 'none' | 'thin';
  scrollSnapAlign?: string;
  scrollSnapType?: string;
  WebkitMaskImage?: string;
  WebkitOverflowScrolling?: 'auto' | 'touch';

  color?: ColorValue;
  fontFamily?: string;
  fontFeatureSettings?: string;
  fontSize?: NumberOrString;
  fontStyle?: 'italic' | 'normal';
  fontWeight?: FontWeightValue;
  fontVariant?: Array<
    | 'small-caps'
    | 'oldstyle-nums'
    | 'lining-nums'
    | 'tabular-nums'
    | 'proportional-nums'
  >;
  letterSpacing?: NumberOrString;
  lineHeight?: NumberOrString;
  textAlign?:
  | 'center'
  | 'end'
  | 'inherit'
  | 'justify'
  | 'justify-all'
  | 'left'
  | 'right'
  | 'start';
  textDecorationColor?: ColorValue;
  textDecorationLine?:
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through';
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
  textIndent?: NumberOrString;
  textOverflow?: string;
  textRendering?:
  | 'auto'
  | 'geometricPrecision'
  | 'optimizeLegibility'
  | 'optimizeSpeed';
  textShadow?: string;
  textShadowColor?: ColorValue;
  textShadowOffset?: { width?: number; height?: number };
  textShadowRadius?: number;
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase';
  unicodeBidi?:
  | 'normal'
  | 'bidi-override'
  | 'embed'
  | 'isolate'
  | 'isolate-override'
  | 'plaintext';
  verticalAlign?: string;
  whiteSpace?: string;
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'keep-all';
  wordWrap?: string;
  writingDirection?: 'auto' | 'ltr' | 'rtl';
  MozOsxFontSmoothing?: string;
  WebkitFontSmoothing?: string;
};
