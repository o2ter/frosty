# Getting Started with Frosty

Welcome to Frosty! This guide will help you create your first Frosty application and understand the core concepts.

## Installation

Install Frosty and the CLI tools in your project:

```bash
npm install frosty
# or
yarn add frosty
```

For development tools, also install the CLI:

```bash
npm install -D frosty-cli
# or
yarn add -D frosty-cli
```

## Your First Component

Let's create a simple counter component to understand Frosty's basics:

```tsx
// app.tsx
import { useState } from 'frosty';
import { DOMRenderer } from 'frosty/dom';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Welcome to Frosty!</h1>
      <Counter />
    </div>
  );
}

export default App;
```

## Setting Up Your Development Environment

### 1. TypeScript Configuration

Create a `tsconfig.json` file to enable JSX support:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "jsxImportSource": "frosty",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2. HTML Template

Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Frosty App</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./src/app.tsx"></script>
</body>
</html>
```

### 3. Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "frosty run --watch --debug src/app.tsx",
    "build": "frosty run --build-only src/app.tsx",
    "start": "frosty run src/app.tsx"
  }
}
```

## Core Concepts

### Components

Frosty components are functions that return JSX:

```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
}

// Usage
<Greeting name="Alice" age={25} />
```

### State Management

Use the `useState` hook for local state:

```tsx
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Effects and Side Effects

Use `useEffect` for side effects:

```tsx
import { useState, useEffect } from 'frosty';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}
```

### Fetching Data

Use `useResource` for async data fetching:

```tsx
import { useResource } from 'frosty';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const { resource: users, loading, error, refresh } = useResource<User[]>(
    async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    [] // Dependencies
  );

  if (loading) return <div>Loading users...</div>;
  if (error) return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={refresh}>Retry</button>
    </div>
  );

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

## Styling

### CSS Classes

Use the `className` prop for CSS classes:

```tsx
// With static classes
<div className="container">Content</div>

// With dynamic classes
<button className={['btn', isActive && 'active', size]}>
  Click me
</button>
```

### CSS-in-JS

Use the `style` prop for dynamic styling:

```tsx
function ThemedButton({ primary, disabled }: ButtonProps) {
  return (
    <button
      style={[
        {
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
        },
        primary && {
          backgroundColor: '#007bff',
          color: 'white',
        },
        disabled && {
          opacity: 0.5,
          cursor: 'not-allowed',
        }
      ]}
      disabled={disabled}
    >
      Click me
    </button>
  );
}
```

## Web Platform Features

Frosty includes many built-in hooks for web APIs:

```tsx
import { 
  useLocalStorage, 
  useOnline, 
  useWindowMetrics 
} from 'frosty/web';

function WebFeaturesDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const isOnline = useOnline();
  const { width, height } = useWindowMetrics();

  return (
    <div>
      <p>Window size: {width} x {height}</p>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      
      <input
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (persisted in localStorage)"
      />
      
      {name && <p>Hello, {name}!</p>}
    </div>
  );
}
```

## Running Your Application

### Development Mode

Start the development server with hot reloading:

```bash
npm run dev
# or
npx frosty run --watch --debug src/app.tsx
```

### Production Build

Build for production:

```bash
npm run build
# or
npx frosty run --build-only src/app.tsx
```

### Custom Configuration

Create a `server.config.js` file for custom configuration:

```js
module.exports = {
  src: 'src',
  output: 'dist',
  client: {
    main: {
      entry: 'src/app.tsx',
      uri: '/',
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

## Next Steps

Now that you have a basic understanding of Frosty, explore these topics:

- **[Core Concepts](./CORE_CONCEPTS.md)** - Deep dive into Frosty's architecture
- **[Styling Guide](./STYLING.md)** - Comprehensive styling documentation
- **[Hooks Reference](./overview.md)** - Complete hooks documentation
- **[CLI Documentation](./cli/CLI.md)** - Build tools and configuration
- **[API Reference](./API_REFERENCE.md)** - Complete API documentation

## Common Patterns

### Custom Hooks

Create reusable logic with custom hooks:

```tsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Context for Global State

Share state across components:

```tsx
import { createContext, useContext, useState } from 'frosty';

const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemeProvider({ children }: { children: ElementNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext value={theme}>
      {children}
    </ThemeContext>
  );
}

function ThemedApp() {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{ 
      background: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      Current theme: {theme}
    </div>
  );
}
```

You're now ready to build amazing applications with Frosty! 🚀
