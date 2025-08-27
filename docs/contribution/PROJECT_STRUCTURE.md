# Project Structure

This document provides a detailed overview of the Frosty project's file structure and organization.

## Root Directory

```
frosty/
├── babel.config.js          # Babel configuration for JSX transformation
├── jest.config.ts           # Jest testing configuration
├── LICENSE                  # MIT License
├── package.json             # Project dependencies and scripts
├── README.md               # Main project documentation
├── rollup.config.mjs       # Rollup bundler configuration
├── tsconfig.json           # TypeScript compiler configuration
├── docs/                   # Documentation files
├── generated/              # Auto-generated type definitions
├── packages/               # Sub-packages (CLI tools)
├── scripts/                # Build and utility scripts
├── src/                    # Main source code
└── tests/                  # Test files
```

## Source Code Structure (`src/`)

### Main Entry Points

```
src/
├── index.ts                # Main library export
├── jsx-dev-runtime.ts      # JSX development runtime
└── jsx-runtime.ts          # JSX production runtime
```

### Core System (`src/core/`)

The heart of Frosty's reconciliation and component system.

```
core/
├── renderer.ts             # Abstract renderer base class
├── utils.ts               # Core utility functions
├── hooks/                 # Hook implementations
│   ├── index.ts           # Hook exports
│   ├── awaited.ts         # Async promise handling
│   ├── callback.ts        # Memoized callbacks
│   ├── context.ts         # Context system
│   ├── debounce.ts        # Debounced functions
│   ├── effect.ts          # Side effects
│   ├── memo.ts            # Memoization
│   ├── reducer.ts         # Reducer pattern
│   ├── ref.ts             # References and imperatives
│   ├── stack.ts           # Component stack access
│   ├── state.ts           # Local state management
│   ├── storage.ts         # Renderer-scoped storage
│   ├── sync.ts            # External store synchronization
│   └── misc/              # Additional hooks
│       ├── index.ts       # Misc hook exports
│       ├── interval.ts    # Interval management
│       ├── resource.ts    # Resource fetching
│       └── store.ts       # External store binding
├── reconciler/            # Virtual node reconciliation
│   ├── events.ts          # Event system
│   ├── hooks.ts           # Hook state management
│   ├── state.ts           # Reconciler state management
│   ├── utils.ts           # Reconciliation utilities
│   └── vnode.ts           # Virtual node implementation
├── types/                 # TypeScript type definitions
│   ├── common.ts          # Common types
│   ├── component.ts       # Component types
│   ├── error.ts           # Error boundary types
│   ├── fragment.ts        # Fragment types
│   ├── props.ts           # Props provider types
│   ├── runtime.ts         # Runtime types
│   └── style.ts           # Style system types
└── web/                   # Web-specific styling
    ├── event.ts           # Event handling
    ├── props.ts           # DOM property mapping
    └── styles/            # CSS processing
        ├── css.ts         # CSS type definitions
        ├── process.ts     # CSS processing utilities
        └── ...            # Additional style utilities
```

### Renderer System (`src/renderer/`)

Platform-specific rendering implementations.

```
renderer/
├── dom.ts                 # Browser DOM renderer
├── native.ts              # Native platform renderer
├── server-dom.ts          # Server-side DOM renderer
├── style.ts               # Style processing utilities
├── common/                # Shared renderer functionality
│   ├── index.ts           # Common exports
│   ├── node.ts            # DOM node wrapper
│   └── renderer.ts        # Base DOM renderer
└── minify/                # Code compression utilities
    ├── compress.ts        # Compression algorithms
    └── decompress.ts      # Decompression utilities
```

### Web Platform (`src/web/`)

Browser-specific APIs and functionality.

```
web/
├── index.ts               # Web platform exports
├── document.ts            # Document API hooks
├── location.ts            # Location and navigation
├── observer.ts            # DOM observer hooks
├── online.ts              # Online/offline detection
├── server.ts              # Server-side utilities
├── storage.ts             # LocalStorage/SessionStorage
├── visibility.ts          # Page visibility API
└── window.ts              # Window API hooks
```

## CLI Package (`packages/frosty-cli/`)

Development tools and build system.

```
frosty-cli/
├── package.json           # CLI package configuration
├── webpack.mjs            # Webpack configuration
├── bin/                   # Executable scripts
│   └── frosty.sh          # Main CLI script
├── scripts/               # Build scripts
│   └── bin/
│       └── run.sh         # Run script
└── src/                   # CLI source code
    ├── client/            # Client-side code
    │   └── index.js       # Client entry point
    └── server/            # Server-side code
        ├── default.ts     # Default configuration
        ├── env.ts         # Environment handling
        ├── index.js       # Server entry point
        ├── render.js      # Rendering utilities
        └── route.ts       # Routing logic
```

## Documentation (`docs/`)

Comprehensive documentation for all features.

```
docs/
├── README.md              # Documentation index
├── overview.md            # Feature overview
├── CLI.md                 # CLI documentation
├── STYLE_GUIDE.md         # Code style guide
├── ARCHITECTURE.md        # Architecture documentation
├── PROJECT_STRUCTURE.md   # This file
├── components/            # Component documentation
│   ├── ErrorBoundary.md   # Error boundary usage
│   └── PropsProvider.md   # Props provider usage
└── hooks/                 # Hook documentation
    ├── useAwaited.md      # Async hook
    ├── useCallback.md     # Callback memoization
    ├── useColorScheme.md  # Color scheme detection
    ├── useContext.md      # Context consumption
    ├── useDebounce.md     # Debouncing utilities
    ├── useDocument.md     # Document API access
    ├── useEffect.md       # Side effects
    ├── useIntersectionObserver.md  # Intersection observer
    ├── useInterval.md     # Interval management
    ├── useLocalStorage.md # Local storage sync
    ├── useLocation.md     # Location management
    ├── useMemo.md         # Value memoization
    ├── useMutationObserver.md  # DOM mutation observer
    ├── useOnline.md       # Online status
    ├── usePerformanceObserver.md  # Performance monitoring
    ├── useReducer.md      # Reducer pattern
    ├── useRef.md          # References
    ├── useRefHandle.md    # Imperative handles
    ├── useRendererStorage.md  # Renderer storage
    ├── useResizeObserver.md   # Resize observer
    ├── useResource.md     # Resource fetching
    ├── useSearchParams.md # URL search params
    ├── useServerResource.md   # Server resources
    ├── useSessionStorage.md   # Session storage
    ├── useStack.md        # Component stack
    ├── useState.md        # Local state
    ├── useStore.md        # External store
    ├── useSyncExternalStore.md  # External store sync
    ├── useVisibility.md   # Page visibility
    ├── useVisualViewportMetrics.md  # Viewport metrics
    ├── useWindow.md       # Window API
    ├── useWindowMetrics.md    # Window measurements
    └── useWindowScroll.md     # Scroll position
```

## Generated Files (`generated/`)

Auto-generated type definitions and element mappings.

```
generated/
└── elements.ts            # HTML element type definitions
```

## Scripts (`scripts/`)

Build and development utilities.

```
scripts/
└── gen-data.mjs          # Data generation script
```

## Tests (`tests/`)

Test files and test applications.

```
tests/
├── component.test.tsx     # Component testing
├── css.test.tsx          # CSS system testing
├── minify.test.ts        # Minification testing
└── server/               # Server testing
    └── app.tsx           # Test application
```

## Configuration Files

### Root Configuration

- **`package.json`**: Main package configuration, dependencies, and scripts
- **`tsconfig.json`**: TypeScript compiler settings
- **`babel.config.js`**: Babel transpilation configuration
- **`jest.config.ts`**: Testing framework configuration
- **`rollup.config.mjs`**: Library bundling configuration

### Build Configuration

- **Rollup**: Used for building the library distribution
- **Webpack**: Used by CLI for application bundling
- **TypeScript**: Type checking and compilation
- **Babel**: JSX transformation and modern JavaScript features

## Key Design Patterns

### Barrel Exports
Each directory contains an `index.ts` file that re-exports public APIs, creating clean import paths.

### Layered Architecture
- Core layer provides platform-agnostic functionality
- Renderer layer handles platform-specific rendering
- Web layer adds browser-specific features

### Modular Hook System
Hooks are organized by functionality and can be imported individually or as groups.

### Type Safety
Comprehensive TypeScript types ensure type safety across the entire codebase.

### Testing Strategy
Tests are co-located with source code and follow naming conventions for easy identification.

This structure provides a clean separation of concerns while maintaining flexibility for future extensions and platform support.
