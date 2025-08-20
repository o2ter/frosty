# useSyncExternalStore

The `useSyncExternalStore` hook is used to subscribe to an external store and synchronize its state with your component. It ensures consistent behavior across server and client rendering.

## Features

- **External Store Integration**: Subscribe to external state management systems
- **SSR Support**: Provides server-side rendering compatibility
- **Automatic Subscriptions**: Handles subscription and unsubscription lifecycle
- **Consistent Updates**: Ensures consistent state updates across renders

## Usage

```tsx
import { useSyncExternalStore } from 'frosty';

function ExampleComponent() {
  const state = useSyncExternalStore(
    subscribeToStore, // Function to subscribe to the store
    getSnapshot,      // Function to get the current state
    getServerSnapshot // (Optional) Function to get the state for SSR
  );

  return <div>Current state: {state}</div>;
}
```

## Parameters

1. **subscribe**: `(onStoreChange: () => void) => () => void`  
   A function that registers a callback to be called whenever the store changes. It should return an unsubscribe function

2. **getSnapshot**: `() => T`  
   A function that retrieves the current state of the store

3. **getServerSnapshot** _(optional)_: `() => T`  
   A function that retrieves the state of the store for server-side rendering. This is optional and only used in SSR environments

## Returns

The current state of the store.

## Example

### Basic Example

```tsx
import { useSyncExternalStore } from 'frosty';

const store = {
  state: 0,
  listeners: new Set<() => void>(),
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  getSnapshot() {
    return this.state;
  },
  increment() {
    this.state++;
    this.listeners.forEach(listener => listener());
  },
};

function Counter() {
  const count = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapshot.bind(store)
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
}
```

### Server-Side Rendering Example

```tsx
import { useSyncExternalStore } from 'frosty';

function ExampleComponent() {
  const state = useSyncExternalStore(
    subscribeToStore,
    getSnapshot,
    () => 'Server Snapshot' // Provide a fallback for SSR
  );

  return <div>State: {state}</div>;
}
```

## Notes

- This hook is particularly useful for integrating with external state management libraries or custom stores.
- It ensures consistent behavior between server-side rendering (SSR) and client-side rendering (CSR).
- The `getServerSnapshot` parameter is optional but recommended for SSR to avoid hydration mismatches.

## See Also

- [useStore](./useStore.md) – A simpler hook for binding to external stores.
- [useState](./useState.md) – For