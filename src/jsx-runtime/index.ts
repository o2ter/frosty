import { _IntrinsicElements, ElementType, ElementNode } from './../types';

export declare namespace JSX {
  type IntrinsicElements = _IntrinsicElements;
}

export function jsx<
  P extends {} = any,
  T extends ElementType = any
>(
  type: T, props: P, key?: string
): ElementNode<P, T> {
  return new ElementNode(type, props, key);
}
