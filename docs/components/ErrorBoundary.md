# ErrorBoundary

The `ErrorBoundary` component is a component designed to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. This ensures that your application remains functional even when parts of it encounter unexpected issues.

## Features

- **Error Handling**: Catches errors during rendering, lifecycle methods, and constructors of child components
- **Fallback UI**: Displays a customizable fallback UI when an error is caught
- **Error Logging**: Optionally logs error details for debugging purposes
- **Silent Mode**: Can suppress error handling if needed using the `silent` prop

## Props

| Prop Name   | Type                                   | Default | Description                                                                 |
|-------------|----------------------------------------|---------|-----------------------------------------------------------------------------|
| `silent`    | `boolean`                              | `false` | If `true`, suppresses error handling and fallback UI                       |
| `onError`   | `(error, component, stack) => void`    | `null`  | Callback function triggered when an error is caught. Useful for logging    |

## Usage

Wrap any part of your application that might throw errors with the `ErrorBoundary` component. This ensures that errors in child components do not crash the entire application.

### Basic Example

```jsx
import { ErrorBoundary } from 'frosty';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## Advanced Example

Here’s an example with a custom `onError` handler:

```jsx
import { ErrorBoundary } from 'frosty';

function App() {

  const handleError = (error, component, stack) => {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component:', component);
    console.error('Stack trace:', stack);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## Notes

- The `ErrorBoundary` does not catch errors in:
  - Event handlers
  - Asynchronous code (e.g., `setTimeout`, `fetch`)
  - Server-side rendering
  - Errors thrown in the `ErrorBoundary` itself
- For these cases, consider additional error handling strategies.
