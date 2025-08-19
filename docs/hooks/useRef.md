# `useRef` Hook

The `useRef` hook provides a way to persist a mutable value across renders without causing a re-render when the value changes. It is commonly used to access DOM elements or store mutable values.

## Features

- **Mutable References**: Store a value that persists across renders without triggering re-renders.
- **DOM Access**: Access and manipulate DOM elements directly.
- **Imperative Logic**: Useful for scenarios where imperative logic is required.

## Usage

```tsx
import { useRef } from 'frosty';

function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

## Parameters

The `useRef` hook does not take any parameters.

## Returns

- **`ref`**: An object with a `current` property. The `current` property can be set to any value and persists across renders.

## Example

### Storing a DOM Reference

```tsx
import { useRef } from 'frosty';

function App() {
  const divRef = useRef(null);

  const changeBackground = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'lightblue';
    }
  };

  return (
    <div>
      <div ref={divRef} style={{ width: '100px', height: '100px', backgroundColor: 'lightgray' }} />
      <button onClick={changeBackground}>Change Background</button>
    </div>
  );
}
```

### Storing a Mutable Value

```tsx
import { useRef } from 'frosty';

function Timer() {
  const count = useRef(0);

  const increment = () => {
    count.current += 1;
    console.log(`Count: ${count.current}`);
  };

  return <button onClick={increment}>Increment</button>;
}
```

## Notes

- **Avoid Overuse**: Use `useRef` only when necessary. For most cases, prefer `useState` for reactive state.
- **No Re-Renders**: Updating the `current` property does not trigger a re-render.
- **Initial Value**: The `current` property is initialized to the value passed to `useRef` and can be updated later.

## See Also

- [useState](./useState.md) – For managing reactive state.
- [useEffect](./useEffect.md) – For handling side effects and DOM manipulations.
- [useResource](./useResource.md) – For managing asynchronous resources with state and lifecycle management.
- [useIterableResource](./useIterableResource.md) – For managing asynchronous iterable resources like streams or paginated data.
- [useRefHandle](./useRefHandle.md) – To expose imperative methods to parent components.