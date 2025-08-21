# Frosty Documentation

Welcome to the comprehensive documentation for Frosty - a fast, flexible, and modern JSX-based UI library designed for building reactive applications with exceptional performance and developer experience.

## Quick Navigation

### 📚 Essential Guides
- **[Quick Start](../README.md)** - Get up and running with Frosty
- **[Architecture Overview](./contribution/ARCHITECTURE.md)** - Understand Frosty's design and principles
- **[Core Concepts](./contribution/CORE_CONCEPTS.md)** - Learn fundamental concepts and patterns
- **[Project Structure](./contribution/PROJECT_STRUCTURE.md)** - Explore the codebase organization
- **[Development Guide](./contribution/DEVELOPMENT.md)** - Contributing and development workflow
- **[API Reference](./contribution/API_REFERENCE.md)** - Complete API documentation

### 🛠️ Development Tools
- **[CLI Documentation](./CLI.md)** - Command-line interface and build tools
- **[Style Guide](./contribution/STYLE_GUIDE.md)** - Coding standards and conventions
- **[Comparison Guide](./contribution/COMPARISON.md)** - Compare Frosty with other libraries

## Core Hooks

Frosty provides a comprehensive set of hooks for state management, side effects, and component lifecycle:

### State Management
- **[useState](./hooks/useState.md)** – Manage local component state
- **[useReducer](./hooks/useReducer.md)** – Complex state logic with reducers
- **[useStore](./hooks/useStore.md)** – External store integration
- **[useSyncExternalStore](./hooks/useSyncExternalStore.md)** – Subscribe to external data sources

### Side Effects & Lifecycle
- **[useEffect](./hooks/useEffect.md)** – Run side effects after render
- **[useCallback](./hooks/useCallback.md)** – Memoize callback functions
- **[useMemo](./hooks/useMemo.md)** – Memoize expensive calculations
- **[useInterval](./hooks/useInterval.md)** – Set up intervals in components

### References & Context
- **[useRef](./hooks/useRef.md)** – Access mutable values that persist across renders
- **[useRefHandle](./hooks/useRefHandle.md)** – Expose imperative methods to parent components
- **[useContext](./hooks/useContext.md)** – Access context values
- **[useStack](./hooks/useStack.md)** – Access the component stack

### Async Operations
- **[useAwaited](./hooks/useAwaited.md)** – Handle promises and async effects
- **[useResource](./hooks/useResource.md)** – Fetch and cache async resources
- **[useDebounce](./hooks/useDebounce.md)** – Debounce functions to limit execution rate
- **[useAnimate](./hooks/useAnimate.md)** – Animate values or components over time

### Utility Hooks
- **[useRendererStorage](./hooks/useRendererStorage.md)** – Store values tied to the renderer lifecycle

## Web Platform Hooks

Browser-specific hooks for web applications:

### DOM & Document
- **[useDocument](./hooks/useDocument.md)** – Access the current document object
- **[useWindow](./hooks/useWindow.md)** – Access the window object
- **[useWindowMetrics](./hooks/useWindowMetrics.md)** – Get window size and metrics
- **[useWindowScroll](./hooks/useWindowScroll.md)** – Track window scroll position

### Storage & Persistence
- **[useLocalStorage](./hooks/useLocalStorage.md)** – Sync state with localStorage
- **[useSessionStorage](./hooks/useSessionStorage.md)** – Sync state with sessionStorage

### Navigation & Routing
- **[useLocation](./hooks/useLocation.md)** – Access and manipulate browser location
- **[useSearchParams](./hooks/useSearchParams.md)** – Manage URL query parameters

### Observers & Monitoring
- **[useIntersectionObserver](./hooks/useIntersectionObserver.md)** – Observe element visibility
- **[useResizeObserver](./hooks/useResizeObserver.md)** – Observe element size changes
- **[useMutationObserver](./hooks/useMutationObserver.md)** – Observe DOM mutations
- **[usePerformanceObserver](./hooks/usePerformanceObserver.md)** – Monitor performance metrics

### Browser APIs
- **[useOnline](./hooks/useOnline.md)** – Detect online/offline status
- **[useVisibility](./hooks/useVisibility.md)** – Track document visibility state
- **[useColorScheme](./hooks/useColorScheme.md)** – Detect system color scheme
- **[useVisualViewportMetrics](./hooks/useVisualViewportMetrics.md)** – Get visual viewport metrics

### Server Integration
- **[useServerResource](./hooks/useServerResource.md)** – Fetch server-side resources

## Built-in Components

Core components for error handling and prop management:

- **[ErrorBoundary](./components/ErrorBoundary.md)** – Catch and handle errors in the component tree
- **[PropsProvider](./components/PropsProvider.md)** – Inject or override props for child components

## Architecture Overview

Frosty is built with a layered architecture that promotes modularity, performance, and extensibility:

### Core Layer
- **Reconciliation Engine**: Virtual node management and efficient diffing
- **Hook System**: Comprehensive state management and lifecycle hooks
- **Component System**: Flexible component model with TypeScript support
- **Context System**: Data sharing across component trees

### Renderer Layer
- **DOM Renderer**: Browser DOM manipulation and event handling
- **Server Renderer**: Server-side rendering with JSDOM
- **Native Renderer**: Platform-specific rendering capabilities
- **Style System**: CSS processing and styling utilities

### Web Layer
- **Browser APIs**: Direct access to web platform features
- **Storage Integration**: localStorage and sessionStorage synchronization
- **Observer APIs**: Intersection, resize, and mutation observers
- **Performance Monitoring**: Built-in performance tracking

### CLI Layer
- **Build System**: Webpack-based bundling with hot-reloading
- **Development Server**: Local development environment
- **Configuration**: Flexible build and deployment configuration

## Key Features

### 🚀 Performance Optimized
- Efficient reconciliation with minimal re-renders
- Myers algorithm for optimal tree diffing
- Automatic batching of state updates
- Lazy component loading and code splitting

### 🎯 Developer Experience
- Comprehensive TypeScript support
- Rich development tools and debugging
- Hot-reloading development server
- Extensive hook library

### 🔧 Flexible Architecture
- Multiple renderer targets (DOM, Server, Native)
- Extensible hook system
- Plugin-based build system
- Modular component design

### 🌐 Modern Web Platform
- Server-side rendering support
- Progressive Web App features
- Modern JavaScript and CSS support
- Accessibility built-in

## Getting Started

1. **Installation**: Install Frosty using npm or yarn
2. **Quick Start**: Follow the quick start guide to create your first application
3. **Core Concepts**: Learn the fundamental concepts and patterns
4. **API Reference**: Explore the complete API documentation
5. **Examples**: Check out example applications and use cases

## Community & Support

- **GitHub Repository**: [o2ter/frosty](https://github.com/o2ter/frosty)
- **Issue Tracking**: Report bugs and request features
- **Discussions**: Community discussions and questions
- **Contributing**: Guidelines for contributing to the project

---

This documentation provides comprehensive coverage of Frosty's features and capabilities. Whether you're just getting started or diving deep into advanced usage patterns, you'll find the information you need to build exceptional user interfaces with Frosty.