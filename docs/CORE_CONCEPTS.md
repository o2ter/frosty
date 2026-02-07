# Frosty Core Concepts

This document explains the fundamental concepts that power Frosty's architecture and functionality.

## Table of Contents

- [Component System](#component-system)
- [Hooks Architecture](#hooks-architecture)
- [Reconciliation Engine](#reconciliation-engine)
- [Renderer System](#renderer-system)
- [Context System](#context-system)
- [Error Handling](#error-handling)
- [State Management](#state-management)
- [Performance Optimizations](#performance-optimizations)

## Component System

### Component Definition

Frosty components are defined using function components with its own runtime:

```tsx
// Function Component
function MyComponent(props: { name: string }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

// With TypeScript support
interface Props {
  title: string;
  children?: ElementNode;
}

const Card: ComponentType<Props> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

### Component Types

Frosty supports several component types:

1. **Function Components**: Pure functions that return JSX
2. **Fragment Components**: For grouping elements without wrapper
3. **Context Providers**: For sharing data across component trees
4. **Error Boundaries**: For catching and handling errors

### JSX Runtime

Frosty provides its own JSX runtime that transforms JSX into component calls:

```typescript
// JSX
<div className="container">
  <MyComponent name="World" />
</div>

// Transforms to
createElement('div', { className: 'container' }, 
  createElement(MyComponent, { name: 'World' })
);
```

## Hooks Architecture

### Hook State Management

Frosty implements a sophisticated hook system that tracks state across renders:

```typescript
class HookState {
  renderer: _Renderer<any>;
  contextValue: Map<Context<any>, _ContextState>;
  prevState?: VNodeState[];
  state: VNodeState[] = [];
  stack: VNode[] = [];
  node?: VNode;
  listens = new WeakSet<Context<any>>();
  tasks: PromiseLike<void>[] = [];
}
```

### Core Hooks

#### State Hooks
- **`useState`**: Local component state management
- **`useReducer`**: Complex state logic with reducers
- **`useStore`**: External store integration

#### Effect Hooks
- **`useEffect`**: Side effects and lifecycle management
- **`useCallback`**: Memoized callback functions
- **`useMemo`**: Memoized computed values

#### Context Hooks
- **`useContext`**: Context value consumption
- **`createContext`**: Context creation

#### Async Hooks
- **`useAwaited`**: Promise and async operation handling
- **`useResource`**: Resource fetching and caching
- **`useDebounce`**: Debounced function execution

### Hook Rules

Frosty enforces similar rules to React hooks:

1. Hooks must be called at the top level of components
2. Hooks must be called in the same order on every render
3. Hooks cannot be called conditionally

## Reconciliation Engine

### Virtual Node System

Frosty uses a virtual node (VNode) system to represent the component tree:

```typescript
class VNode {
  _component: ComponentNode;      // Original component
  _children: (VNode | string)[];  // Child nodes
  _props: any;                    // Component props
  _state?: VNodeState[];          // Hook state
  _dirty: boolean;                // Needs update flag
  _error?: any;                   // Error state
}
```

### Reconciliation Process

1. **Build Phase**: Create VNode tree from components
2. **Update Phase**: Check which nodes need updates
3. **Diff Phase**: Calculate differences using Myers algorithm
4. **Commit Phase**: Apply changes to the renderer

### Diffing Algorithm

Frosty uses the Myers algorithm for optimal tree diffing:

```typescript
const diff = myersSync(this._children, children, {
  compare: (lhs, rhs) => {
    if (_.isString(lhs) && _.isString(rhs)) return lhs === rhs;
    if (lhs instanceof VNode && rhs instanceof VNode) 
      return lhs._component._equal(rhs._component);
    return false;
  },
});
```

### Update Optimization

- **Dirty Checking**: Only update components that have changed
- **Context Tracking**: Track context dependencies
- **Memoization**: Cache computation results
- **Key-based Reconciliation**: Optimize list updates

## Renderer System

### Abstract Renderer

The renderer system is built on an abstract base class:

```typescript
abstract class _Renderer<T> {
  protected abstract _beforeUpdate(): void;
  protected abstract _afterUpdate(): void;
  protected abstract _createElement(node: VNode): T;
  protected abstract _updateElement(node: VNode, element: T, children: (T | string)[], force?: boolean): void;
  protected abstract _destroyElement(node: VNode, element: T): void;
}
```

### Renderer Types

#### DOM Renderer
- **Target**: Browser DOM
- **Features**: Event handling, styling, accessibility
- **Usage**: Client-side applications

#### Server DOM Renderer
- **Target**: Server-side rendering with JSDOM
- **Features**: HTML string generation, SSR optimization
- **Usage**: Server-side rendering

#### Native Renderer
- **Target**: Native platform elements
- **Features**: Platform-specific optimizations
- **Usage**: Native mobile/desktop applications

### Rendering Pipeline

1. **Element Creation**: Create platform-specific elements
2. **Property Application**: Apply props to elements
3. **Child Management**: Manage element hierarchy
4. **Event Binding**: Attach event handlers
5. **Style Application**: Apply CSS styles

## Context System

### Context Creation

Contexts provide a way to pass data through the component tree. In Frosty, the context object itself acts as the provider component:

```typescript
const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  return (
    <ThemeContext value="dark">
      <Header />
      <Main />
    </ThemeContext>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <header className={`header-${theme}`}>...</header>;
}
```

### Context State Management

Contexts maintain state across the component tree:

```typescript
type _ContextState = {
  value: any;
  state: string;
  node: VNode;
};
```

### Context Optimization

- **Selective Listening**: Only re-render consumers when context changes
- **Context Splitting**: Split contexts to minimize re-renders
- **Value Memoization**: Memoize context values

## Error Handling

### Error Boundaries

Error boundaries catch JavaScript errors in component trees:

```tsx
function App() {
  return (
    <ErrorBoundary onError={(error, component, stack) => {
      console.error('Error caught:', error);
      // Send to error reporting service
    }}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Error Recovery

- **Graceful Degradation**: Provide fallback UI
- **Error Reporting**: Send errors to monitoring services
- **State Recovery**: Reset component state on error

### Error Types

1. **Render Errors**: Errors during component rendering
2. **Hook Errors**: Errors in hook execution
3. **Async Errors**: Errors in async operations
4. **Boundary Errors**: Errors in error boundary handling

## State Management

### Local State

Component-level state management:

```typescript
import { useState, useReducer } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);
  const [history, dispatch] = useReducer(historyReducer, []);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => {
        setCount(count + 1);
        dispatch({ type: 'increment', value: count + 1 });
      }}>
        Increment
      </button>
    </div>
  );
}
```

### External Store Integration

Connect to external state management libraries:

```typescript
import { useStore, useCallback } from 'frosty';

function TodoList() {
  const todos = useStore(todoStore);
  const dispatch = useCallback((action) => {
    todoStore.dispatch(action);
  }, []);
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={dispatch} />
      ))}
    </ul>
  );
}
```

### State Synchronization

Sync with external data sources:

```typescript
function UserProfile({ userId }: { userId: string }) {
  const user = useSyncExternalStore(
    userStore.subscribe,
    () => userStore.getUser(userId),
    () => null // Server snapshot
  );
  
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}
```

## Performance Optimizations

### Memoization

Multiple levels of memoization for performance:

```typescript
import { useMemo, useCallback } from 'frosty';

// Component-level memoization with hooks
function ExpensiveComponent({ data }: { data: any }) {
  const processedData = useMemo(() => {
    return expensiveDataProcessing(data);
  }, [data]);
  
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return <div>{processedData}</div>;
}
```

### Resource Management

Efficient resource loading and caching:

```typescript
import { useResource } from 'frosty';

function DataComponent() {
  const { data, loading, error } = useResource(
    async () => fetchData(),
    []
  );
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DataView data={data} />;
}
```

### Batch Updates

Automatic batching of state updates for performance:

```typescript
function updateMultipleStates() {
  // These updates are automatically batched
  setCount(count + 1);
  setName('New Name');
  setItems([...items, newItem]);
  // Only one re-render occurs
}
```

These core concepts form the foundation of Frosty's architecture, enabling developers to build performant, maintainable, and scalable applications with a modern development experience.
