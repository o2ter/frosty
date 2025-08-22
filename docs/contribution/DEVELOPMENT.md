# Development Guide

This guide provides essential information for developers working on or with the Frosty project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Building the Project](#building-the-project)
- [Testing](#testing)
- [Development Workflow](#development-workflow)
- [Contributing Guidelines](#contributing-guidelines)
- [Debugging](#debugging)
- [Performance Profiling](#performance-profiling)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/o2ter/frosty.git
   cd frosty
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build the project**:
   ```bash
   npm run rollup
   # or
   yarn rollup
   ```

4. **Run tests**:
   ```bash
   npm test
   # or
   yarn test
   ```

5. **Start development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

## Development Setup

### IDE Configuration

#### VS Code (Recommended)

Install the following extensions:
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Jest Runner
- Auto Import - ES6, TS, JSX, TSX

#### TypeScript Configuration

The project uses TypeScript with strict settings. Key configurations in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "~",
    "moduleResolution": "bundler",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### Environment Setup

Create a `.env` file for local development:

```env
NODE_ENV=development
DEBUG=true
PORT=8080
```

## Building the Project

### Library Build

Build the main Frosty library:

```bash
# Clean previous builds
npm run clean

# Build with Rollup
npm run rollup

# Watch mode for development
npm run rollup -- --watch
```

### CLI Build

Build the CLI package:

```bash
cd packages/frosty-cli
npm run build
```

### Generated Files

Generate type definitions and element mappings:

```bash
npm run gen-data
```

### Build Artifacts

After building, you'll find:

- **`dist/`**: Compiled library files
  - `index.js` - CommonJS build
  - `index.mjs` - ES modules build
  - `index.d.ts` - TypeScript definitions

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- component.test.tsx

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Tests are organized as follows:

```
tests/
├── component.test.tsx     # Component functionality tests
├── css.test.tsx          # CSS system tests
├── minify.test.ts        # Minification tests
└── server/               # Server-side testing
    └── app.tsx           # Test application
```

### Writing Tests

Example test structure:

```typescript
import { describe, it, expect } from '@jest/globals';
import { render } from './test-utils';
import { MyComponent } from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { container } = render(<MyComponent name="Test" />);
    expect(container.textContent).toContain('Test');
  });

  it('should handle user interactions', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <MyComponent name="Test" onClick={onClick} />
    );
    
    getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Development Workflow

### Branch Strategy

- **`main`**: Production-ready code
- **`develop`**: Development branch
- **`feature/*`**: Feature branches
- **`bugfix/*`**: Bug fix branches
- **`release/*`**: Release preparation branches

### Commit Convention

Use conventional commits for better changelog generation:

```
feat: add new useLocalStorage hook
fix: resolve memory leak in reconciler
docs: update README with new examples
test: add tests for ErrorBoundary component
refactor: simplify renderer interface
style: fix code formatting
```

### Pull Request Process

1. Create feature branch from `develop`
2. Implement changes with tests
3. Ensure all tests pass
4. Update documentation if needed
5. Submit pull request with clear description
6. Address review feedback
7. Merge after approval

## Contributing Guidelines

### Code Style

The project uses strict TypeScript and follows these conventions:

#### Naming Conventions

- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: kebab-case or camelCase

#### Code Organization

```typescript
// 1. Imports (external first, then internal)
import _ from 'lodash';

import { useContext } from '~/core/hooks';
import { VNode } from '~/core/reconciler/vnode';

// 2. Type definitions
interface Props {
  children: ElementNode;
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Main implementation
export function MyComponent({ children }: Props) {
  // Implementation
}

// 5. Default export (if applicable)
export default MyComponent;
```

#### Documentation Standards

- Use JSDoc for public APIs
- Include usage examples
- Document complex algorithms
- Explain performance considerations

```typescript
/**
 * Debounces a function call to limit execution frequency.
 * 
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```typescript
 * const debouncedSave = useDebounce(saveData, 500);
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  // Implementation
}
```

### Performance Guidelines

- Minimize re-renders with proper memoization
- Use lazy loading for large components
- Implement efficient reconciliation
- Profile performance-critical paths

### Security Considerations

- Sanitize user inputs
- Avoid dangerous DOM methods
- Implement CSP-compatible code
- Handle errors gracefully

## Debugging

### Debug Mode

Enable debug mode for detailed logging:

```bash
npm start -- --debug
```

### Browser DevTools

Use standard browser debugging tools for Frosty applications:

1. Open browser DevTools (F12)
2. Use the "Elements" tab to inspect DOM structure
3. Use the "Console" tab for debugging output
4. Use the "Sources" tab for breakpoint debugging
5. Use the "Performance" tab for profiling

### Frosty-specific Debugging

Debug Frosty components using built-in utilities and error boundaries:

```typescript
import { ErrorBoundary, useStack, useRendererStorage } from 'frosty';

// Error tracking with ErrorBoundary (recommended)
function App() {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <div style={{ color: 'red', padding: '1rem' }}>
          <h2>Something went wrong:</h2>
          <pre>{error.message}</pre>
          <details>
            <summary>Stack trace</summary>
            <pre>{error.stack}</pre>
          </details>
        </div>
      )}
      onError={(error, component, stack) => {
        // Log detailed error information
        console.error('Error caught by boundary:', {
          error: error.message,
          component: component.type?.name || 'Unknown',
          stack: stack.map(c => c.type?.name || 'Anonymous'),
          fullStack: error.stack
        });
        
        // Send to error reporting service in production
        if (process.env.NODE_ENV === 'production') {
          // reportError(error, { component, stack });
        }
      }}
    >
      <MyApplication />
    </ErrorBoundary>
  );
}

// Component debugging utilities
function DebugComponent() {
  const stack = useStack();
  const storage = useRendererStorage();
  
  // Log component stack for debugging
  console.log('Component stack:', stack);
  
  // Debug renderer state
  console.log('Renderer storage:', storage);
  
  return <div>Debug info in console</div>;
}
```

### Component State Debugging

Use debug mode for detailed component lifecycle logging:

```typescript
import { useEffect, ErrorBoundary } from 'frosty';

// Component with conditional debug logging
function DebugComponent({ userId }: { userId: string }) {
  useEffect(() => {
    // Enable debug logging only in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Effect triggered for userId:', userId);
    }
    
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Effect cleanup for userId:', userId);
      }
    };
  }, [userId]);

  return <div>User: {userId}</div>;
}

// Use nested ErrorBoundaries for granular error tracking
function FeatureSection() {
  return (
    <ErrorBoundary
      fallback={({ error }) => <div>Feature unavailable: {error.message}</div>}
      onError={(error) => console.error('Feature error:', error)}
      silent={true} // Don't bubble up to parent boundary
    >
      <ComplexFeature />
    </ErrorBoundary>
  );
}
```

### VS Code Debugging

Configure VS Code debugging with `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Common Issues

#### Build Issues

- **TypeScript errors**: Check `tsconfig.json` configuration
- **Module resolution**: Verify path mappings
- **Missing dependencies**: Run `npm install`

#### Runtime Issues

- **Hook errors**: Ensure hooks are called at component top level
- **Context errors**: Verify context providers are properly nested
- **Memory leaks**: Check for proper cleanup in useEffect

#### Testing Issues

- **Async tests**: Use proper async/await patterns
- **Mock issues**: Ensure mocks are properly configured
- **Environment issues**: Check Jest configuration

## Performance Profiling

### Bundle Analysis

Analyze bundle size and composition:

```bash
# Install bundle analyzer
npm install -g webpack-bundle-analyzer

# Generate bundle report
npm run build -- --analyze
```

### Runtime Profiling

Use browser profiling tools:

1. Open Chrome DevTools
2. Go to "Performance" tab
3. Record user interactions
4. Analyze flame graphs

### Memory Profiling

Monitor memory usage:

1. Open "Memory" tab in DevTools
2. Take heap snapshots
3. Compare snapshots over time
4. Identify memory leaks

### Benchmark Testing

Create performance benchmarks:

```typescript
import { performance } from 'perf_hooks';

function benchmark(name: string, fn: () => void, iterations = 1000) {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  
  const end = performance.now();
  console.log(`${name}: ${(end - start) / iterations}ms per iteration`);
}

// Usage
benchmark('Component render', () => {
  render(<MyComponent />);
});
```

### Optimization Strategies

- **Component splitting**: Break large components into smaller ones
- **Lazy loading**: Load components only when needed
- **Memoization**: Cache expensive calculations
- **Virtual scrolling**: Handle large lists efficiently
- **Code splitting**: Split bundles at route boundaries

This development guide provides the foundation for contributing to and working with the Frosty project effectively. Follow these guidelines to maintain code quality and project consistency.
