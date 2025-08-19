# `useOnline` Hook

The `useOnline` hook tracks the browser's online/offline status, automatically updating when the network connection changes. This is useful for showing connection status to users and handling offline scenarios gracefully.

## Features

- **Real-time Status**: Automatically detects changes in network connectivity.
- **Browser Events**: Listens to native `online` and `offline` events.
- **Simple Boolean**: Returns a simple boolean value indicating connection status.
- **Cross-browser Support**: Works across all modern browsers.
- **Automatic Cleanup**: Event listeners are automatically managed.

## Usage

```tsx
import { useOnline } from 'frosty';

function NetworkStatus() {
  const isOnline = useOnline();

  return (
    <div>
      <h2>Network Status</h2>
      <p>You are currently: {isOnline ? 'Online' : 'Offline'}</p>
      <div style={{
        padding: '10px',
        backgroundColor: isOnline ? 'green' : 'red',
        color: 'white',
        borderRadius: '4px'
      }}>
        {isOnline ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

`boolean` - Returns `true` when online, `false` when offline.

## Examples

### Basic Online Indicator

```tsx
import { useOnline } from 'frosty';

function OnlineIndicator() {
  const isOnline = useOnline();

  return (
    <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? '🌐 Online' : '📴 Offline'}
    </div>
  );
}
```

### Conditional Data Fetching

```tsx
import { useOnline, useState, useEffect } from 'frosty';

function DataLoader() {
  const isOnline = useOnline();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOnline) {
      fetchData();
    }
  }, [isOnline]);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  if (!isOnline) {
    return (
      <div>
        <h2>You're Offline</h2>
        <p>Please check your internet connection</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Data</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}
```

### Form with Offline Warning

```tsx
import { useOnline, useState } from 'frosty';

function ContactForm() {
  const isOnline = useOnline();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isOnline) {
      alert('You are offline. Please try again when connected.');
      return;
    }

    // Submit form
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isOnline && (
        <div style={{
          backgroundColor: '#ffeb3b',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px'
        }}>
          ⚠️ You are currently offline. Form submission is disabled.
        </div>
      )}
      
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      
      <button type="submit" disabled={!isOnline}>
        {isOnline ? 'Send Message' : 'Offline - Cannot Send'}
      </button>
    </form>
  );
}
```

### Sync Queue

```tsx
import { useOnline, useState, useEffect } from 'frosty';

function SyncQueue() {
  const isOnline = useOnline();
  const [queue, setQueue] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Add item to queue
  const addToQueue = (item) => {
    setQueue(prev => [...prev, { ...item, id: Date.now() }]);
  };

  // Sync queue when coming online
  useEffect(() => {
    if (isOnline && queue.length > 0 && !isSyncing) {
      syncQueue();
    }
  }, [isOnline, queue.length]);

  const syncQueue = async () => {
    setIsSyncing(true);
    
    for (const item of queue) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          body: JSON.stringify(item)
        });
        
        // Remove successfully synced item
        setQueue(prev => prev.filter(q => q.id !== item.id));
      } catch (error) {
        console.error('Sync failed for item:', item, error);
        break; // Stop syncing on error
      }
    }
    
    setIsSyncing(false);
  };

  return (
    <div>
      <h2>Sync Status</h2>
      <p>Network: {isOnline ? 'Online' : 'Offline'}</p>
      <p>Queue: {queue.length} items</p>
      {isSyncing && <p>Syncing...</p>}
      
      <button onClick={() => addToQueue({ action: 'test', data: Math.random() })}>
        Add Test Item
      </button>
      
      {queue.length > 0 && (
        <div>
          <h3>Pending Items:</h3>
          <ul>
            {queue.map(item => (
              <li key={item.id}>{item.action}: {item.data}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### App-wide Connectivity Banner

```tsx
import { useOnline, useState, useEffect } from 'frosty';

function ConnectivityBanner() {
  const isOnline = useOnline();
  const [showBanner, setShowBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowBanner(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: isOnline ? '#4caf50' : '#f44336',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      {isOnline 
        ? '✅ You\'re back online!' 
        : '❌ You\'re offline. Some features may not work.'
      }
    </div>
  );
}

function App() {
  return (
    <div>
      <ConnectivityBanner />
      <main>
        {/* Your app content */}
      </main>
    </div>
  );
}
```

### Offline Storage

```tsx
import { useOnline, useState, useEffect } from 'frosty';

function OfflineStorage() {
  const isOnline = useOnline();
  const [posts, setPosts] = useState([]);

  // Load data from cache when offline
  useEffect(() => {
    if (!isOnline) {
      const cached = localStorage.getItem('cachedPosts');
      if (cached) {
        setPosts(JSON.parse(cached));
      }
    } else {
      // Fetch fresh data when online
      fetchPosts();
    }
  }, [isOnline]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
      
      // Cache for offline use
      localStorage.setItem('cachedPosts', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  return (
    <div>
      <h2>Posts {!isOnline && '(Cached)'}</h2>
      {!isOnline && (
        <p style={{ color: 'orange' }}>
          📱 Showing cached content. Connect to internet for latest updates.
        </p>
      )}
      
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Browser Support

The `useOnline` hook relies on the `navigator.onLine` property and `online`/`offline` events, which are supported in:

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Mobile browsers: Full support

## Limitations

- **Not Always Accurate**: `navigator.onLine` only detects network interface status, not actual internet connectivity.
- **No Bandwidth Info**: Doesn't provide information about connection quality or speed.
- **Local Network**: May show "online" even when connected to a local network without internet access.

## Common Use Cases

- **Form Validation**: Disable form submission when offline
- **Data Sync**: Queue operations for when connection returns
- **User Feedback**: Show connectivity status to users
- **Caching Strategy**: Switch between live and cached data
- **Feature Toggling**: Disable online-only features when offline

## See Also

- [useEffect](./useEffect.md) – Perform side effects in functional components.
- [useState](./useState.md) – Manage local component state.
- [useLocalStorage](./useLocalStorage.md) – Cache data for offline use.
