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

## Examples

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

### Functional Updates

```tsx
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Use functional update when new state depends on previous state
    setCount(prevCount => prevCount + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Object State

```tsx
import { useState } from 'frosty';

interface User {
  name: string;
  email: string;
  age: number;
}

function UserForm() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field: keyof User, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <form>
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
      <input 
        type="number"
        value={user.age}
        onChange={(e) => updateUser('age', parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### Lazy Initial State

```tsx
import { useState } from 'frosty';

function ExpensiveComponent() {
  // Use function for expensive initial state calculation
  const [data, setData] = useState(() => {
    // This function only runs once on initial render
    return expensiveCalculation();
  });

  return <div>{data}</div>;
}
```

## Notes

- **Re-renders**: Calling the setter function will trigger a re-render of the component
- **Object Updates**: Always create new objects/arrays rather than mutating existing state
- **Functional Updates**: Use functional updates when new state depends on previous state
- **Lazy Initialization**: Use a function for expensive initial state calculations
- **Type Safety**: Provide explicit types for complex state structures

## See Also

- [useReducer](./useReducer.md) – For managing complex state logic with reducers
- [useRef](./useRef.md) – For accessing mutable values that persist across renders
- [useCallback](./useCallback.md) – For memoizing callback functions
- [useMemo](./useMemo.md) – For memoizing expensive calculations
