# useContext

The `useContext` hook allows you to access the value of a context in functional components. It simplifies consuming context values without needing to wrap components with a `Context.Consumer`.

## Features

- Access context values directly in functional components.
- Simplifies working with context compared to `Context.Consumer`.
- Supports dynamic context updates.

## Usage

```tsx
import { useContext } from 'frosty';
import { ThemeContext } from './ThemeContext';

function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.color }}>
      This component is styled using the theme context!
    </div>
  );
}
```

## Parameters

1. **Context**: `Context<T>`  
   The context object created by `createContext`. The hook will return the current value of this context

## Returns

- **`value`**: `T`  
  The current value of the context. This value is determined by the nearest `Context.Provider` above the component in the tree. If no provider is found, the default value passed to `createContext` is returned.

## Example

### Basic Example

```tsx
import { useContext } from 'frosty';
import { UserContext } from './UserContext';

function UserProfile() {
  const user = useContext(UserContext);

  if (!user) {
    return <div>No user logged in.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Nested Contexts

```tsx
import { useContext } from 'frosty';
import { ThemeContext } from './ThemeContext';
import { LanguageContext } from './LanguageContext';

function MultiContextComponent() {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return (
    <div style={{ background: theme.background, color: theme.color }}>
      <p>The current language is: {language}</p>
    </div>
  );
}
```

### Default Value Example

```tsx
import { useContext } from 'frosty/web';
import { createContext } from 'frosty';

const DefaultContext = createContext('Default Value');

function DefaultValueComponent() {
  const value = useContext(DefaultContext);

  return <div>Context Value: {value}</div>;
}
```

## Notes

- Ensure that a `Context.Provider` is present in the component tree to provide a value; otherwise, the default value will be used.
- Avoid overusing context for state management. For complex state, consider using a state management library.
- Context updates trigger re-renders for all components consuming the context. Optimize performance by splitting contexts if necessary.

## See Also

- [useReducer](./useReducer.md) – For managing complex state logic.
- [useState](./useState.md) – For managing local state in functional components.