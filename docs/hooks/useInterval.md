# useInterval

The `useInterval` hook provides a declarative way to set up intervals in functional components. It automatically manages the interval lifecycle, ensuring proper cleanup when the component unmounts or when the interval changes.

## Features

- **Declarative Intervals**: Set up intervals using a simple hook interface
- **Automatic Cleanup**: Intervals are automatically cleared when the component unmounts
- **Conditional Intervals**: Easily start and stop intervals by passing `undefined` for the delay
- **Component Integration**: Works seamlessly with React's component lifecycle

## Usage

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setSeconds(seconds => seconds + 1);
  }, isRunning ? 1000 : undefined);

  return (
    <div>
      <h1>Timer: {seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
```

## Parameters

1. **callback**: `() => void` - The function to be executed at each interval.
2. **ms**: `number | undefined` - The delay in milliseconds between each execution. If `undefined`, no interval is set.

## Returns

`void` - This hook doesn't return any value.

## Examples

### Basic Counter

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function Counter() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count => count + 1);
  }, 1000);

  return <h1>Count: {count}</h1>;
}
```

### Conditional Interval

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function ConditionalTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useInterval(() => {
    setTime(time => time + 1);
  }, isActive ? 100 : undefined); // Only run when active

  return (
    <div>
      <h1>Time: {(time / 10).toFixed(1)}s</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setTime(0)}>Reset</button>
    </div>
  );
}
```

### Data Polling

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function DataPoller() {
  const [data, setData] = useState(null);
  const [isPolling, setIsPolling] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useInterval(() => {
    fetchData();
  }, isPolling ? 5000 : undefined); // Poll every 5 seconds

  return (
    <div>
      <h2>Live Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => setIsPolling(!isPolling)}>
        {isPolling ? 'Stop Polling' : 'Start Polling'}
      </button>
      <button onClick={fetchData}>Fetch Now</button>
    </div>
  );
}
```

### Clock Component

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function Clock() {
  const [time, setTime] = useState(new Date());

  useInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
      <p>{time.toLocaleDateString()}</p>
    </div>
  );
}
```

### Animation Frame Counter

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function AnimationDemo() {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useInterval(() => {
    setPosition(pos => (pos + 1) % 200);
  }, isAnimating ? 16 : undefined); // ~60fps

  return (
    <div>
      <div 
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          transform: `translateX(${position}px)`,
          transition: 'none'
        }}
      />
      <button onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? 'Stop' : 'Start'} Animation
      </button>
    </div>
  );
}
```

### Multiple Intervals

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function MultipleTimers() {
  const [fastCount, setFastCount] = useState(0);
  const [slowCount, setSlowCount] = useState(0);

  // Fast interval (100ms)
  useInterval(() => {
    setFastCount(count => count + 1);
  }, 100);

  // Slow interval (2000ms)
  useInterval(() => {
    setSlowCount(count => count + 1);
  }, 2000);

  return (
    <div>
      <h2>Fast Counter: {fastCount}</h2>
      <h2>Slow Counter: {slowCount}</h2>
    </div>
  );
}
```

### Countdown Timer

```tsx
import { useInterval } from 'frosty';
import { useState } from 'frosty';

function CountdownTimer({ initialTime = 60 }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useInterval(() => {
    setTimeLeft(time => {
      if (time <= 1) {
        setIsActive(false);
        return 0;
      }
      return time - 1;
    });
  }, isActive && timeLeft > 0 ? 1000 : undefined);

  const reset = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
      {timeLeft === 0 && <p>Time's up!</p>}
    </div>
  );
}
```

## Common Patterns

### Start/Stop Pattern

```tsx
const [isRunning, setIsRunning] = useState(false);

useInterval(() => {
  // Your interval logic
}, isRunning ? 1000 : undefined);
```

### Variable Interval

```tsx
const [speed, setSpeed] = useState(1000);

useInterval(() => {
  // Your interval logic
}, speed);
```

### Cleanup on Condition

```tsx
const [shouldStop, setShouldStop] = useState(false);

useInterval(() => {
  // Your interval logic
  if (someCondition) {
    setShouldStop(true);
  }
}, shouldStop ? undefined : 1000);
```

## Notes

- **Automatic Cleanup**: The interval is automatically cleared when the component unmounts
- **Dependency Array**: The hook uses an empty dependency array, so the callback should use functional state updates or handle its own dependencies
- **Performance**: Be mindful of interval frequency to avoid performance issues
- **Conditional Execution**: Pass `undefined` as the delay to temporarily disable the interval

## Best Practices

- **Use Functional Updates**: When updating state based on previous state, use functional updates to avoid stale closures
- **Memory Leaks**: The hook automatically prevents memory leaks by cleaning up intervals
- **Performance**: Use reasonable intervals - very short intervals (< 16ms) might impact performance
- **Conditional Logic**: Prefer disabling intervals with `undefined` rather than adding conditions inside the callback

## See Also

- [useAnimate](./useAnimate.md) – Animate values or components over time.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
- [useState](./useState.md) – Manage local component state.
