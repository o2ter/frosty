# useServerResource

The `useServerResource` hook provides a way to share server-side rendered data with the client during hydration. It enables efficient data transfer between server and client, supporting data compression and resource management in SSR workflows.

## Features

- **SSR Data Sharing**: Share server-rendered data seamlessly with the client
- **Data Compression**: Built-in support for compressing large datasets
- **Fast Hydration**: Optimized hydration with pre-serialized data
- **Type Safety**: Full TypeScript support with proper type inference
- **Resource Management**: Efficient storage and retrieval of serialized resources
- **Zero Duplication**: Eliminates redundant API calls during hydration

## Usage

**components/UserProfile.server.tsx**
```tsx
import { useServerResource } from 'frosty/web';

// Server-side: Serialize data for client access
const encoded = useServerResource('user-data', () => JSON.stringify(userData), [userData]);
const userData = JSON.parse(encoded); // Parse for rendering

// Render the same output as client
return <div>{userData.name}</div>;
```

**components/UserProfile.tsx**
```tsx
import { useServerResource } from 'frosty/web';

// Client-side: Access the same data instantly
const encoded = useServerResource('user-data');
const userData = JSON.parse(encoded);

// Render the same output as server
return <div>{userData.name}</div>;
```

## Parameters

1. **key**: `string`  
   Unique identifier for the server resource

2. **dataFactory**: `() => string` _(server only)_  
   Function that returns serialized data

3. **dependencies**: `unknown[]` _(server only)_  
   Dependency array for re-serialization

## Returns

**encoded**: `string`  
The serialized data that can be parsed on the client

## Behavior

- **Server-side**: Executes `dataFactory` and stores the result with the given `key`
- **Client-side**: Retrieves the stored data using the `key`
- **Dependencies**: When any dependency changes, `dataFactory` is re-executed
- **Hydration**: Data is automatically available during client-side hydration

## Examples

### Basic Data Provider

**components/DataProvider.server.tsx**
```tsx
import { useServerResource } from 'frosty/web';
import { createContext, useContext, useAwaited } from 'frosty';

const DataContext = createContext<any>(null);

export const useMyData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useMyData must be used within DataProvider');
  return context;
};

export const DataProvider = ({ children }: { children: ElementNode }) => {
  const data = useAwaited(async () => {
    const response = await fetch('/api/my-data');
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  }, []);

  const encoded = useServerResource('my-data-key', () => JSON.stringify(data), [data]);
  const parsedData = JSON.parse(encoded); // Parse for rendering

  return (
    <DataContext value={parsedData}>
      {children}
    </DataContext>
  );
};
```

**components/DataProvider.tsx**
```tsx
import { useServerResource } from 'frosty/web';
import { createContext, useContext } from 'frosty';

const DataContext = createContext<any>(null);

export const useMyData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useMyData must be used within DataProvider');
  return context;
};

export const DataProvider = ({ children }: { children: ElementNode }) => {
  const encoded = useServerResource('my-data-key');
  const data = JSON.parse(encoded);

  return (
    <DataContext value={data}>
      {children}
    </DataContext>
  );
};
```

### User Management with Error Handling

**components/UserProvider.server.tsx**
```tsx
import { useServerResource } from 'frosty/web';
import { createContext, useContext, useAwaited } from 'frosty';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user?: User;
  error?: string;
  loading: boolean;
}

const UserContext = createContext<UserState | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children, userId }: { 
  children: ElementNode; 
  userId: string;
}) => {
  const userState = useAwaited(async (): Promise<UserState> => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
      const user = await response.json();
      return { user, loading: false };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      };
    }
  }, [userId]);

  const encoded = useServerResource(
    `user-${userId}`, 
    () => JSON.stringify(userState), 
    [userState]
  );
  const parsedUserState = JSON.parse(encoded); // Parse for rendering

  return (
    <UserContext value={parsedUserState}>
      {children}
    </UserContext>
  );
};
```

**components/UserProvider.tsx**
```tsx
import { useServerResource } from 'frosty/web';
import { createContext, useContext } from 'frosty';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user?: User;
  error?: string;
  loading: boolean;
}

const UserContext = createContext<UserState | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children, userId }: { 
  children: ElementNode; 
  userId: string;
}) => {
  const encoded = useServerResource(`user-${userId}`);
  
  let userState: UserState;
  try {
    userState = JSON.parse(encoded);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    userState = { error: 'Failed to load user data', loading: false };
  }

  return (
    <UserContext value={userState}>
      {children}
    </UserContext>
  );
};
```

### Data Compression

**DataComponent.server.tsx**
```tsx
function CompressedDataComponent() {
  // Server-side: Optimize data structure instead of compressing
  const encoded = useServerResource('large-dataset', () => {
    // Remove unnecessary fields to reduce size
    const optimizedData = largeDataArray.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price
      // Skip heavy fields like descriptions, images, metadata
    }));
    
    return JSON.stringify(optimizedData);
  }, [largeDataArray]);
  
  const data = JSON.parse(encoded); // Parse for rendering

  return <div>{/* Render data - same as client */}</div>;
}
```

**DataComponent.tsx**
```tsx
function CompressedDataComponent() {
  // Client-side: Parse optimized data
  const encoded = useServerResource('large-dataset');
  const data = JSON.parse(encoded);

  return <div>{/* Render data - same as server */}</div>;
}
```

### Safe Serialization

**SafeDataComponent.server.tsx**
```tsx
function SafeDataComponent() {
  const encoded = useServerResource('mixed-data', () => {
    const safeData = {
      ...data,
      // Handle dates
      createdAt: data.createdAt?.toISOString?.() || data.createdAt,
      updatedAt: data.updatedAt?.toISOString?.() || data.updatedAt,
      // Remove functions
      methods: undefined,
      // Handle nested objects safely
      user: data.user ? {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      } : null
    };
    
    return JSON.stringify(safeData, (key, value) => {
      if (typeof value === 'function') return undefined;
      if (value instanceof Date) return value.toISOString();
      return value;
    });
  }, [data]);

  // Parse with type restoration for rendering
  const parsedData = JSON.parse(encoded, (key, value) => {
    if (key.endsWith('At') && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  });

  return <div>{/* Render data - same as client */}</div>;
}
```

**SafeDataComponent.tsx**
```tsx
function SafeDataComponent() {
  // Client-side: Parse with type restoration
  const encoded = useServerResource('mixed-data');
  const data = JSON.parse(encoded, (key, value) => {
    if (key.endsWith('At') && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  });

  return <div>{/* Render data - same as server */}</div>;
}
```

## Best Practices

### Separate Client and Server Code

**CRITICAL**: Always separate server-side and client-side code using different files or module resolution strategies. Never mix server-side data fetching with client-side parsing in the same component.

#### ✅ Correct: Separate Files with Same Output

**components/UserProfile.server.tsx** (Server-side)
```tsx
import { useServerResource, useAwaited } from 'frosty/web';

export const UserProfile = ({ userId }: { userId: string }) => {
  // Server-side: Fetch and serialize data
  const userData = useAwaited(async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }, [userId]);

  const encoded = useServerResource(`user-${userId}`, () => 
    JSON.stringify(userData), [userData]
  );
  
  // Parse data for rendering (same as client)
  const user = JSON.parse(encoded);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

**components/UserProfile.tsx** (Client-side)
```tsx
import { useServerResource } from 'frosty/web';

export const UserProfile = ({ userId }: { userId: string }) => {
  // Client-side: Only retrieve and parse data
  const encoded = useServerResource(`user-${userId}`);
  const user = JSON.parse(encoded);

  // Render exactly the same output as server
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

#### ❌ Incorrect: Mixed Concerns

```tsx
// DON'T DO THIS - Mixing server and client logic
function UserProfile({ userId }: { userId: string }) {
  // This tries to handle both server and client in one component
  const userData = useAwaited(async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }, [userId]);

  const encoded = useServerResource(`user-${userId}`, () => 
    JSON.stringify(userData), [userData]
  );

  // This parsing logic will run on server too
  const parsedData = JSON.parse(encoded);
  
  return <div>{parsedData.name}</div>;
}
```

### Module Resolution Strategy

Use Frosty CLI's module suffix configuration to automatically resolve the correct implementation:

**frosty.config.js**
```js
module.exports = {
  moduleSuffixes: {
    client: ['.browser', '.client', ''],
    server: ['.node', '.server', '.ssr', '']
  }
};
```

Then create:
- `UserProfile.server.tsx` - Server implementation
- `UserProfile.tsx` - Client implementation

### Environment Detection Patterns

#### ✅ Correct: Use Module Resolution

```tsx
// UserProvider.server.tsx - Server-side only
export const UserProvider = ({ children, userId }) => {
  const userData = useAwaited(() => fetchUser(userId), [userId]);
  const encoded = useServerResource('user', () => JSON.stringify(userData), [userData]);
  
  // Parse for rendering (same as client)
  const user = JSON.parse(encoded);
  
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// UserProvider.tsx - Client-side only  
export const UserProvider = ({ children, userId }) => {
  const encoded = useServerResource('user');
  const user = JSON.parse(encoded);
  
  // Render exactly the same as server
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
```

#### ❌ Incorrect: Runtime Environment Detection

```tsx
// DON'T DO THIS - Runtime checks are unreliable
function UserProvider({ children, userId }) {
  if (typeof window === 'undefined') {
    // Server logic - unreliable pattern
    const userData = useAwaited(() => fetchUser(userId), [userId]);
    const encoded = useServerResource('user', () => JSON.stringify(userData), [userData]);
  } else {
    // Client logic - also unreliable
    const encoded = useServerResource('user');
    const userData = JSON.parse(encoded);
  }
}
```

### Use Descriptive Keys
```tsx
// Good: Specific and descriptive
// Server-side
const encoded = useServerResource(`user-profile-${userId}`, dataFactory, deps);
const encoded = useServerResource(`shopping-cart-${sessionId}`, dataFactory, deps);

// Client-side  
const encoded = useServerResource(`user-profile-${userId}`);
const encoded = useServerResource(`shopping-cart-${sessionId}`);

// Avoid: Too generic
const encoded = useServerResource('data', dataFactory, deps);
```

### Handle Serialization Safety
```tsx
// Server-side component
const encoded = useServerResource('safe-data', () => {
  return JSON.stringify(data, (key, value) => {
    // Remove functions and undefined values
    if (typeof value === 'function' || value === undefined) return null;
    return value;
  });
}, [data]);
```

### Optimize Dependencies
```tsx
// Good: Only include properties that affect serialization
// Server-side
const encoded = useServerResource('user-summary', 
  () => JSON.stringify({ id: user.id, name: user.name }), 
  [user.id, user.name]
);

// Avoid: Entire object as dependency
const encoded = useServerResource('data', dataFactory, [complexObject]);
```

### Add Error Handling
```tsx
// Server-side component
const encoded = useServerResource('api-data', () => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Serialization failed:', error);
    return JSON.stringify({ error: 'Serialization failed' });
  }
}, [data]);
```

### Filter Sensitive Data
```tsx
// Good: Filter sensitive fields (Server-side)
const encoded = useServerResource('user', () => 
  JSON.stringify({ 
    id: user.id, 
    name: user.name, 
    email: user.email 
  }), [user]
);

// Avoid: Exposing sensitive data
const encoded = useServerResource('user', () => 
  JSON.stringify({ ...user, password: user.password }), [user]
);
```

## TypeScript Support

**UserComponent.server.tsx**
```tsx
interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Server-side with full type safety
const encoded = useServerResource(
  'user-data',
  () => JSON.stringify({
    data: userData,
    timestamp: Date.now()
  } as ApiResponse<User>),
  [userData]
);
```

**UserComponent.tsx**
```tsx
interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Client-side with type assertion
const encoded = useServerResource('user-data');
const response: ApiResponse<User> = JSON.parse(encoded);
```

## Advanced Usage

### Conditional Resources
**ConditionalComponent.server.tsx**
```tsx
// Server-side: Only serialize when data is available
const encoded = useServerResource('user-preferences', () => {
  return hasPreferences ? JSON.stringify(preferences) : JSON.stringify({});
}, [hasPreferences, preferences]);
```

**ConditionalComponent.tsx**
```tsx
// Client-side: Handle empty state
const encoded = useServerResource('user-preferences');
const preferences = JSON.parse(encoded);
const hasData = Object.keys(preferences).length > 0;
```

### Resource Composition
**ComposedComponent.server.tsx**
```tsx
// Server-side: Define multiple resources
const userEncoded = useServerResource('user', () => JSON.stringify(user), [user]);
const settingsEncoded = useServerResource('settings', () => JSON.stringify(settings), [settings]);
const themeEncoded = useServerResource('theme', () => JSON.stringify(theme), [theme]);
```

**ComposedComponent.tsx**
```tsx
// Client-side: Access multiple resources
const user = JSON.parse(useServerResource('user'));
const settings = JSON.parse(useServerResource('settings'));
const theme = JSON.parse(useServerResource('theme'));
```

### Versioned Resources
**VersionedComponent.server.tsx**
```tsx
// Server-side: Include version for cache busting
const encoded = useServerResource(`api-data-v${API_VERSION}`, () => {
  return JSON.stringify({ version: API_VERSION, data });
}, [data, API_VERSION]);
```

**VersionedComponent.tsx**
```tsx
// Client-side: Validate version compatibility
const encoded = useServerResource(`api-data-v${API_VERSION}`);
const response = JSON.parse(encoded);
if (response.version !== API_VERSION) {
  throw new Error('Version mismatch');
}
```

### Progressive Enhancement
**ProgressiveComponent.server.tsx**
```tsx
// Server-side: Provide base data
const encoded = useServerResource('page-data', () => {
  return JSON.stringify({
    essential: essentialData,
    timestamp: Date.now(),
    version: '1.0'
  });
}, [essentialData]);
```

**ProgressiveComponent.tsx**
```tsx
// Client-side: Use base data, then enhance
const encoded = useServerResource('page-data');
const { essential, timestamp } = JSON.parse(encoded);

// Use essential data immediately, load additional data if needed
const [enhancedData, setEnhancedData] = useState(null);
useEffect(() => {
  if (shouldLoadMore) {
    loadAdditionalData().then(setEnhancedData);
  }
}, [shouldLoadMore]);
```

### Resource Batching
**BatchedComponent.server.tsx**
```tsx
// Server-side: Batch multiple resources
const encoded = useServerResource('page-bundle', () => {
  return JSON.stringify({
    user: userData,
    settings: userSettings,
    preferences: userPreferences,
    navigation: navigationData
  });
}, [userData, userSettings, userPreferences, navigationData]);
```

**BatchedComponent.tsx**
```tsx
// Client-side: Extract what you need
const encoded = useServerResource('page-bundle');
const { user, settings, preferences, navigation } = JSON.parse(encoded);
```

## Performance Tips

### Minimize Data Size
**OptimizedComponent.server.tsx**
```tsx
// Extract only necessary fields
const encoded = useServerResource('product-list', () => {
  const essentialData = products.map(({ id, name, price, image }) => 
    ({ id, name, price, image })
  );
  return JSON.stringify(essentialData);
}, [products]);
```

### Implement Smart Caching
**CachedComponent.server.tsx**
```tsx
import { createHash } from 'node:crypto';

// Use content hash for cache invalidation
const dataHash = createHash('md5').update(JSON.stringify(data)).digest('hex');
const encoded = useServerResource(`cached-data-${dataHash}`, () => 
  JSON.stringify(data), [dataHash]
);
```

### Lazy Resource Loading
**LazyComponent.server.tsx**
```tsx
// Server-side: Only serialize when needed
const encoded = useServerResource('heavy-data', () => {
  if (!shouldSerialize) return JSON.stringify(null);
  return JSON.stringify(heavyData);
}, [shouldSerialize, heavyData]);
```

**LazyComponent.tsx**
```tsx
// Client-side: Handle lazy loading
const encoded = useServerResource('heavy-data');
const data = JSON.parse(encoded);
if (data === null) {
  // Load data dynamically on client
}
```

## Troubleshooting

### Common Issues

- **"Resource not found"**: Key mismatch between server/client - ensure identical keys on both sides
- **Hydration mismatch**: Different data on server vs client - verify consistent serialization logic
- **Memory leaks**: Large objects in dependencies - use specific properties instead of whole objects
- **Performance issues**: Frequent re-serialization - optimize dependency array
- **Serialization errors**: Non-serializable data types - use custom replacer/reviver functions
- **Size limits exceeded**: Data too large for transport - implement compression or pagination

### Debug Utilities

**DebugComponent.server.tsx**
```tsx
// Add comprehensive logging
const encoded = useServerResource('debug-resource', () => {
  console.log('Serializing resource:', key);
  console.log('Data size:', JSON.stringify(data).length, 'bytes');
  console.log('Dependencies:', dependencies);
  
  const serialized = JSON.stringify(data);
  console.log('Serialization complete');
  return serialized;
}, dependencies);

// Validate data integrity
const encoded = useServerResource('validated-data', () => {
  const serialized = JSON.stringify(data);
  const parsed = JSON.parse(serialized); // Validate it can be parsed
  return serialized;
}, [data]);
```

### Performance Monitoring

**PerfComponent.server.tsx**
```tsx
// Add performance tracking
const encoded = useServerResource('perf-data', () => {
  const start = performance.now();
  const serialized = JSON.stringify(data);
  const end = performance.now();
  
  console.log(`Serialization took ${end - start}ms`);
  return serialized;
}, [data]);
```

## Migration Guide

### From useState/useEffect Pattern

**Before (Client-only):**
```tsx
const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/data').then(res => res.json()).then(setData);
}, []);
```

**After (Server-side component):**
```tsx
// MyComponent.server.tsx
const data = useAwaited(() => fetch('/api/data').then(res => res.json()), []);
const encoded = useServerResource('api-data', () => JSON.stringify(data), [data]);
```

**After (Client-side component):**
```tsx
// MyComponent.tsx  
const encoded = useServerResource('api-data');
const data = JSON.parse(encoded);
```
