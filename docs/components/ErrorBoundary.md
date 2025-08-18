# ErrorBoundary

The `ErrorBoundary` component is a component designed to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. This ensures that your application remains functional even when parts of it encounter unexpected issues.

## Features

- **Error Handling**: Catches errors during rendering, lifecycle methods, and constructors of child components.
- **Fallback UI**: Displays a customizable fallback UI when an error is caught.
- **Error Logging**: Optionally logs error details for debugging purposes.
- **Silent Mode**: Can suppress error handling if needed using the `silent` prop.

## Props

| Prop Name   | Type                                   | Default | Description                                                                 |
|-------------|----------------------------------------|---------|-----------------------------------------------------------------------------|
| `silent`    | `boolean`                             | `false` | If `true`, suppresses error handling and fallback UI.                       |
| `onError`   | `(error, component, stack) => void`   | `null`  | Callback function triggered when an error is caught. Useful for logging.    |

## Usage

Wrap any part of your application that might throw errors with the `ErrorBoundary` component. This ensures that errors in child components do not crash the entire application.

### Basic Example

```jsx
import ErrorBoundary from 'path/to/ErrorBoundary';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Custom Fallback UI

You can provide a custom fallback UI by wrapping it in the `ErrorBoundary`:

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## How It Works

1. **Error Detection**: The `ErrorBoundary` monitors its child components for errors during rendering, lifecycle methods, and constructors.
2. **Fallback UI**: When an error is detected, the `ErrorBoundary` replaces the crashed component tree with the fallback UI.
3. **Error Logging**: If the `onError` callback is provided, it is invoked with details about the error, the component where it occurred, and the stack trace.

## Best Practices

- **Strategic Placement**: Use `ErrorBoundary` at high levels of your app (e.g., around routes or major sections) to prevent the entire app from crashing.
- **Custom Fallbacks**: Provide user-friendly fallback UIs to improve the user experience during errors.
- **Error Logging**: Use the `onError` callback to log errors for debugging and monitoring purposes.
- **Silent Mode**: Use the `silent` prop for scenarios where error handling should be suppressed (e.g., during testing).

## Advanced Example

Here’s an example with a custom `onError` handler and a fallback UI:

```jsx
import ErrorBoundary from 'path/to/ErrorBoundary';

const FallbackUI = () => <div>Something went wrong. Please try again later.</div>;

const handleError = (error, component, stack) => {
  console.error('Error caught by ErrorBoundary:', error);
  console.error('Component:', component);
  console.error('Stack trace:', stack);
};

<ErrorBoundary onError={handleError}>
  <MyComponent />
</ErrorBoundary>
```

## Notes

- The `ErrorBoundary` does not catch errors in:
  - Event handlers
  - Asynchronous code (e.g., `setTimeout`, `fetch`)
  - Server-side rendering
  - Errors thrown in the `ErrorBoundary` itself
- For these cases, consider additional error handling strategies.
