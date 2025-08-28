# Troubleshooting Guide

This guide helps you resolve common issues when working with Frosty applications.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [TypeScript Issues](#typescript-issues)
- [Performance Issues](#performance-issues)
- [CLI Issues](#cli-issues)
- [SSR Issues](#ssr-issues)
- [Hook Issues](#hook-issues)
- [Debugging Tips](#debugging-tips)

## Installation Issues

### Package Not Found

**Issue**: `npm install frosty` fails with package not found error.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try installing with specific registry
npm install frosty --registry https://registry.npmjs.org/

# Check your npm configuration
npm config list
```

### Dependency Conflicts

**Issue**: Installation fails due to peer dependency conflicts.

**Solution**:
```bash
# Install with legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force

# Check for conflicting packages
npm ls
```

### CLI Installation Issues

**Issue**: `frosty` command not found after installing frosty-cli.

**Solution**:
```bash
# Install CLI globally
npm install -g frosty-cli

# Or use npx
npx frosty --help

# Check if CLI is in your PATH
echo $PATH
which frosty
```

## Build Issues

### TypeScript Compilation Errors

**Issue**: TypeScript compilation fails with JSX-related errors.

**Solution**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "frosty",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### Module Resolution Issues

**Issue**: Modules cannot be resolved during build.

**Solution**:
```js
// server.config.js
module.exports = {
  options: {
    resolve: {
      alias: {
        '@': './src',
        'frosty': require.resolve('frosty')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
  }
};
```

### Build Performance Issues

**Issue**: Build takes too long or runs out of memory.

**Solutions**:
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 node_modules/.bin/frosty run --build-only

# Use incremental builds
frosty run --watch

# Check for large dependencies
npx webpack-bundle-analyzer dist/stats.json
```

### CSS/Style Issues

**Issue**: Styles not being applied or CSS-in-JS not working correctly.

**Common Causes & Solutions**:

1. **Frosty's Built-in CSS-in-JS Not Working**:
```tsx
// ✅ Frosty handles CSS-in-JS internally with StyleBuilder
function Component() {
  return (
    <div style={{
      backgroundColor: 'blue',
      padding: '1rem',
      borderRadius: '8px'
    }}>
      Styled content
    </div>
  );
}
```

2. **External CSS/SCSS Files Not Loading**:
```css
/* styles.css - Frosty CLI includes CSS loaders by default */
.my-component {
  background-color: blue;
  padding: 1rem;
  border-radius: 8px;
}

/* styles.scss - SASS/SCSS also supported out of the box */
$primary-color: blue;
$padding: 1rem;

.my-component {
  background-color: $primary-color;
  padding: $padding;
  border-radius: 8px;
  
  &:hover {
    opacity: 0.8;
  }
}
```

```tsx
// Import CSS/SCSS files directly (no additional config needed)
import './styles.css';
import './styles.scss';

function Component() {
  return <div className="my-component">Styled content</div>;
}
```

**Note**: Frosty CLI includes CSS, SCSS, and PostCSS loaders by default with Autoprefixer. No additional webpack configuration is needed for standard CSS processing.

3. **Style vs inlineStyle Usage**:
```tsx
// ✅ Use 'style' for processed CSS-in-JS (becomes CSS classes)
<div style={{ backgroundColor: 'red', padding: '1rem' }}>
  Processed by Frosty's StyleBuilder
</div>

// ✅ Use 'inlineStyle' for direct inline CSS
<div inlineStyle={{ color: 'blue !important' }}>
  Direct inline styles for overrides
</div>

// ✅ Use 'className' for external CSS classes
<div className="my-css-class">
  Uses classes from imported CSS/SCSS files
</div>
```

4. **CSS Module Pattern**:
```css
/* component.module.css - CSS modules work with Frosty CLI */
.button {
  background-color: blue;
  padding: 1rem;
  border: none;
  border-radius: 4px;
}

.button:hover {
  background-color: darkblue;
}
```

```tsx
// Import CSS modules
import styles from './component.module.css';

function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}
```

5. **SCSS Variables and Mixins**:
```scss
// variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 0.375rem;

@mixin button-variant($bg-color) {
  background-color: $bg-color;
  border: 1px solid darken($bg-color, 10%);
  
  &:hover {
    background-color: darken($bg-color, 5%);
  }
}

// component.scss
@import './variables.scss';

.primary-button {
  @include button-variant($primary-color);
  padding: 0.5rem 1rem;
  border-radius: $border-radius;
}
```

6. **PostCSS and Autoprefixer** (automatically applied):
```css
/* Your CSS */
.flex-container {
  display: flex;
  user-select: none;
}

/* Automatically becomes (with vendor prefixes) */
.flex-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

7. **className Array Syntax Issues**:
```tsx
// ✅ Correct array syntax for conditional classes
<div className={[
  'base-class',
  isActive && 'active',
  variant === 'primary' && 'primary'
]}>
  Content
</div>

// ❌ Avoid string concatenation when using CSS modules
<div className={`base ${isActive ? 'active' : ''}`}>
  Content
</div>

// ✅ Combining CSS modules with conditional classes
<div className={[
  styles.baseClass,
  isActive && styles.active,
  'external-class'
]}>
  Content
</div>
```

8. **CSS Import Order Issues**:
```tsx
// ✅ Import CSS files before component code
import './global.css';        // Global styles first
import './component.scss';    // Component-specific styles
import { useState } from 'frosty';    // Then JavaScript imports

function Component() {
  return <div className="styled">Content</div>;
}
```

9. **Asset URL Issues in CSS**:
```css
/* ✅ Relative paths work with Frosty CLI's file loader */
.background {
  background-image: url('./images/background.jpg');
}

.icon {
  background-image: url('../assets/icon.svg');
}

/* File loader automatically handles hashing and optimization */
```

10. **SSR Style Hydration Issues**:
```tsx
// ✅ Ensure styles are consistent between server and client
function Component() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use same styles for SSR and client
  const baseStyle = { padding: '1rem', margin: '0.5rem' };
  
  return (
    <div style={baseStyle}>
      {mounted ? 'Client content' : 'Loading...'}
    </div>
  );
}
```

11. **Dynamic Styles Not Updating**:
```tsx
// ✅ Ensure dependencies trigger re-renders
function DynamicComponent({ theme }: { theme: string }) {
  const dynamicStyle = useMemo(() => ({
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333'
  }), [theme]); // Include theme in dependencies
  
  return <div style={dynamicStyle}>Content</div>;
}
```

## Runtime Issues

### Component Not Rendering

**Issue**: Components are not rendering or showing blank screen.

**Debug Steps**:
```tsx
// Check for JavaScript errors in console
// Verify component is properly mounted
import { DOMRenderer } from 'frosty/dom';

function App() {
  console.log('App component rendering');
  return <div>Hello World</div>;
}

const root = DOMRenderer.createRoot(document.getElementById('app'));
if (!document.getElementById('app')) {
  console.error('Mount point #app not found');
}
await root.mount(<App />);
```

### State Not Updating

**Issue**: useState or other state hooks not triggering re-renders.

**Solution**:
```tsx
// Ensure you're not mutating state directly
const [items, setItems] = useState([]);

// ❌ Don't do this
items.push(newItem);

// ✅ Do this instead
setItems([...items, newItem]);

// ❌ Don't mutate objects
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // This won't trigger re-render

// ✅ Create new objects
setUser({ ...user, name: 'Jane' });
```

### Event Handlers Not Working

**Issue**: onClick and other event handlers not firing.

**Solution**:
```tsx
// Ensure proper event handler syntax
function Button() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    // ✅ Correct
    <button onClick={handleClick}>Click me</button>
    
    // ❌ Don't call immediately
    // <button onClick={handleClick()}>Click me</button>
  );
}
```

### Memory Leaks

**Issue**: Application consuming too much memory over time.

**Solution**:
```tsx
// Clean up effects properly
useEffect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);

  // Always clean up
  return () => clearInterval(timer);
}, []);

// Clean up event listeners
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## TypeScript Issues

### JSX Type Errors

**Issue**: TypeScript errors related to JSX elements.

**Solution**:
```tsx
// Ensure proper types are imported
import type { ElementNode } from 'frosty';

interface Props {
  children: ElementNode;
}

function Component({ children }: Props) {
  return <div>{children}</div>;
}
```

### Hook Type Inference Issues

**Issue**: TypeScript can't infer hook types properly.

**Solution**:
```tsx
// Explicitly type your state
const [user, setUser] = useState<User | null>(null);

// Type your context
const ThemeContext = createContext<'light' | 'dark'>('light');

// Type your resource hooks
const { resource: users } = useResource<User[]>(fetchUsers);
```

### Component Prop Type Errors

**Issue**: TypeScript errors on component props.

**Solution**:
```tsx
// Define proper interfaces
interface ButtonProps {
  children: ElementNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ children, onClick, disabled, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

## Performance Issues

### Slow Initial Load

**Issue**: Application takes too long to load initially.

**Solutions**:
```tsx
// Use lazy loading for large components
import { lazy, Suspense } from 'frosty';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Optimize bundle size
// Check what's in your bundle
npx webpack-bundle-analyzer dist/stats.json
```

### Excessive Re-renders

**Issue**: Components re-rendering too frequently.

**Solutions**:
```tsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);

// Use context selectors
const userName = useContext(UserContext, user => user.name);
```

### Slow Network Requests

**Issue**: useResource or API calls are slow.

**Solutions**:
```tsx
// Add request debouncing
const { resource, loading } = useResource({
  fetch: searchUsers,
  debounce: { wait: 300 }
}, [searchQuery]);

// Implement request caching
const { resource } = useResource(
  () => fetch('/api/users').then(r => r.json()),
  [] // Empty deps for caching
);

// Use parallel requests
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
```

## CLI Issues

### CLI Commands Not Working

**Issue**: Frosty CLI commands fail or don't work as expected.

**Debug Steps**:
```bash
# Check CLI installation
which frosty
frosty --version

# Check current directory and config
ls -la
cat server.config.js

# Run with verbose output
frosty run --debug --verbose

# Check for conflicting processes
ps aux | grep node
lsof -i :8080  # Check if port is in use
```

### Hot Reload Not Working

**Issue**: Changes not reflected during development.

**Solutions**:
```bash
# Ensure watch mode is enabled
frosty run --watch --debug

# Check file permissions
ls -la src/

# Clear any caches
rm -rf node_modules/.cache
rm -rf dist/
npm install
```

### Build Artifacts Issues

**Issue**: Built files are incorrect or missing.

**Solutions**:
```bash
# Clean build directory
rm -rf dist/
frosty run --build-only

# Check output configuration
# server.config.js
module.exports = {
  output: 'dist',
  // ...
};
```

## SSR Issues

### Hydration Mismatches

**Issue**: Server and client render different content.

**Solution**:
```tsx
// Ensure consistent rendering
function Component() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>; // Same on server and client
  }
  
  return <div>{Date.now()}</div>; // Only render after mount
}
```

### Server-Side Errors

**Issue**: SSR fails with JavaScript errors.

**Solution**:
```tsx
// Handle server/client differences
import { useDocument } from 'frosty/web';

function Component() {
  const document = useDocument();
  
  // Check if document is available
  if (!document) {
    return null; // Server-side fallback
  }
  
  return <div>{document.title}</div>;
}
```

## Hook Issues

### Hook Call Errors

**Issue**: "Hooks can only be called inside function components" error.

**Solution**:
```tsx
// ❌ Don't call hooks conditionally
function Component({ condition }) {
  if (condition) {
    const [state] = useState(0); // Error!
  }
}

// ✅ Always call hooks at top level
function Component({ condition }) {
  const [state] = useState(0);
  
  if (!condition) return null;
  
  return <div>{state}</div>;
}
```

### useEffect Dependency Issues

**Issue**: useEffect not running when expected or running too often.

**Solution**:
```tsx
// Include all dependencies
useEffect(() => {
  fetchData(userId, filters);
}, [userId, filters]); // Don't forget dependencies!

// For objects/arrays, use useMemo
const memoizedFilters = useMemo(() => ({ 
  category, 
  status 
}), [category, status]);

useEffect(() => {
  fetchData(userId, memoizedFilters);
}, [userId, memoizedFilters]);
```

### Context Issues

**Issue**: useContext returns undefined or default value.

**Solution**:
```tsx
// Ensure component is wrapped with provider
function App() {
  return (
    <ThemeContext value="dark">
      <MyComponent /> {/* This can use useContext(ThemeContext) */}
    </ThemeContext>
  );
}

// Check context structure
const ThemeContext = createContext<'light' | 'dark'>('light');

function MyComponent() {
  const theme = useContext(ThemeContext);
  console.log('Theme:', theme); // Should not be undefined
  return <div>Theme: {theme}</div>;
}
```

## Debugging Tips

### Enable Debug Mode

```bash
# Run in debug mode for more verbose output
frosty run --debug --watch
```

### Add Logging

```tsx
// Add debug logging to components
function Component({ prop1, prop2 }) {
  console.log('Component render:', { prop1, prop2 });
  
  useEffect(() => {
    console.log('Effect triggered:', { prop1, prop2 });
  }, [prop1, prop2]);
  
  return <div>Component content</div>;
}
```

### Check Network Tab

```bash
# For useResource issues, check Network tab in DevTools
# Look for failed requests, slow responses, or incorrect URLs
```

### Performance Profiling

```tsx
// Add performance marks
function HeavyComponent() {
  performance.mark('heavy-component-start');
  
  const result = heavyCalculation();
  
  performance.mark('heavy-component-end');
  performance.measure(
    'heavy-component', 
    'heavy-component-start', 
    'heavy-component-end'
  );
  
  return <div>{result}</div>;
}
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot read properties of undefined" | Trying to access property on undefined value | Add null checks: `user?.name` |
| "Maximum update depth exceeded" | Infinite re-render loop | Check useEffect dependencies and state updates |
| "Cannot update a component while rendering" | State update during render | Move state update to useEffect |
| "Element type is invalid" | Incorrect import or component name | Check import statements and component exports |
| "Objects are not valid as a React child" | Rendering object instead of string/element | Convert object to string or extract property |

## Getting Help

If you're still experiencing issues:

1. **Check the documentation**: Review relevant hook and API documentation
2. **Search issues**: Look for similar issues in the GitHub repository
3. **Create minimal reproduction**: Create a minimal example that reproduces the issue
4. **Ask for help**: Open an issue with detailed information:
   - Frosty version
   - Node.js version
   - Operating system
   - Minimal reproduction case
   - Error messages and stack traces
   - What you expected vs what happened

## Common Patterns That Work

```tsx
// ✅ Good patterns to follow

// 1. Proper error boundaries
<ErrorBoundary onError={(error) => console.error(error)}>
  <App />
</ErrorBoundary>

// 2. Conditional rendering
{user ? <UserProfile user={user} /> : <LoginForm />}

// 3. Loading states
{loading ? <Spinner /> : <DataDisplay data={data} />}

// 4. Proper cleanup
useEffect(() => {
  const cleanup = setupSomething();
  return cleanup;
}, []);

// 5. Memoized values
const expensiveValue = useMemo(() => calculate(data), [data]);
```

This troubleshooting guide should help you resolve most common issues. Remember to always check the browser console and network tab when debugging, and don't hesitate to add logging to understand what's happening in your application.
