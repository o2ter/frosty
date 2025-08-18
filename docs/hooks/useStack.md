# `useStack` Hook

The `useStack` hook provides access to the stack of parent components leading up to the current component during rendering. This can be useful for debugging, implementing context-aware logic, or creating advanced component patterns.

## Features

- Access the hierarchy of parent components during rendering.
- Useful for debugging or introspecting component trees.
- Supports both functional and class components.

## Usage

```tsx
import { useStack } from 'frosty';

function MyComponent() {
  const stack = useStack();
  // `stack` is an array of ComponentNode instances representing the parent components.

  return (
    <div>
      <h2>Component Stack</h2>
      <ul>
        {stack.map((node, i) => (
          <li key={i}>
            {typeof node.type === 'string'
              ? node.type // For DOM elements
              : node.type.name || 'Anonymous'} // For Frosty components
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Parameters

The `useStack` hook does not take any parameters.

## Returns

- **`stack`**: `ComponentNode[]`  
  An array of component nodes (`ComponentNode`) representing the parent components in the rendering stack. Each `ComponentNode` contains information about the component type, props, and children.

## Example

### Debugging Component Hierarchy

```tsx
import { useStack } from 'frosty';

function DebugComponent() {
  const stack = useStack();

  console.log('Rendering stack:', stack);

  return <div>Check the console for the rendering stack.</div>;
}
```

### Context-Aware Logic

```tsx
import { useStack } from 'frosty';

function ThemedComponent() {
  const stack = useStack();

  const isInsideThemeProvider = stack.some(
    node => node.type && node.type.name === 'ThemeProvider'
  );

  return (
    <div>
      {isInsideThemeProvider
        ? 'This component is inside a ThemeProvider.'
        : 'This component is not inside a ThemeProvider.'}
    </div>
  );
}
```

## Notes

- The `useStack` hook is primarily intended for advanced use cases. For most applications, it is not necessary to access the rendering stack directly.
