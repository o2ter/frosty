# API Reference

This document provides a comprehensive API reference for all Frosty components, hooks, and utilities.

## Table of Contents

- [Core Components](#core-components)
- [Styling](#styling)
- [Hooks API](#hooks-api)
- [Web Hooks](#web-hooks)
- [Renderer API](#renderer-api)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)

## Core Components

### Fragment

A component for grouping elements without creating additional DOM nodes.

```tsx
import { Fragment } from 'frosty';

function App() {
  return (
    <Fragment>
      <Header />
      <Main />
      <Footer />
    </Fragment>
  );
}

// Shorthand syntax
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

### ErrorBoundary

Catches JavaScript errors in component trees and displays fallback UI.

```tsx
import { ErrorBoundary } from 'frosty';

interface ErrorBoundaryProps {
  children: ElementNode;
  onError?: (error: Error, component: ComponentNode, stack: ComponentNode[]) => void;
  silent?: boolean;
}

function App() {
  return (
    <ErrorBoundary
      onError={(error, component, stack) => {
        console.error('Error caught:', error);
        // Send to error reporting service
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### PropsProvider

Injects or overrides props for child components.

```tsx
import { PropsProvider } from 'frosty';

interface PropsProviderProps {
  callback: (props: { type: any; props: any }) => any;
  children: ElementNode;
}

function App() {
  return (
    <PropsProvider
      callback={({ type, props }) => ({
        ...props,
        className: `${props.className || ''} enhanced-component`,
      })}
    >
      <MyComponent />
    </PropsProvider>
  );
}
```

## Styling

Frosty provides flexible styling capabilities through three main properties:

### className

Apply CSS classes to elements with support for arrays and conditional classes.

```tsx
// Simple usage
<div className="container">Content</div>

// Dynamic classes
<div className={['base', isActive && 'active', variant]}>
  Dynamic content
</div>

// Conditional styling
function Button({ primary, large, disabled }: ButtonProps) {
  return (
    <button 
      className={[
        'btn',
        primary ? 'btn-primary' : 'btn-secondary',
        large && 'btn-large',
        disabled && 'btn-disabled'
      ]}
    >
      Click me
    </button>
  );
}
```

### style

Apply CSS-in-JS styles that are processed and cached by Frosty's style builder.

```tsx
// Basic styling
<div style={{
  backgroundColor: '#f0f0f0',
  padding: '1rem',
  borderRadius: '8px'
}}>
  Styled content
</div>

// Dynamic styles with arrays
function Card({ theme, highlighted }: CardProps) {
  return (
    <div style={[
      {
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd'
      },
      theme === 'dark' && {
        backgroundColor: '#333',
        color: '#fff',
        borderColor: '#555'
      },
      highlighted && {
        boxShadow: '0 0 0 2px rgba(0,123,255,0.25)'
      }
    ]}>
      Card content
    </div>
  );
}
```

### inlineStyle

Apply direct inline CSS without processing through the style builder.

```tsx
// Direct inline styles
<div inlineStyle={{
  color: 'red',
  fontSize: '16px',
  fontWeight: 'bold'
}}>
  Inline styled content
</div>

// Use for overrides
<div 
  className="default-styles"
  inlineStyle={{ color: 'red !important' }}
>
  Override content
</div>
```

### Type Definitions

```typescript
type ClassName = Many<string | _.Falsey>;
type StyleProp<T> = Many<T | _.Falsey>;
type Many<T> = T | _.RecursiveArray<T>;

// Extended CSS properties with Frosty enhancements
interface ExtendedCSSProperties extends CSSProperties {
  // Additional properties and vendor prefixes
}
```

For detailed styling documentation and examples, see [STYLING.md](./STYLING.md).

## Hooks API

### Core State Hooks

#### useState

Manages local component state.

```tsx
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}

// With function updates
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

#### useReducer

Manages complex state logic with reducers.

```tsx
import { useReducer } from 'frosty';

interface State {
  count: number;
  step: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; step: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set_step':
      return { ...state, step: action.step };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <input 
        type="number" 
        value={state.step} 
        onChange={(e) => dispatch({ 
          type: 'set_step', 
          step: parseInt(e.target.value) 
        })} 
      />
    </div>
  );
}
```

### Effect Hooks

#### useEffect

Performs side effects in components with automatic cleanup support.

```tsx
import { useEffect } from 'frosty';

function DataFetcher({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  // Effect with dependencies and AbortSignal
  useEffect(async (signal) => {
    try {
      const userData = await fetchUser(userId, { signal });
      setUser(userData);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Fetch failed:', error);
      }
    }
  }, [userId]);

  // Effect with cleanup
  useEffect((signal) => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    signal.addEventListener('abort', () => {
      console.log('Effect is being cleaned up');
    });

    return () => clearInterval(timer);
  }, []);

  // Effect on every render
  useEffect((signal) => {
    document.title = user ? `User: ${user.name}` : 'Loading...';
  });

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

#### useCallback

Memoizes callback functions.

```tsx
import { useCallback } from 'frosty';

function TodoList({ todos, onToggle }: { 
  todos: Todo[]; 
  onToggle: (id: string) => void; 
}) {
  const handleToggle = useCallback((id: string) => {
    onToggle(id);
  }, [onToggle]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle} 
        />
      ))}
    </ul>
  );
}
```

#### useMemo

Memoizes computed values.

```tsx
import { useMemo } from 'frosty';

function ExpensiveComponent({ data }: { data: any[] }) {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.active)
      .map(item => expensiveTransform(item))
      .sort((a, b) => a.priority - b.priority);
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Context Hooks

**Note**: In Frosty, the context object returned by `createContext` acts as the provider component. You use the context object directly as a component with a `value` prop.

#### createContext

Creates a context object.

```tsx
import { createContext, useContext, useState, useCallback, useMemo } from 'frosty';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ElementNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext value={value}>
      {children}
    </ThemeContext>
  );
}
```

#### useContext

Consumes context values.

```tsx
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header-${theme}`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}
```

### Reference Hooks

#### useRef

Creates mutable refs that persist across renders.

```tsx
import { useRef } from 'frosty';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// For storing mutable values
function Timer() {
  const intervalRef = useRef<number>();
  const [count, setCount] = useState(0);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  useEffect(() => {
    return stopTimer; // Cleanup on unmount
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

#### useRefHandle

Exposes imperative methods to parent components.

```tsx
import { useRefHandle, useRef } from 'frosty';

interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
}

interface VideoPlayerProps {
  src: string;
  ref: Ref<VideoPlayerRef>;
}

function VideoPlayer({ src, ref }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useRefHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    seekTo: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
  }), []);

  return <video ref={videoRef} src={src} />;
}

// Usage
function App() {
  const playerRef = useRef<VideoPlayerRef>(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
    </div>
  );
}
```

### Async Hooks

#### useAwaited

Handles promises and async operations during rendering.

```tsx
import { useAwaited } from 'frosty';

function UserProfile({ userId }: { userId: string }) {
  const user = useAwaited(async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }, [userId]);

  // Component will not render until user data is available
  // No loading states needed - user is guaranteed to be defined
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

#### useResource

Fetches and caches resources.

```tsx
import { useResource } from 'frosty';

function PostList() {
  const { resource: posts, loading, error, refresh } = useResource(
    async () => {
      const response = await fetch('/api/posts');
      return response.json();
    },
    [] // Dependencies
  );

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

#### useDebounce

Debounces function calls.

```tsx
import { useDebounce } from 'frosty';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const response = await fetch(`/api/search?q=${searchQuery}`);
    const data = await response.json();
    setResults(data.results);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### useIterableResource

Manages async iterable data sources like streams.

```tsx
import { useIterableResource } from 'frosty';

function StreamingData() {
  const { resource: items, loading, error, refresh } = useIterableResource(
    async function* ({ abortSignal }) {
      const response = await fetch('/api/stream', { signal: abortSignal });
      const reader = response.body?.getReader();
      
      if (!reader) return;
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Parse streaming data and yield items
          const lines = new TextDecoder().decode(value).split('\n');
          for (const line of lines) {
            if (line.trim()) {
              yield JSON.parse(line);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    },
    [] // Dependencies
  );

  if (loading && !items?.length) return <div>Loading stream...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refresh}>Refresh Stream</button>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
      {loading && <div>Loading more...</div>}
    </div>
  );
}
```

### Utility Hooks

#### useStack

Retrieves the component stack.

```tsx
import { useStack } from 'frosty';

function DeepComponent() {
  const stack = useStack();
  
  return (
    <div>
      <h3>Component Stack:</h3>
      <ul>
        {stack.map((component, index) => (
          <li key={index}>{component.type?.name || 'Anonymous'}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### useRendererStorage

Accesses renderer-scoped storage.

```tsx
import { useRendererStorage } from 'frosty';

function GlobalStateComponent() {
  const storage = useRendererStorage();
  
  // Store global state that persists across component unmounts
  const getGlobalCounter = () => storage.get('counter') || 0;
  const setGlobalCounter = (value: number) => storage.set('counter', value);
  
  const [localCount, setLocalCount] = useState(getGlobalCounter);
  
  const increment = () => {
    const newValue = localCount + 1;
    setLocalCount(newValue);
    setGlobalCounter(newValue);
  };
  
  return (
    <button onClick={increment}>
      Global Count: {localCount}
    </button>
  );
}
```

#### useDebounce

Debounces function calls.

```tsx
import { useDebounce } from 'frosty';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const response = await fetch(`/api/search?q=${searchQuery}`);
    const data = await response.json();
    setResults(data.results);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### useAsyncDebounce

Debounces async function calls with enhanced async handling.

```tsx
import { useAsyncDebounce } from 'frosty';

function AsyncSearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useAsyncDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isSearching && <p>Searching...</p>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### useInterval

Sets up intervals that automatically clean up.

```tsx
import { useInterval } from 'frosty';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setSeconds(seconds => seconds + 1);
  }, isRunning ? 1000 : undefined);

  return (
    <div>
      <h1>Timer: {seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
```

### External Store Hooks

#### useSyncExternalStore

Synchronizes with external data sources.

```tsx
import { useSyncExternalStore } from 'frosty';

function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('online', onStoreChange);
      window.addEventListener('offline', onStoreChange);
      return () => {
        window.removeEventListener('online', onStoreChange);
        window.removeEventListener('offline', onStoreChange);
      };
    },
    () => navigator.onLine
  );

  return (
    <div style={{ color: isOnline ? 'green' : 'red' }}>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

#### useStore

Subscribes to external store state.

```tsx
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

## Web Hooks

### DOM Hooks

#### useDocument

Accesses the document object.

```tsx
import { useDocument } from 'frosty/web';

function DocumentTitle({ title }: { title: string }) {
  const document = useDocument();
  
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = originalTitle;
    };
  }, [document, title]);
  
  return null;
}
```

#### useWindow

Accesses the window object.

```tsx
import { useWindow } from 'frosty/web';

function WindowInfo() {
  const window = useWindow();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window]);
  
  return (
    <div>
      Window size: {dimensions.width} x {dimensions.height}
    </div>
  );
}
```

#### useWindowMetrics

Gets window dimensions and device metrics.

```tsx
import { useWindowMetrics } from 'frosty/web';

function WindowMetrics() {
  const metrics = useWindowMetrics();
  
  return (
    <div>
      <p>Window: {metrics.width} x {metrics.height}</p>
      <p>Device Pixel Ratio: {metrics.devicePixelRatio}</p>
      <p>Safe Area Insets: top={metrics.safeAreaInsets.top}</p>
    </div>
  );
}
```

#### useWindowScroll

Tracks window scroll position.

```tsx
import { useWindowScroll } from 'frosty/web';

function ScrollIndicator() {
  const scroll = useWindowScroll();
  
  return (
    <div>
      <p>Scroll X: {scroll.x}px</p>
      <p>Scroll Y: {scroll.y}px</p>
    </div>
  );
}
```

#### useVisualViewportMetrics

Gets visual viewport metrics for mobile browsers.

```tsx
import { useVisualViewportMetrics } from 'frosty/web';

function ViewportInfo() {
  const viewport = useVisualViewportMetrics();
  
  if (!viewport) return <div>Visual Viewport API not supported</div>;
  
  return (
    <div>
      <p>Viewport: {viewport.width} x {viewport.height}</p>
      <p>Scale: {viewport.scale}</p>
    </div>
  );
}
```

#### useColorScheme

Detects system color scheme preference.

```tsx
import { useColorScheme } from 'frosty/web';

function ThemedComponent() {
  const colorScheme = useColorScheme();
  
  return (
    <div style={{ 
      background: colorScheme === 'dark' ? '#333' : '#fff',
      color: colorScheme === 'dark' ? '#fff' : '#333'
    }}>
      Current theme: {colorScheme}
    </div>
  );
}
```

### Browser API Hooks

#### useOnline

Detects online/offline status.

```tsx
import { useOnline } from 'frosty/web';

function OnlineStatus() {
  const isOnline = useOnline();
  
  return (
    <div style={{ 
      color: isOnline ? 'green' : 'red' 
    }}>
      Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

#### useVisibility

Tracks document visibility state.

```tsx
import { useVisibility } from 'frosty/web';

function VisibilityTracker() {
  const visibility = useVisibility();
  
  return (
    <div>
      Document is: {visibility.isVisible ? 'visible' : 'hidden'}
      {visibility.hasFocus && <span> and focused</span>}
    </div>
  );
}
```

### Storage Hooks

#### useLocalStorage

Syncs state with localStorage.

```tsx
import { useLocalStorage } from 'frosty/web';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  
  return (
    <div>
      <label>
        <input 
          type="radio" 
          checked={theme === 'light'} 
          onChange={() => setTheme('light')} 
        />
        Light Theme
      </label>
      <label>
        <input 
          type="radio" 
          checked={theme === 'dark'} 
          onChange={() => setTheme('dark')} 
        />
        Dark Theme
      </label>
      <label>
        <input 
          type="checkbox" 
          checked={notifications} 
          onChange={(e) => setNotifications(e.target.checked)} 
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

#### useSessionStorage

Syncs state with sessionStorage.

```tsx
import { useSessionStorage } from 'frosty/web';

function FormData() {
  const [formData, setFormData] = useSessionStorage('formData', {
    name: '',
    email: '',
  });
  
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <form>
      <input 
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input 
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}
```

### Navigation Hooks

#### useLocation

Provides access to browser location and navigation methods.

```tsx
import { useLocation } from 'frosty/web';

function NavigationExample() {
  const location = useLocation();
  
  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <p>Query string: {location.search}</p>
      <button onClick={() => location.pushState(null, '/about')}>
        Go to About
      </button>
      <button onClick={() => location.back()}>
        Go Back
      </button>
    </div>
  );
}
```

**Returns**: Object with URL properties (`pathname`, `search`, `hash`, `href`, etc.) and navigation methods (`pushState`, `replaceState`, `back`, `forward`).

#### useSearchParams

Manages URL search parameters with automatic history updates.

```tsx
import { useSearchParams } from 'frosty/web';

function SearchParamsExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = searchParams.get('page') || '1';
  const filter = searchParams.get('filter') || 'all';
  
  const updatePage = (newPage: string) => {
    setSearchParams({ page: newPage, filter });
  };
  
  return (
    <div>
      <p>Page: {page}, Filter: {filter}</p>
      <button onClick={() => updatePage('2')}>
        Go to Page 2
      </button>
      <button onClick={() => setSearchParams({ filter: 'active' })}>
        Show Active Only
      </button>
    </div>
  );
}
```

**Returns**: `[URLSearchParams, setFunction]` tuple. By default, updates replace the current history entry (use `{ replace: false }` to push new entries).

### Observer Hooks

#### useIntersectionObserver

Observes element visibility.

```tsx
import { useIntersectionObserver } from 'frosty/web';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });
  
  return (
    <div ref={ref}>
      {isIntersecting ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder">Loading...</div>
      )}
    </div>
  );
}
```

#### useResizeObserver

Observes element size changes.

```tsx
import { useResizeObserver } from 'frosty/web';

function ResponsiveComponent() {
  const [ref, dimensions] = useResizeObserver();
  
  return (
    <div ref={ref}>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
      {dimensions.width > 768 ? (
        <DesktopLayout />
      ) : (
        <MobileLayout />
      )}
    </div>
  );
}
```

#### useMutationObserver

Observes DOM mutations.

```tsx
import { useMutationObserver } from 'frosty/web';

function MutationWatcher() {
  const [ref, mutations] = useMutationObserver({
    childList: true,
    subtree: true,
  });
  
  return (
    <div ref={ref}>
      <p>Mutations detected: {mutations.length}</p>
      <div id="content">
        {/* Content that will be watched for changes */}
      </div>
    </div>
  );
}
```

#### usePerformanceObserver

Observes performance metrics.

```tsx
import { usePerformanceObserver } from 'frosty/web';

function PerformanceMonitor() {
  const [ref, entries] = usePerformanceObserver({
    entryTypes: ['navigation', 'resource'],
  });
  
  return (
    <div ref={ref}>
      <p>Performance entries: {entries.length}</p>
    </div>
  );
}
```

## Renderer API

### DOMRenderer

Browser DOM renderer for client-side applications.

```tsx
import { DOMRenderer } from 'frosty/dom';

// Create a root and mount component
const root = DOMRenderer.createRoot(document.getElementById('app'));
await root.mount(<App />);

// Unmount component
root.unmount();
```

### ServerDOMRenderer

Server-side rendering with JSDOM.

```tsx
import { ServerDOMRenderer } from 'frosty/server-dom';

// Render to string
const renderer = new ServerDOMRenderer();
const html = await renderer.renderToString(<App />);

// Send HTML response
response.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
```

## Utility Functions

### mergeRefs

Merges multiple refs into a single ref callback.

```tsx
import { mergeRefs } from 'frosty';

function Component({ forwardedRef }: { forwardedRef: Ref<HTMLDivElement> }) {
  const localRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={mergeRefs(localRef, forwardedRef)}>
      Content
    </div>
  );
}
```

### createElement

Creates Frosty elements (usually used by JSX transform).

```tsx
import { createElement } from 'frosty';

// JSX: <div className="container">Hello</div>
// Equivalent to:
createElement('div', { className: 'container' }, 'Hello');
```

## Type Definitions

### ComponentNode

Base type for all Frosty components.

```typescript
interface ComponentNode {
  type: any;
  props: any;
  key?: string | number;
}
```

### StyleProp

Type for style properties.

```typescript
type StyleProp<T> = T | T[] | ((theme: any) => T | T[]);
```

### ClassName

Type for CSS class names.

```typescript
type ClassName = string | string[] | Record<string, boolean> | ClassName[];
```

This API reference covers the essential interfaces and usage patterns for Frosty. For more detailed examples and advanced usage, refer to the individual hook documentation files.
