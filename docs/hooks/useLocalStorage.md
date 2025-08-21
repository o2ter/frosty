# useLocalStorage

The `useLocalStorage` hook provides a way to synchronize component state with the browser's localStorage, allowing data to persist across browser sessions. Changes to localStorage from other tabs or windows will automatically update the component state.

## Features

- **Persistent Storage**: Data persists across browser sessions and page reloads
- **Cross-Tab Synchronization**: Automatically syncs with localStorage changes from other tabs
- **Type Safety**: Maintains string and null types for localStorage values
- **Error Handling**: Gracefully handles localStorage errors (quota exceeded, disabled storage, etc.)
- **Automatic Cleanup**: Removes items when set to null or undefined

## Usage

```tsx
import { useLocalStorage } from 'frosty/web';

function UserPreferences() {
  const [username, setUsername] = useLocalStorage('username', 'Guest');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className={`theme-${theme}`}>
      <h1>Welcome, {username}!</h1>
      <input 
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <button onClick={() => setUsername(null)}>
        Clear Username
      </button>
    </div>
  );
}
```

## Parameters

1. **key**: `string`  
   The localStorage key to use for storing the value

2. **initialValue**: `string | null` _(optional)_  
   The default value to use when no value exists in localStorage

## Returns

A tuple containing:
- **value**: `string | null` - The current value from localStorage or the initial value
- **setValue**: `(value: string | null | undefined | ((prev: string | null | undefined) => string | null | undefined)) => void` - Function to update the localStorage value

## Examples

### Basic Usage

```tsx
import { useLocalStorage } from 'frosty/web';

function Settings() {
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <select 
      value={language || 'en'} 
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>
  );
}
```

### Form Data Persistence

```tsx
import { useLocalStorage } from 'frosty/web';

function ContactForm() {
  const [name, setName] = useLocalStorage('form-name', '');
  const [email, setEmail] = useLocalStorage('form-email', '');
  const [message, setMessage] = useLocalStorage('form-message', '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log({ name, email, message });
    
    // Clear form data after submission
    setName(null);
    setEmail(null);
    setMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email || ''}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={message || ''}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

### Functional Updates

```tsx
import { useLocalStorage } from 'frosty/web';

function ShoppingCart() {
  const [cartItems, setCartItems] = useLocalStorage('cart', '[]');

  const addItem = (item) => {
    setCartItems((currentCart) => {
      const items = JSON.parse(currentCart || '[]');
      items.push(item);
      return JSON.stringify(items);
    });
  };

  const clearCart = () => {
    setCartItems('[]');
  };

  const items = JSON.parse(cartItems || '[]');

  return (
    <div>
      <h2>Shopping Cart ({items.length} items)</h2>
      <button onClick={() => addItem({ id: Date.now(), name: 'New Item' })}>
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### User Preferences with JSON

```tsx
import { useLocalStorage } from 'frosty/web';

function UserDashboard() {
  const [preferences, setPreferences] = useLocalStorage('user-prefs', '{}');

  const updatePreference = (key, value) => {
    setPreferences((current) => {
      const prefs = JSON.parse(current || '{}');
      prefs[key] = value;
      return JSON.stringify(prefs);
    });
  };

  const prefs = JSON.parse(preferences || '{}');

  return (
    <div>
      <h2>User Preferences</h2>
      <label>
        <input
          type="checkbox"
          checked={prefs.notifications || false}
          onChange={(e) => updatePreference('notifications', e.target.checked)}
        />
        Enable Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={prefs.darkMode || false}
          onChange={(e) => updatePreference('darkMode', e.target.checked)}
        />
        Dark Mode
      </label>
    </div>
  );
}
```

### Clearing Data

```tsx
import { useLocalStorage } from 'frosty/web';

function DataManager() {
  const [data, setData] = useLocalStorage('app-data', null);

  return (
    <div>
      <p>Data: {data || 'No data stored'}</p>
      <button onClick={() => setData('Some important data')}>
        Store Data
      </button>
      <button onClick={() => setData(null)}>
        Clear Data
      </button>
      <button onClick={() => setData(undefined)}>
        Remove Data (same as clear)
      </button>
    </div>
  );
}
```

## Error Handling

The hook automatically handles localStorage errors:

- **Storage Disabled**: When localStorage is disabled by the browser
- **Quota Exceeded**: When the storage quota is full
- **Security Restrictions**: When running in certain contexts (like file:// protocol)

Errors are logged to the console, and the hook continues to function with in-memory state only.

## Cross-Tab Synchronization

The hook automatically listens for `storage` events, so changes made in other tabs will immediately update the component:

```tsx
function CrossTabDemo() {
  const [sharedValue, setSharedValue] = useLocalStorage('shared', 'initial');

  return (
    <div>
      <p>Shared Value: {sharedValue}</p>
      <p>Open this page in multiple tabs and see the sync!</p>
      <button onClick={() => setSharedValue(`Updated at ${Date.now()}`)}>
        Update Value
      </button>
    </div>
  );
}
```

## Notes

- **String Values Only**: localStorage only stores strings. Use `JSON.stringify`/`JSON.parse` for objects.
- **Synchronous Operation**: localStorage operations are synchronous but the hook handles errors gracefully
- **Storage Events**: Only changes from other tabs/windows trigger storage events, not changes from the same tab
- **Memory Usage**: Values are cached in memory for performance, updated only when localStorage changes

## See Also

- [useSessionStorage](./useSessionStorage.md) – Sync state with sessionStorage (session-only persistence).
- [useState](./useState.md) – Manage local component state.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
