# `useReducer` Hook

The `useReducer` hook is an alternative to `useState` for managing more complex state logic in functional components. It is particularly useful when the state depends on previous values or when multiple state transitions share logic.

---

## Features

- **Complex State Management**: Ideal for managing state with multiple sub-values or interdependent updates.
- **Predictable Updates**: State transitions are handled by a reducer function, ensuring predictable updates.
- **Centralized Logic**: Encapsulates state update logic in a single function, making it easier to test and maintain.

---

## Usage

```tsx
import { useReducer } from 'frosty';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```

---

## Parameters

1. **`reducer`**: `(state, action) => newState`  
   A function that specifies how the state should be updated based on the given action.

2. **`initialState`**: `any`  
   The initial state value.

3. **`init`** _(optional)_: `(initialArg) => initialState`  
   A function to lazily initialize the state. Useful for expensive initializations.

---

## Returns

An array with two elements:

1. **`state`**: The current state value.
2. **`dispatch`**: A function to dispatch actions to update the state.

---

## Example

### Basic Example

```tsx
import { useReducer } from 'frosty';

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(item => item !== action.payload);
    default:
      throw new Error('Unknown action type');
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'add', payload: 'New Task' })}>
        Add Task
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => dispatch({ type: 'remove', payload: todo })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Lazy Initialization

```tsx
import { useReducer } from 'frosty';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      throw new Error('Unknown action type');
  }
}

function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
    </div>
  );
}
```

---

## Notes

- **When to Use**: Use `useReducer` when state logic is complex or when multiple state variables are interdependent.
- **Avoid Overuse**: For simple state updates, prefer `useState` for better readability.
- **Performance**: The `reducer` function is not re-created on every render, making it efficient for frequent updates.

---

## See Also

- [useState](./useState.md) – For simpler state management.
- [useContext](./useContext.md) – To share state across components.
- [useMemo](./useMemo.md) – For memoizing expensive calculations.