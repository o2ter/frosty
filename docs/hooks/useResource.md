# `useResource` Hook

The `useResource` hook is a utility for managing asynchronous data fetching and resource lifecycle in your components. It simplifies fetching, caching, and updating resources while providing a clean and declarative API.

## Features

- **Data Fetching**: Fetch resources asynchronously with ease.
- **Caching**: Automatically caches resources to avoid redundant network requests.
- **Error Handling**: Built-in support for handling errors during resource fetching.
- **Loading States**: Provides loading and ready states for better UI feedback.
- **Reactive Updates**: Automatically updates the resource when dependencies change.

## Usage

```tsx
import { useResource } from 'frosty';

function UserProfile({ userId }) {
  const { resource: user, error, loading, refresh } = useResource(
    () => fetch(`/api/users/${userId}`)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading user data: {error.message}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## Parameters

1. **`config`**:  
   A fetch function or a configuration object containing the fetch function and optional debounce settings.  
   - If a function, it should return a promise resolving to the resource data.
   - If an object, it should include:
     - `fetch`: The fetch function.
     - `debounce`: Optional debounce settings to control fetch frequency.

2. **`deps`** *(optional)*:  
   An array of dependencies that trigger a refetch when changed.

## Returns

The `useResource` hook returns an object with the following properties:

- **`resource`**: The fetched resource data.  
- **`error`**: An error object if the fetch fails.  
- **`loading`**: A boolean indicating whether the resource is currently being fetched.  
- **`refresh`**: A function to manually refetch the resource.  
- **`cancel`**: A function to cancel the current fetch operation.  
- **`setResource`**: A function to manually update the resource state.  
- **`count`**: The number of times the resource has been fetched.  
- **`refreshing`**: A boolean indicating if the resource is currently being refreshed.

## Example

### Fetching Data with Dependencies

```tsx
import { useResource } from 'frosty';

function Posts({ userId }) {
  const { resource: posts, loading, error } = useResource(
    () => fetch(`/api/users/${userId}/posts`),
    [userId]
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## Notes

- **Caching**: The hook caches resources by default. Use `refresh` to refresh the data manually.
- **Error Handling**: Always check for the `error` property to handle fetch failures gracefully.
- **Dependencies**: Use the `deps` parameter to refetch resources when specific values change.

## `useIterableResource` Hook

The `useIterableResource` hook is an extension of the `useResource` hook, designed specifically for managing asynchronous iterable resources, such as streams or paginated data. It provides a declarative API for fetching and managing iterable data while supporting debouncing, error handling, and state management.

### Features

- **Asynchronous Iterables**: Fetch and manage iterable resources like streams or paginated data.
- **Incremental Updates**: Automatically appends new items to the resource as they are fetched.
- **Error Handling**: Built-in support for handling errors during resource fetching.
- **Loading States**: Provides loading and ready states for better UI feedback.
- **Reactive Updates**: Automatically updates the resource when dependencies change.

### Usage

```tsx
import { useIterableResource } from 'frosty';

function PaginatedList({ userId }) {
  const { resource: items, loading, error, refresh } = useIterableResource(
    async ({ abortSignal }) => {
      const response = await fetch(`/api/users/${userId}/items`, { signal: abortSignal });
      const data = await response.json();
      return data.items; // Assuming the API returns an iterable of items
    },
    [userId]
  );

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading items: {error.message}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Parameters

1. **`config`**:  
   A fetch function or a configuration object containing the fetch function and optional debounce settings.  
   - If a function, it should return an `AsyncIterable` that yields the resource items.
   - If an object, it should include:
     - `fetch`: The fetch function.
     - `debounce`: Optional debounce settings to control fetch frequency.

2. **`deps`** *(optional)*:  
   An array of dependencies that trigger a refetch when changed.

### Returns

The `useIterableResource` hook returns an object with the following properties:

- **`resource`**: The fetched iterable resource data (as an array).  
- **`error`**: An error object if the fetch fails.  
- **`loading`**: A boolean indicating whether the resource is currently being fetched.  
- **`refresh`**: A function to manually refetch the resource.  
- **`cancel`**: A function to cancel the current fetch operation.  
- **`setResource`**: A function to manually update the resource state.  
- **`count`**: The number of times the resource has been fetched.  
- **`refreshing`**: A boolean indicating if the resource is currently being refreshed.

### Example

#### Fetching Paginated Data

```tsx
import { useIterableResource } from 'frosty';

function PaginatedPosts({ userId }) {
  const { resource: posts, loading, error, refresh } = useIterableResource(
    async ({ abortSignal }) => {
      const response = await fetch(`/api/users/${userId}/posts`, { signal: abortSignal });
      const data = await response.json();
      return data.posts; // Assuming the API returns an iterable of posts
    },
    [userId]
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Notes

- **Incremental Updates**: The hook appends new items to the resource as they are fetched.
- **Error Handling**: Always check for the `error` property to handle fetch failures gracefully.
- **Dependencies**: Use the `deps` parameter to refetch resources when specific values change.
- **Debouncing**: Use the `debounce` option to control the frequency of fetch calls.

### See Also

- [useState](./useState.md) – For managing local state.
- [useEffect](./useEffect.md) – For side effects like data fetching.