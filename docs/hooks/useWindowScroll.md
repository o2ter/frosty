# useWindowScroll

The `useWindowScroll` hook tracks the current scroll position of the window, automatically updating when the user scrolls. This is useful for implementing scroll-based features like scroll indicators, sticky headers, or infinite scrolling.

## Features

- **Reactive Scrolling**: Automatically updates when window scroll position changes
- **Horizontal and Vertical**: Tracks both X and Y scroll positions
- **Performance Optimized**: Efficiently handles scroll events
- **Automatic Cleanup**: Event listeners are automatically managed

## Usage

```tsx
import { useWindowScroll } from 'frosty';

function ScrollIndicator() {
  const { scrollX, scrollY } = useWindowScroll();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      zIndex: 1000
    }}>
      Scroll Position: X: {scrollX}px, Y: {scrollY}px
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

An object containing:
- **scrollX**: `number` - The horizontal scroll position in pixels
- **scrollY**: `number` - The vertical scroll position in pixels

## Examples

### Scroll Progress Bar

```tsx
import { useWindowScroll, useWindowMetrics } from 'frosty';

function ScrollProgressBar() {
  const { scrollY } = useWindowScroll();
  const { innerHeight } = useWindowMetrics();
  
  // Calculate total scrollable height
  const documentHeight = document.documentElement.scrollHeight;
  const scrollableHeight = documentHeight - innerHeight;
  const scrollProgress = Math.min(scrollY / scrollableHeight, 1);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      backgroundColor: '#f0f0f0',
      zIndex: 1000
    }}>
      <div style={{
        height: '100%',
        backgroundColor: '#007bff',
        width: `${scrollProgress * 100}%`,
        transition: 'width 0.1s ease-out'
      }} />
    </div>
  );
}
```

### Sticky Header with Scroll Detection

```tsx
import { useWindowScroll, useState, useEffect } from 'frosty';

function StickyHeader() {
  const { scrollY } = useWindowScroll();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const isScrollingUpward = scrollY < lastScrollY;
    setIsScrollingUp(isScrollingUpward);
    setLastScrollY(scrollY);
  }, [scrollY]);

  const headerStyle = {
    position: 'fixed',
    top: isScrollingUp || scrollY < 100 ? '0' : '-100px',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
    padding: '1rem',
    transition: 'top 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    zIndex: 1000
  };

  return (
    <header style={headerStyle}>
      <h1>Smart Sticky Header</h1>
      <p>Scroll Y: {scrollY}px | Direction: {isScrollingUp ? 'Up' : 'Down'}</p>
    </header>
  );
}
```

### Back to Top Button

```tsx
import { useWindowScroll } from 'frosty';

function BackToTopButton() {
  const { scrollY } = useWindowScroll();
  const showButton = scrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        opacity: scrollY > 300 ? 1 : 0,
        transform: `translateY(${scrollY > 300 ? 0 : 20}px)`,
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 1000
      }}
    >
      ↑
    </button>
  );
}
```

### Parallax Scrolling Effect

```tsx
import { useWindowScroll } from 'frosty';

function ParallaxSection({ children, speed = 0.5 }) {
  const { scrollY } = useWindowScroll();
  
  const parallaxOffset = scrollY * speed;

  return (
    <div style={{
      transform: `translateY(${parallaxOffset}px)`,
      willChange: 'transform'
    }}>
      {children}
    </div>
  );
}

function ParallaxDemo() {
  return (
    <div>
      <div style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
        <h1>Scroll down to see parallax effects</h1>
      </div>
      
      <ParallaxSection speed={0.3}>
        <div style={{
          height: '60vh',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2>Slow Parallax Layer (0.3x speed)</h2>
        </div>
      </ParallaxSection>
      
      <ParallaxSection speed={0.7}>
        <div style={{
          height: '60vh',
          backgroundColor: '#28a745',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2>Fast Parallax Layer (0.7x speed)</h2>
        </div>
      </ParallaxSection>

      <div style={{ height: '100vh', backgroundColor: '#6c757d' }}>
        <h2>Regular Content</h2>
      </div>
    </div>
  );
}
```

### Scroll-based Animations

```tsx
import { useWindowScroll, useWindowMetrics } from 'frosty';

function ScrollAnimatedElement({ children, triggerOffset = 0.2 }) {
  const { scrollY } = useWindowScroll();
  const { innerHeight } = useWindowMetrics();
  
  // Calculate if element should be animated based on scroll position
  const elementTop = 500; // This would typically come from a ref
  const triggerPoint = elementTop - (innerHeight * (1 - triggerOffset));
  const isVisible = scrollY > triggerPoint;
  
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 50}px)`,
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
  };

  return (
    <div style={animationStyle}>
      {children}
    </div>
  );
}

function ScrollAnimationDemo() {
  return (
    <div>
      <div style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
        <h1>Scroll down to see animations</h1>
      </div>
      
      {[1, 2, 3, 4, 5].map(i => (
        <ScrollAnimatedElement key={i}>
          <div style={{
            height: '300px',
            margin: '2rem',
            backgroundColor: '#007bff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
            <h2>Animated Section {i}</h2>
          </div>
        </ScrollAnimatedElement>
      ))}
    </div>
  );
}
```

### Infinite Scroll Implementation

```tsx
import { useWindowScroll, useWindowMetrics, useState, useEffect } from 'frosty';

function InfiniteScrollList() {
  const { scrollY } = useWindowScroll();
  const { innerHeight } = useWindowMetrics();
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrolledToBottom = scrollY + innerHeight >= documentHeight - 100;

    if (scrolledToBottom && !loading) {
      loadMoreItems();
    }
  }, [scrollY, innerHeight, loading]);

  const loadMoreItems = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setItems(prev => [
      ...prev,
      ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)
    ]);
    
    setLoading(false);
  };

  return (
    <div>
      <h1>Infinite Scroll Demo</h1>
      <div>
        {items.map(item => (
          <div key={item} style={{
            padding: '1rem',
            margin: '0.5rem',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}>
            Item {item}
          </div>
        ))}
      </div>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading more items...
        </div>
      )}
    </div>
  );
}
```

### Scroll Position Memory

```tsx
import { useWindowScroll, useEffect } from 'frosty';

function ScrollMemory({ storageKey = 'scrollPosition' }) {
  const { scrollX, scrollY } = useWindowScroll();

  // Save scroll position
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sessionStorage.setItem(storageKey, JSON.stringify({ scrollX, scrollY }));
    }, 100); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [scrollX, scrollY, storageKey]);

  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      try {
        const { scrollX: savedX, scrollY: savedY } = JSON.parse(savedPosition);
        window.scrollTo(savedX, savedY);
      } catch (error) {
        console.error('Failed to restore scroll position:', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}

function PageWithScrollMemory() {
  return (
    <div>
      <ScrollMemory storageKey="demo-page-scroll" />
      <h1>Page with Scroll Memory</h1>
      <p>Your scroll position will be remembered when you refresh the page!</p>
      
      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} style={{ padding: '2rem', borderBottom: '1px solid #ccc' }}>
          <h3>Section {i + 1}</h3>
          <p>This is some content for section {i + 1}. Scroll around and refresh the page to see the scroll position restored.</p>
        </div>
      ))}
    </div>
  );
}
```

### Reading Progress Indicator

```tsx
import { useWindowScroll } from 'frosty';

function ReadingProgress() {
  const { scrollY } = useWindowScroll();
  
  // Estimate reading progress based on scroll
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const readingProgress = Math.min(scrollY / scrollableHeight, 1);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '20px',
      fontSize: '14px',
      zIndex: 1000
    }}>
      Reading Progress: {Math.round(readingProgress * 100)}%
      <div style={{
        marginTop: '5px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#28a745',
          width: `${readingProgress * 100}%`,
          transition: 'width 0.1s ease-out'
        }} />
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Throttling**: The hook efficiently handles scroll events but consider throttling for very intensive operations
- **Will-Change**: Use `will-change: transform` CSS property for elements that will be animated based on scroll
- **Passive Listeners**: Scroll listeners are optimized for performance

## Common Use Cases

- **Scroll Progress Indicators**: Show reading or page progress
- **Sticky Headers**: Create headers that hide/show based on scroll direction
- **Parallax Effects**: Implement smooth parallax scrolling
- **Infinite Scrolling**: Load more content as user scrolls
- **Back to Top Buttons**: Show/hide based on scroll position
- **Scroll-based Animations**: Trigger animations on scroll

## Notes

- **Automatic Updates**: Components re-render automatically when scroll position changes
- **Cross-browser Support**: Works consistently across all modern browsers
- **Memory Efficient**: Event listeners are properly cleaned up when components unmount

## See Also

- [useWindowMetrics](./useWindowMetrics.md) – Get window dimensions for scroll calculations.
- [useIntersectionObserver](./useIntersectionObserver.md) – Track element visibility instead of manual scroll calculations.
- [useEffect](./useEffect.md) – React to scroll position changes with side effects.
