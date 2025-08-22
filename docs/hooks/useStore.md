# useStore & createStore

A hook for subscribing to a custom store and selecting a slice of its state. The component will re-render when the selected state changes.

## Features

- **Store Subscription**: Subscribe to changes in a custom store
- **Selective Updates**: Only re-render when selected state changes
- **Performance Optimization**: Efficient subscription management
- **Type Safety**: Full TypeScript support for type-safe state selection

---

## createStore

Creates a new store instance that can hold and manage state outside of components.

### API

```typescript
createStore<T>(initialValue: T): Store<T>
```

### Parameters

- **initialValue**: `T` - The initial value to be stored in the store

### Returns

A `Store<T>` instance with the following methods:

- **`value`**: `T` - Getter for the current store value
- **`setValue(dispatch: T | ((prevValue: T) => T))`**: Updates the store value and notifies subscribers
- **`subscribe(callback: (oldVal: T, newVal: T) => void)`**: Subscribes to store changes, returns unsubscribe function

### Usage

#### Basic Store Creation

```typescript
import { createStore } from 'frosty';

// Create a simple counter store
const counterStore = createStore(0);

// Create a user store with an object
const userStore = createStore({ 
  name: 'Alice', 
  age: 30,
  email: 'alice@example.com'
});

// Create a todos store with an array
const todosStore = createStore([
  { id: 1, text: 'Learn Frosty', completed: false },
  { id: 2, text: 'Build an app', completed: false }
]);
```

#### Updating Store Values

```typescript
// Direct value updates
counterStore.setValue(5);
userStore.setValue({ name: 'Bob', age: 25, email: 'bob@example.com' });

// Functional updates
counterStore.setValue(prev => prev + 1);
userStore.setValue(prev => ({ ...prev, age: prev.age + 1 }));

// Adding to arrays
todosStore.setValue(prev => [
  ...prev, 
  { id: 3, text: 'New todo', completed: false }
]);
```

#### Subscribing to Changes

```typescript
// Subscribe to store changes
const unsubscribe = counterStore.subscribe((oldVal, newVal) => {
  console.log(`Counter changed from ${oldVal} to ${newVal}`);
});

// Subscribe with more complex logic
const userUnsubscribe = userStore.subscribe((oldUser, newUser) => {
  if (oldUser.name !== newUser.name) {
    console.log(`User name changed from ${oldUser.name} to ${newUser.name}`);
  }
});

// Don't forget to unsubscribe when no longer needed
unsubscribe();
userUnsubscribe();
```

#### Global State Management

```typescript
// app-store.ts
export const appStore = createStore({
  user: null,
  theme: 'light',
  notifications: [],
  isLoading: false
});

// actions.ts
export const setUser = (user) => {
  appStore.setValue(prev => ({ ...prev, user }));
};

export const toggleTheme = () => {
  appStore.setValue(prev => ({ 
    ...prev, 
    theme: prev.theme === 'light' ? 'dark' : 'light' 
  }));
};

export const addNotification = (notification) => {
  appStore.setValue(prev => ({ 
    ...prev, 
    notifications: [...prev.notifications, notification] 
  }));
};
```

---

## useStore

## useStore

A hook that subscribes to a store and re-renders the component when the selected state changes.

### API

```typescript
useStore<T, S>(
  store: Store<T>,
  selector?: (state: T) => S,
  equal?: (value: S, other: S) => boolean
): S
```

### Parameters

- **store**: `Store<T>` - The store instance to subscribe to
- **selector** _(optional)_: `(state: T) => S` - Function to select a part of the store's state. Defaults to the entire state.
- **equal** _(optional)_: `(value: S, other: S) => boolean` - Function to compare selected values for equality. Defaults to deep equality (`_.isEqual`).

### Returns

The selected slice of the store's state. The component will re-render only when the selected value changes according to the equality function.

### Usage

#### Basic Example

```typescript
import { createStore, useStore } from 'frosty';

// Create a store with an initial value
const counterStore = createStore(0);

// In a component
function Counter() {
  const count = useStore(counterStore);
  
  const increment = () => counterStore.setValue(prev => prev + 1);
  const decrement = () => counterStore.setValue(prev => prev - 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

#### Using a Selector

You can select a specific part of the store's state:

```typescript
const userStore = createStore({ 
  name: 'Alice', 
  age: 30, 
  preferences: { theme: 'dark', language: 'en' }
});

function UserName() {
  // Only re-renders when the name changes
  const name = useStore(userStore, user => user.name);
  return <div>Hello, {name}!</div>;
}

function UserPreferences() {
  // Only re-renders when preferences change
  const preferences = useStore(userStore, user => user.preferences);
  return (
    <div>
      <p>Theme: {preferences.theme}</p>
      <p>Language: {preferences.language}</p>
    </div>
  );
}
```

#### Custom Equality Function

You can provide a custom equality function to control when the component should re-render:

```typescript
const objStore = createStore({ a: 1, b: 2, timestamp: Date.now() });

function AValue() {
  // Only re-renders when 'a' changes, ignoring timestamp updates
  const a = useStore(
    objStore, 
    obj => obj.a, 
    (prev, next) => prev === next
  );
  return <div>A: {a}</div>;
}

// For arrays, you might want to compare by length or specific properties
const listStore = createStore(['item1', 'item2']);

function ListLength() {
  const length = useStore(
    listStore,
    list => list.length,
    (prevLength, nextLength) => prevLength === nextLength
  );
  return <div>List has {length} items</div>;
}
```

#### Multiple Components with Same Store

```typescript
const todosStore = createStore([
  { id: 1, text: 'Learn Frosty', completed: false },
  { id: 2, text: 'Build an app', completed: false }
]);

function TodoList() {
  const todos = useStore(todosStore);
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoStats() {
  const completedCount = useStore(
    todosStore, 
    todos => todos.filter(todo => todo.completed).length
  );
  const totalCount = useStore(todosStore, todos => todos.length);
  
  return (
    <div>
      Completed: {completedCount} / {totalCount}
    </div>
  );
}

function AddTodo() {
  const addTodo = (text: string) => {
    todosStore.setValue(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  };
  
  return (
    <button onClick={() => addTodo('New Todo')}>
      Add Todo
    </button>
  );
}
```

#### Complex State Management

```typescript
interface AppState {
  user: { id: string; name: string } | null;
  cart: { id: string; quantity: number }[];
  ui: { isLoading: boolean; error: string | null };
}

const appStore = createStore<AppState>({
  user: null,
  cart: [],
  ui: { isLoading: false, error: null }
});

// Different components can subscribe to different parts
function UserProfile() {
  const user = useStore(appStore, state => state.user);
  
  if (!user) return <div>Please log in</div>;
  
  return <div>Welcome, {user.name}!</div>;
}

function CartSummary() {
  const cartCount = useStore(appStore, state => state.cart.length);
  const isLoading = useStore(appStore, state => state.ui.isLoading);
  
  return (
    <div>
      Cart ({cartCount} items)
      {isLoading && <span> - Loading...</span>}
    </div>
  );
}

function ErrorDisplay() {
  const error = useStore(appStore, state => state.ui.error);
  
  if (!error) return null;
  
  return <div className="error">{error}</div>;
}

// Actions to update the store
export const actions = {
  setUser: (user: AppState['user']) => {
    appStore.setValue(prev => ({ ...prev, user }));
  },
  
  addToCart: (productId: string) => {
    appStore.setValue(prev => ({
      ...prev,
      cart: [
        ...prev.cart.filter(item => item.id !== productId),
        { id: productId, quantity: 1 }
      ]
    }));
  },
  
  setLoading: (isLoading: boolean) => {
    appStore.setValue(prev => ({
      ...prev,
      ui: { ...prev.ui, isLoading }
    }));
  },
  
  setError: (error: string | null) => {
    appStore.setValue(prev => ({
      ...prev,
      ui: { ...prev.ui, error }
    }));
  }
};
```

## Notes

- **Performance**: The `useStore` hook only triggers re-renders when the selected value changes according to the equality function
- **Memory Management**: Store subscriptions are automatically cleaned up when components unmount
- **Global State**: Stores persist across component unmounts, making them suitable for global state management
- **Type Safety**: Both `createStore` and `useStore` are fully typed and provide excellent TypeScript support
- **Equality Function**: The default equality function uses deep comparison (`_.isEqual`). For performance-critical scenarios with large objects, consider providing a custom equality function

## Best Practices

1. **Use Selectors**: Always use selectors to subscribe only to the parts of the state you need
2. **Custom Equality**: For performance, provide custom equality functions when dealing with complex objects
3. **Store Organization**: Keep related state together in a single store, but separate concerns into different stores
4. **Immutable Updates**: Always update store state immutably to ensure proper change detection
5. **Action Creators**: Create action functions to encapsulate store update logic

## See Also

- [useSyncExternalStore](./useSyncExternalStore.md) – Lower-level hook for external store synchronization
- [useState](./useState.md) – For component-local state management
- [useReducer](./useReducer.md) – For complex local state logic

## API

```typescript
useStore<T, S>(
  store: Store<T>,
  selector?: (state: T) => S,
  equal?: (value: S, other: S) => boolean
): S
```

- **store**: The store instance to subscribe to
- **selector** _(optional)_: Function to select a part of the store's state. Defaults to the entire state.
- **equal** _(optional)_: Function to compare selected values for equality. Defaults to deep equality (`_.isEqual`).

## Returns

The selected slice of the store's state. The component will re-render only when the selected value changes according to the equality function.
