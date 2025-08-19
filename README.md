# Frosty

A fast, flexible, and modern JSX-based UI library.

## Features

- ⚡ Fast rendering and reconciliation
- 🧩 Flexible component model
- 🎨 Built-in style and CSS support
- 🪝 Modern hooks API
- 🌐 SSR-ready (Server-side rendering)

## Installation

Install Frosty using npm:

```sh
npm install frosty
```

## Quick Start

Here's a simple example to get you started:

```tsx
import { useState } from 'frosty';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>Hello, Frosty!</span>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default App;
```

See the [API documentation](./docs) for more details and advanced usage.

## Usage

To run your app with Frosty CLI using `npx`:

```sh
npx frosty run app.js
```

### Common Options

- `-w, --watch`   Enable watch mode (rebuild on file changes)
- `-d, --debug`   Enable debug mode (development build)
- `-p, --port <port>` Specify server port (default: 8080)
- `-c, --configuration <file>` Use a custom config file (default: server.config.js)
- `-s, --src <dir>`  Specify source directory
- `-o, --output <dir>` Specify output directory

### Example Commands

Start your app in development mode with watch:

```sh
npx frosty run --watch --debug app.js
```

Run with a custom port and config:

```sh
npx frosty run --port 3000 --configuration my.config.js app.js
```

See `npx frosty run --help` for the full list of options.

### Configuration File (Optional)

Customize build and server behavior with a `server.config.js` file in your project root.

- You may export an object or a function `(env, argv) => config`.
- All fields are optional.

```js
module.exports = {
  src: 'src',                // Source directory
  output: 'dist',            // Output directory
  serverEntry: 'server.js',  // Server entry file
  client: {                  // (Optional) Client entry points
    main: {
      entry: 'src/app.js',   // Path to client entry file
      uri: '/',              // (Optional) URI path
    }
  },
  moduleSuffixes: {          // (Optional) Custom module resolution suffixes
    client: ['.browser', '.web', ''],
    server: ['.node', '.server', '.web', '']
  },
  polyfills: {},             // (Optional) Polyfill options for Babel
  options: {                 // (Optional) Webpack and build options
    resolve: {},             // Custom resolve options (e.g., alias)
    externals: {},           // Webpack externals
    plugins: [],             // Additional Webpack plugins
    module: {
      rules: []              // Additional Webpack module rules
    },
    server: {
      plugins: [],           // Server-specific plugins
      module: {
        rules: []            // Server-specific module rules
      }
    }
  }
};
```

## TypeScript Setup

To enable JSX support with Frosty in TypeScript, update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "frosty"
  }
}
```

This configures TypeScript to use Frosty's JSX runtime.

## Babel Setup

To use Frosty with Babel, add the following to your Babel config:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "frosty"
      }
    ]
  ]
}
```

## Contributing

We welcome contributions! Please open issues or submit pull requests.

## License

MIT © O2ter Limited