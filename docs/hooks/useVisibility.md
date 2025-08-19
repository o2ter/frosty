# `useVisibility` Hook

The `useVisibility` hook allows you to track the current visibility state of your document. This is useful for pausing/resuming activities when users switch tabs or minimize the browser window.

## Features

- **Real-time Visibility Tracking**: Monitors document visibility state changes in real-time
- **Multiple States**: Distinguishes between active, inactive, and background states
- **Efficient**: Uses `useSyncExternalStore` for efficient subscription to visibility changes
- **Server-Safe**: Falls back to a default value on the server

## Usage

```tsx
import { useVisibility } from 'frosty';

function MyComponent() {
  const visibilityState = useVisibility();
  
  return (
    <div>
      <p>Current visibility state: {visibilityState}</p>
      {visibilityState === 'background' && (
        <p>The app is currently in the background.</p>
      )}
    </div>
  );
}
```

## Parameters

This hook doesn't accept any parameters.

## Returns

A string representing the current document visibility state:

- **`'active'`**: The document is visible and has focus
- **`'inactive'`**: The document is visible but doesn't have focus
- **`'background'`**: The document is hidden (in a background tab or the window is minimized)
- **`'unknown'`**: The visibility state couldn't be determined (e.g., on the server)

## Example

### Pausing Media When Tab Is Not Visible

```tsx
import { useVisibility, useEffect, useRef } from 'frosty';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const visibilityState = useVisibility();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (visibilityState === 'background') {
      video.pause();
    } else if (visibilityState === 'active' && video.paused) {
      video.play().catch(err => console.log('Auto-play prevented:', err));
    }
  }, [visibilityState]);
  
  return (
    <video 
      ref={videoRef}
      src={src} 
      controls
      style={{ maxWidth: '100%' }}
    />
  );
}
```

### Optimizing Performance Based on Visibility

```tsx
import { useVisibility, useState, useEffect } from 'frosty';

function DataDashboard() {
  const [updateInterval, setUpdateInterval] = useState(1000);
  const visibilityState = useVisibility();
  
  useEffect(() => {
    // Update less frequently when not actively viewed
    if (visibilityState === 'active') {
      setUpdateInterval(1000); // Update every second when active
    } else if (visibilityState === 'inactive') {
      setUpdateInterval(5000); // Update every 5 seconds when inactive
    } else {
      setUpdateInterval(30000); // Update every 30 seconds when in background
    }
  }, [visibilityState]);
  
  // Use updateInterval for data polling logic
  // ...
  
  return <div>Dashboard content...</div>;
}
```

## Notes

- The hook uses `document.visibilityState` and `document.hasFocus()` internally to determine the visibility state.
- Different browsers may have slightly different behavior regarding when visibility state changes are triggered.
- For applications that need to conserve resources, consider pausing animations, data fetching, or other resource-intensive operations when the document is not visible.

## See Also

- [useDocument](./useDocument.md) – For accessing the document object
- [useEffect](./useEffect.md) – For performing side effects based on visibility changes
- [useSyncExternalStore](./useSyncExternalStore.md) – For subscribing to external data sources
- [useWindow](./useWindow.md) – For accessing the window object