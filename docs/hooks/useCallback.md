# useCallback

The `useCallback` hook is used to memoize a callback function, ensuring that it is only recreated when its dependencies change. This can help optimize performance by preventing unnecessary re-renders or re-executions of child components that rely on the callback.

## Features

- **Memoization**: Prevents the creation of a new function instance on every render
- **Performance Optimization**: Useful for passing stable references to child components or hooks
- **Dependency Tracking**: Automatically updates the callback when specified dependencies change

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

1. **callback**: `() => void`  
   The function to be memoized

2. **deps**: `any[]`  
   An array of values that the callback depends on. The callback will be recreated only when one of these values changes

## Returns

The `useCallback` hook returns the memoized version of the callback function.

## Example

### Basic Example

```tsx
import { useCallback, useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### With Dependencies

```tsx
import { useCallback, useState } from 'frosty';

function CounterWithMultiplier() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const increment = useCallback(() => {
    setCount((prev) => prev + multiplier);
  }, [multiplier]); // Recreates the callback when `multiplier` changes.

  return (
    <div>
      <p>Count: {count}</p>
      <input
        type="number"
        value={multiplier}
        onChange={(e) => setMultiplier(Number(e.target.value))}
      />
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Notes

- **Avoid Overuse**: Only use `useCallback` when passing callbacks to child components or hooks that rely on stable references. Overusing it can lead to unnecessary complexity.
- **Dependencies**: Always include all variables used inside the callback in the dependency array to avoid stale closures
- **Comparison with `useMemo`**: While `useCallback` memoizes functions, `useMemo` memoizes values. Use `useMemo` for expensive calculations and `useCallback` for functions.

## See Also

- [useMemo](./useMemo.md) – Memoize expensive calculations.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
- [useState](./useState.md) – Manage local state in functional components.