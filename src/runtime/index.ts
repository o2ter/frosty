
export type Element = string | number | null | undefined;
export type ElementType = string | (() => Element);

export declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: { bar?: boolean };
  }
}

export function jsx(
  type: ElementType,
  props: { [x: string]: any },
): Element {
  return;
}
