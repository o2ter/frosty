# `useWindow` Hook

The `useWindow` hook provides access to the current window object within components. This hook is essential for accessing browser APIs and window-specific functionality in a way that's compatible with Frosty's rendering system.

## Features

- **Window Access**: Direct access to the current window object.
- **Renderer Compatibility**: Works with Frosty's DOM renderer system.
- **Safe Usage**: Throws clear errors when used in unsupported contexts.
- **Type Safety**: Returns properly typed window object.

## Usage

```tsx
import { useWindow } from 'frosty';

function WindowInfo() {
  const window = useWindow();

  return (
    <div>
      <h2>Window Information</h2>
      <p>User Agent: {window.navigator.userAgent}</p>
      <p>Location: {window.location.href}</p>
      <p>Inner Width: {window.innerWidth}px</p>
      <p>Inner Height: {window.innerHeight}px</p>
      <p>Device Pixel Ratio: {window.devicePixelRatio}</p>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

`Window` - The current window object.

## Examples

### Browser Detection

```tsx
import { useWindow } from 'frosty';

function BrowserDetection() {
  const window = useWindow();
  const userAgent = window.navigator.userAgent;

  const getBrowserInfo = () => {
    if (userAgent.includes('Chrome')) return { name: 'Chrome', icon: '🟡' };
    if (userAgent.includes('Firefox')) return { name: 'Firefox', icon: '🦊' };
    if (userAgent.includes('Safari')) return { name: 'Safari', icon: '🧭' };
    if (userAgent.includes('Edge')) return { name: 'Edge', icon: '🔷' };
    return { name: 'Unknown', icon: '❓' };
  };

  const browser = getBrowserInfo();

  return (
    <div>
      <h2>Browser Information</h2>
      <p>{browser.icon} You are using {browser.name}</p>
      <p>Full User Agent: {userAgent}</p>
    </div>
  );
}
```

### Geolocation Access

```tsx
import { useWindow, useState } from 'frosty';

function GeolocationDemo() {
  const window = useWindow();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!window.navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <h2>Geolocation</h2>
      <button onClick={getCurrentLocation} disabled={loading}>
        {loading ? 'Getting Location...' : 'Get My Location'}
      </button>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
        </div>
      )}
    </div>
  );
}
```

### Local Storage Operations

```tsx
import { useWindow, useState } from 'frosty';

function LocalStorageManager() {
  const window = useWindow();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [stored, setStored] = useState({});

  const saveToStorage = () => {
    if (key && value) {
      window.localStorage.setItem(key, value);
      loadStoredData();
      setKey('');
      setValue('');
    }
  };

  const loadStoredData = () => {
    const data = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const storageKey = window.localStorage.key(i);
      if (storageKey) {
        data[storageKey] = window.localStorage.getItem(storageKey);
      }
    }
    setStored(data);
  };

  const deleteItem = (itemKey) => {
    window.localStorage.removeItem(itemKey);
    loadStoredData();
  };

  const clearAll = () => {
    window.localStorage.clear();
    loadStoredData();
  };

  return (
    <div>
      <h2>Local Storage Manager</h2>
      
      <div>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={saveToStorage}>Save</button>
      </div>

      <div>
        <button onClick={loadStoredData}>Refresh</button>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <h3>Stored Data:</h3>
      <ul>
        {Object.entries(stored).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {v}
            <button onClick={() => deleteItem(k)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Window Events

```tsx
import { useWindow, useState, useEffect } from 'frosty';

function WindowEventDemo() {
  const window = useWindow();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const addEvent = (type) => {
      setEvents(prev => [...prev.slice(-9), `${type} at ${new Date().toLocaleTimeString()}`]);
    };

    const handleResize = () => addEvent('resize');
    const handleFocus = () => addEvent('focus');
    const handleBlur = () => addEvent('blur');
    const handleOnline = () => addEvent('online');
    const handleOffline = () => addEvent('offline');

    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [window]);

  return (
    <div>
      <h2>Window Events</h2>
      <p>Try resizing the window, switching tabs, or changing your network connection</p>
      
      <h3>Recent Events:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      
      <button onClick={() => setEvents([])}>Clear Events</button>
    </div>
  );
}
```

### Clipboard Operations

```tsx
import { useWindow, useState } from 'frosty';

function ClipboardDemo() {
  const window = useWindow();
  const [text, setText] = useState('');
  const [clipboardText, setClipboardText] = useState('');

  const copyToClipboard = async () => {
    try {
      await window.navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text');
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await window.navigator.clipboard.readText();
      setClipboardText(text);
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
      alert('Failed to read clipboard');
    }
  };

  return (
    <div>
      <h2>Clipboard Operations</h2>
      
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to copy"
        />
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>

      <div>
        <button onClick={pasteFromClipboard}>Paste from Clipboard</button>
        {clipboardText && <p>Pasted: {clipboardText}</p>}
      </div>
    </div>
  );
}
```

### Page Visibility

```tsx
import { useWindow, useState, useEffect } from 'frosty';

function PageVisibilityDemo() {
  const window = useWindow();
  const [isVisible, setIsVisible] = useState(!window.document.hidden);
  const [visibilityChanges, setVisibilityChanges] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!window.document.hidden);
      setVisibilityChanges(prev => prev + 1);
    };

    window.document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [window]);

  return (
    <div>
      <h2>Page Visibility</h2>
      <p>Current state: {isVisible ? 'Visible' : 'Hidden'}</p>
      <p>Visibility changes: {visibilityChanges}</p>
      <p>Try switching to another tab to see the change!</p>
    </div>
  );
}
```

### Screen Information

```tsx
import { useWindow } from 'frosty';

function ScreenInfo() {
  const window = useWindow();
  const screen = window.screen;

  return (
    <div>
      <h2>Screen Information</h2>
      <p>Screen Width: {screen.width}px</p>
      <p>Screen Height: {screen.height}px</p>
      <p>Available Width: {screen.availWidth}px</p>
      <p>Available Height: {screen.availHeight}px</p>
      <p>Color Depth: {screen.colorDepth} bits</p>
      <p>Pixel Depth: {screen.pixelDepth} bits</p>
      <p>Orientation: {screen.orientation?.type || 'Unknown'}</p>
    </div>
  );
}
```

## Error Handling

The hook will throw an error if:
- Used outside of a render function
- Used with an unsupported renderer (not DOM renderer)

```tsx
function SafeWindowUsage() {
  try {
    const window = useWindow();
    return <div>Window available: {window.location.host}</div>;
  } catch (error) {
    return <div>Window not available: {error.message}</div>;
  }
}
```

## Common Use Cases

- **Browser API Access**: Accessing navigator, localStorage, sessionStorage
- **Event Handling**: Adding global window event listeners
- **Responsive Design**: Accessing window dimensions and device capabilities
- **Clipboard Operations**: Reading from and writing to clipboard
- **Location Management**: Working with window.location
- **Performance Monitoring**: Using Performance API
- **Web Worker Management**: Creating and managing web workers

## Notes

- **Server-Side Rendering**: This hook will not work during server-side rendering.
- **Renderer Dependency**: Only works with Frosty's DOM renderer.
- **Memory Management**: Remember to clean up event listeners in useEffect cleanup functions.
- **Type Safety**: The returned window object is fully typed for TypeScript users.

## See Also

- [useDocument](./useDocument.md) – Access the document object.
- [useWindowMetrics](./useWindowMetrics.md) – Get window size and metrics.
- [useLocation](./useLocation.md) – Access browser location and navigation.
