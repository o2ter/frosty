# AI Coding Agent Instructions

## Project Overview
Frosty is a JSX UI library with server-side rendering, a modern hooks API, and built-in CLI tools. The architecture consists of:

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
- The `_Renderer` base class provides an async reconciliation framework
- Multiple specialized renderers: `DOMRenderer`, `ServerDOMRenderer`, `NativeRenderer`
- All use the same reconciler but with different element creation/update strategies

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
- Component tests should verify both props and rendering output
- Hook tests validate state management and side effects
- **Always review test case content**: Verify that tests are actually testing the intended behavior, not just passing superficially
- **Check test assertions**: Ensure assertions validate the correct outputs, state changes, and side effects
- **Validate test coverage**: Make sure edge cases and error conditions are properly tested

## Code Generation
- `scripts/gen-data.mjs` generates type-safe HTML/SVG element definitions in `generated/elements.ts`
- Auto-generates from WebRef specs to ensure complete DOM API coverage
- Run `yarn gen-data` when updating element type definitions

## Project-Specific Conventions

### Import Aliases
- Use `~/` for tests (configured in Jest) but not code under `src/`
- External imports use standard module resolution

### Framework Independence
- **Never mention React directly** in documentation or code comments
- **Never import from React** - use Frosty's own APIs instead
- Present Frosty as its own independent JSX framework, not relative to other frameworks
- **Verify API validity** when writing documentation - check actual exports and function signatures in the codebase

### Hook Implementation
Hooks follow familiar patterns but with Frosty-specific reconciler integration:
- Effects receive an `AbortSignal` parameter for cleanup
- `useAwaited` blocks rendering until promise resolves (SSR-safe)
- Web APIs gracefully degrade in the server environment

### File Organization
- Core framework: `src/core/`
- Platform renderers: `src/renderer/`
- Web API hooks: `src/web/`
- Tests mirror source structure in `tests/`
- CLI tools isolated in `packages/frosty-cli/`

## Frosty Framework Specifics
- Import hooks from `'frosty'`, not `'react'`
- Use `ElementNode` type instead of `ReactNode`
- Component props use `PropsWithChildren<T>` pattern
- Always verify Frosty-specific APIs. Do not assume React patterns apply directly.

## Code Conventions
- **Lodash Heavy**: Extensive use of `_.assign`, `_.toPath`, `_.get`, `_.compact` throughout
- **MIT License Headers**: All source files include full MIT license header (see existing files)
- **State Management**: Prefer context + hooks over external state libraries

## Dependencies
- **Build**: Rollup with TypeScript, Babel, and SCSS support
- **Platform Detection**: Module suffix resolution for cross-platform components

## Testing & Development
- Test server at `tests/server/app.tsx` - a minimal Frosty app for component testing
- **Temporary Files for Testing**: When creating temporary files to test code, place all test scripts under `<project_root>/.temp/` to keep the workspace organized and avoid conflicts with the main codebase.
- **Test Case Verification**: Always examine the actual content of test cases to ensure they're testing what they're supposed to test:
  - Read test files completely to understand test logic and assertions
  - Verify that test descriptions match what the test actually does
  - Check that assertions are testing the correct behavior and edge cases
  - Ensure mocks and test data are appropriate for the scenario being tested
  - Look for missing test cases or gaps in coverage for critical functionality
  - Validate that tests would actually fail if the implementation was broken
  - **NEVER use fallback methods to bypass test cases** - if tests are failing, fix the implementation or the tests, don't circumvent them
  - **No test shortcuts or workarounds** - all tests must pass legitimately through proper implementation

## **Important:** Task Execution Guidelines
When running any command or task as an AI agent:

### Command Execution Best Practices
- **Always wait** for the task to complete before proceeding with any subsequent actions
- **Never use timeouts** to run commands - it's always failure-prone and unreliable
- **Never repeat or re-run** the same command while a task is already running
- **CRITICAL: Never start a new task before the previous one has completely finished**
  - Wait for explicit confirmation that the previous task has completed successfully or failed
  - Do not assume a task is finished just because you don't see output for a while
  - Multiple concurrent tasks can cause conflicts, resource contention, and unpredictable behavior
- **Monitor task status** carefully and don't make assumptions about completion

### Task Status Verification
- If you cannot see the output or the task appears to be still running, you are **required** to ask the user to confirm the task has completed or is stuck
- If the task is stuck or hanging, ask the user to terminate the task and try again
- **Never assume** a task has completed successfully without explicit confirmation
- Always ask the user to confirm task completion or termination if the status is unclear
- **Sequential execution is mandatory:** Do not queue or pipeline tasks - complete one fully before starting the next
- **Never try to get the terminal output using a different approach or alternative method** always wait for the result using the provided tools and instructions. Do not attempt workarounds or alternate output retrieval.

### Test Execution
- **Always use provided tools when available** for running tests instead of terminal commands
- Use the `runTests` tool for unit test execution - it provides better integration and output formatting
- The `runTests` tool supports:
  - Running specific test files by providing absolute file paths
  - Running specific test suites, classes, or cases by name
  - Running all tests when no parameters are provided
- **Prefer tool-based test execution** over manual `yarn test` or `npm test` commands
- Only use terminal commands for test execution when the `runTests` tool is not available or insufficient
- **Verify test quality**: Always examine the actual test code to ensure tests are meaningful and validate the correct behavior
- **Check test logic**: Don't assume tests are correct just because they pass - review the test implementation to confirm it's testing what it claims to test

### Error Handling
- If a command fails, read the error output completely before suggesting fixes
- Don't retry failed commands without understanding and addressing the root cause
- Ask for user confirmation before attempting alternative approaches
- **Never run alternative commands while a failed task is still running or in an unknown state**
