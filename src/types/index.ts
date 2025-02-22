
export type ComponentType = () => ElementNode<any, any>;
export type ElementType = string | ComponentType;

export class ElementNode<P extends {} = any, T extends ElementType = any> {

  _type: T;
  _props: P;
  _key?: string;

  constructor(type: T, props: P, key?: string) {
    this._type = type;
    this._props = props;
    this._key = key;
  }

}

type HTMLElementProps = {
  span: {};
}

type SVGElementProps = {
  svg: {};
}

export type _IntrinsicElements = HTMLElementProps & SVGElementProps & {
  [x: string]: any;
};
