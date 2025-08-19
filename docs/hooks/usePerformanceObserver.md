# `usePerformanceObserver` Hook

The `usePerformanceObserver` hook provides access to the Performance Observer API for monitoring various performance metrics and timing data. This is useful for tracking application performance, identifying bottlenecks, and implementing performance monitoring solutions.

## Features

- **Performance Monitoring**: Track various performance metrics like navigation, resource loading, and user interactions.
- **Entry Type Filtering**: Monitor specific types of performance entries (navigation, resource, measure, etc.).
- **Real-time Metrics**: Get performance data as it becomes available.
- **Buffered Entries**: Access historical performance data when the observer starts.
- **Automatic Cleanup**: Observers are automatically disconnected when components unmount.

## Usage

```tsx
import { usePerformanceObserver, useState, useCallback } from 'frosty';

function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<{
    resources: PerformanceResourceTiming[];
    navigation: PerformanceNavigationTiming[];
    measures: PerformanceMeasure[];
    marks: PerformanceMark[];
  }>({
    resources: [],
    navigation: [],
    measures: [],
    marks: []
  });

  const handlePerformanceEntries = useCallback((entries: PerformanceEntry[]) => {
    entries.forEach((entry) => {
      switch (entry.entryType) {
        case 'resource':
          setPerformanceData(prev => ({
            ...prev,
            resources: [...prev.resources, entry as PerformanceResourceTiming].slice(-50)
          }));
          break;
          
        case 'navigation':
          setPerformanceData(prev => ({
            ...prev,
            navigation: [...prev.navigation, entry as PerformanceNavigationTiming].slice(-10)
          }));
          break;
          
        case 'measure':
          setPerformanceData(prev => ({
            ...prev,
            measures: [...prev.measures, entry as PerformanceMeasure].slice(-20)
          }));
          break;
          
        case 'mark':
          setPerformanceData(prev => ({
            ...prev,
            marks: [...prev.marks, entry as PerformanceMark].slice(-30)
          }));
          break;
      }
    });
  }, []);

  // Monitor multiple performance entry types
  usePerformanceObserver(handlePerformanceEntries, {
    entryTypes: ['resource', 'navigation', 'measure', 'mark']
  });

  const addPerformanceMark = () => {
    const markName = `user-action-${Date.now()}`;
    performance.mark(markName);
  };

  const measurePerformance = () => {
    const startMark = `measure-start-${Date.now()}`;
    const endMark = `measure-end-${Date.now()}`;
    
    performance.mark(startMark);
    
    // Simulate some work
    setTimeout(() => {
      performance.mark(endMark);
      performance.measure(`operation-${Date.now()}`, startMark, endMark);
    }, Math.random() * 1000 + 500);
  };

  const formatDuration = (duration: number) => {
    return duration < 1000 ? `${duration.toFixed(2)}ms` : `${(duration / 1000).toFixed(2)}s`;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <h3>Performance Monitor</h3>
      <p>Real-time performance metrics monitoring using the Performance Observer API.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={addPerformanceMark} style={{ marginRight: '10px' }}>
          Add Performance Mark
        </button>
        <button onClick={measurePerformance}>
          Measure Performance
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {/* Navigation Timing */}
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <h4>Navigation Timing</h4>
          {performanceData.navigation.length > 0 ? (
            performanceData.navigation.slice(-1).map((nav, index) => (
              <div key={index} style={{ fontSize: '14px' }}>
                <div><strong>Load Time:</strong> {formatDuration(nav.loadEventEnd - nav.loadEventStart)}</div>
                <div><strong>DOM Content Loaded:</strong> {formatDuration(nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart)}</div>
                <div><strong>DNS Lookup:</strong> {formatDuration(nav.domainLookupEnd - nav.domainLookupStart)}</div>
                <div><strong>TCP Connection:</strong> {formatDuration(nav.connectEnd - nav.connectStart)}</div>
                <div><strong>Server Response:</strong> {formatDuration(nav.responseEnd - nav.responseStart)}</div>
              </div>
            ))
          ) : (
            <p style={{ color: '#6c757d' }}>No navigation data yet</p>
          )}
        </div>

        {/* Resource Timing */}
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <h4>Resource Loading (Last 5)</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {performanceData.resources.slice(-5).map((resource, index) => (
              <div key={index} style={{
                padding: '8px',
                marginBottom: '8px',
                backgroundColor: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 'bold' }}>
                  {resource.name.split('/').pop() || resource.name}
                </div>
                <div><strong>Duration:</strong> {formatDuration(resource.duration)}</div>
                <div><strong>Size:</strong> {formatBytes(resource.transferSize || 0)}</div>
                <div><strong>Type:</strong> {resource.initiatorType}</div>
              </div>
            ))}
            {performanceData.resources.length === 0 && (
              <p style={{ color: '#6c757d' }}>No resource data yet</p>
            )}
          </div>
        </div>

        {/* Performance Marks */}
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#e8f5e8'
        }}>
          <h4>Performance Marks (Last 10)</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {performanceData.marks.slice(-10).map((mark, index) => (
              <div key={index} style={{
                padding: '6px',
                marginBottom: '6px',
                backgroundColor: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 'bold' }}>{mark.name}</div>
                <div>Time: {formatDuration(mark.startTime)}</div>
              </div>
            ))}
            {performanceData.marks.length === 0 && (
              <p style={{ color: '#6c757d' }}>No marks yet</p>
            )}
          </div>
        </div>

        {/* Performance Measures */}
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <h4>Performance Measures (Last 10)</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {performanceData.measures.slice(-10).map((measure, index) => (
              <div key={index} style={{
                padding: '6px',
                marginBottom: '6px',
                backgroundColor: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 'bold' }}>{measure.name}</div>
                <div><strong>Duration:</strong> {formatDuration(measure.duration)}</div>
                <div><strong>Start:</strong> {formatDuration(measure.startTime)}</div>
              </div>
            ))}
            {performanceData.measures.length === 0 && (
              <p style={{ color: '#6c757d' }}>No measures yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Parameters

1. **callback**: `(entries: PerformanceEntry[]) => void` - Function called when performance entries are observed.
2. **options**: `PerformanceObserverInit` - Configuration options for the observer.

### PerformanceObserverInit Options

- **entryTypes**: `string[]` - Array of entry types to observe
- **type**: `string` - Single entry type to observe (alternative to entryTypes)
- **buffered**: `boolean` - Whether to receive buffered entries

### Entry Types

Common performance entry types:
- **'navigation'**: Navigation timing data
- **'resource'**: Resource loading timing
- **'mark'**: User-defined performance marks
- **'measure'**: User-defined performance measures
- **'paint'**: Paint timing (first-paint, first-contentful-paint)
- **'largest-contentful-paint'**: LCP metrics
- **'layout-shift'**: Cumulative Layout Shift
- **'longtask'**: Long tasks (>50ms)

## Returns

`void` - This hook doesn't return any value.

## Examples

### Core Web Vitals Monitor

```tsx
import { usePerformanceObserver, useState, useCallback, useEffect } from 'frosty';

function CoreWebVitalsMonitor() {
  const [webVitals, setWebVitals] = useState<{
    lcp: number | null;
    fid: number | null;
    cls: number;
    fcp: number | null;
    ttfb: number | null;
  }>({
    lcp: null,
    fid: null,
    cls: 0,
    fcp: null,
    ttfb: null
  });

  // Monitor paint entries
  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          setWebVitals(prev => ({ ...prev, fcp: entry.startTime }));
        }
      });
    }, []),
    { entryTypes: ['paint'] }
  );

  // Monitor LCP
  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setWebVitals(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }
    }, []),
    { entryTypes: ['largest-contentful-paint'] }
  );

  // Monitor CLS
  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setWebVitals(prev => ({ ...prev, cls: prev.cls + clsValue }));
    }, []),
    { entryTypes: ['layout-shift'] }
  );

  // Monitor navigation for TTFB
  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      entries.forEach((entry: any) => {
        if (entry.responseStart && entry.requestStart) {
          setWebVitals(prev => ({ 
            ...prev, 
            ttfb: entry.responseStart - entry.requestStart 
          }));
        }
      });
    }, []),
    { entryTypes: ['navigation'] }
  );

  // Simulate FID measurement (would normally be done with event listeners)
  useEffect(() => {
    const handleFirstInput = () => {
      setWebVitals(prev => ({ ...prev, fid: performance.now() }));
    };

    // In a real app, you'd measure the delay between user input and handler execution
    document.addEventListener('click', handleFirstInput, { once: true });
    document.addEventListener('keydown', handleFirstInput, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInput);
      document.removeEventListener('keydown', handleFirstInput);
    };
  }, []);

  const getVitalScore = (metric: string, value: number | null) => {
    if (value === null) return 'pending';
    
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'fcp':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'ttfb':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'unknown';
    }
  };

  const formatMetric = (value: number | null) => {
    if (value === null) return 'Measuring...';
    return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(2)}s`;
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'good': return '#0cce6b';
      case 'needs-improvement': return '#ffa400';
      case 'poor': return '#ff4e42';
      default: return '#9aa0a6';
    }
  };

  const triggerLayoutShift = () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    element.style.backgroundColor = '#ffeb3b';
    element.style.margin = '10px 0';
    element.style.padding = '20px';
    element.style.borderRadius = '4px';
    element.textContent = 'This element causes layout shift!';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
      element.style.height = '200px';
      setTimeout(() => {
        element.remove();
      }, 2000);
    }, 1000);
  };

  return (
    <div>
      <h3>Core Web Vitals Monitor</h3>
      <p>Real-time monitoring of Core Web Vitals performance metrics.</p>
      
      <button 
        onClick={triggerLayoutShift}
        style={{ marginBottom: '20px' }}
      >
        Trigger Layout Shift (for demo)
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {[
          { key: 'lcp', name: 'Largest Contentful Paint', value: webVitals.lcp },
          { key: 'fid', name: 'First Input Delay', value: webVitals.fid },
          { key: 'cls', name: 'Cumulative Layout Shift', value: webVitals.cls },
          { key: 'fcp', name: 'First Contentful Paint', value: webVitals.fcp },
          { key: 'ttfb', name: 'Time to First Byte', value: webVitals.ttfb }
        ].map(({ key, name, value }) => {
          const score = getVitalScore(key, value);
          return (
            <div
              key={key}
              style={{
                padding: '15px',
                border: `2px solid ${getScoreColor(score)}`,
                borderRadius: '8px',
                backgroundColor: 'white',
                textAlign: 'center'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{name}</h4>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: getScoreColor(score),
                marginBottom: '5px'
              }}>
                {key === 'cls' ? (value?.toFixed(3) || '0.000') : formatMetric(value)}
              </div>
              <div style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                color: getScoreColor(score),
                fontWeight: 'bold'
              }}>
                {score.replace('-', ' ')}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Score Thresholds:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div><strong style={{ color: '#0cce6b' }}>Good:</strong> LCP ≤2.5s, FID ≤100ms, CLS ≤0.1</div>
          <div><strong style={{ color: '#ffa400' }}>Needs Improvement:</strong> LCP 2.5-4s, FID 100-300ms, CLS 0.1-0.25</div>
          <div><strong style={{ color: '#ff4e42' }}>Poor:</strong> LCP >4s, FID >300ms, CLS >0.25</div>
        </div>
      </div>
    </div>
  );
}
```

### Resource Performance Tracker

```tsx
import { usePerformanceObserver, useState, useCallback } from 'frosty';

function ResourcePerformanceTracker() {
  const [resourceMetrics, setResourceMetrics] = useState<{
    totalResources: number;
    totalTransferSize: number;
    slowestResource: PerformanceResourceTiming | null;
    fastestResource: PerformanceResourceTiming | null;
    resourcesByType: Record<string, number>;
    recentResources: PerformanceResourceTiming[];
  }>({
    totalResources: 0,
    totalTransferSize: 0,
    slowestResource: null,
    fastestResource: null,
    resourcesByType: {},
    recentResources: []
  });

  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      entries.forEach((entry: PerformanceResourceTiming) => {
        setResourceMetrics(prev => {
          const newSlowest = !prev.slowestResource || entry.duration > prev.slowestResource.duration
            ? entry : prev.slowestResource;
          
          const newFastest = !prev.fastestResource || entry.duration < prev.fastestResource.duration
            ? entry : prev.fastestResource;

          const newResourcesByType = { ...prev.resourcesByType };
          newResourcesByType[entry.initiatorType] = (newResourcesByType[entry.initiatorType] || 0) + 1;

          return {
            totalResources: prev.totalResources + 1,
            totalTransferSize: prev.totalTransferSize + (entry.transferSize || 0),
            slowestResource: newSlowest,
            fastestResource: newFastest,
            resourcesByType: newResourcesByType,
            recentResources: [entry, ...prev.recentResources].slice(0, 10)
          };
        });
      });
    }, []),
    { entryTypes: ['resource'] }
  );

  const loadTestImage = () => {
    const img = new Image();
    img.src = `https://picsum.photos/400/300?random=${Date.now()}`;
    img.onload = () => console.log('Test image loaded');
  };

  const loadTestScript = () => {
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js?v=${Date.now()}`;
    document.head.appendChild(script);
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (duration: number) => {
    return duration < 1000 ? `${duration.toFixed(2)}ms` : `${(duration / 1000).toFixed(2)}s`;
  };

  const getResourceName = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.split('/').pop() || urlObj.hostname;
    } catch {
      return url.split('/').pop() || url;
    }
  };

  return (
    <div>
      <h3>Resource Performance Tracker</h3>
      <p>Monitor loading performance of images, scripts, stylesheets, and other resources.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={loadTestImage} style={{ marginRight: '10px' }}>
          Load Test Image
        </button>
        <button onClick={loadTestScript}>
          Load Test Script
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <h4>Overall Metrics</h4>
          <div><strong>Total Resources:</strong> {resourceMetrics.totalResources}</div>
          <div><strong>Total Transfer Size:</strong> {formatBytes(resourceMetrics.totalTransferSize)}</div>
          <div><strong>Average Size:</strong> {
            resourceMetrics.totalResources > 0 
              ? formatBytes(resourceMetrics.totalTransferSize / resourceMetrics.totalResources)
              : '0 B'
          }</div>
        </div>

        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <h4>Performance Extremes</h4>
          <div style={{ marginBottom: '10px' }}>
            <strong>Slowest Resource:</strong>
            {resourceMetrics.slowestResource ? (
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                {getResourceName(resourceMetrics.slowestResource.name)} - {formatDuration(resourceMetrics.slowestResource.duration)}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#6c757d' }}>None yet</div>
            )}
          </div>
          <div>
            <strong>Fastest Resource:</strong>
            {resourceMetrics.fastestResource ? (
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                {getResourceName(resourceMetrics.fastestResource.name)} - {formatDuration(resourceMetrics.fastestResource.duration)}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#6c757d' }}>None yet</div>
            )}
          </div>
        </div>

        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#e8f5e8'
        }}>
          <h4>Resources by Type</h4>
          {Object.entries(resourceMetrics.resourcesByType).length > 0 ? (
            Object.entries(resourceMetrics.resourcesByType).map(([type, count]) => (
              <div key={type} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{type || 'other'}:</span>
                <span>{count}</span>
              </div>
            ))
          ) : (
            <div style={{ color: '#6c757d', fontSize: '12px' }}>No resources yet</div>
          )}
        </div>
      </div>

      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h4 style={{ 
          margin: 0, 
          padding: '15px', 
          borderBottom: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa'
        }}>
          Recent Resources (Last 10)
        </h4>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {resourceMetrics.recentResources.length > 0 ? (
            resourceMetrics.recentResources.map((resource, index) => (
              <div
                key={index}
                style={{
                  padding: '10px 15px',
                  borderBottom: index < resourceMetrics.recentResources.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {getResourceName(resource.name)}
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '10px',
                  fontSize: '12px',
                  color: '#6c757d'
                }}>
                  <div><strong>Duration:</strong> {formatDuration(resource.duration)}</div>
                  <div><strong>Size:</strong> {formatBytes(resource.transferSize || 0)}</div>
                  <div><strong>Type:</strong> {resource.initiatorType || 'other'}</div>
                  <div><strong>Protocol:</strong> {resource.nextHopProtocol || 'unknown'}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
              No resources loaded yet. Try loading a test image or script above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Long Task Monitor

```tsx
import { usePerformanceObserver, useState, useCallback } from 'frosty';

function LongTaskMonitor() {
  const [longTasks, setLongTasks] = useState<Array<{
    duration: number;
    startTime: number;
    timestamp: Date;
  }>>([]);

  const [taskStats, setTaskStats] = useState({
    total: 0,
    averageDuration: 0,
    longestTask: 0,
    blockedTime: 0
  });

  usePerformanceObserver(
    useCallback((entries: PerformanceEntry[]) => {
      entries.forEach((entry: any) => {
        const taskData = {
          duration: entry.duration,
          startTime: entry.startTime,
          timestamp: new Date()
        };

        setLongTasks(prev => [taskData, ...prev].slice(0, 20));
        
        setTaskStats(prev => {
          const newTotal = prev.total + 1;
          const newBlockedTime = prev.blockedTime + Math.max(0, entry.duration - 50);
          const newAverageDuration = ((prev.averageDuration * prev.total) + entry.duration) / newTotal;
          const newLongestTask = Math.max(prev.longestTask, entry.duration);

          return {
            total: newTotal,
            averageDuration: newAverageDuration,
            longestTask: newLongestTask,
            blockedTime: newBlockedTime
          };
        });
      });
    }, []),
    { entryTypes: ['longtask'] }
  );

  const simulateHeavyTask = () => {
    const start = performance.now();
    // Simulate CPU-intensive work
    while (performance.now() - start < 100 + Math.random() * 200) {
      // Busy wait to block the main thread
      Math.sqrt(Math.random());
    }
  };

  const simulateAsyncHeavyTask = async () => {
    const doWork = () => {
      return new Promise(resolve => {
        const start = performance.now();
        const work = () => {
          if (performance.now() - start < 80) {
            // Do some work, then yield
            for (let i = 0; i < 100000; i++) {
              Math.sqrt(Math.random());
            }
            setTimeout(work, 0); // Yield to browser
          } else {
            resolve(void 0);
          }
        };
        work();
      });
    };

    await doWork();
  };

  const getTaskSeverity = (duration: number) => {
    if (duration < 100) return { level: 'warning', color: '#ffc107' };
    if (duration < 200) return { level: 'concerning', color: '#fd7e14' };
    return { level: 'critical', color: '#dc3545' };
  };

  const formatDuration = (duration: number) => {
    return `${duration.toFixed(2)}ms`;
  };

  return (
    <div>
      <h3>Long Task Monitor</h3>
      <p>Monitor main thread blocking tasks (>50ms) that can cause janky user interactions.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={simulateHeavyTask} style={{ marginRight: '10px' }}>
          Simulate Heavy Task (Blocking)
        </button>
        <button onClick={simulateAsyncHeavyTask}>
          Simulate Async Heavy Task (Non-blocking)
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#fff3e0',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Long Tasks</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{taskStats.total}</div>
        </div>

        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Average Duration</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatDuration(taskStats.averageDuration)}
          </div>
        </div>

        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#ffebee',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Longest Task</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatDuration(taskStats.longestTask)}
          </div>
        </div>

        <div style={{
          padding: '15px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Blocked Time</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatDuration(taskStats.blockedTime)}
          </div>
        </div>
      </div>

      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h4 style={{ 
          margin: 0, 
          padding: '15px', 
          borderBottom: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa'
        }}>
          Recent Long Tasks (Last 20)
        </h4>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {longTasks.length > 0 ? (
            longTasks.map((task, index) => {
              const severity = getTaskSeverity(task.duration);
              return (
                <div
                  key={index}
                  style={{
                    padding: '12px 15px',
                    borderBottom: index < longTasks.length - 1 ? '1px solid #eee' : 'none',
                    borderLeft: `4px solid ${severity.color}`
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '5px'
                  }}>
                    <span style={{ fontWeight: 'bold', color: severity.color }}>
                      {formatDuration(task.duration)} ({severity.level})
                    </span>
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>
                      {task.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    <span>Start: {formatDuration(task.startTime)}</span>
                    <span style={{ marginLeft: '15px' }}>
                      Blocked Time: {formatDuration(Math.max(0, task.duration - 50))}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
              No long tasks detected yet. Try running a heavy task above to see monitoring in action.
            </div>
          )}
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Long Task Impact:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>50-100ms:</strong> May cause slight jankiness in animations</li>
          <li><strong>100-200ms:</strong> Noticeable delays in user interactions</li>
          <li><strong>200ms+:</strong> Significant performance issues, users will notice</li>
        </ul>
        <p style={{ margin: 0 }}>
          <strong>Tip:</strong> Break up long tasks using setTimeout, requestIdleCallback, or Web Workers.
        </p>
      </div>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Chrome 52+, Firefox 57+, Safari 11+
- **Limited IE Support**: Not supported in Internet Explorer
- **Entry Type Availability**: Different entry types have varying support levels

## Common Use Cases

- **Performance Monitoring**: Track Core Web Vitals and performance metrics
- **Resource Optimization**: Identify slow-loading resources and bottlenecks
- **User Experience**: Monitor long tasks that block user interactions
- **Analytics**: Collect real user monitoring (RUM) data
- **Debugging**: Identify performance regressions during development
- **A/B Testing**: Compare performance between different implementations

## Performance Considerations

- **Observer Overhead**: Performance Observer itself has minimal performance impact
- **Entry Buffering**: Use buffered entries to capture data from before observer creation
- **Memory Management**: Limit stored entries to prevent memory leaks
- **Selective Monitoring**: Only observe needed entry types to reduce callback frequency

## Notes

- **Timing Origin**: All timing values are relative to the navigation start
- **Precision**: Timing values may be rounded for security reasons (timing attacks)
- **Cross-Origin**: Some timing information is restricted for cross-origin resources
- **Passive Collection**: Performance data is collected automatically by the browser

## See Also

- [useMutationObserver](./useMutationObserver.md) – Observe DOM changes that might affect performance.
- [useIntersectionObserver](./useIntersectionObserver.md) – Monitor element visibility for lazy loading optimization.
- [useEffect](./useEffect.md) – Run performance monitoring side effects.
