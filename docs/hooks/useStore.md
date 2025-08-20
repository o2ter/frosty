# useStore

A hook for subscribing to a custom store and selecting a slice of its state. The component will re-render when the selected state changes.

## Features

- **Store Subscription**: Subscribe to changes in a custom store
- **Selective Updates**: Only re-render when selected state changes
- **Performance Optimization**: Efficient subscription management
- **Type Safety**: Full TypeScript support for type-safe state selection

## Usage

### Basic Example

```typescript
import { createStore, useStore } from 'frosty';

// Create a store with an initial value
const counterStore = createStore(0);

// In a component
function Counter() {
  const count = useStore(counterStore);
  return <div>{count}</div>;
}
```

### Using a Selector

You can select a specific part of the store's state:

```typescript
const userStore = createStore({ name: 'Alice', age: 30 });

function UserName() {
  const name = useStore(userStore, user => user.name);
  return <div>{name}</div>;
}
```

### Custom Equality Function

You can provide a custom equality function to control when the component should re-render:

```typescript
const objStore = createStore({ a: 1, b: 2 });

function AValue() {
  const a = useStore(objStore, obj => obj.a, (a, b) => a === b);
  return <div>{a}</div>;
}
```

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
