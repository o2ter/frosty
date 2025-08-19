# `useMemo` Hook

The `useMemo` hook is used to memoize the result of an expensive calculation, ensuring that it is only recalculated when its dependencies change. This can significantly improve performance by preventing unnecessary computations on every render.

## Features

- **Memoization**: Caches the result of expensive calculations between renders.
- **Performance Optimization**: Prevents unnecessary recalculations when dependencies haven't changed.
- **Dependency Tracking**: Automatically recalculates when specified dependencies change.
- **Flexible Dependencies**: Supports any type of dependency values for comparison.

## Usage

```tsx
import { useMemo, useState } from 'frosty';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const expensiveValue = useMemo(() => {
    // Simulate expensive calculation
    console.log('Calculating expensive value...');
    return count * multiplier * Math.random();
  }, [count, multiplier]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
    </div>
  );
}
```

## Parameters

1. **Factory Function**: `() => T` - A function that returns the value to be memoized.
2. **Dependencies**: `any[]` - An array of values that the memoized value depends on. The value will be recalculated only when one of these dependencies changes.

## Returns

The `useMemo` hook returns the memoized value of type `T` returned by the factory function.

## Examples

### Basic Memoization

```tsx
import { useMemo, useState } from 'frosty';

function FilteredList() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Complex Object Memoization

```tsx
import { useMemo, useState } from 'frosty';

function UserProfile() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  const [theme, setTheme] = useState('light');

  const userDisplayInfo = useMemo(() => {
    return {
      displayName: user.name.toUpperCase(),
      ageGroup: user.age < 18 ? 'minor' : 'adult',
      formattedAge: `${user.age} years old`,
      themeClass: `user-profile-${theme}`
    };
  }, [user.name, user.age, theme]);

  return (
    <div className={userDisplayInfo.themeClass}>
      <h1>{userDisplayInfo.displayName}</h1>
      <p>Age Group: {userDisplayInfo.ageGroup}</p>
      <p>{userDisplayInfo.formattedAge}</p>
    </div>
  );
}
```

### Expensive Computation

```tsx
import { useMemo, useState } from 'frosty';

function PrimeCalculator() {
  const [number, setNumber] = useState(10);

  const primes = useMemo(() => {
    const sieveOfEratosthenes = (max: number) => {
      const primes = [];
      const isPrime = new Array(max + 1).fill(true);
      isPrime[0] = isPrime[1] = false;

      for (let i = 2; i <= max; i++) {
        if (isPrime[i]) {
          primes.push(i);
          for (let j = i * i; j <= max; j += i) {
            isPrime[j] = false;
          }
        }
      }
      return primes;
    };

    return sieveOfEratosthenes(number);
  }, [number]);

  return (
    <div>
      <input 
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
        min="0"
        max="1000"
      />
      <p>Prime numbers up to {number}: {primes.join(', ')}</p>
    </div>
  );
}
```

### Memoizing with External Dependencies

```tsx
import { useMemo, useState, useEffect } from 'frosty';

function DataProcessor({ apiData }) {
  const [sortOrder, setSortOrder] = useState('asc');

  const processedData = useMemo(() => {
    if (!apiData) return [];

    return apiData
      .filter(item => item.active)
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? comparison : -comparison;
      })
      .map(item => ({
        ...item,
        displayName: `${item.name} (${item.category})`
      }));
  }, [apiData, sortOrder]);

  return (
    <div>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      {processedData.map(item => (
        <div key={item.id}>{item.displayName}</div>
      ))}
    </div>
  );
}
```

## Best Practices

### When to Use `useMemo`

- **Expensive Calculations**: Use for computationally expensive operations that don't need to run on every render.
- **Complex Object Creation**: When creating objects or arrays that are passed as props to child components.
- **Derived State**: For calculating values derived from props or state that involve non-trivial logic.

### When NOT to Use `useMemo`

- **Simple Calculations**: Don't use for simple operations that are already fast.
- **Always Changing Dependencies**: If dependencies change on every render, memoization provides no benefit.
- **Premature Optimization**: Only use when you've identified an actual performance issue.

## Notes

- **Dependency Comparison**: Dependencies are compared using shallow equality (Object.is).
- **Initial Calculation**: The factory function runs once on the first render, regardless of dependencies.
- **Memory Trade-off**: Memoization uses memory to store cached values, so use judiciously.
- **Referential Equality**: Memoized objects maintain referential equality when dependencies haven't changed.

## See Also

- [useCallback](./useCallback.md) – Memoize callback functions between renders.
- [useState](./useState.md) – Manage local component state.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
