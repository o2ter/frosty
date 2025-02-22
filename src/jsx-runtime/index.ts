import { _IntrinsicElements } from './../types/index';
import { Element, ElementType } from "~/types";

export declare namespace JSX {
  type IntrinsicElements = _IntrinsicElements;
}

export function jsx(
  type: ElementType,
  props: { [x: string]: any },
): Element {
  return;
}
