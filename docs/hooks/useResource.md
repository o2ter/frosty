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

## See Also

- [useState](./useState.md) – For managing local state.
- [useEffect](./useEffect.md) – For side effects like data fetching.