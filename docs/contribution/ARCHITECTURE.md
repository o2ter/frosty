# Frosty Architecture

Frosty is a modern, fast, and flexible JSX-based UI library designed for building reactive applications with an emphasis on performance and developer experience. This document provides an in-depth look at Frosty's architecture and design principles.

## Overview

Frosty follows a component-based architecture with its own reconciliation engine, renderer system, and hooks implementation. The library is built with TypeScript and supports both client-side and server-side rendering.

## Core Principles

- **Performance First**: Optimized reconciliation and minimal re-renders
- **Type Safety**: Built with TypeScript for better developer experience
- **Flexibility**: Multiple renderer targets (DOM, Native, Server)
- **Modern Hooks API**: Comprehensive set of hooks for state and lifecycle management
- **SSR Ready**: Built-in server-side rendering capabilities

## Architecture Layers

### 1. Core Layer (`src/core/`)

The foundation of Frosty containing the reconciliation engine, hooks system, and type definitions.

#### Components:
- **Reconciler** (`reconciler/`): Virtual node management and diffing algorithm
- **Hooks** (`hooks/`): State management and lifecycle hooks
- **Types** (`types/`): TypeScript definitions for components and runtime
- **Renderer** (`renderer.ts`): Abstract renderer base class
- **Utils** (`utils.ts`): Utility functions and helpers

### 2. Renderer Layer (`src/renderer/`)

Platform-specific rendering implementations.

#### Components:
- **DOM Renderer** (`dom.ts`): Browser DOM rendering
- **Server DOM Renderer** (`server-dom.ts`): Server-side rendering with JSDOM
- **Native Renderer** (`native.ts`): Native platform rendering
- **Common** (`common/`): Shared DOM renderer functionality
- **Style System** (`style.ts`): CSS processing and styling

### 3. Web Layer (`src/web/`)

Browser-specific APIs and hooks for web applications.

#### Components:
- **DOM Hooks**: Document, window, and browser API access
- **Storage Hooks**: LocalStorage and SessionStorage integration
- **Observer Hooks**: Intersection, Mutation, and Resize observers
- **Location & Navigation**: Browser routing and navigation
- **Performance & Metrics**: Performance monitoring hooks

### 4. CLI Layer (`packages/frosty-cli/`)

Development tools and build system for Frosty applications.

#### Components:
- **Build System**: Webpack-based bundler with Babel transpilation
- **Development Server**: Hot-reloading development environment
- **Configuration**: Flexible build configuration system

## Key Concepts

### Virtual Nodes (VNodes)

Frosty uses a virtual node system with its own implementation:

```typescript
// VNode represents a component in the virtual tree
class VNode {
  _component: ComponentNode;
  _children: (VNode | string)[];
  _props: any;
  _state?: VNodeState[];
  _dirty: boolean;
  // ... other properties
}
```

### Reconciliation Engine

The reconciler manages the virtual node tree and determines what changes need to be made:

1. **Build Phase**: Creates VNode tree from components
2. **Diff Phase**: Compares new tree with previous tree
3. **Commit Phase**: Applies changes to the actual DOM

### Hook System

Frosty implements a comprehensive hooks system for state management:

- **State Hooks**: `useState`, `useReducer`, `useStore`
- **Effect Hooks**: `useEffect`, `useCallback`, `useMemo`
- **Context Hooks**: `useContext`, `createContext`
- **Resource Hooks**: `useResource`, `useAwaited`
- **Web Hooks**: `useDocument`, `useWindow`, `useLocalStorage`

### Renderer Architecture

The renderer system is designed to be platform-agnostic:

```typescript
abstract class _Renderer<T> {
  protected abstract _createElement(node: VNode, stack: VNode[]): T;
  protected abstract _updateElement(node: VNode, element: T, stack: VNode[]): void;
  protected abstract _destroyElement(node: VNode, element: T): void;
  protected abstract _replaceChildren(node: VNode, element: T, children: (T | string)[], stack: VNode[], force?: boolean): void;
}
```

### Context System

Frosty provides a context system for passing data through the component tree:

- **Context Creation**: `createContext()` for creating context objects
- **Context Providers**: Components that provide context values
- **Context Consumers**: Hooks that consume context values

### Error Boundaries

Built-in error handling with ErrorBoundary components:

- **Error Catching**: Catches errors in child components
- **Error Recovery**: Provides fallback UI
- **Error Reporting**: Customizable error reporting

## Data Flow

1. **Component Definition**: JSX components are defined using function components or classes
2. **Virtual Tree Creation**: Components are converted to VNodes
3. **Reconciliation**: Changes are calculated using a diffing algorithm
4. **Rendering**: Platform-specific renderers apply changes
5. **Event Handling**: User interactions trigger state updates
6. **Re-rendering**: State changes trigger new reconciliation cycles

## Performance Optimizations

### Efficient Diffing
- Myers algorithm for optimal tree diffing
- Minimal DOM manipulations
- Key-based reconciliation for lists

### Memoization
- Component memoization with dependency tracking
- Hook memoization (`useMemo`, `useCallback`)
- Context value optimization

### Lazy Evaluation
- Lazy component loading
- Conditional rendering optimizations
- Resource loading on demand

## Module System

Frosty uses a modular architecture with clear separation of concerns:

```
frosty/
├── core/           # Core reconciliation and hooks
├── renderer/       # Platform renderers
├── web/           # Web-specific functionality
├── packages/      # Additional packages (CLI)
└── generated/     # Generated type definitions
```

## Build System

The build system uses modern tools:

- **TypeScript**: Type checking and compilation
- **Rollup**: Library bundling
- **Webpack**: Application bundling (CLI)
- **Babel**: JavaScript transpilation
- **PostCSS**: CSS processing

## Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Renderer and hook integration
- **End-to-End Tests**: Complete application testing
- **Performance Tests**: Benchmarking and optimization

## Extensibility

Frosty is designed to be extensible:

- **Custom Renderers**: Implement new rendering targets
- **Custom Hooks**: Create domain-specific hooks
- **Plugins**: Extend build system functionality
- **Components**: Reusable component libraries

This architecture provides a solid foundation for building modern, performant, and maintainable user interfaces across different platforms.
