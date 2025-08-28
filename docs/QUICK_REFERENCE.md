# Frosty Quick Reference

A quick reference for Frosty's most commonly used APIs and patterns.

## Installation & Setup

```bash
# Install Frosty
npm install frosty

# Install CLI tools (optional)
npm install -D frosty-cli

# Start development server
npx frosty run --watch --debug src/app.tsx
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "frosty"
  }
}
```

## Core Hooks

### State Management

```tsx
// useState - Local component state
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// useReducer - Complex state logic
const [state, dispatch] = useReducer(reducer, initialState);

// useStore - External store integration
const value = useStore(store);
const selectedValue = useStore(store, selector);
```

### Side Effects

```tsx
// useEffect - Side effects and lifecycle
useEffect((signal) => {
  // Effect logic with AbortSignal support
  return () => {
    // Cleanup
  };
}, [dependencies]);

// useCallback - Memoize functions
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);

// useMemo - Memoize values
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### Async Operations

```tsx
// useResource - Fetch and cache resources
const { resource, loading, error, refresh } = useResource(
  async () => {
    const response = await fetch('/api/data');
    return response.json();
  },
  [dependencies]
);

// useAwaited - Handle promises during render
const data = useAwaited(async () => {
  return await fetchData();
}, [dependencies]);

// useDebounce - Debounce function calls
const debouncedFn = useDebounce(callback, 300);
```

### Context

```tsx
// createContext - Create context
const ThemeContext = createContext<'light' | 'dark'>('light');

// Context Provider - Provide values (context object IS the provider)
<ThemeContext value={theme}>
  {children}
</ThemeContext>

// useContext - Consume context
const theme = useContext(ThemeContext);
const userName = useContext(UserContext, user => user.name); // With selector
```

### References

```tsx
// useRef - Mutable references
const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef(0);

// useRefHandle - Expose imperative API
useRefHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  getValue: () => inputRef.current?.value
}), []);
```

## Web Platform Hooks

### DOM & Window

```tsx
import { 
  useDocument, 
  useWindow, 
  useWindowMetrics,
  useWindowScroll 
} from 'frosty/web';

const document = useDocument();
const window = useWindow();
const { width, height } = useWindowMetrics();
const { x, y } = useWindowScroll();
```

### Storage

```tsx
import { useLocalStorage, useSessionStorage } from 'frosty/web';

const [value, setValue] = useLocalStorage('key', 'defaultValue');
const [sessionValue, setSessionValue] = useSessionStorage('sessionKey', null);
```

### Observers

```tsx
import { 
  useIntersectionObserver,
  useResizeObserver,
  useMutationObserver 
} from 'frosty/web';

const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
const [ref, { width, height }] = useResizeObserver();
const [ref, mutations] = useMutationObserver({ childList: true });
```

### Browser APIs

```tsx
import { 
  useOnline,
  useVisibility,
  useColorScheme,
  useLocation 
} from 'frosty/web';

const isOnline = useOnline();
const { isVisible, hasFocus } = useVisibility();
const colorScheme = useColorScheme(); // 'light' | 'dark'
const location = useLocation();
```

## Styling

### className

```tsx
// String
<div className="container" />

// Array with conditionals
<div className={['base', isActive && 'active', variant]} />

// Nested arrays
<div className={[baseClasses, conditionalClasses]} />
```

### style (CSS-in-JS)

```tsx
// Object
<div style={{ padding: '1rem', color: 'blue' }} />

// Array with conditionals
<div style={[
  { padding: '1rem' },
  isHighlighted && { backgroundColor: 'yellow' },
  { color: isDark ? 'white' : 'black' }
]} />
```

### inlineStyle (Direct CSS)

```tsx
// Direct inline styles
<div inlineStyle={{ color: 'red !important' }} />
```

## Components

### Basic Component

```tsx
interface Props {
  title: string;
  children?: ElementNode;
  onClick?: () => void;
}

function Component({ title, children, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

### Error Boundary

```tsx
<ErrorBoundary 
  onError={(error, component, stack) => {
    console.error('Error:', error);
  }}
>
  <App />
</ErrorBoundary>
```

### Props Provider

```tsx
<PropsProvider
  callback={({ type, props }) => ({
    ...props,
    className: `${props.className || ''} enhanced`
  })}
>
  <ChildComponents />
</PropsProvider>
```

## Rendering

### DOM Rendering

```tsx
import { DOMRenderer } from 'frosty/dom';

const root = DOMRenderer.createRoot(document.getElementById('app')!);
await root.mount(<App />);

// Unmount
root.unmount();
```

### Server Rendering

```tsx
import { ServerDOMRenderer } from 'frosty/server-dom';

const renderer = new ServerDOMRenderer();
const html = await renderer.renderToString(<App />);
```

## Common Patterns

### Data Fetching

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { resource: user, loading, error } = useResource(
    async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    [userId]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Form Handling

```tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

### Custom Hook

```tsx
import { useState, useCallback } from 'frosty';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// Usage
const { count, increment, decrement, reset } = useCounter(10);
```

### Context Provider

```tsx
interface AppContextType {
  user: User | null;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType>();

function AppProvider({ children }: { children: ElementNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const value = useMemo(() => ({
    user,
    theme,
    setTheme
  }), [user, theme]);
  
  return (
    <AppContext value={value}>
      {children}
    </AppContext>
  );
}

// Custom hook for consuming context
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

## CLI Commands

```bash
# Development
frosty run --watch --debug [entry-file]

# Production build
frosty run --build-only [entry-file]

# Custom configuration
frosty run --configuration custom.config.js

# Custom port
frosty run --port 3000

# Show help
frosty run --help
```

## Configuration

### server.config.js

```js
module.exports = {
  src: 'src',
  output: 'dist',
  serverEntry: 'server.js',
  client: {
    main: {
      entry: 'src/app.tsx',
      uri: '/'
    }
  },
  options: {
    resolve: {
      alias: {
        '@': './src'
      }
    }
  }
};
```

## Type Definitions

```tsx
// Common types
import type { 
  ElementNode,
  ComponentType,
  PropsWithChildren 
} from 'frosty';

// Context type
interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

// Component props
interface ComponentProps {
  title: string;
  children?: ElementNode;
  className?: string;
  style?: CSSProperties;
}
```

## Error Handling

```tsx
// Resource errors
import { ResourceErrors, useResourceErrors } from 'frosty';

<ResourceErrors>
  <App />
</ResourceErrors>

// Access errors
const errors = useResourceErrors();

// Error boundary
<ErrorBoundary onError={(error) => console.error(error)}>
  <Component />
</ErrorBoundary>
```

This quick reference covers the most commonly used Frosty APIs and patterns. For detailed documentation, see the individual hook and component pages.
