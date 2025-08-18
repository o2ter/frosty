# ErrorBoundary

The `ErrorBoundary` component is a component designed to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

## Usage

Wrap any part of your application that might throw errors with the `ErrorBoundary` component:

```jsx
import ErrorBoundary from 'path/to/ErrorBoundary';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## Example

```jsx
<ErrorBoundary fallback={<div>Something went wrong.</div>}>
  <ComponentThatMayThrow />
</ErrorBoundary>
```

## How it works

- Catches errors in any child component during rendering, in lifecycle methods, and in constructors.
- Displays the `fallback` UI when an error is caught.
- Optionally logs error details for debugging.

## Best Practices

- Use `ErrorBoundary` at high levels of your app to prevent the entire app from crashing.
- Customize the `fallback` prop to provide a user-friendly error message.
