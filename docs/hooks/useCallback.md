# `useCallback` Hook

The `useCallback` hook is used to memoize a callback function, ensuring that it is only recreated when its dependencies change. This can help optimize performance by preventing unnecessary re-renders or re-executions of child components that rely on the callback.

## Features

- **Memoization**: Prevents the creation of a new function instance on every render.
- **Performance Optimization**: Useful for passing stable references to child components or hooks.
- **Dependency Tracking**: Automatically updates the callback when specified dependencies change.

## Usage

```tsx
import { useCallback } from 'frosty';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array ensures the callback is stable.

  return <ChildComponent onIncrement={increment} />;
}

function ChildComponent({ onIncrement }: { onIncrement: () => void }) {
  return <button onClick={onIncrement}>Increment</button>;
}
```

## Parameters

1. **Callback Function**: `() => void`  
   The function to be memoized.

2. **Dependencies**: `any[]`  
   An array of values that the callback depends on. The callback will be recreated only when one of these values changes.

## Returns

The `useCallback` hook returns the memoized version of the callback function.
