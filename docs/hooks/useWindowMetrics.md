# useWindowMetrics

The `useWindowMetrics` hook provides reactive access to window dimensions and metrics, automatically updating when the window is resized. It includes safe area insets for mobile devices and device pixel ratio information.

## Features

- **Reactive Metrics**: Automatically updates when window size changes
- **Safe Area Support**: Provides safe area insets for mobile devices with notches/dynamic islands
- **Device Information**: Includes device pixel ratio for high-DPI displays
- **Multiple Dimensions**: Provides both inner and outer window dimensions
- **Automatic Cleanup**: Event listeners are automatically managed

## Usage

```tsx
import { useWindowMetrics } from 'frosty';

function WindowMetricsDisplay() {
  const metrics = useWindowMetrics();

  return (
    <div>
      <h2>Window Metrics</h2>
      <p>Inner Width: {metrics.innerWidth}px</p>
      <p>Inner Height: {metrics.innerHeight}px</p>
      <p>Outer Width: {metrics.outerWidth}px</p>
      <p>Outer Height: {metrics.outerHeight}px</p>
      <p>Device Pixel Ratio: {metrics.devicePixelRatio}</p>
      
      <h3>Safe Area Insets:</h3>
      <p>Top: {metrics.safeAreaInsets.top}px</p>
      <p>Right: {metrics.safeAreaInsets.right}px</p>
      <p>Bottom: {metrics.safeAreaInsets.bottom}px</p>
      <p>Left: {metrics.safeAreaInsets.left}px</p>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

An object containing:
- **innerWidth**: `number` - The inner width of the window
- **innerHeight**: `number` - The inner height of the window  
- **outerWidth**: `number` - The outer width of the window
- **outerHeight**: `number` - The outer height of the window
- **devicePixelRatio**: `number` - The device pixel ratio
- **safeAreaInsets**: `{ top: number, right: number, bottom: number, left: number }` - Safe area insets

## Examples

### Responsive Layout

```tsx
import { useWindowMetrics } from 'frosty';

function ResponsiveLayout({ children }) {
  const { innerWidth, innerHeight } = useWindowMetrics();

  const isMobile = innerWidth < 768;
  const isTablet = innerWidth >= 768 && innerWidth < 1024;
  const isDesktop = innerWidth >= 1024;

  const getLayoutClass = () => {
    if (isMobile) return 'mobile-layout';
    if (isTablet) return 'tablet-layout';
    return 'desktop-layout';
  };

  return (
    <div className={getLayoutClass()}>
      <div className="device-info">
        <p>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
        <p>Viewport: {innerWidth} × {innerHeight}</p>
      </div>
      {children}
    </div>
  );
}
```

### Safe Area Layout

```tsx
import { useWindowMetrics } from 'frosty';

function SafeAreaLayout() {
  const { safeAreaInsets } = useWindowMetrics();

  const layoutStyle = {
    paddingTop: safeAreaInsets.top,
    paddingRight: safeAreaInsets.right,
    paddingBottom: safeAreaInsets.bottom,
    paddingLeft: safeAreaInsets.left,
    minHeight: '100vh',
    backgroundColor: '#f0f0f0'
  };

  return (
    <div style={layoutStyle}>
      <header style={{ backgroundColor: '#007bff', color: 'white', padding: '1rem' }}>
        <h1>Safe Area Layout</h1>
        <p>This header respects device safe areas</p>
      </header>
      
      <main style={{ padding: '1rem', flex: 1 }}>
        <p>Content area that avoids notches and home indicators</p>
        <div>
          <h3>Current Safe Area Insets:</h3>
          <ul>
            <li>Top: {safeAreaInsets.top}px</li>
            <li>Right: {safeAreaInsets.right}px</li>
            <li>Bottom: {safeAreaInsets.bottom}px</li>
            <li>Left: {safeAreaInsets.left}px</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
```

### High-DPI Image Loading

```tsx
import { useWindowMetrics } from 'frosty';

function HighDPIImage({ src, alt, ...props }) {
  const { devicePixelRatio } = useWindowMetrics();

  const getImageSrc = () => {
    if (devicePixelRatio >= 3) {
      return src.replace(/\.(jpg|png)$/, '@3x.$1');
    } else if (devicePixelRatio >= 2) {
      return src.replace(/\.(jpg|png)$/, '@2x.$1');
    }
    return src;
  };

  return (
    <div>
      <img 
        src={getImageSrc()} 
        alt={alt} 
        {...props}
        style={{ maxWidth: '100%' }}
      />
      <p>Loaded for {devicePixelRatio}x display</p>
    </div>
  );
}
```

### Aspect Ratio Container

```tsx
import { useWindowMetrics } from 'frosty';

function AspectRatioContainer({ aspectRatio = 16/9, children }) {
  const { innerWidth, innerHeight } = useWindowMetrics();

  const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    height: Math.min(innerWidth / aspectRatio, innerHeight * 0.8),
    backgroundColor: '#000',
    position: 'relative',
    margin: '0 auto'
  };

  return (
    <div>
      <h3>Aspect Ratio Container ({aspectRatio.toFixed(2)}:1)</h3>
      <div style={containerStyle}>
        {children}
      </div>
      <p>
        Container dimensions: {containerStyle.width} × {containerStyle.height}px
      </p>
    </div>
  );
}
```

### Breakpoint Hook

```tsx
import { useWindowMetrics } from 'frosty';

function useBreakpoint() {
  const { innerWidth } = useWindowMetrics();

  return {
    isMobile: innerWidth < 640,
    isTablet: innerWidth >= 640 && innerWidth < 1024,
    isDesktop: innerWidth >= 1024,
    isLarge: innerWidth >= 1280,
    isXLarge: innerWidth >= 1536,
    width: innerWidth
  };
}

function BreakpointDemo() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <h2>Current Breakpoint</h2>
      <ul>
        <li>Mobile: {breakpoint.isMobile ? '✅' : '❌'}</li>
        <li>Tablet: {breakpoint.isTablet ? '✅' : '❌'}</li>
        <li>Desktop: {breakpoint.isDesktop ? '✅' : '❌'}</li>
        <li>Large: {breakpoint.isLarge ? '✅' : '❌'}</li>
        <li>X-Large: {breakpoint.isXLarge ? '✅' : '❌'}</li>
      </ul>
      <p>Width: {breakpoint.width}px</p>
    </div>
  );
}
```

### Window Metrics Dashboard

```tsx
import { useWindowMetrics } from 'frosty';

function WindowMetricsDashboard() {
  const metrics = useWindowMetrics();

  const MetricCard = ({ title, value, unit = 'px' }) => (
    <div style={{
      border: '1px solid #ddd',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '120px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
        {value}{unit}
      </p>
    </div>
  );

  return (
    <div>
      <h2>Window Metrics Dashboard</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <MetricCard title="Inner Width" value={metrics.innerWidth} />
        <MetricCard title="Inner Height" value={metrics.innerHeight} />
        <MetricCard title="Outer Width" value={metrics.outerWidth} />
        <MetricCard title="Outer Height" value={metrics.outerHeight} />
        <MetricCard title="Pixel Ratio" value={metrics.devicePixelRatio} unit="x" />
      </div>

      <h3>Safe Area Insets</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem'
      }}>
        <MetricCard title="Top" value={metrics.safeAreaInsets.top} />
        <MetricCard title="Right" value={metrics.safeAreaInsets.right} />
        <MetricCard title="Bottom" value={metrics.safeAreaInsets.bottom} />
        <MetricCard title="Left" value={metrics.safeAreaInsets.left} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Calculated Values</h3>
        <p>Aspect Ratio: {(metrics.innerWidth / metrics.innerHeight).toFixed(2)}:1</p>
        <p>Total Pixels: {(metrics.innerWidth * metrics.innerHeight).toLocaleString()}</p>
        <p>Physical Pixels: {(metrics.innerWidth * metrics.innerHeight * metrics.devicePixelRatio).toLocaleString()}</p>
      </div>
    </div>
  );
}
```

### Modal Positioning

```tsx
import { useWindowMetrics, useState } from 'frosty';

function CenteredModal({ isOpen, onClose, children }) {
  const { innerWidth, innerHeight, safeAreaInsets } = useWindowMetrics();

  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: safeAreaInsets.top,
    left: safeAreaInsets.left,
    right: safeAreaInsets.right,
    bottom: safeAreaInsets.bottom,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: Math.min(innerWidth * 0.9, 500),
    maxHeight: innerHeight * 0.8,
    overflow: 'auto'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Centered Modal
      </button>

      <CenteredModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Centered Modal</h2>
        <p>This modal is centered and respects safe areas!</p>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CenteredModal>
    </div>
  );
}
```

## Browser Support

- **CSS env() function**: Required for safe area insets (iOS 11.2+, modern browsers)
- **Window resize events**: Universal support
- **Device pixel ratio**: Universal support

Safe area insets will return `{ top: 0, right: 0, bottom: 0, left: 0 }` on devices/browsers that don't support the feature.

## Common Use Cases

- **Responsive Design**: Adapting layouts based on screen size
- **Safe Area Layouts**: Avoiding notches and home indicators on mobile devices
- **High-DPI Support**: Loading appropriate images for different pixel densities
- **Modal Positioning**: Centering modals and overlays properly
- **Breakpoint Systems**: Creating responsive breakpoint hooks
- **Performance Optimization**: Conditional rendering based on screen size

## Notes

- **Automatic Updates**: The hook automatically re-renders when window is resized
- **Performance**: Uses efficient event listeners that are automatically cleaned up
- **Safe Area Detection**: Automatically detects and uses appropriate CSS environment variables
- **Cross-Platform**: Works consistently across different devices and browsers

## See Also

- [useWindow](./useWindow.md) – Access the window object directly.
- [useVisualViewportMetrics](./useVisualViewportMetrics.md) – Get visual viewport dimensions.
- [useWindowScroll](./useWindowScroll.md) – Track window scroll position.
