# Frosty Overview

Welcome to Frosty's documentation! This page provides a high-le vel summary of the available hooks, web hooks, and built-in components to help you build modern, flexible UIs with ease.

## Styling

Frosty provides powerful and flexible styling capabilities through multiple approaches:

- **className** - Apply CSS classes with support for arrays and conditional logic
- **style** - CSS-in-JS with automatic processing and caching
- **inlineStyle** - Direct inline CSS for specific overrides

See the [Styling Guide](./STYLING.md) for comprehensive documentation and examples.

## Core Hooks

Frosty offers a comprehensive set of hooks for managing state, side effects, and more:

- [useAnimate](./hooks/useAnimate.md) – Animate values or components over time.
- [useAwaited](./hooks/useAwaited.md) – Handle promises and async effects in components.
- [useCallback](./hooks/useCallback.md) – Memoize callback functions between renders.
- [useContext](./hooks/useContext.md) – Access values from a context.
- [useDebounce](./hooks/useDebounce.md) – Debounce functions to limit their execution rate.
- [useEffect](./hooks/useEffect.md) – Run side effects after render.
- [useInterval](./hooks/useInterval.md) – Set up intervals in components.
- [useIterableResource](./hooks/useResource.md#useiterableresource) – Fetch and cache async iterable resources.
- [useMemo](./hooks/useMemo.md) – Memoize expensive calculations.
- [useReducer](./hooks/useReducer.md) – Manage complex state logic with reducers.
- [useRef](./hooks/useRef.md) – Access mutable values that persist across renders.
- [useRefHandle](./hooks/useRefHandle.md) – Expose imperative methods to parent components.
- [useRendererStorage](./hooks/useRendererStorage.md) – Store values tied to the renderer lifecycle.
- [useResource](./hooks/useResource.md) – Fetch and cache async resources.
- [useResourceErrors](./hooks/useResourceErrors.md) – Track errors from resource hooks.
- [useStack](./hooks/useStack.md) – Retrieves the stack of parent components from the current hook state.
- [useState](./hooks/useState.md) – Manage local component state.
- [useStore](./hooks/useStore.md) – Bind to external store/state.
- [useSyncExternalStore](./hooks/useSyncExternalStore.md) – Subscribe to external data sources.

## Web-Specific Hooks

Enhance your web applications with hooks for browser APIs and platform features:

- [useColorScheme](./hooks/useColorScheme.md) – Detect system color scheme (light/dark).
- [useDocument](./hooks/useDocument.md) – Access the current document object.
- [useIntersectionObserver](./hooks/useIntersectionObserver.md) – Observe element visibility in viewport.
- [useLocalStorage](./hooks/useLocalStorage.md) – Sync state with localStorage.
- [useLocation](./hooks/useLocation.md) – Access and manipulate the browser location.
- [useMutationObserver](./hooks/useMutationObserver.md) – Observe DOM mutations.
- [useOnline](./hooks/useOnline.md) – Detect online/offline status.
- [usePerformanceObserver](./hooks/usePerformanceObserver.md) – Observe performance metrics.
- [useResizeObserver](./hooks/useResizeObserver.md) – Observe element size changes.
- [useSearchParams](./hooks/useSearchParams.md) – Manage URL query parameters.
- [useServerResource](./hooks/useServerResource.md) – Fetch server-side resources.
- [useSessionStorage](./hooks/useSessionStorage.md) – Sync state with sessionStorage.
- [useVisibility](./hooks/useVisibility.md) – Track document visibility state.
- [useVisualViewportMetrics](./hooks/useVisualViewportMetrics.md) – Get visual viewport metrics.
- [useWindow](./hooks/useWindow.md) – Access the window object.
- [useWindowMetrics](./hooks/useWindowMetrics.md) – Get window size and metrics.
- [useWindowScroll](./hooks/useWindowScroll.md) – Track window scroll position.

## Built-in Components

Frosty includes several components to simplify error handling and prop management:

- [ErrorBoundary](./components/ErrorBoundary.md) – Catch and handle errors in the component tree.
- [PropsProvider](./components/PropsProvider.md) – Inject or override props for child components.
- [ResourceErrors](./hooks/useResourceErrors.md) – Hook for managing errors from async resources and providing error boundaries.

---

For detailed usage and API documentation, see the individual pages linked above or visit the [API Reference](./API_REFERENCE.md).