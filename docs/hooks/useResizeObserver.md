# useResizeObserver

The `useResizeObserver` hook provides a way to observe changes to the size of DOM elements using the modern ResizeObserver API. This is useful for responsive layouts, element size tracking, and implementing size-based logic.

## Features

- **Element Size Tracking**: Monitor width, height, and other size metrics of DOM elements
- **Performance Optimized**: Uses the native ResizeObserver API for efficient size monitoring
- **Ref Support**: Works with both ref objects and direct element references
- **Automatic Cleanup**: Observers are automatically disconnected when components unmount
- **Flexible Targeting**: Observe any DOM element or ref

## Usage

```tsx
import { useResizeObserver, useRef } from 'frosty';

function ResizableBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useResizeObserver(boxRef, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '50%',
          height: '200px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '20px',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <h3>Resizable Box</h3>
        <p>Width: {Math.round(dimensions.width)}px</p>
        <p>Height: {Math.round(dimensions.height)}px</p>
        <p>Try resizing this box by dragging the bottom-right corner!</p>
      </div>
    </div>
  );
}
```

## Parameters

1. **target**: `RefObject<Element> | Element | null | undefined` - The element or ref to observe for size changes.
2. **callback**: `(entry: ResizeObserverEntry) => void` - Function called when the element's size changes.
3. **options**: `ResizeObserverOptions` (optional) - Configuration options for the ResizeObserver.

### ResizeObserverEntry Properties

The callback receives a `ResizeObserverEntry` with these useful properties:
- **contentRect**: Dimensions of the content area
- **borderBoxSize**: Size including border
- **contentBoxSize**: Size of the content box
- **devicePixelContentBoxSize**: Size in device pixels

## Returns

`void` - This hook doesn't return any value.

## Examples

### Responsive Component

```tsx
import { useResizeObserver, useRef, useState } from 'frosty';

function ResponsiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState('large');

  useResizeObserver(cardRef, (entry) => {
    const { width } = entry.contentRect;
    if (width < 300) {
      setLayout('small');
    } else if (width < 600) {
      setLayout('medium');
    } else {
      setLayout('large');
    }
  });

  const getLayoutStyles = () => {
    switch (layout) {
      case 'small':
        return {
          flexDirection: 'column',
          fontSize: '14px',
          padding: '10px'
        };
      case 'medium':
        return {
          flexDirection: 'column',
          fontSize: '16px',
          padding: '15px'
        };
      default:
        return {
          flexDirection: 'row',
          fontSize: '18px',
          padding: '20px'
        };
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        display: 'flex',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        ...getLayoutStyles()
      }}
    >
      <div style={{ 
        width: layout === 'large' ? '200px' : '100%',
        height: layout === 'large' ? '150px' : '100px',
        backgroundColor: '#f0f0f0',
        marginRight: layout === 'large' ? '15px' : '0',
        marginBottom: layout === 'large' ? '0' : '10px'
      }}>
        Image Placeholder
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 10px 0' }}>
          {layout === 'small' ? 'Card' : 'Responsive Card'}
        </h3>
        <p style={{ margin: 0 }}>
          Layout: {layout} | 
          {layout === 'small' && ' Compact view for narrow spaces'}
          {layout === 'medium' && ' Stacked layout for medium widths'}
          {layout === 'large' && ' Side-by-side layout for wide spaces'}
        </p>
      </div>
    </div>
  );
}
```

### Chart Container

```tsx
import { useResizeObserver, useRef, useState, useEffect } from 'frosty';

function ChartContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useResizeObserver(containerRef, (entry) => {
    const { width, height } = entry.contentRect;
    // Leave some padding for chart margins
    setChartSize({
      width: Math.max(0, width - 40),
      height: Math.max(0, height - 40)
    });
  });

  const generateChartData = () => {
    const points = Math.max(5, Math.floor(chartSize.width / 50));
    return Array.from({ length: points }, (_, i) => ({
      x: (i / (points - 1)) * chartSize.width,
      y: Math.random() * chartSize.height
    }));
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (chartSize.width > 0 && chartSize.height > 0) {
      setChartData(generateChartData());
    }
  }, [chartSize]);

  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
      <h3 style={{ margin: '10px', textAlign: 'center' }}>
        Responsive Chart ({Math.round(chartSize.width)} × {Math.round(chartSize.height)})
      </h3>
      <div
        ref={containerRef}
        style={{
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 60px)',
          margin: '10px',
          backgroundColor: '#f9f9f9',
          position: 'relative'
        }}
      >
        {chartSize.width > 0 && chartSize.height > 0 && (
          <svg
            width={chartSize.width}
            height={chartSize.height}
            style={{ position: 'absolute', top: '20px', left: '20px' }}
          >
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`grid-${i}`}
                x1={0}
                y1={(i / 4) * chartSize.height}
                x2={chartSize.width}
                y2={(i / 4) * chartSize.height}
                stroke="#ddd"
                strokeWidth={1}
              />
            ))}
            
            {/* Chart line */}
            {chartData.length > 1 && (
              <polyline
                points={chartData.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#007bff"
                strokeWidth={2}
              />
            )}
            
            {/* Data points */}
            {chartData.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={4}
                fill="#007bff"
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
```

### Masonry Layout

```tsx
import { useResizeObserver, useRef, useState, useEffect } from 'frosty';

function MasonryLayout({ items }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [columns, setColumns] = useState(3);

  useResizeObserver(containerRef, (entry) => {
    const { width } = entry.contentRect;
    setContainerWidth(width);
    
    // Calculate number of columns based on container width
    const newColumns = Math.max(1, Math.floor(width / 250));
    setColumns(newColumns);
  });

  const arrangeItems = () => {
    if (containerWidth === 0) return [];

    const columnWidth = containerWidth / columns;
    const columnHeights = new Array(columns).fill(0);
    
    return items.map((item, index) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const left = shortestColumn * columnWidth;
      const top = columnHeights[shortestColumn];
      
      const height = 150 + Math.random() * 200; // Random height for demo
      columnHeights[shortestColumn] += height + 20; // Add gap
      
      return {
        ...item,
        style: {
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`,
          width: `${columnWidth - 20}px`,
          height: `${height}px`,
          transition: 'all 0.3s ease'
        }
      };
    });
  };

  const [arrangedItems, setArrangedItems] = useState([]);

  useEffect(() => {
    setArrangedItems(arrangeItems());
  }, [containerWidth, columns, items]);

  const maxHeight = arrangedItems.reduce((max, item) => 
    Math.max(max, parseFloat(item.style.top) + parseFloat(item.style.height)), 0
  );

  return (
    <div>
      <h3>Masonry Layout ({columns} columns)</h3>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: `${maxHeight + 20}px`,
          backgroundColor: '#f8f9fa',
          transition: 'height 0.3s ease'
        }}
      >
        {arrangedItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...item.style,
              backgroundColor: item.color,
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: '14px' }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Usage
function MasonryDemo() {
  const demoItems = Array.from({ length: 12 }, (_, i) => ({
    title: `Item ${i + 1}`,
    content: `This is the content for item ${i + 1}. `.repeat(Math.floor(Math.random() * 5) + 1),
    color: `hsl(${Math.random() * 360}, 70%, 85%)`
  }));

  return <MasonryLayout items={demoItems} />;
}
```

### Text Area Auto-Resize

```tsx
import { useResizeObserver, useRef, useState } from 'frosty';

function AutoResizeTextArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useResizeObserver(textareaRef, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  const handleTextChange = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <div>
      <h3>Auto-Resize Text Area</h3>
      <textarea
        ref={textareaRef}
        placeholder="Start typing... This textarea will grow automatically as you type more content."
        onChange={handleTextChange}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '15px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px',
          fontFamily: 'inherit',
          resize: 'horizontal', // Allow only horizontal resize
          overflow: 'hidden'
        }}
      />
      <div style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Current dimensions:</strong> {Math.round(dimensions.width)} × {Math.round(dimensions.height)} pixels
      </div>
    </div>
  );
}
```

### Performance Monitor

```tsx
import { useResizeObserver, useRef, useState } from 'frosty';

function PerformanceMonitor() {
  const monitorRef = useRef<HTMLDivElement>(null);
  const [resizeCount, setResizeCount] = useState(0);
  const [lastResize, setLastResize] = useState<Date | null>(null);
  const [averageSize, setAverageSize] = useState({ width: 0, height: 0 });

  useResizeObserver(monitorRef, (entry) => {
    const { width, height } = entry.contentRect;
    const now = new Date();
    
    setResizeCount(prev => prev + 1);
    setLastResize(now);
    
    // Calculate running average
    setAverageSize(prev => ({
      width: prev.width === 0 ? width : (prev.width + width) / 2,
      height: prev.height === 0 ? height : (prev.height + height) / 2
    }));
  });

  return (
    <div>
      <h3>Resize Performance Monitor</h3>
      <div
        ref={monitorRef}
        style={{
          width: '80%',
          height: '200px',
          backgroundColor: '#e3f2fd',
          border: '2px solid #2196f3',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px 0',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <h4>Resizable Monitor Area</h4>
        <p><strong>Resize Count:</strong> {resizeCount}</p>
        <p><strong>Last Resize:</strong> {lastResize?.toLocaleTimeString() || 'Never'}</p>
        <p><strong>Average Size:</strong> {Math.round(averageSize.width)} × {Math.round(averageSize.height)}</p>
        <p>Drag the bottom-right corner to resize and see the metrics update!</p>
      </div>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support in Chrome 64+, Firefox 69+, Safari 13.1+
- **Fallback**: The hook gracefully handles environments where ResizeObserver is not available
- **Polyfill**: Consider using a ResizeObserver polyfill for older browser support

## Common Use Cases

- **Responsive Components**: Adapt component layout based on available space
- **Chart Libraries**: Resize charts when container dimensions change
- **Masonry Layouts**: Recalculate item positions when container resizes
- **Auto-sizing Elements**: Automatically adjust element sizes based on content
- **Performance Monitoring**: Track resize frequency and dimensions
- **Virtual Scrolling**: Update visible item calculations when container resizes

## Performance Considerations

- **Throttling**: ResizeObserver automatically throttles callbacks for performance
- **Passive Observation**: Observations don't block the main thread
- **Memory Efficiency**: Observers are automatically cleaned up when components unmount

## Notes

- **Automatic Cleanup**: The hook automatically disconnects observers when components unmount or targets change
- **Ref Support**: Works with both useRef() objects and direct DOM element references
- **Error Handling**: Callbacks are wrapped to catch and log errors without breaking the observer
- **Multiple Targets**: Use multiple hooks to observe different elements

## See Also

- [useIntersectionObserver](./useIntersectionObserver.md) – Observe element visibility in the viewport.
- [useMutationObserver](./useMutationObserver.md) – Observe DOM mutations and changes.
- [useRef](./useRef.md) – Create references to DOM elements.
