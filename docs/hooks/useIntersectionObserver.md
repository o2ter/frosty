# useIntersectionObserver

The `useIntersectionObserver` hook provides a way to observe when DOM elements enter or leave the viewport using the Intersection Observer API. This is perfect for implementing lazy loading, infinite scrolling, scroll-triggered animations, and analytics tracking.

## Features

- **Viewport Tracking**: Detect when elements become visible or hidden in the viewport
- **Performance Optimized**: Uses the native IntersectionObserver API for efficient visibility detection
- **Threshold Support**: Configure how much of an element must be visible to trigger callbacks
- **Root Margin**: Extend the observation area with configurable margins
- **Automatic Cleanup**: Observers are automatically disconnected when components unmount

## Usage

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState } from 'frosty';

function LazyImage({ src, alt, placeholder }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useIntersectionObserver(imgRef, (entry) => {
    if (entry.isIntersecting && !hasLoaded) {
      setIsVisible(true);
      setHasLoaded(true);
    }
  });

  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <img
        ref={imgRef}
        src={isVisible ? src : placeholder}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          opacity: isVisible ? 1 : 0.5,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={() => setIsVisible(true)}
      />
      {!isVisible && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}
```

## Parameters

1. **target**: `RefObject<Element> | Element | null | undefined` - The element or ref to observe for intersection changes.
2. **callback**: `(entry: IntersectionObserverEntry) => void` - Function called when the element's intersection status changes.

### IntersectionObserverEntry Properties

The callback receives an `IntersectionObserverEntry` with these useful properties:
- **isIntersecting**: `boolean` - Whether the element is currently intersecting
- **intersectionRatio**: `number` - How much of the element is visible (0 to 1)
- **boundingClientRect**: Size and position of the element
- **intersectionRect**: Size and position of the intersection
- **rootBounds**: Size and position of the root (viewport)
- **target**: The observed element

## Returns

`void` - This hook doesn't return any value.

## Examples

### Scroll-Triggered Animations

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState } from 'frosty';

function AnimatedSection({ children, animation = 'fadeInUp' }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver(sectionRef, (entry) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  });

  const animations = {
    fadeInUp: {
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${isVisible ? 0 : 50}px)`,
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    },
    fadeInLeft: {
      opacity: isVisible ? 1 : 0,
      transform: `translateX(${isVisible ? 0 : -50}px)`,
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    },
    scaleIn: {
      opacity: isVisible ? 1 : 0,
      transform: `scale(${isVisible ? 1 : 0.8})`,
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    }
  };

  return (
    <div
      ref={sectionRef}
      style={animations[animation]}
    >
      {children}
    </div>
  );
}

function AnimationDemo() {
  return (
    <div>
      <div style={{ height: '100vh', backgroundColor: '#f8f9fa', padding: '50px' }}>
        <h1>Scroll down to see animations</h1>
      </div>
      
      {['fadeInUp', 'fadeInLeft', 'scaleIn'].map((animation, index) => (
        <AnimatedSection key={index} animation={animation}>
          <div style={{
            height: '300px',
            margin: '50px 0',
            backgroundColor: `hsl(${index * 120}, 70%, 85%)`,
            borderRadius: '12px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h2>{animation} Animation</h2>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
```

### Infinite Scrolling

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState, useEffect } from 'frosty';

function InfiniteList() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(loadingRef, (entry) => {
    if (entry.isIntersecting && !loading && hasMore) {
      loadMoreItems();
    }
  });

  const loadMoreItems = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setItems(prev => {
      const newItems = Array.from(
        { length: 10 }, 
        (_, i) => prev.length + i + 1
      );
      return [...prev, ...newItems];
    });
    
    // Stop loading after 100 items for demo
    if (items.length >= 90) {
      setHasMore(false);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2>Infinite Scroll Demo</h2>
      <div>
        {items.map(item => (
          <div
            key={item}
            style={{
              padding: '20px',
              margin: '10px 0',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Item {item}</span>
            <span style={{ color: '#6c757d', fontSize: '14px' }}>
              #{item.toString().padStart(3, '0')}
            </span>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div
          ref={loadingRef}
          style={{
            padding: '40px',
            textAlign: 'center',
            color: '#6c757d'
          }}
        >
          {loading ? (
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 10px'
              }} />
              Loading more items...
            </div>
          ) : (
            'Scroll down to load more'
          )}
        </div>
      )}
      
      {!hasMore && (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#28a745',
          fontWeight: 'bold'
        }}>
          🎉 All items loaded!
        </div>
      )}
    </div>
  );
}
```

### Visibility Analytics

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState, useEffect } from 'frosty';

function AnalyticsSection({ id, title, children }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewData, setViewData] = useState({
    isVisible: false,
    firstView: null,
    totalViewTime: 0,
    viewCount: 0
  });
  const [viewStartTime, setViewStartTime] = useState<number | null>(null);

  useIntersectionObserver(sectionRef, (entry) => {
    const now = Date.now();
    
    if (entry.isIntersecting) {
      // Element became visible
      setViewStartTime(now);
      setViewData(prev => ({
        ...prev,
        isVisible: true,
        firstView: prev.firstView || new Date(now),
        viewCount: prev.viewCount + 1
      }));
      
      // Analytics tracking
      console.log(`Section "${id}" became visible`);
      
    } else if (viewStartTime) {
      // Element became hidden
      const viewDuration = now - viewStartTime;
      setViewData(prev => ({
        ...prev,
        isVisible: false,
        totalViewTime: prev.totalViewTime + viewDuration
      }));
      setViewStartTime(null);
      
      console.log(`Section "${id}" was viewed for ${viewDuration}ms`);
    }
  });

  // Update total view time when component unmounts
  useEffect(() => {
    return () => {
      if (viewStartTime) {
        const finalDuration = Date.now() - viewStartTime;
        console.log(`Final view time for "${id}": ${finalDuration}ms`);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        margin: '40px 0',
        padding: '30px',
        backgroundColor: viewData.isVisible ? '#e8f5e8' : '#f8f9fa',
        border: `2px solid ${viewData.isVisible ? '#28a745' : '#dee2e6'}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <h3>{title}</h3>
      {children}
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Analytics Data:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Status: {viewData.isVisible ? '👁️ Visible' : '🙈 Hidden'}</li>
          <li>View Count: {viewData.viewCount}</li>
          <li>Total View Time: {Math.round(viewData.totalViewTime / 1000)}s</li>
          <li>First Viewed: {viewData.firstView?.toLocaleTimeString() || 'Never'}</li>
        </ul>
      </div>
    </div>
  );
}

function AnalyticsDemo() {
  return (
    <div>
      <div style={{ height: '100vh', padding: '50px', backgroundColor: '#343a40', color: 'white' }}>
        <h1>Scroll Analytics Demo</h1>
        <p>Scroll down to see analytics tracking in action. Check the console for detailed logs.</p>
      </div>
      
      <AnalyticsSection id="section-1" title="Introduction Section">
        <p>This section tracks when it becomes visible and how long users spend viewing it.</p>
        <p>The border color changes when the section is in view, and analytics data is shown below.</p>
      </AnalyticsSection>
      
      <AnalyticsSection id="section-2" title="Features Section">
        <p>Each section independently tracks its own visibility metrics.</p>
        <p>This is useful for understanding which content engages users most.</p>
      </AnalyticsSection>
      
      <AnalyticsSection id="section-3" title="Implementation Section">
        <p>The implementation uses IntersectionObserver for performance.</p>
        <p>View counts, duration, and timestamps are all tracked automatically.</p>
      </AnalyticsSection>
    </div>
  );
}
```

### Progressive Image Loading

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState } from 'frosty';

function ProgressiveImage({ 
  lowQualitySrc, 
  highQualitySrc, 
  alt, 
  width = '100%', 
  height = 'auto' 
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [loadingState, setLoadingState] = useState('placeholder'); // placeholder, loading, loaded

  useIntersectionObserver(imageRef, (entry) => {
    if (entry.isIntersecting && loadingState === 'placeholder') {
      setLoadingState('loading');
    }
  });

  const handleLowQualityLoad = () => {
    // Start loading high quality image
    const highQualityImg = new Image();
    highQualityImg.onload = () => {
      setLoadingState('loaded');
    };
    highQualityImg.src = highQualitySrc;
  };

  return (
    <div
      ref={imageRef}
      style={{
        position: 'relative',
        width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden'
      }}
    >
      {/* Placeholder */}
      {loadingState === 'placeholder' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e9ecef',
          color: '#6c757d'
        }}>
          📷 Image placeholder
        </div>
      )}
      
      {/* Low quality image (loads immediately when in viewport) */}
      {loadingState !== 'placeholder' && (
        <img
          src={lowQualitySrc}
          alt={alt}
          onLoad={handleLowQualityLoad}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: loadingState === 'loading' ? 'blur(2px)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        />
      )}
      
      {/* High quality image */}
      {loadingState === 'loaded' && (
        <img
          src={highQualitySrc}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}
      
      {/* Loading indicator */}
      {loadingState === 'loading' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '15px',
          fontSize: '12px'
        }}>
          Loading HD...
        </div>
      )}
    </div>
  );
}

function ProgressiveGallery() {
  const images = [
    {
      lowQuality: 'https://picsum.photos/400/300?random=1&blur=10',
      highQuality: 'https://picsum.photos/800/600?random=1',
      alt: 'Sample image 1'
    },
    {
      lowQuality: 'https://picsum.photos/400/300?random=2&blur=10',
      highQuality: 'https://picsum.photos/800/600?random=2',
      alt: 'Sample image 2'
    },
    {
      lowQuality: 'https://picsum.photos/400/300?random=3&blur=10',
      highQuality: 'https://picsum.photos/800/600?random=3',
      alt: 'Sample image 3'
    }
  ];

  return (
    <div>
      <h2>Progressive Image Loading</h2>
      <p>Images load a low-quality version first, then upgrade to high-quality when ready.</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {images.map((image, index) => (
          <ProgressiveImage
            key={index}
            lowQualitySrc={image.lowQuality}
            highQualitySrc={image.highQuality}
            alt={image.alt}
            height={250}
          />
        ))}
      </div>
    </div>
  );
}
```

### Sticky Header with Intersection

```tsx
import { useIntersectionObserver } from 'frosty/web';
import { useRef, useState } from 'frosty';

function StickyHeader() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useIntersectionObserver(sentinelRef, (entry) => {
    // When the sentinel is not intersecting, the header should be sticky
    setIsSticky(!entry.isIntersecting);
  });

  return (
    <div>
      {/* Sentinel element at the top */}
      <div ref={sentinelRef} style={{ height: '1px' }} />
      
      {/* Sticky header */}
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: isSticky ? 'rgba(255,255,255,0.95)' : 'white',
        backdropFilter: isSticky ? 'blur(10px)' : 'none',
        borderBottom: isSticky ? '1px solid #dee2e6' : 'none',
        padding: '15px 20px',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: isSticky ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
      }}>
        <h1 style={{ margin: 0 }}>
          Sticky Header {isSticky && '📌'}
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>
          {isSticky ? 'Now sticky!' : 'Scroll down to make me sticky'}
        </p>
      </header>
      
      {/* Content */}
      <div style={{ height: '200vh', padding: '40px 20px' }}>
        <h2>Main Content</h2>
        <p>Scroll up and down to see the header behavior change.</p>
        
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{
            padding: '20px',
            margin: '10px 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3>Section {i + 1}</h3>
            <p>This is some content for section {i + 1}. The header will become sticky when you scroll past the top of the page.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support in Chrome 51+, Firefox 55+, Safari 12.1+
- **Fallback**: The hook gracefully handles environments where IntersectionObserver is not available
- **Polyfill**: Consider using an IntersectionObserver polyfill for older browser support

## Common Use Cases

- **Lazy Loading**: Load images, videos, or content only when they enter the viewport
- **Infinite Scrolling**: Load more content when user reaches the bottom
- **Scroll Animations**: Trigger animations when elements become visible
- **Analytics Tracking**: Track which content users actually see
- **Performance Optimization**: Defer expensive operations until elements are visible
- **Sticky Elements**: Create sticky headers or navigation elements

## Performance Benefits

- **Efficient**: Uses native browser API, no scroll event listeners required
- **Automatic Throttling**: Browser automatically optimizes observation frequency
- **Non-blocking**: Observations don't interfere with page performance
- **Memory Efficient**: Automatic cleanup prevents memory leaks

## Notes

- **Automatic Cleanup**: Observers are automatically disconnected when components unmount
- **Single Callback**: Each hook instance observes one element with one callback
- **Ref Support**: Works with both useRef() objects and direct DOM element references
- **Threshold Control**: Use IntersectionObserver options for fine-grained control

## See Also

- [useResizeObserver](./useResizeObserver.md) – Observe element size changes.
- [useMutationObserver](./useMutationObserver.md) – Observe DOM mutations and changes.
- [useWindowScroll](./useWindowScroll.md) – Track window scroll position for manual visibility calculations.
