# `useAwaited`

`useAwaited` is a hook designed for **server-side rendering (SSR)** to eagerly resolve a promise returned by a factory function and cache its result or error. It ensures the promise settles before rendering completes, making it ideal for asynchronous tasks during SSR.

This hook ensures data is fully resolved before rendering the component. It returns `undefined` while the promise is pending and triggers a rerender once resolved.

## Features
- Optimized for resolving async tasks before rendering.
- Eagerly resolves promises and caches the result or error.

## Usage
```typescript
const result = useAwaited(() => asyncTask(id), [id]);
```

## Parameters
- **`factory`**: `() => PromiseLike<T>`  
  A function that returns a promise to resolve.

- **`deps`** (optional): `any[]`  
  Dependency array for memoization. The promise is recreated when dependencies change.

## Returns
- **`T | undefined`**
  The resolved value of the promise or `undefined` if the promise is still pending.

## Throws
- **Error**: If used outside a render function.
- **Rejection Error**: If the promise fails.

## Notes
- **Server-Side Rendering**: This hook is primarily intended for SSR to ensure data is loaded before rendering.  
- **Client-Side Usage**: Handle the `undefined` state properly while the promise is pending.  
- **Avoid Misuse**: Do not use this hook in non-rendering contexts like event handlers or lifecycle methods.

## Example
```typescript
import { useAwaited } from './hooks/awaited';

const MyComponent = ({ id }: { id: string }) => {
  const result = useAwaited(() => asyncTask(id), [id]);

  if (!result) return <></>; // wait for task to complete and rerender immediately.

  return <div>{result.name}</div>;
};
```