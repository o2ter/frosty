# useState

The `useState` hook lets you add state to functional components.

## Features

- **State Management**: Add reactive state to functional components
- **Automatic Re-renders**: Component automatically re-renders when state changes
- **Type Safety**: Full TypeScript support for type-safe state management

## Usage

```tsx
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Parameters

1. **initialState**: `T | (() => T)`  
   The initial value of the state variable, or a function that returns the initial value

## Returns

An array with two elements:

- **state**: The current state value
- **setState**: A function to update the state

## Example

### Basic Usage

```tsx
import { useState } from 'frosty';

function NameForm() {
  const [name, setName] = useState('Susan');

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

## Notes

- **Re-renders**: Calling the setter function will trigger a re-render of the component
- **Types**: You can use any type as the initial state (number, string, object, etc.)
- **Functional Updates**: The setter function can accept a function for complex state updates
