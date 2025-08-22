# useContext & createContext

The `useContext` hook allows you to access the value of a context in functional components, while `createContext` creates a context object that can be used to share values across a component tree. Together, they simplify managing and consuming context values without needing to wrap components with a `Context.Consumer`.

## Features

- **createContext**: Create a context object with optional default values and type safety
- **useContext**: Access context values directly in functional components
- **Simplifies context management**: Cleaner API compared to `Context.Consumer`
- **Supports dynamic context updates**: Components re-render when context values change
- **Type-safe**: Full TypeScript support with proper type inference
- **Flexible API**: Supports optional selector functions for performance optimization

## Usage

### createContext

```tsx
import { createContext } from 'frosty';

// With default value
const ThemeContext = createContext<'light' | 'dark'>('light');

// Without default value (optional type)
const UserContext = createContext<User | null>(null);

// Complex type with default
interface AppState {
  user: User | null;
  settings: Settings;
}

const AppContext = createContext<AppState>({
  user: null,
  settings: { theme: 'light', language: 'en' }
});
```

### useContext

```tsx
import { useContext } from 'frosty';
import { ThemeContext } from './ThemeContext';

function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#000' }}>
      This component is styled using the theme context!
    </div>
  );
}
```

## API

### createContext

```tsx
function createContext<Value>(defaultValue: Value): Context<Value>;
function createContext<Value = undefined>(): Context<Value | undefined>;
```

Creates a new context object with an optional default value.

#### Parameters

1. **defaultValue**: `Value` (optional)  
   The default value for the context. This value will be used when a component consumes the context but no `Provider` is found in the component tree above it.

#### Returns

- **Context Object**: `Context<T>`  
  Returns a context object with the following properties:
  - **Provider**: A component that provides the context value to its children
  - **Consumer**: A component that consumes the context value using render props pattern
  - Can be used with `useContext` hook to access the value

### useContext

```tsx
function useContext<T, R = T>(
  context: Context<T>, 
  selector?: (state: T) => R
): R;
```

Retrieves the current value of a context and optionally applies a selector function to transform the context value.

#### Parameters

1. **context**: `Context<T>`  
   The context object created by `createContext`. The hook will return the current value of this context.

2. **selector**: `(state: T) => R` (optional)  
   An optional selector function to transform or extract specific parts of the context value. Defaults to an identity function that returns the entire context value.

#### Returns

- **value**: `T | R`  
  The current value of the context, optionally transformed by the selector function. This value is determined by the nearest `Context.Provider` above the component in the tree. If no provider is found, the default value passed to `createContext` is returned.

## Examples

### Basic Theme Context

```tsx
import { createContext, useContext } from 'frosty';
import { useState } from 'frosty';

// Create the context
const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemeProvider({ children }: { children: ElementNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{ 
      background: theme === 'light' ? '#fff' : '#000',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      Current theme: {theme}
    </div>
  );
}
```

### Complex Context with Actions

```tsx
import { createContext, useContext, useCallback } from 'frosty';
import { useState } from 'frosty';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

function UserProvider({ children }: { children: ElementNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = useCallback((user: User) => {
    setUser(user);
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
  }, []);
  
  const value = { user, login, logout };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user, logout } = useContext(UserContext);
  
  if (!user) {
    return <div>No user logged in.</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Context Selector for Performance

```tsx
import { createContext, useContext } from 'frosty';

interface AppState {
  user: User | null;
  cart: CartItem[];
  ui: { loading: boolean; error: string | null };
}

const AppContext = createContext<AppState>({
  user: null,
  cart: [],
  ui: { loading: false, error: null }
});

// Only re-render when user changes
function UserDisplay() {
  const user = useContext(AppContext, state => state.user);
  
  return user ? <span>Hello, {user.name}</span> : <span>Guest</span>;
}

// Only re-render when cart count changes
function CartCount() {
  const cartCount = useContext(AppContext, state => state.cart.length);
  
  return <span>Cart ({cartCount})</span>;
}

// Only re-render when loading state changes
function LoadingSpinner() {
  const isLoading = useContext(AppContext, state => state.ui.loading);
  
  return isLoading ? <div>Loading...</div> : null;
}
```

### Using Consumer Component

```tsx
import { createContext } from 'frosty';

const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeContext.Consumer>
        {(theme) => (
          <div style={{ 
            background: theme === 'light' ? '#fff' : '#000',
            color: theme === 'light' ? '#000' : '#fff'
          }}>
            Theme: {theme}
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}
```

### Nested Contexts

```tsx
import { createContext, useContext } from 'frosty';

const ThemeContext = createContext<'light' | 'dark'>('light');
const LanguageContext = createContext<string>('en');

function MultiContextComponent() {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return (
    <div style={{ 
      background: theme === 'light' ? '#fff' : '#000',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <p>Current language: {language}</p>
      <p>Current theme: {theme}</p>
    </div>
  );
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <LanguageContext.Provider value="fr">
        <MultiContextComponent />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### Default Value Example

```tsx
import { createContext, useContext } from 'frosty';

const DefaultContext = createContext('Default Value');

function DefaultValueComponent() {
  const value = useContext(DefaultContext);

  return <div>Context Value: {value}</div>;
}

// This will display "Context Value: Default Value"
// since no Provider is wrapping the component
function App() {
  return <DefaultValueComponent />;
}
```

## Notes

### createContext

- **Type Safety**: When using TypeScript, specify the type parameter for better type safety: `createContext<MyType>(defaultValue)`
- **Default Values**: Always provide meaningful default values that match your expected type structure
- **Context Splitting**: For complex state, consider splitting into multiple contexts to minimize re-renders
- **Performance**: Default values are only used when no Provider is found in the component tree

### useContext

- **Provider Requirement**: Ensure that a `Context.Provider` is present in the component tree to provide a value; otherwise, the default value will be used
- **Performance Optimization**: Use the selector parameter to subscribe only to specific parts of the context value
- **Avoid Overuse**: Don't overuse context for all state management. For complex state, consider using a state management library like the built-in store system
- **Re-render Behavior**: Context updates trigger re-renders for all components consuming the context. Use selectors to optimize performance
- **Error Handling**: Components will throw an error if `useContext` is called outside of a render function

## Best Practices

- **Memoize Context Values**: When providing complex objects, memoize the context value to prevent unnecessary re-renders:
  ```tsx
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  ```
- **Custom Hooks**: Create custom hooks to encapsulate context logic:
  ```tsx
  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
  };
  ```
- **Context Composition**: Compose multiple contexts for clean separation of concerns
- **TypeScript Integration**: Use proper TypeScript interfaces for type safety and IntelliSense support

## See Also

- [useState](./useState.md) – For managing local state in functional components
- [useReducer](./useReducer.md) – For managing complex state logic
- [useStore](./useStore.md) – For external state management across components
- [useMemo](./useMemo.md) – For memoizing context values to prevent unnecessary re-renders
- [useCallback](./useCallback.md) – For memoizing context action functions