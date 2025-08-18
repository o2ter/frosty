# `useStack` Hook

The `useStack` hook provides access to the stack of parent components leading up to the current component during rendering. This can be useful for debugging, implementing context-aware logic, or creating advanced component patterns.

## Features

- **Component Hierarchy Access**: Retrieve the hierarchy of parent components during rendering.
- **Debugging Tool**: Introspect the component tree to identify rendering issues.
- **Context-Aware Logic**: Enable components to adapt their behavior based on their position in the component tree.
- **Supports All Components**: Works with both functional and class components.

## Parameters

The `useStack` hook does not take any parameters.

## Returns

- **`stack`**: `ComponentNode[]`  
  An array of `ComponentNode` instances representing the parent components in the rendering stack. Each `ComponentNode` contains information about:
  - **`type`**: The type of the component (e.g., a DOM element or a custom component).
  - **`props`**: The props passed to the component.
  - **`children`**: The children of the component.

## Usage

### Basic Example

```tsx
import { useStack } from 'frosty';

function MyComponent() {
  const stack = useStack();

  return (
    <div>
      <h2>Component Stack</h2>
      <ul>
        {stack.map((node, i) => (
          <li key={i}>
            {typeof node.type === 'string'
              ? node.type // For DOM elements
              : node.type.name || 'Anonymous'} // For custom components
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Examples

### Debugging Component Hierarchy

Use the `useStack` hook to log the rendering stack for debugging purposes:

```tsx
import { useStack } from 'frosty';

function DebugComponent() {
  const stack = useStack();

  console.log('Rendering stack:', stack);

  return <div>Check the console for the rendering stack.</div>;
}
```

### Context-Aware Logic

Implement logic that adapts based on the component's position in the tree:

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

- **Advanced Use Cases**: The `useStack` hook is primarily intended for advanced scenarios. For most applications, direct access to the rendering stack is unnecessary.
- **Error Handling**: Ensure the `useStack` hook is only used within a valid render context. Using it outside of a render function will throw an error.
- **Performance Considerations**: Avoid overusing the `useStack` hook in performance-critical components, as introspecting the stack may introduce overhead.
