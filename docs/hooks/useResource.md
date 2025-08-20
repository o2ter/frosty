# useResource

The `useResource` hook is a utility for managing asynchronous data fetching and resource lifecycle in your components. It simplifies fetching, caching, and updating resources while providing a clean and declarative API.

## Features

- **Data Fetching**: Fetch resources asynchronously with ease
- **Caching**: Automatically caches resources to avoid redundant network requests
- **Error Handling**: Built-in support for handling errors during resource fetching
- **Loading States**: Provides loading and ready states for better UI feedback
- **Reactive Updates**: Automatically updates the resource when dependencies change

## Usage

```tsx
import { useResource } from 'frosty';

function UserProfile({ userId }) {
  const { resource: user, error, loading, refresh } = useResource(
    () => fetch(`/api/users/${userId}`)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error loading user data: {error.message}</div>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <div>Email: {user.email}</div>
    </div>
  );
}
```

## Parameters

1. **config**: `Function | Object`  
   A fetch function or a configuration object containing the fetch function and optional debounce settings.
   - If a function, it should return a promise resolving to the resource data
   - If an object, it should include:
     - `fetch`: The fetch function
     - `debounce`: Optional debounce settings to control fetch frequency

2. **deps**: `any[]` _(optional)_  
   An array of dependencies that trigger a refetch when changed.

## Returns

The `useResource` hook returns an object with the following properties:

- **resource**: The fetched resource data
- **error**: An error object if the fetch fails
- **loading**: A boolean indicating whether the resource is currently being fetched
- **refresh**: A function to manually refetch the resource
- **cancel**: A function to cancel the current fetch operation
- **setResource**: A function to manually update the resource state
- **count**: The number of times the resource has been fetched
- **refreshing**: A boolean indicating if the resource is currently being refreshed

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
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
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

- **Caching**: The hook caches resources by default. Use `refresh` to refresh the data manually
- **Error Handling**: Always check for the `error` property to handle fetch failures gracefully
- **Dependencies**: Use the `deps` parameter to refetch resources when specific values change

## useIterableResource

The `useIterableResource` hook is an extension of the `useResource` hook, designed specifically for managing asynchronous iterable resources, such as streams or paginated data. It provides a declarative API for fetching and managing iterable data while supporting debouncing, error handling, and state management.

### Features

- **Asynchronous Iterables**: Fetch and manage iterable resources like streams or paginated data
- **Incremental Updates**: Automatically appends new items to the resource as they are fetched
- **Error Handling**: Built-in support for handling errors during resource fetching
- **Loading States**: Provides loading and ready states for better UI feedback
- **Reactive Updates**: Automatically updates the resource when dependencies change

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
    return <div>Loading items...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error loading items: {error.message}</div>
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

1. **config**: `Function | Object`  
   A fetch function or a configuration object containing the fetch function and optional debounce settings.
   - If a function, it should return an `AsyncIterable` that yields the resource items
   - If an object, it should include:
     - `fetch`: The fetch function
     - `debounce`: Optional debounce settings to control fetch frequency

2. **deps**: `any[]` _(optional)_  
   An array of dependencies that trigger a refetch when changed.

### Returns

The `useIterableResource` hook returns an object with the following properties:

- **resource**: The fetched iterable resource data (as an array)
- **error**: An error object if the fetch fails
- **loading**: A boolean indicating whether the resource is currently being fetched
- **refresh**: A function to manually refetch the resource
- **cancel**: A function to cancel the current fetch operation
- **setResource**: A function to manually update the resource state
- **count**: The number of times the resource has been fetched
- **refreshing**: A boolean indicating if the resource is currently being refreshed

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
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
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

- **Incremental Updates**: The hook appends new items to the resource as they are fetched
- **Error Handling**: Always check for the `error` property to handle fetch failures gracefully
- **Dependencies**: Use the `deps` parameter to refetch resources when specific values change
- **Debouncing**: Use the `debounce` option to control the frequency of fetch calls

## ResourceErrors

The `ResourceErrors` component is a context provider for managing asynchronous resource errors. It allows you to track, manage, and retry errors encountered during asynchronous operations in your application.

### Features

- **Centralized Error Management**: Provides a shared context for tracking errors across components
- **Retry Mechanism**: Allows retrying failed operations using the `refresh` function
- **Declarative API**: Simplifies error handling in complex applications

### Usage

Wrap your application or specific parts of it with the `ResourceErrors` component to enable error tracking:

```tsx
import { ResourceErrors } from 'frosty';

function App() {
  return (
    <ResourceErrors>
      <YourComponent />
    </ResourceErrors>
  );
}
```

### Accessing Errors with useResourceErrors

The `useResourceErrors` hook allows you to access the list of errors being tracked in the `ResourceErrors` context. Each error includes:

- **token**: A unique identifier for the error
- **error**: The error object or message
- **refresh**: A function to retry the operation that caused the error
- **refreshing**: A boolean indicating if the operation is currently being retried
- **loading**: A boolean indicating if the operation is still in progress

#### Example

```tsx
import { useResourceErrors } from 'frosty';

function ErrorList() {
  const errors = useResourceErrors();

  return (
    <div>
      {errors.map(({ token, error, refresh, refreshing }) => (
        <div key={token}>
          <div>Error: {error.message}</div>
          <button onClick={refresh} disabled={refreshing}>
            {refreshing ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Notes

- **Error Context**: The `ResourceErrors` component must wrap any components that use the `useResourceErrors` hook
- **Retry Logic**: Use the `refresh` function to retry failed operations. Ensure proper error handling to avoid infinite retry loops
- **Default Behavior**: If no `ResourceErrors` provider is found, a default context will be created automatically, but it is recommended to explicitly wrap your components with the provider for better control

### See Also

- [useResource](#useresource) – For managing asynchronous resource fetching
- [useIterableResource](#useiterableresource) – For managing asynchronous iterable resources