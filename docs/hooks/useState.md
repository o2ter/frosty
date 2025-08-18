# useState

`useState` is a Hook that lets you add state to functional components.

## Usage

```jsx
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Parameters

- **initialState**: The initial value of the state variable.

## Returns

An array with two elements:
1. The current state value.
2. A function to update the state.

## Example

```jsx
const [name, setName] = useState('Susan');
```

## Notes

- Calling the setter function will re-render the component.
- You can use any type as the initial state (number, string, object, etc.).
