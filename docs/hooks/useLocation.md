# `useLocation` Hook

The `useLocation` hook provides access to the current browser location and methods for programmatic navigation. It automatically updates when the URL changes and offers a convenient API for managing browser history and URL manipulation.

## Features

- **Reactive Location**: Automatically updates when the URL changes.
- **History Management**: Provides methods to navigate browser history.
- **URL Properties**: Access to all URL components (pathname, search, hash, etc.).
- **State Management**: Handle browser history state objects.
- **Navigation Control**: Push new entries or replace current history entry.

## Usage

```tsx
import { useLocation } from 'frosty';

function LocationDisplay() {
  const location = useLocation();

  return (
    <div>
      <h2>Current Location</h2>
      <p><strong>Pathname:</strong> {location.pathname}</p>
      <p><strong>Search:</strong> {location.search}</p>
      <p><strong>Hash:</strong> {location.hash}</p>
      <p><strong>Full URL:</strong> {location.href}</p>
      
      <button onClick={() => location.pushState({ visited: true }, '/about')}>
        Go to About
      </button>
      <button onClick={() => location.back()}>
        Go Back
      </button>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

An object with the following properties and methods:

### URL Properties
- **hash**: `string` - The fragment identifier of the URL
- **host**: `string` - The hostname and port number
- **hostname**: `string` - The domain name
- **href**: `string` - The complete URL
- **origin**: `string` - The protocol, hostname, and port
- **pathname**: `string` - The path portion of the URL
- **port**: `string` - The port number
- **protocol**: `string` - The protocol scheme (e.g., "https:")
- **search**: `string` - The query string

### History Properties
- **state**: `any` - The current state object associated with the history entry

### Navigation Methods
- **back()**: `void` - Navigate to the previous entry in history
- **forward()**: `void` - Navigate to the next entry in history
- **pushState(data, url)**: `void` - Push a new entry onto the history stack
- **replaceState(data, url)**: `void` - Replace the current history entry

## Examples

### Basic Navigation

```tsx
import { useLocation } from 'frosty';

function Navigation() {
  const location = useLocation();

  const navigate = (path) => {
    location.pushState(null, path);
  };

  return (
    <nav>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/about')}>About</button>
      <button onClick={() => navigate('/contact')}>Contact</button>
      <button onClick={() => location.back()}>← Back</button>
      <button onClick={() => location.forward()}>Forward →</button>
      
      <p>Current page: {location.pathname}</p>
    </nav>
  );
}
```

### Route-based Component Rendering

```tsx
import { useLocation } from 'frosty';

function Router() {
  const location = useLocation();

  const renderPage = () => {
    switch (location.pathname) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div>
      <nav>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          location.pushState(null, '/');
        }}>Home</a>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          location.pushState(null, '/about');
        }}>About</a>
      </nav>
      
      {renderPage()}
    </div>
  );
}

function HomePage() {
  return <h1>Welcome to the Home Page</h1>;
}

function AboutPage() {
  return <h1>About Us</h1>;
}
```

### State Management

```tsx
import { useLocation } from 'frosty';

function StatefulNavigation() {
  const location = useLocation();

  const navigateWithState = (path, data) => {
    location.pushState(data, path);
  };

  return (
    <div>
      <h2>Navigation with State</h2>
      <p>Current state: {JSON.stringify(location.state)}</p>
      
      <button onClick={() => navigateWithState('/profile', { 
        user: 'john', 
        tab: 'settings' 
      })}>
        Go to Profile Settings
      </button>
      
      <button onClick={() => navigateWithState('/dashboard', { 
        view: 'analytics',
        date: new Date().toISOString()
      })}>
        Go to Analytics Dashboard
      </button>
      
      {location.state && (
        <div>
          <h3>Page State:</h3>
          <pre>{JSON.stringify(location.state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### URL Parameters Parser

```tsx
import { useLocation } from 'frosty';

function URLParametersDemo() {
  const location = useLocation();

  // Parse URL parameters manually
  const parseParams = (search) => {
    return new URLSearchParams(search);
  };

  const params = parseParams(location.search);
  const page = params.get('page') || '1';
  const category = params.get('category') || 'all';

  const updateParams = (newParams) => {
    const currentParams = new URLSearchParams(location.search);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    location.replaceState(location.state, `${location.pathname}?${currentParams}`);
  };

  return (
    <div>
      <h2>URL Parameters</h2>
      <p>Page: {page}</p>
      <p>Category: {category}</p>
      
      <button onClick={() => updateParams({ page: '2' })}>
        Go to Page 2
      </button>
      <button onClick={() => updateParams({ category: 'tech' })}>
        Tech Category
      </button>
      <button onClick={() => updateParams({ page: null, category: null })}>
        Clear Parameters
      </button>
    </div>
  );
}
```

### Breadcrumb Navigation

```tsx
import { useLocation, useState, useEffect } from 'frosty';

function BreadcrumbNavigation() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Update breadcrumbs based on current path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const newBreadcrumbs = pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: path
      };
    });
    
    setBreadcrumbs([{ label: 'Home', path: '/' }, ...newBreadcrumbs]);
  }, [location.pathname]);

  return (
    <nav>
      <ol style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} style={{ marginRight: '10px' }}>
            {index < breadcrumbs.length - 1 ? (
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  location.pushState(null, crumb.path);
                }}
              >
                {crumb.label}
              </a>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && <span> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### Modal with URL State

```tsx
import { useLocation } from 'frosty';

function ModalWithURL() {
  const location = useLocation();
  const isModalOpen = location.search.includes('modal=open');

  const openModal = () => {
    const params = new URLSearchParams(location.search);
    params.set('modal', 'open');
    location.pushState(location.state, `${location.pathname}?${params}`);
  };

  const closeModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete('modal');
    const search = params.toString();
    location.replaceState(location.state, 
      `${location.pathname}${search ? '?' + search : ''}`);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h2>Modal Content</h2>
            <p>This modal state is reflected in the URL!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### History Management

```tsx
import { useLocation, useState } from 'frosty';

function HistoryManager() {
  const location = useLocation();
  const [history, setHistory] = useState([]);

  const addToHistory = (path, label) => {
    location.pushState({ label, timestamp: Date.now() }, path);
    setHistory(prev => [...prev, { path, label, timestamp: Date.now() }]);
  };

  return (
    <div>
      <h2>History Manager</h2>
      <p>Current: {location.pathname}</p>
      
      <div>
        <button onClick={() => addToHistory('/page1', 'Page One')}>
          Visit Page 1
        </button>
        <button onClick={() => addToHistory('/page2', 'Page Two')}>
          Visit Page 2
        </button>
        <button onClick={() => addToHistory('/page3', 'Page Three')}>
          Visit Page 3
        </button>
      </div>
      
      <div>
        <button onClick={() => location.back()}>← Back</button>
        <button onClick={() => location.forward()}>Forward →</button>
      </div>
      
      <h3>Visit History:</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.label} - {new Date(entry.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Common Patterns

### Conditional Rendering Based on Path

```tsx
const location = useLocation();
const isHomePage = location.pathname === '/';
const isAdminArea = location.pathname.startsWith('/admin');
```

### Query Parameter Management

```tsx
const location = useLocation();
const params = new URLSearchParams(location.search);
const sortBy = params.get('sort') || 'date';
```

### Navigation Guards

```tsx
const location = useLocation();

const navigateWithConfirmation = (path) => {
  if (confirm('Are you sure you want to leave this page?')) {
    location.pushState(null, path);
  }
};
```

## Notes

- **Automatic Updates**: The hook automatically re-renders components when the URL changes.
- **Browser Events**: Listens to `popstate` events for browser navigation.
- **State Objects**: Can store arbitrary data with history entries.
- **URL Encoding**: URLs are automatically encoded/decoded as needed.

## See Also

- [useSearchParams](./useSearchParams.md) – Manage URL query parameters with a dedicated hook.
- [useEffect](./useEffect.md) – React to location changes with side effects.
- [useState](./useState.md) – Manage component state based on location.
