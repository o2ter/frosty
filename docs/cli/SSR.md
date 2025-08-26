# Server-Side Rendering (SSR) with Frosty CLI

Server-Side Rendering (SSR) is a key feature of Frosty CLI that allows you to render your components on the server and send fully-formed HTML to the client. This provides faster initial page loads, better SEO, and improved performance for users on slower connections.

## Overview

When you use Frosty CLI to build and run your application, it automatically sets up SSR capabilities. The CLI handles the complexity of server-side rendering while providing you with hooks and utilities to optimize the experience.

## How SSR Works in Frosty

### 1. Build Process

The Frosty CLI creates two separate bundles:
- **Server Bundle**: Contains your application code optimized for Node.js execution
- **Client Bundle**: Contains your application code optimized for browser execution

```bash
# Build and run with SSR
npx frosty run app.js

# Development mode with hot reloading
npx frosty run --watch --debug app.js
```

### 2. Rendering Pipeline

1. **Server Request**: When a user requests a page, the server receives the request
2. **Context Extraction**: The CLI extracts request context (userAgent, cookies, URL, referrer) from the Express request
3. **JSDOM Creation**: A new JSDOM instance is created with the extracted context passed directly to the JSDOM constructor
4. **Component Rendering**: Frosty renders your components on the server using `ServerDOMRenderer` with the JSDOM instance
5. **HTML Generation**: The server generates complete HTML with your rendered components
6. **Client Hydration**: The client receives the HTML and "hydrates" it to make it interactive

## Basic SSR Setup

### Application Entry Point

Create your main application component:

```tsx
// app.tsx
import { useState, useEffect } from 'frosty';
import { useServerResource } from 'frosty/web';

export default function App() {
  const [count, setCount] = useState(0);
  
  // Server-side data sharing
  const serverData = useServerResource('app-data', () => 
    JSON.stringify({ initialTime: Date.now() })
  );

  return (
    <html>
      <head>
        <title>My Frosty App</title>
      </head>
      <body>
        <div id="root">
          <h1>Hello, Frosty SSR!</h1>
          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
          <p>Server time: {JSON.parse(serverData).initialTime}</p>
        </div>
      </body>
    </html>
  );
}
```

### Server Configuration

Configure your server behavior in `server.config.js`:

```js
// server.config.js
module.exports = {
  src: 'src',
  output: 'dist',
  serverEntry: 'server.js', // Optional custom server
  client: {
    main: {
      entry: 'src/app.tsx',
      uri: '/'
    }
  },
  moduleSuffixes: {
    client: ['.browser', '.web', ''],
    server: ['.node', '.server', '.ssr', '']
  }
};
```

## Request Context Access

### Accessing Request Information

The Frosty CLI automatically injects request context into the server-side JSDOM environment. You can access user agent, cookies, and URL location using the standard web API hooks:

```tsx
import { useWindow, useDocument, useLocation, useSearchParams } from 'frosty/web';

function RequestAwareComponent() {
  const window = useWindow();
  const document = useDocument();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Access URL location using dedicated hook (preferred)
  const currentUrl = location?.href;
  const pathname = location?.pathname;
  const search = location?.search;

  // Access specific query parameters
  const userId = searchParams?.get('id');
  const page = searchParams?.get('page') || '1';

  // Access user agent from the request
  const userAgent = window?.navigator?.userAgent;

  // Access cookies from the request
  const cookies = document?.cookie;

  return (
    <div>
      <h2>Request Context</h2>
      <p>Current URL: {currentUrl}</p>
      <p>Path: {pathname}</p>
      <p>Search: {search}</p>
      <p>User Agent: {userAgent}</p>
      <p>Cookies: {cookies}</p>
      <p>User ID param: {userId}</p>
      <p>Page param: {page}</p>
    </div>
  );
}
```

### User Agent Detection

```tsx
function UserAgentComponent() {
  const window = useWindow();
  const userAgent = window?.navigator?.userAgent || '';

  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const isBot = /bot|crawl|spider/i.test(userAgent);
  const browser = getBrowserFromUserAgent(userAgent);

  return (
    <div>
      <p>Device: {isMobile ? 'Mobile' : 'Desktop'}</p>
      <p>Is Bot: {isBot ? 'Yes' : 'No'}</p>
      <p>Browser: {browser}</p>
      {isMobile && <MobileOptimizedContent />}
      {isBot && <SEOOptimizedContent />}
    </div>
  );
}

function getBrowserFromUserAgent(ua: string): string {
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
}
```

### Cookie-Based Personalization

```tsx
function PersonalizedComponent() {
  const document = useDocument();
  const cookies = document?.cookie || '';

  // Parse cookies
  const cookieMap = cookies.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  const theme = cookieMap.theme || 'light';
  const language = cookieMap.lang || 'en';
  const userId = cookieMap.userId;

  return (
    <div className={`theme-${theme}`} data-lang={language}>
      <h1>Welcome{userId ? ' back' : ''}!</h1>
      {userId && <PersonalizedContent userId={userId} />}
      <ThemeToggle currentTheme={theme} />
      <LanguageSelector currentLang={language} />
    </div>
  );
}
```

### Dedicated Routing Hooks

Frosty provides dedicated hooks for location and search parameters that work seamlessly with SSR:

```tsx
import { useLocation, useSearchParams } from 'frosty/web';

function RoutingComponent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (!location) {
    // Fallback for non-browser environments
    return <div>Loading...</div>;
  }

  const { pathname } = location;

  // Simple routing based on pathname
  switch (pathname) {
    case '/':
      return <HomePage />;
    case '/about':
      return <AboutPage />;
    case '/user':
      const userId = searchParams?.get('id');
      return <UserPage userId={userId} />;
    case '/products':
      const category = searchParams?.get('category');
      const page = parseInt(searchParams?.get('page') || '1');
      return <ProductsPage category={category} page={page} />;
    default:
      return <NotFoundPage path={pathname} />;
  }
}
```

### Advanced Search Parameter Handling

```tsx
import { useSearchParams, useLocation } from 'frosty/web';

function SearchAndFilter() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse search parameters with type safety
  const query = searchParams?.get('q') || '';
  const category = searchParams?.get('category') || 'all';
  const page = parseInt(searchParams?.get('page') || '1');
  const sortBy = searchParams?.get('sort') || 'relevance';
  const tags = searchParams?.getAll('tags') || [];

  // Update search parameters programmatically
  const updateSearch = (newQuery: string) => {
    setSearchParams?.(prev => {
      const newParams = new URLSearchParams(prev);
      if (newQuery) {
        newParams.set('q', newQuery);
      } else {
        newParams.delete('q');
      }
      newParams.set('page', '1'); // Reset to first page
      return newParams;
    });
  };

  const updateFilters = (updates: Record<string, string | null>) => {
    setSearchParams?.(prev => {
      const newParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      return newParams;
    });
  };

  return (
    <div>
      <h2>Search & Filter</h2>
      <p>Current URL: {location?.href}</p>
      
      <input
        type="text"
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      
      <select
        value={category}
        onChange={(e) => updateFilters({ category: e.target.value, page: '1' })}
      >
        <option value="all">All Categories</option>
        <option value="tech">Technology</option>
        <option value="design">Design</option>
      </select>

      <div>
        <p>Query: {query}</p>
        <p>Category: {category}</p>
        <p>Page: {page}</p>
        <p>Sort: {sortBy}</p>
        <p>Tags: {tags.join(', ')}</p>
      </div>
    </div>
  );
}
```

## Data Fetching for SSR

### Using useServerResource

The `useServerResource` hook is the primary way to share data between server and client. It's critical to separate server-side and client-side code properly using different files or module resolution.

**UserProfile.server.tsx** (Server-side)
```tsx
import { useServerResource, useAwaited, useWindow, useDocument, useLocation } from 'frosty';

function UserProfile({ userId }: { userId: string }) {
  const window = useWindow();
  const document = useDocument();
  const location = useLocation();
  
  // Access request context for personalized data fetching
  const userAgent = window?.navigator?.userAgent || '';
  const cookies = document?.cookie || '';
  const currentUrl = location?.href || '';

  // Server-side: Fetch user data with request context
  const userData = useAwaited(async () => {
    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        'User-Agent': userAgent,
        'Cookie': cookies,
        'X-Request-URL': currentUrl,
      }
    });
    return response.json();
  }, [userId, userAgent, cookies]);

  const encoded = useServerResource('user-data', () => 
    JSON.stringify({
      user: userData,
      requestContext: {
        userAgent,
        timestamp: Date.now(),
        url: currentUrl
      }
    }), [userData, userAgent, currentUrl]
  );

  // Parse for rendering (same as client)
  const { user, requestContext } = JSON.parse(encoded);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <small>Rendered at {new Date(requestContext.timestamp).toISOString()}</small>
    </div>
  );
}
```

**UserProfile.tsx** (Client-side)
```tsx
import { useServerResource } from 'frosty/web';

function UserProfile({ userId }: { userId: string }) {
  // Client-side: Parse the serialized data
  const encoded = useServerResource('user-data');
  const { user, requestContext } = JSON.parse(encoded);

  // Render exactly the same output as server
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <small>Rendered at {new Date(requestContext.timestamp).toISOString()}</small>
    </div>
  );
}
```

### Platform-Specific Modules

Use module suffixes to provide different implementations for server and client:

**utils.js** - Common implementation
```js
export const formatDate = (date) => date.toISOString();
```

**utils.server.js** - Server-specific implementation
```js
export const formatDate = (date) => {
  // Server has access to Intl with all locales
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

**utils.browser.js** - Browser-specific implementation  
```js
export const formatDate = (date) => {
  // Lighter implementation for browser
  return date.toLocaleDateString();
};
```

### Proper Code Separation

#### ✅ Correct: Separate Server and Client Components

**components/DataProvider.server.tsx**
```tsx
import { useServerResource, useAwaited } from 'frosty/web';

export const DataProvider = ({ children }: { children: ElementNode }) => {
  // Server-side: Fetch and serialize data
  const data = useAwaited(async () => {
    const response = await fetch('/api/my-data');
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  }, []);

  const encoded = useServerResource('my-data-key', () => JSON.stringify(data), [data]);
  
  // Parse for rendering (same as client)
  const parsedData = JSON.parse(encoded);

  return (
    <DataContext.Provider value={parsedData}>
      {children}
    </DataContext.Provider>
  );
};
```

**components/DataProvider.tsx**
```tsx
import { useServerResource } from 'frosty/web';

export const DataProvider = ({ children }: { children: ElementNode }) => {
  // Client-side: Only retrieve and parse data
  const encoded = useServerResource('my-data-key');
  const data = JSON.parse(encoded);

  // Render exactly the same as server
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
```

#### ❌ Incorrect: Mixed Server/Client Logic

```tsx
// DON'T DO THIS - Mixing concerns in one component
export const DataProvider = ({ children }: { children: ElementNode }) => {
  // This tries to handle both server and client logic
  const data = useAwaited(async () => {
    const response = await fetch('/api/my-data');
    return response.json();
  }, []);

  const encoded = useServerResource('my-data-key', () => JSON.stringify(data), [data]);
  
  // This parsing will run on server too - inefficient and error-prone
  const parsedData = JSON.parse(encoded);

  return (
    <DataContext.Provider value={parsedData}>
      {children}
    </DataContext.Provider>
  );
};
```

## Environment Handling

### Server vs Client Detection

```tsx
import { useWindow, useDocument, useLocation } from 'frosty/web';

function EnvironmentAwareComponent() {
  const window = useWindow();
  const document = useDocument();
  const location = useLocation();
  
  // Access injected request context on server
  const userAgent = window?.navigator?.userAgent;
  const cookies = document?.cookie;
  
  // These will be available on both server and client
  // with real request data injected by the CLI on server
  
  return (
    <div>
      <p>Environment: {typeof window !== 'undefined' ? 'client' : 'server'}</p>
      <p>Current URL: {location?.href || 'unknown'}</p>
      <p>User Agent: {userAgent || 'unknown'}</p>
      <p>Has Cookies: {cookies ? 'yes' : 'no'}</p>
      <p>Pathname: {location?.pathname || '/'}</p>
    </div>
  );
}
```

### Web API Compatibility

Frosty provides server-safe implementations of web APIs, with the CLI injecting real request context:

```tsx
import { 
  useLocalStorage, 
  useLocation, 
  useSearchParams,
  useOnline,
  useVisibility,
  useWindow,
  useDocument
} from 'frosty/web';

function WebAPIComponent() {
  const window = useWindow();
  const document = useDocument();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // These hooks work safely on both server and client
  const [stored, setStored] = useLocalStorage('key', 'default');
  const isOnline = useOnline();
  const isVisible = useVisibility();

  // Access injected request context directly
  const userAgent = window?.navigator?.userAgent;
  const cookies = document?.cookie;

  return (
    <div>
      <p>Stored: {stored}</p>
      <p>Location: {location?.pathname || 'server'}</p>
      <p>Search: {location?.search || ''}</p>
      <p>Query ID: {searchParams?.get('id') || 'none'}</p>
      <p>Online: {String(isOnline)}</p>
      <p>Visible: {String(isVisible)}</p>
      <p>Request URL: {location?.href}</p>
      <p>User Agent: {userAgent?.substring(0, 50)}...</p>
      <p>Cookies Available: {cookies ? 'yes' : 'no'}</p>
    </div>
  );
}
```

## Custom Server Setup

### Basic Custom Server

Create a custom server entry for advanced SSR control:

```js
// server.js
import { Server } from '@o2ter/server-js';

export const serverOptions = {
  http: 'v1',
  express: {
    cors: {
      credentials: true,
      origin: true,
    },
  },
};

export default async (app, serverEnv) => {
  // Add API routes
  app.get('/api/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
  });

  // Custom middleware
  app.use((req, res, next) => {
    // The CLI automatically injects request data into JSDOM:
    // - req.get('User-Agent') -> window.navigator.userAgent
    // - req.get('Cookie') -> document.cookie  
    // - req.url -> window.location.href
    // - req.get('Referrer') -> document.referrer
    
    // You can add your own middleware logic here
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  });
};
```

## Performance Optimization

### Data Minimization

**OptimizedComponent.server.tsx**
```tsx
function OptimizedComponent({ products }: { products: Product[] }) {
  // Server-side: Only serialize essential data for initial render
  const essentialData = useServerResource('products', () => {
    const essential = products.map(({ id, name, price, image }) => 
      ({ id, name, price, image })
    );
    return JSON.stringify(essential);
  }, [products]);

  // Parse for rendering (same as client)
  const productData = JSON.parse(essentialData);

  return (
    <div>
      {productData.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**OptimizedComponent.tsx**
```tsx
function OptimizedComponent() {
  // Client-side: Parse essential data and enhance if needed
  const essentialData = JSON.parse(useServerResource('products'));
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    // Load full data on client if needed
    if (shouldLoadFullData) {
      loadFullProductData().then(setFullData);
    }
  }, [shouldLoadFullData]);

  // Render the same initial output as server
  return (
    <div>
      {essentialData.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Selective SSR

**SelectiveSSRComponent.server.tsx**
```tsx
import { useSyncExternalStore } from 'frosty';

function SelectiveSSRComponent() {
  // Server-side: Use getServerSnapshot for SSR
  const data = useSyncExternalStore(
    subscribeToStore,
    () => null, // Client snapshot (not used on server)
    () => getServerState()  // Server snapshot (SSR)
  );

  return <div>{data.content}</div>;
}
```

**SelectiveSSRComponent.tsx**
```tsx
import { useSyncExternalStore } from 'frosty';

function SelectiveSSRComponent() {
  // Client-side: Use getSnapshot for client
  const data = useSyncExternalStore(
    subscribeToStore,
    () => store.getState(), // Client snapshot
    () => getServerState()  // Server snapshot (must match for hydration)
  );

  // Render the same output as server
  return <div>{data.content}</div>;
}
```

## Debugging SSR

### Development Tools

```bash
# Enable debug mode for detailed SSR logging
npx frosty run --debug --watch

# Check server vs client rendering differences
NODE_ENV=development npx frosty run app.js
```

### Debugging Server Resources

**DebugServerResources.server.tsx**
```tsx
function DebugServerResources() {
  const debugData = useServerResource('debug', () => {
    return JSON.stringify({
      timestamp: Date.now(),
      environment: process.env.NODE_ENV,
      memory: process.memoryUsage?.() || null,
    });
  });

  // Parse for rendering (same as client)
  const parsed = JSON.parse(debugData);
  
  return (
    <div>
      <h3>SSR Debug Info</h3>
      <pre>{JSON.stringify(parsed, null, 2)}</pre>
    </div>
  );
}
```

**DebugServerResources.tsx**
```tsx
function DebugServerResources() {
  const debugData = useServerResource('debug');
  const parsed = JSON.parse(debugData);
  
  // Render exactly the same as server
  return (
    <div>
      <h3>SSR Debug Info</h3>
      <pre>{JSON.stringify(parsed, null, 2)}</pre>
    </div>
  );
}
```

## Best Practices

### 1. Minimize Server Resource Size

**Server-side component:**
```tsx
// ❌ Don't serialize large objects
const badData = useServerResource('data', () => 
  JSON.stringify(massiveDataObject) // Avoid this
);

// ✅ Extract only necessary fields
const goodData = useServerResource('data', () => {
  const { id, name, essentialField } = massiveDataObject;
  return JSON.stringify({ id, name, essentialField });
});
```

### 2. Handle Async Operations Properly

**AsyncSSRComponent.server.tsx**
```tsx
function AsyncSSRComponent() {
  // ✅ Use useAwaited for server-side async operations
  const data = useAwaited(async () => {
    return await fetchCriticalData();
  }, []);

  const encoded = useServerResource('async-data', () => 
    JSON.stringify(data || { loading: true }), [data]
  );

  // Parse for rendering (same as client)
  const parsedData = JSON.parse(encoded);

  // Handle loading state properly - same as client
  if (parsedData.loading) {
    return <div>Loading...</div>;
  }

  return <div>{parsedData.content}</div>;
}
```

**AsyncSSRComponent.tsx**
```tsx
function AsyncSSRComponent() {
  // Client-side: Parse server data
  const encoded = useServerResource('async-data');
  const data = JSON.parse(encoded);

  // Handle loading state properly - same as server
  if (data.loading) {
    return <div>Loading...</div>;
  }

  return <div>{data.content}</div>;
}
```

### 3. Progressive Enhancement

**ProgressiveComponent.server.tsx**
```tsx
function ProgressiveComponent() {
  // Server-side: Provide base data
  const baseData = useServerResource('base', () => 
    JSON.stringify(getEssentialData())
  );
  
  // Parse for rendering (same as client)
  const essentialData = JSON.parse(baseData);
  
  return (
    <div>
      <BaseContent data={essentialData} />
    </div>
  );
}
```

**ProgressiveComponent.tsx**
```tsx
function ProgressiveComponent() {
  // Client-side: Start with server data, then enhance
  const baseData = JSON.parse(useServerResource('base'));
  const [enhanced, setEnhanced] = useState(false);
  
  useEffect(() => {
    // Enhance on client
    loadEnhancedFeatures().then(() => setEnhanced(true));
  }, []);

  // Initial render same as server, then enhance
  return (
    <div>
      <BaseContent data={baseData} />
      {enhanced && <EnhancedFeatures />}
    </div>
  );
}
```

### 4. Error Boundaries for SSR

```tsx
import { ErrorBoundary } from 'frosty';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <MainContent />
    </ErrorBoundary>
  );
}

function ErrorPage() {
  return (
    <html>
      <head><title>Error</title></head>
      <body>
        <h1>Something went wrong</h1>
        <p>Please refresh the page or try again later.</p>
      </body>
    </html>
  );
}
```

## Common Issues and Solutions

### Hydration Mismatches

**Problematic Pattern:**
```tsx
// ❌ This can cause hydration mismatches
function ProblematicComponent() {
  const [randomId] = useState(() => Math.random());
  return <div id={randomId}>Content</div>;
}
```

**Fixed with Server Resource:**
```tsx
// ✅ Server-side: Generate stable ID
// StableComponent.server.tsx
function StableComponent() {
  const stableId = useServerResource('component-id', () => 
    'component-' + Date.now()
  );
  
  // Parse for rendering (same as client)
  const id = stableId;
  
  return <div id={id}>Content</div>;
}

// ✅ Client-side: Use same stable ID
// StableComponent.tsx
function StableComponent() {
  const stableId = useServerResource('component-id');
  
  // Render exactly the same as server
  return <div id={stableId}>Content</div>;
}
```

### Memory Leaks in SSR

**ResourceComponent.server.tsx**
```tsx
// Server-side: No cleanup needed (short-lived)
function ResourceComponent() {
  const data = useAwaited(() => fetchData(), []);
  const encoded = useServerResource('data', () => JSON.stringify(data), [data]);
  
  // Parse for rendering (same as client)
  const parsedData = JSON.parse(encoded);
  
  return <div>Data: {parsedData.content}</div>;
}
```

**ResourceComponent.tsx**
```tsx
// ✅ Client-side: Clean up resources properly
function ResourceComponent() {
  const encoded = useServerResource('data');
  const data = JSON.parse(encoded);
  
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe(); // Always clean up
  }, []);

  // Render exactly the same as server
  return <div>Data: {data.content}</div>;
}
```

## Migration from Client-Only Apps

### Step 1: Update Entry Point

```tsx
// Before: client-only
import { DOMRenderer } from 'frosty/dom';
const root = DOMRenderer.createRoot(document.getElementById('root'));
root.mount(<App />);

// After: SSR-ready  
export default function App() {
  return (
    <html>
      <head><title>My App</title></head>
      <body>
        <div id="root">
          <MyApp />
        </div>
      </body>
    </html>
  );
}
```

### Step 2: Update Data Fetching

**Before: client-only data fetching**
```tsx
function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <div>{data.content}</div>;
}
```

**After: SSR-compatible (Server-side)**
```tsx
// Component.server.tsx
function Component() {
  const data = useAwaited(() => fetchData(), []);
  const serverData = useServerResource('data', () => 
    JSON.stringify(data), [data]
  );
  
  // Parse for rendering (same as client)
  const parsedData = JSON.parse(serverData);
  
  return <div>{parsedData.content}</div>;
}
```

**After: SSR-compatible (Client-side)**
```tsx
// Component.tsx
function Component() {
  const serverData = useServerResource('data');
  const parsedData = JSON.parse(serverData);
  
  // Render exactly the same as server
  return <div>{parsedData.content}</div>;
}
```

## See Also

- [Server Configuration](./SERVER_CONFIG.md) - Detailed server configuration options
- [Server Entry](./SERVER_ENTRY.md) - Custom server setup
- [useServerResource](../hooks/useServerResource.md) - Server data sharing hook
- [useAwaited](../hooks/useAwaited.md) - Async data fetching for SSR
