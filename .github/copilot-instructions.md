# AI Coding Agent Instructions

## Project Overview
Frosty is a JSX UI library with server-side rendering, modern hooks API, and built-in CLI tools. The architecture consists of:

- **Core reconciler**: Virtual DOM and rendering engine (`src/core/reconciler/`)
- **Renderer implementations**: DOM, server-DOM, and native renderers (`src/renderer/`)
- **Hooks system**: Modern hooks API (`src/core/hooks/`)
- **Web APIs**: Browser APIs abstraction layer (`src/web/`)
- **CLI tooling**: Development server and build system (`packages/frosty-cli/`)

## Key Architecture Patterns

### Component Entry Points Must Export Default
All Frosty apps must export the root component as **default export**:
```tsx
// Required pattern for CLI compatibility
export default function App() {
  return <div>Hello World</div>;
}
```

### Renderer Architecture
- `_Renderer` base class provides async reconciliation framework
- Multiple specialized renderers: `DOMRenderer`, `ServerDOMRenderer`, `NativeRenderer`
- All use the same reconciler but different element creation/update strategies

### Module Resolution with Suffixes
Frosty uses environment-specific file resolution:
```js
// server.config.js
moduleSuffixes: {
  client: ['.browser', '.web', ''],     // Client-side
  server: ['.node', '.server', '.web', '']  // Server-side
}
```

## Development Workflows

### Local Development
```bash
# Start development server (watch mode, debug build)
yarn start  # Equivalent to: npx frosty run -d -w -s ./src tests/server/app.tsx

# Run tests
yarn test

# Build for production
yarn rollup
```

### CLI Configuration
Use `server.config.js` for custom builds:
```js
module.exports = (env, argv) => ({
  src: 'src',
  output: 'dist',
  client: {
    main: { entry: 'src/app.tsx', uri: '/' }
  }
});
```

### Testing Patterns
- Use `ServerDOMRenderer` for SSR testing: `const renderer = new ServerDOMRenderer()`
- Test async hooks with `useAwaited` for promises that must resolve before render
- Component tests should verify both props and rendering output
- Hook tests validate state management and side effects

## Code Generation
- `scripts/gen-data.mjs` generates type-safe HTML/SVG element definitions in `generated/elements.ts`
- Auto-generates from WebRef specs to ensure complete DOM API coverage
- Run `yarn gen-data` when updating element type definitions

## Project-Specific Conventions

### Import Aliases
- Use `~/` for tests (configured in Jest) but not src/
- External imports use standard module resolution

### Framework Independence
- **Never mention React directly** in documentation or code comments
- **Never import from React** - use Frosty's own APIs instead
- Present Frosty as its own independent JSX framework, not relative to other frameworks
- **Verify API validity** when writing documentation - check actual exports and function signatures in the codebase

### Hook Implementation
Hooks follow familiar patterns but with Frosty-specific reconciler integration:
- Effects receive `AbortSignal` parameter for cleanup
- `useAwaited` blocks rendering until promise resolves (SSR-safe)
- Web APIs gracefully degrade in server environment

### File Organization
- Core framework: `src/core/`
- Platform renderers: `src/renderer/`
- Web API hooks: `src/web/`
- Tests mirror source structure in `tests/`
- CLI tools isolated in `packages/frosty-cli/`

## Temporary Files for Testing
When creating temporary files to test code, place all test scripts under `<project_root>/.temp/` to keep the workspace organized and avoid conflicts with the main codebase.
