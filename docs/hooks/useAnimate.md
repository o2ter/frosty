# `useAnimate` Hook

The `useAnimate` hook provides powerful animation capabilities for numeric values, allowing you to smoothly transition between different values over time with customizable easing functions and timing controls.

## Features

- **Smooth Animations**: Animate numeric values with configurable duration and easing.
- **Interpolation**: Transform animated values using input/output ranges.
- **Animation Control**: Start, stop, and configure animations programmatically.
- **Custom Easing**: Apply custom easing functions for different animation curves.
- **Completion Callbacks**: Execute code when animations complete or are interrupted.

## Usage

```tsx
import { useAnimate } from 'frosty';

function AnimatedComponent() {
  const animation = useAnimate(0);

  const startAnimation = () => {
    animation.start({
      toValue: 100,
      duration: 1000,
      easing: (t) => t * t, // Ease-in quadratic
      onCompleted: ({ finished }) => {
        console.log(finished ? 'Animation completed' : 'Animation stopped');
      }
    });
  };

  return (
    <div>
      <div style={{ width: animation.value }}>
        Animated width: {animation.value}px
      </div>
      <button onClick={startAnimation}>Start Animation</button>
      <button onClick={animation.stop}>Stop Animation</button>
    </div>
  );
}
```

## Parameters

- **initialValue**: `number` - The starting value for the animation.

## Returns

An object containing:

- **value**: `number` - The current animated value.
- **start**: `(options: AnimateOptions) => void` - Function to start an animation.
- **stop**: `() => void` - Function to stop the current animation.
- **interpolate**: `(options: InterpolateOptions) => AnimatedInterpolation` - Function to interpolate the current value.

## Animation Options

The `start` function accepts an `AnimateOptions` object:

- **toValue**: `number` - The target value for the animation.
- **duration**: `number` - Duration in milliseconds.
- **fromValue?**: `number` - Starting value (defaults to current value).
- **easing?**: `(t: number) => number` - Easing function (defaults to linear).
- **delay?**: `number` - Delay before starting in milliseconds (defaults to 0).
- **onCompleted?**: `(result: { value: number; finished: boolean }) => void` - Completion callback.

## Interpolation

Transform animated values to different ranges:

```tsx
function InterpolatedAnimation() {
  const animation = useAnimate(0);
  
  // Interpolate from 0-100 to 0-360 for rotation
  const rotation = animation.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 360]
  });

  return (
    <div style={{ transform: `rotate(${rotation.value}deg)` }}>
      Rotating Element
    </div>
  );
}
```

## Examples

### Basic Animation

```tsx
function BasicAnimation() {
  const animation = useAnimate(0);

  return (
    <div>
      <div style={{ opacity: animation.value / 100 }}>
        Fading Element
      </div>
      <button onClick={() => animation.start({ toValue: 100, duration: 500 })}>
        Fade In
      </button>
    </div>
  );
}
```

### Custom Easing

```tsx
function EasedAnimation() {
  const animation = useAnimate(0);

  const easeInOut = (t: number) => 
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  return (
    <button onClick={() => animation.start({
      toValue: 200,
      duration: 1000,
      easing: easeInOut
    })}>
      Smooth Animation
    </button>
  );
}
```

### Chained Animations

```tsx
function ChainedAnimations() {
  const animation = useAnimate(0);

  const startSequence = () => {
    animation.start({
      toValue: 100,
      duration: 500,
      onCompleted: ({ finished }) => {
        if (finished) {
          animation.start({
            toValue: 0,
            duration: 500
          });
        }
      }
    });
  };

  return <button onClick={startSequence}>Start Sequence</button>;
}
```

## Notes

- Animations run at approximately 60fps (16ms intervals).
- Stopping an animation will trigger the `onCompleted` callback with `finished: false`.
- Multiple calls to `start` will stop the previous animation before starting the new one.
- The easing function receives a value between 0 and 1 and should return a value between 0 and 1.

## See Also

- [useInterval](./useInterval.md) – Set up intervals in components.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
