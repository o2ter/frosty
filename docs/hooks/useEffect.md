# useEffect

The `useEffect` hook allows you to perform side effects in your components. It runs after the render phase and can be used for tasks such as data fetching, subscriptions, or manually changing the DOM.

## Features

- **Side Effects**: Perform side effects in functional components
- **Cleanup**: Cleanup effects to avoid memory leaks
- **Dependencies**: Control when the effect runs using dependencies

## Usage

```tsx
import { useEffect } from 'frosty';

function ExampleComponent() {
  useEffect((signal) => {
    console.log('Component mounted or updated');

    // Example with fetch using AbortSignal
    fetch('/api/data', { signal })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error(err);
        }
      });

    return () => {
      console.log('Component unmounted or dependencies changed');
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount.

  return <div>Hello, world!</div>;
}
```

## Parameters

1. **effect**: `(signal: AbortSignal) => void | Promise<void> | (() => void) | (() => Promise<void>) | Promise<() => void> | Promise<() => Promise<void>>`  
   A function that contains the side effect logic and receives an `AbortSignal` parameter for cancellation support. It can optionally return a cleanup function to run when the component unmounts or before the effect re-runs. Both the effect and cleanup functions can be synchronous or asynchronous.

2. **deps**: `any[]` _(optional)_  
   An array of values that the effect depends on. The effect will re-run whenever one of these values changes. If omitted, the effect runs after every render

## Returns

The `useEffect` hook does not return any value.

## Examples

### Fetching Data

```tsx
import { useEffect } from 'frosty';
import { useState } from 'frosty';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(async (signal) => {
    try {
      const response = await fetch('https://api.example.com/data', { signal });
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Fetch failed:', error);
      }
    }
  }, []); // Runs only once when the component mounts.

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data: {JSON.stringify(data)}</div>;
}
```

### Subscriptions

```tsx
import { useEffect } from 'frosty';

function EventListenerComponent() {
  useEffect((signal) => {
    function handleResize() {
      console.log('Window resized:', window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // AbortSignal can be used for cleanup logic if needed
    signal.addEventListener('abort', () => {
      console.log('Effect is being cleaned up');
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Runs only on mount and unmount.

  return <div>Resize the window and check the console.</div>;
}
```

### Effect with Dependencies

```tsx
import { useEffect } from 'frosty';
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect((signal) => {
    console.log(`Count changed: ${count}`);
    
    // Example of using signal for cleanup detection
    return () => {
      if (signal.aborted) {
        console.log('Effect aborted due to cleanup');
      }
    };
  }, [count]); // Runs only when `count` changes.

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Notes

- Avoid using effects for tasks that can be handled during rendering, such as calculating derived state.
- Always include all dependencies in the dependency array to avoid stale closures or unexpected behavior.
- If you need to run an effect only once, pass an empty dependency array (`[]`).

## See Also

- [useState](./useState.md) – For managing local state in functional components.
- [useMemo](./useMemo.md) – For memoizing expensive calculations.