# PropsProvider

The `PropsProvider` component allows you to inject, override, or modify props for all descendant components and elements in the tree. This is useful for cross-cutting concerns such as theming, analytics, or feature flags.

## Features

- **Props Injection**: Inject additional props into descendant components
- **Props Override**: Modify existing props for specific element types
- **Conditional Logic**: Apply different props based on component type or existing props
- **Nested Support**: Multiple providers can be nested with proper precedence handling

## Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | `(v: { type: ElementType, props: PropsType }) => PropsType \| null` | - | Function that receives element type and props, returns new props |
| `children` | `ComponentNode` | - | The subtree to which the props provider applies |

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

## Examples

### Adding Attributes to Specific Elements

```tsx
import { PropsProvider } from 'frosty';

function TrackedApp() {
  return (
    <PropsProvider
      callback={({ type, props }) => {
        if (typeof type === 'string' && type === 'button') {
          return { ...props, 'data-foo': 'bar' };
        }
        return undefined;
      }}
    >
      <button>Click me</button>
      <div>This won't be affected</div>
    </PropsProvider>
  );
}
```

In this example, all `<button>` elements inside the provider will receive a `data-foo="bar"` attribute.

## Notes

- **Precedence**: Multiple `PropsProvider` components can be nested; the innermost provider takes precedence
- **Performance**: The callback runs for every element and component in the subtree during render
- **Return Values**: Return `null` or `undefined` from the callback to leave props unchanged

## See Also