# useColorScheme

The `useColorScheme` hook allows you to detect and respond to the user's system color scheme preference (light or dark mode). This is useful for implementing theme switching in your application.

## Features

- **Real-time Detection**: Automatically detects the user's preferred color scheme
- **Responsive**: Updates when the user changes their system preference
- **Server-Safe**: Falls back to a default value on the server
- **Customizable**: Allows specifying a default scheme

## Usage

```tsx
import { useColorScheme } from 'frosty/web';

function ThemeAwareComponent() {
  const colorScheme = useColorScheme();
  
  return (
    <div className={`container ${colorScheme}`}>
      <p>Current color scheme: {colorScheme}</p>
      {colorScheme === 'dark' && (
        <p>Dark mode is active!</p>
      )}
    </div>
  );
}
```

## Parameters

1. **`defaultScheme`** _(optional)_: `'light' | 'dark'`  
   The default color scheme to use when the system preference cannot be determined (e.g., on the server). Defaults to `'light'`

## Returns

- **`colorScheme`**: `'light' | 'dark'`  
  A string representing the current color scheme preference.

## Example

### With Custom Default

```tsx
import { useColorScheme } from 'frosty/web';

function DarkModePreferred() {
  const colorScheme = useColorScheme('dark');
  
  return (
    <div className={`theme-${colorScheme}`}>
      <h1>Welcome to {colorScheme} mode</h1>
      <p>This component defaults to dark mode when system preference is unavailable.</p>
    </div>
  );
}
```

### Implementing Theme Switching

```tsx
import { useColorScheme } from 'frosty/web';
import { useState, useEffect } from 'frosty';

function ThemeSwitcher() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme);
  
  // Update theme when system preference changes
  useEffect(() => {
    setTheme(systemColorScheme);
  }, [systemColorScheme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`app-container theme-${theme}`}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
      <p>System preference: {systemColorScheme}</p>
    </div>
  );
}
```

## Notes

- The hook uses the `prefers-color-scheme` media query internally to detect the system preference.
- The hook will return the default value on the server or in environments where `prefers-color-scheme` is not supported.
- For optimal user experience, consider respecting the user's system preference by default and providing an option to override it.

## See Also

- useVisibility – For tracking document visibility state
- useDocument – For accessing the document object
- useSyncExternalStore – For subscribing to external data sources
- useWindow – For accessing the window object