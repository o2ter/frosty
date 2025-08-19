# `useDebounce` Hook

The `useDebounce` hook allows you to debounce a function, ensuring that updates or executions occur only after a specified delay. This is useful for scenarios like search inputs, API calls, or any situation where you want to limit the frequency of updates.

## Features

- **Debounce Functions**: Prevent a function from being called too frequently.
- **Customizable Delay**: Specify the debounce delay in milliseconds.
- **Efficient Updates**: Automatically cancels pending updates when the value or dependencies change.

## Usage

### Debouncing a Function

```tsx
import { useDebounce } from 'frosty';
import { useEffect } from 'react';

function ResizeHandler() {
  const handleResize = useDebounce(() => {
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  }, { wait: 300 });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return <div>Resize the window and check the console.</div>;
}
```

## Parameters

1. **`callback`**:  
   - The function to debounce.

2. **`settings`**:  
   - Configuration options for debouncing, including:
     - **`wait`**: The debounce delay in milliseconds.
     - **`leading`**: If `true`, the function is invoked on the leading edge of the delay. Default is `true`.
     - **`trailing`**: If `true`, the function is invoked on the trailing edge of the delay. Default is `true`.

## Returns

- **Debounced Function**: A debounced version of the function.

## Example

### Debouncing API Calls

```tsx
import { useDebounce } from 'frosty';
import { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const fetchResults = useDebounce(() => {
    console.log(`Fetching results for: ${query}`);
    // Perform API call or other actions
  }, { wait: 300 });

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query, fetchResults]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Notes

- **String Input Not Supported**: `useDebounce` does not directly support string inputs. To debounce a string value, wrap the logic in a function and debounce that function.
- **Cancellation**: The hook automatically cancels pending updates when the component unmounts or dependencies change.
- **Leading vs. Trailing**: Use the `settings` parameter to control whether the function executes at the start or end of the delay.

---

# `useAsyncDebounce` Hook

The `useAsyncDebounce` hook is a variation of `useDebounce` designed specifically for asynchronous functions. It ensures that the debounced function resolves its promise only after the specified delay, making it ideal for scenarios like API calls or other async operations.

## Features

- **Debounce Async Functions**: Delay the execution of an asynchronous function until after the specified delay.
- **Promise Resolution**: Ensures that the returned promise resolves only after the debounce delay.
- **Customizable Delay**: Specify the debounce delay in milliseconds.

## Usage

### Debouncing an Async Function

```tsx
import { useAsyncDebounce } from 'frosty';

function SearchWithAsyncDebounce() {
  const fetchResults = useAsyncDebounce(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    console.log(data);
  }, { wait: 500 });

  const handleInputChange = (e) => {
    fetchResults(e.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
}
```

## Parameters

1. **`callback`**:  
   - The asynchronous function to debounce.

2. **`settings`**:  
   - Configuration options for debouncing, including:
     - **`wait`**: The debounce delay in milliseconds.
     - **`leading`**: If `true`, the function is invoked on the leading edge of the delay. Default is `true`.
     - **`trailing`**: If `true`, the function is invoked on the trailing edge of the delay. Default is `true`.

## Returns

- **Debounced Async Function**: A debounced version of the asynchronous function.

## Example

### Debouncing API Calls with Async Functions

```tsx
import { useAsyncDebounce } from 'frosty';

function Search() {
  const searchApi = useAsyncDebounce(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    console.log(data);
  }, { wait: 300 });

  const handleSearch = (e) => {
    searchApi(e.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleSearch}
      placeholder="Search..."
    />
  );
}
```

## Notes

- **Cancellation**: The hook ensures that pending promises are canceled when the component unmounts or dependencies change.
- **Error Handling**: Make sure to handle errors within the async function to avoid unhandled promise rejections.

## See Also

- [useDebounce](#useDebounce) – For debouncing synchronous functions.