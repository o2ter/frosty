# useVisualViewportMetrics

The `useVisualViewportMetrics` hook provides access to the visual viewport metrics, which represent the portion of the page that's actually visible to the user. This is particularly useful for mobile devices where the visual viewport can change due to on-screen keyboards, browser UI, or zoom operations.

## Features

- **Dynamic Viewport**: Tracks the actual visible viewport area, not just the layout viewport
- **Mobile Keyboard Support**: Adjusts when virtual keyboards appear/disappear
- **Zoom Detection**: Tracks viewport changes due to pinch-to-zoom
- **Real-time Updates**: Automatically updates when visual viewport changes
- **Fallback Support**: Gracefully handles browsers without Visual Viewport API support

## Usage

```tsx
import { useVisualViewportMetrics } from 'frosty';

function VisualViewportInfo() {
  const viewport = useVisualViewportMetrics();

  if (!viewport) {
    return <p>Visual Viewport API not supported</p>;
  }

  return (
    <div>
      <h2>Visual Viewport Metrics</h2>
      <p>Width: {viewport.width}px</p>
      <p>Height: {viewport.height}px</p>
      <p>Scale: {viewport.scale}x</p>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

An object containing the visual viewport metrics, or `undefined` if the Visual Viewport API is not supported:

- **width**: `number` - The width of the visual viewport in CSS pixels
- **height**: `number` - The height of the visual viewport in CSS pixels  
- **scale**: `number` - The scaling factor applied to the visual viewport

## Examples

### Mobile Keyboard Detection

```tsx
import { useVisualViewportMetrics, useWindowMetrics, useState, useEffect } from 'frosty';

function KeyboardDetection() {
  const visualViewport = useVisualViewportMetrics();
  const windowMetrics = useWindowMetrics();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!visualViewport) return;

    // Detect keyboard by comparing visual viewport height to window height
    const heightDifference = windowMetrics.innerHeight - visualViewport.height;
    const isKeyboardVisible = heightDifference > 150; // Threshold for keyboard detection

    setKeyboardVisible(isKeyboardVisible);
  }, [visualViewport?.height, windowMetrics.innerHeight]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: keyboardVisible ? '#ff6b6b' : '#51cf66',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      {keyboardVisible ? '⌨️ Virtual Keyboard Detected' : '📱 Normal View'}
      {visualViewport && (
        <div style={{ fontSize: '12px', marginTop: '5px' }}>
          Visual: {visualViewport.height}px | Window: {windowMetrics.innerHeight}px
        </div>
      )}
    </div>
  );
}
```

### Responsive Form Layout

```tsx
import { useVisualViewportMetrics, useWindowMetrics } from 'frosty';

function ResponsiveForm() {
  const visualViewport = useVisualViewportMetrics();
  const windowMetrics = useWindowMetrics();

  const isKeyboardVisible = visualViewport && 
    windowMetrics.innerHeight - visualViewport.height > 150;

  const formStyle = {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    // Adjust form when keyboard is visible
    transform: isKeyboardVisible ? 'translateY(-50px)' : 'translateY(0)',
    ...(isKeyboardVisible && {
      position: 'fixed',
      top: '20px',
      left: '20px',
      right: '20px',
      maxWidth: 'none',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      borderRadius: '8px',
      zIndex: 1000
    })
  };

  return (
    <div>
      {!isKeyboardVisible && (
        <div style={{ height: '200px', backgroundColor: '#f8f9fa', padding: '20px' }}>
          <h1>Header Content</h1>
          <p>This content moves out of the way when the keyboard appears</p>
        </div>
      )}
      
      <form style={formStyle}>
        <h2>Contact Form</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input 
            type="text" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px' // Prevents zoom on iOS
            }} 
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px'
            }} 
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea 
            rows={isKeyboardVisible ? 3 : 5}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              resize: 'vertical'
            }} 
          />
        </div>
        
        <button 
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>

      {visualViewport && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1001
        }}>
          Visual: {visualViewport.width}×{visualViewport.height} | Scale: {visualViewport.scale.toFixed(2)}
        </div>
      )}
    </div>
  );
}
```

### Zoom Detection

```tsx
import { useVisualViewportMetrics, useState, useEffect } from 'frosty';

function ZoomDetection() {
  const visualViewport = useVisualViewportMetrics();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!visualViewport) return;

    const currentZoom = visualViewport.scale;
    setZoomLevel(currentZoom);
    setIsZoomed(Math.abs(currentZoom - 1) > 0.1); // Consider zoomed if scale differs by more than 0.1
  }, [visualViewport?.scale]);

  const resetZoom = () => {
    // This would typically be handled by the browser's zoom controls
    // But we can provide user guidance
    alert('Use your browser\'s zoom controls or pinch gesture to reset zoom');
  };

  return (
    <div>
      <h2>Zoom Detection Demo</h2>
      
      {visualViewport ? (
        <div>
          <div style={{
            padding: '20px',
            backgroundColor: isZoomed ? '#fff3cd' : '#d4edda',
            border: `1px solid ${isZoomed ? '#ffeaa7' : '#c3e6cb'}`,
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>{isZoomed ? '🔍 Zoomed In' : '👁️ Normal View'}</h3>
            <p>Current zoom level: {(zoomLevel * 100).toFixed(1)}%</p>
            <p>Viewport: {visualViewport.width}×{visualViewport.height}px</p>
          </div>

          {isZoomed && (
            <div style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h4>Zoom Detected!</h4>
              <p>The page is currently zoomed. Some features may behave differently.</p>
              <button 
                onClick={resetZoom}
                style={{
                  backgroundColor: 'white',
                  color: '#17a2b8',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reset Zoom
              </button>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <h4>Try these actions:</h4>
            <ul>
              <li>Pinch to zoom on mobile devices</li>
              <li>Use Ctrl/Cmd + Plus/Minus on desktop</li>
              <li>Double-tap to zoom on mobile</li>
            </ul>
          </div>

          <div style={{
            fontSize: `${Math.max(12, 16 / zoomLevel)}px`, // Adjust font size based on zoom
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h4>Zoom-Adaptive Content</h4>
            <p>This text size adjusts to maintain readability at different zoom levels.</p>
            <p>Original size: 16px, Current adjusted size: {Math.max(12, 16 / zoomLevel).toFixed(1)}px</p>
          </div>
        </div>
      ) : (
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px'
        }}>
          <h3>Visual Viewport API Not Supported</h3>
          <p>Your browser doesn't support the Visual Viewport API. This feature requires a modern browser.</p>
        </div>
      )}
    </div>
  );
}
```

### Fixed Position Elements with Keyboard

```tsx
import { useVisualViewportMetrics, useWindowMetrics } from 'frosty';

function FixedFooter({ children }) {
  const visualViewport = useVisualViewportMetrics();
  const windowMetrics = useWindowMetrics();

  const isKeyboardVisible = visualViewport && 
    windowMetrics.innerHeight - visualViewport.height > 150;

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#343a40',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    // Hide footer when keyboard is visible to save space
    transform: isKeyboardVisible ? 'translateY(100%)' : 'translateY(0)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000
  };

  return <footer style={footerStyle}>{children}</footer>;
}

function ChatInput() {
  const visualViewport = useVisualViewportMetrics();
  const windowMetrics = useWindowMetrics();

  const isKeyboardVisible = visualViewport && 
    windowMetrics.innerHeight - visualViewport.height > 150;

  const inputContainerStyle = {
    position: 'fixed',
    bottom: isKeyboardVisible ? '10px' : '70px', // Adjust for footer
    left: '10px',
    right: '10px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '25px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'bottom 0.3s ease-in-out',
    zIndex: 1001
  };

  return (
    <div>
      <div style={{ paddingBottom: '140px' }}>
        <h1>Chat Interface</h1>
        <div style={{ height: '800px', padding: '20px' }}>
          <p>Chat messages would go here...</p>
          <p>Notice how the input field adjusts when you focus on it (mobile keyboard appears).</p>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ 
              margin: '10px 0', 
              padding: '10px', 
              backgroundColor: i % 2 ? '#f8f9fa' : '#e9ecef',
              borderRadius: '8px'
            }}>
              Message {i + 1}: This is a sample chat message
            </div>
          ))}
        </div>
      </div>

      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '8px 12px'
          }}
        />
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          marginLeft: '10px',
          cursor: 'pointer'
        }}>
          →
        </button>
      </div>

      <FixedFooter>
        <p>Footer content - hides when keyboard appears</p>
      </FixedFooter>
    </div>
  );
}
```

### Visual Viewport Dashboard

```tsx
import { useVisualViewportMetrics, useWindowMetrics } from 'frosty';

function VisualViewportDashboard() {
  const visualViewport = useVisualViewportMetrics();
  const windowMetrics = useWindowMetrics();

  if (!visualViewport) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Visual Viewport API Not Available</h2>
        <p>This browser doesn't support the Visual Viewport API.</p>
        <p>Try this demo on a modern mobile browser or Chrome/Edge.</p>
      </div>
    );
  }

  const keyboardHeight = windowMetrics.innerHeight - visualViewport.height;
  const isKeyboardVisible = keyboardHeight > 150;

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Visual Viewport Dashboard</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9'
        }}>
          <h4>Visual Viewport</h4>
          <p>Width: {visualViewport.width}px</p>
          <p>Height: {visualViewport.height}px</p>
          <p>Scale: {visualViewport.scale.toFixed(3)}x</p>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#f3e5f5',
          borderRadius: '8px',
          border: '1px solid #ce93d8'
        }}>
          <h4>Window Metrics</h4>
          <p>Inner Width: {windowMetrics.innerWidth}px</p>
          <p>Inner Height: {windowMetrics.innerHeight}px</p>
          <p>Pixel Ratio: {windowMetrics.devicePixelRatio}x</p>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: isKeyboardVisible ? '#ffebee' : '#e8f5e8',
          borderRadius: '8px',
          border: `1px solid ${isKeyboardVisible ? '#ef9a9a' : '#a5d6a7'}`
        }}>
          <h4>Keyboard Detection</h4>
          <p>Status: {isKeyboardVisible ? 'Visible' : 'Hidden'}</p>
          <p>Height Diff: {keyboardHeight}px</p>
          <p>Threshold: 150px</p>
        </div>
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        border: '1px solid #ffcc02',
        marginBottom: '20px'
      }}>
        <h4>Calculated Values</h4>
        <p>Viewport Aspect Ratio: {(visualViewport.width / visualViewport.height).toFixed(2)}:1</p>
        <p>Zoom Percentage: {(visualViewport.scale * 100).toFixed(1)}%</p>
        <p>Available Height: {visualViewport.height}px</p>
        <p>Content Area: {visualViewport.width} × {visualViewport.height}</p>
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h4>Test Instructions</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Focus on input fields below to trigger virtual keyboard</li>
          <li>Pinch to zoom in/out to see scale changes</li>
          <li>Rotate device to see dimension changes</li>
          <li>Try different zoom levels in browser settings</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Test Inputs</h3>
        <input 
          type="text" 
          placeholder="Focus me to show keyboard"
          style={{ 
            width: '100%', 
            padding: '15px', 
            fontSize: '16px',
            marginBottom: '10px'
          }}
        />
        <textarea 
          placeholder="Or focus this textarea"
          style={{ 
            width: '100%', 
            padding: '15px', 
            fontSize: '16px',
            height: '100px'
          }}
        />
      </div>
    </div>
  );
}
```

## Browser Support

- **Chrome/Edge**: Full support (version 61+)
- **Firefox**: Partial support (version 91+)
- **Safari**: Limited support (iOS 13+)
- **Mobile browsers**: Best support on Android Chrome and iOS Safari

The hook gracefully returns `undefined` when the Visual Viewport API is not available.

## Common Use Cases

- **Virtual Keyboard Detection**: Adjust UI when on-screen keyboards appear
- **Zoom-Responsive Design**: Adapt layouts based on zoom level
- **Mobile Form Optimization**: Reposition elements when keyboard is active
- **Fixed Element Management**: Handle fixed positioning with dynamic viewports
- **Responsive Chat Interfaces**: Optimize messaging UIs for mobile devices

## Notes

- **Mobile-First**: This API is primarily useful for mobile web development
- **Gradual Enhancement**: Always provide fallbacks for unsupported browsers
- **Performance**: Updates are efficient and only trigger when visual viewport actually changes
- **Precision**: Provides more accurate measurements than traditional viewport detection methods

## See Also

- [useWindowMetrics](./useWindowMetrics.md) – Get window dimensions and safe area insets.
- [useWindowScroll](./useWindowScroll.md) – Track window scroll position.
- [useWindow](./useWindow.md) – Access the window object directly.
