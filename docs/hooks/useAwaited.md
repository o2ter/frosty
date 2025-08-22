# useAwaited

The `useAwaited` hook provides a way to eagerly resolve promises during component rendering, ensuring that asynchronous operations complete before rendering is finished. This hook is particularly designed for server-side rendering (SSR) scenarios where you need to wait for data to be loaded before the component renders. When using `useAwaited`, the component will not render until all promises have resolved.

## Features

- **Promise Resolution**: Eagerly resolves promises and caches results for efficiency
- **SSR Optimized**: Ensures promises settle before server-side rendering completes
- **Deferred Rendering**: Component rendering is deferred until all promises resolve
- **Error Handling**: Automatically throws promise rejection errors during rendering
- **Memoization**: Uses dependency array for intelligent promise recreation
- **WeakMap Caching**: Efficient memory management with automatic cleanup

## Usage

```tsx
import { useAwaited } from 'frosty';

async function fetchUserData(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

function UserProfile({ userId }: { userId: string }) {
  // The component will not render until userData is loaded
  const userData = useAwaited(() => fetchUserData(userId), [userId]);
  
  // userData is guaranteed to be available here
  return (
    <div>
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
    </div>
  );
}
```

## Basic Example

```tsx
import { useAwaited } from 'frosty';
import { useState } from 'frosty';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

async function fetchUserData(userId: string): Promise<UserData> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

function UserProfile({ userId }: { userId: string }) {
  // The promise will be resolved before rendering completes
  // The component will not render until userData is available
  const userData = useAwaited(() => fetchUserData(userId), [userId]);

  // No need for loading states - userData is guaranteed to be defined
  // when this component renders
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img
          src={userData.avatar}
          alt={`${userData.name}'s avatar`}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <div>
          <h3 style={{ margin: '0 0 5px 0' }}>{userData.name}</h3>
          <p style={{ margin: 0, color: '#6c757d' }}>{userData.email}</p>
        </div>
      </div>
    </div>
  );
}
```

## Parameters

1. **factory**: `() => PromiseLike<T>` - A function that returns a promise to resolve.
2. **deps**: `any` (optional) - Dependency array for memoization. The promise is recreated when dependencies change.

## Returns

`T | undefined` - The resolved value of the promise. If the promise is still pending, it returns `undefined`. The component will rerender when the promise resolves.

## Throws

- **Error**: If used outside a render function context
- **Promise Rejection**: If the promise rejects, the error is thrown during rendering

## Examples

### Data Fetching with Loading States

```tsx
import { useAwaited } from 'frosty';
import { useState } from 'frosty';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

async function fetchArticle(articleId: string): Promise<Article> {
  const response = await fetch(`/api/articles/${articleId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }
  return response.json();
}

function ArticleViewer({ articleId }: { articleId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Fetch article data with dependency on articleId
  const article = useAwaited(() => fetchArticle(articleId), [articleId]);

  if (!article) {
    return <></>; // wait for the promise to resolve
  }
  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 15px 0', lineHeight: '1.2' }}>
          {article.title}
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 0',
          borderTop: '1px solid #dee2e6',
          borderBottom: '1px solid #dee2e6',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          <div>
            By <strong>{article.author}</strong> • {new Date(article.publishedAt).toLocaleDateString()}
          </div>
          
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{
              padding: '8px 16px',
              backgroundColor: isBookmarked ? '#ffc107' : 'transparent',
              color: isBookmarked ? '#212529' : '#6c757d',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {isBookmarked ? '⭐' : '☆'} {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </header>

      <div style={{
        lineHeight: '1.8',
        fontSize: '16px',
        marginBottom: '30px'
      }}>
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '20px' }}>
            {paragraph}
          </p>
        ))}
      </div>

      <footer>
        <div style={{ marginBottom: '10px' }}>
          <strong>Tags:</strong>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {article.tags.map(tag => (
            <span
              key={tag}
              style={{
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '12px'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </article>
  );
}
```

### Multiple Async Dependencies

```tsx
import { useAwaited } from 'frosty';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${userId}/profile`);
  return response.json();
}

async function fetchUserStats(userId: string): Promise<UserStats> {
  const response = await fetch(`/api/users/${userId}/stats`);
  return response.json();
}

async function fetchUserPreferences(userId: string): Promise<UserPreferences> {
  const response = await fetch(`/api/users/${userId}/preferences`);
  return response.json();
}

function UserDashboard({ userId }: { userId: string }) {
  // Fetch multiple pieces of data concurrently
  const profile = useAwaited(() => fetchUserProfile(userId), [userId]);
  const stats = useAwaited(() => fetchUserStats(userId), [userId]);
  const preferences = useAwaited(() => fetchUserPreferences(userId), [userId]);

  if (!profile || !stats || !preferences) {
    return <></>; // wait for the promise to resolve
  }
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: preferences.theme === 'dark' ? '#2d3748' : 'white',
      color: preferences.theme === 'dark' ? 'white' : 'black',
      minHeight: '100vh'
    }}>
      <h2>User Dashboard</h2>
      
      {/* Profile Section */}
      <div style={{
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: preferences.theme === 'dark' ? '#4a5568' : '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Profile</h3>
        <div><strong>Name:</strong> {profile.name}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>User ID:</strong> {profile.id}</div>
      </div>

      {/* Stats Section */}
      <div style={{
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: preferences.theme === 'dark' ? '#4a5568' : '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Statistics</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              {stats.postsCount}
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>Posts</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {stats.followersCount}
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.followingCount}
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>Following</div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div style={{
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: preferences.theme === 'dark' ? '#4a5568' : '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Preferences</h3>
        <div><strong>Theme:</strong> {preferences.theme}</div>
        <div><strong>Language:</strong> {preferences.language}</div>
        <div><strong>Notifications:</strong> {preferences.notifications ? 'Enabled' : 'Disabled'}</div>
      </div>
    </div>
  );
}
```

### Error Handling and Fallbacks

```tsx
import { useAwaited } from 'frosty';
import { useState, ComponentNode } from 'frosty';

interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

async function fetchWithRetry<T>(
  url: string,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result: APIResponse<T> = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.message || 'API returned error status');
      }
      
      return result.data;
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        console.log(`Attempt ${attempt} failed, retrying...`);
      }
    }
  }
  
  throw lastError!;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// Error Boundary Component
function ErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: ComponentNode;
  fallback: (error: Error) => ComponentNode;
}) {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <>{fallback(error)}</>;
  }

  try {
    return <>{children}</>;
  } catch (caughtError) {
    setError(caughtError as Error);
    return <>{fallback(caughtError as Error)}</>;
  }
}

function ProductDisplay({ productId }: { productId: string }) {
  // This will throw an error if the promise rejects
  const product = useAwaited(
    () => fetchWithRetry<Product>(`/api/products/${productId}`),
    [productId]
  );

  if (!product) {
    return <></>; // wait for the promise to resolve
  }
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>{product.name}</h3>
      <p style={{ color: '#6c757d', marginBottom: '15px' }}>
        {product.description}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          ${product.price.toFixed(2)}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
            color: product.inStock ? '#155724' : '#721c24'
          }}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          
          <button
            disabled={!product.inStock}
            style={{
              padding: '8px 16px',
              backgroundColor: product.inStock ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: product.inStock ? 'pointer' : 'not-allowed'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductPage({ productId }: { productId: string }) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Product Details</h1>
      
      <ErrorBoundary
        fallback={(error) => (
          <div style={{
            padding: '20px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '8px',
            color: '#721c24'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Failed to Load Product</h3>
            <p style={{ margin: '0 0 15px 0' }}>{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}
      >
        <ProductDisplay productId={productId} />
      </ErrorBoundary>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

### SSR Configuration Example

```tsx
import { useAwaited } from 'frosty';

interface ServerConfig {
  apiBaseUrl: string;
  features: string[];
  environment: 'development' | 'staging' | 'production';
  buildInfo: {
    version: string;
    commit: string;
    buildTime: string;
  };
}

async function loadServerConfig(): Promise<ServerConfig> {
  // This would typically read from environment variables or config files on the server
  return {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
    features: (process.env.ENABLED_FEATURES || '').split(',').filter(Boolean),
    environment: (process.env.NODE_ENV as any) || 'development',
    buildInfo: {
      version: process.env.npm_package_version || '1.0.0',
      commit: process.env.GIT_COMMIT || 'unknown',
      buildTime: process.env.BUILD_TIME || new Date().toISOString()
    }
  };
}

function ConfigurationProvider({ children }: { children: ComponentNode }) {
  // Load configuration during SSR
  const config = useAwaited(() => loadServerConfig(), []);

  if (!config) {
    return <></>; // wait for the promise to resolve
  }
  return (
    <div data-config={JSON.stringify(config)}>
      {children}
    </div>
  );
}

// Usage in your app
function App() {
  return (
    <ConfigurationProvider>
      <div>
        <h1>My App</h1>
        {/* Your app components */}
      </div>
    </ConfigurationProvider>
  );
}
```

## Browser Support

- **Universal**: Works in all environments where Frosty is supported
- **SSR Optimized**: Designed specifically for server-side rendering workflows
- **Client-Side Compatible**: Handles client-side promise resolution gracefully

## Common Use Cases

- **Data Fetching**: Load required data before component renders
- **Configuration Loading**: Ensure configuration is available during SSR
- **Authentication**: Resolve user authentication status before rendering
- **API Initialization**: Set up API clients with required tokens or settings
- **Content Loading**: Fetch CMS content or static data during build time
- **Resource Preloading**: Ensure critical resources are loaded before rendering

## Performance Considerations

- **Promise Caching**: Results are cached using WeakMap for efficient memory management
- **Dependency Tracking**: Only recreates promises when dependencies change
- **SSR Optimization**: Prevents waterfall requests by resolving promises eagerly
- **Memory Efficiency**: Automatic cleanup when promises are garbage collected

## Notes

- **Render Context**: Must be used within a render function context
- **Rendering Behavior**: The component will not render until all promises resolve
- **Error Propagation**: Promise rejections are thrown as render errors
- **Memoization**: Uses same dependency tracking as `useMemo` for efficiency
- **SSR Priority**: Designed primarily for server-side rendering scenarios
- **No Loading States**: Since rendering is deferred until promises resolve, loading UI is not needed

## See Also

- [useMemo](./useMemo.md) – Memoize expensive computations.
- [useEffect](./useEffect.md) – Handle side effects after rendering.
- [useServerResource](./useServerResource.md) – Access server-side rendered data.