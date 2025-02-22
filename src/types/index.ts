
export type Element = string | number | null | undefined;

export type ElementType = string | (() => Element);

type HTMLElementProps = {
  span: {};
}

type SVGElementProps = {
  svg: {};
}

export type _IntrinsicElements = HTMLElementProps & SVGElementProps;
