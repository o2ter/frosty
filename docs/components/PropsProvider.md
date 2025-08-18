# `PropsProvider` Component

The `PropsProvider` component allows you to inject, override, or modify props for all descendant components and elements in the tree. This is useful for cross-cutting concerns such as theming, analytics, or feature flags.

## Usage

```tsx
import { PropsProvider } from 'frosty';

<PropsProvider
  callback={({ type, props }) => ({
    ...props,
    'data-tracked': true
  })}
>
  <MyComponent />
</PropsProvider>
```

## Props

| Name     | Type                                                                 | Description                                                                                   |
|----------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| callback | `(v: { type: ElementType, props: PropsType }) => PropsType \| null`  | A function that receives the type and props of each element/component and returns new props.   |
| children | `ComponentNode`                                                          | The subtree to which the props provider applies.                                              |

- **callback**: Called for every descendant element/component. Return a new props object to override, or `null`/`undefined` to leave props unchanged.
- **children**: The components/elements that will receive the injected/modified props.

## Example

```tsx
<PropsProvider
  callback={({ type, props }) => {
    if (typeof type === 'string' && type === 'button') {
      return { ...props, 'data-foo': 'bar' };
    }
    return undefined;
  }}
>
  <button>Click me</button>
</PropsProvider>
```

In this example, all `<button>` elements inside the provider will receive a `data-foo="bar"` attribute.

## Notes

- Multiple `PropsProvider` components can be nested; the innermost provider takes precedence.
- The callback runs for every element and component in the subtree during render.

## See Also