# Frosty CLI

The Frosty CLI is a command-line tool for building and running Frosty applications. It provides a complete development server with hot-reloading, bundling, and deployment capabilities.

## Installation

Install the Frosty in your project:

```bash
npm install frosty-cli
```

## Usage

### Basic Command Structure

```bash
npx frosty <command> [options] [arguments]
```

### Available Commands

#### `run` - Build and Run Applications

The primary command for building and running Frosty applications.

```bash
npx frosty run [options] [input-file]
```

**Options:**

- `-w, --watch` - Enable watch mode (rebuild on file changes)
- `-d, --debug` - Enable debug mode (development build)
- `-b, --build-only` - Only build, do not run the server
- `-B, --no-build` - Skip build step and run existing build
- `-p, --port <port>` - Specify port for the server (default: 8080)
- `-c, --configuration <file>` - Specify configuration file (default: server.config.js)
- `-s, --src <dir>` - Specify source root directory
- `-o, --output <dir>` - Specify output directory for build artifacts
- `-h, --help` - Show help message and exit

**Arguments:**

- `input-file` - Optional input file to process

**Examples:**

```bash
# Basic usage - build and run
npx frosty run

# Run a specific entry file
npx frosty run app.js

# Development mode with watch
npx frosty run --watch --debug

# Build only without running server
npx frosty run --build-only

# Custom port and configuration
npx frosty run --port 3000 --configuration my-config.js

# Production build
npx frosty run --build-only app.js
```

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
      rules: []              // Additional rules (CSS/SCSS/images/fonts handled automatically)
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

## Server Configuration

The server configuration allows you to customize the development server and build process. Here are detailed examples:

### Basic Configuration

```js
module.exports = {
  // Source directory for your application
  src: 'src',
  
  // Output directory for built files
  output: 'dist',
  
  // Entry point for server-side code
  serverEntry: 'server.js',
  
  // Define client entry points
  client: {
    main: {
      entry: 'src/app.tsx',
      uri: '/'
    }
  }
};
```

### Advanced Configuration

```js
const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'; // Use --debug flag to set development mode
  
  return {
    src: 'src',
    output: 'dist',
    serverEntry: 'server/index.js',
    
    // Multiple client entry points
    client: {
      main: {
        entry: 'src/app.tsx',
        uri: '/'
      },
      admin: {
        entry: 'src/admin.tsx',
        uri: '/admin'
      }
    },
    
    // Custom module resolution
    moduleSuffixes: {
      client: ['.browser', '.client', '.web', ''],
      server: ['.node', '.server', '']
    },
    
    // Babel polyfills
    polyfills: {
      targets: {
        browsers: ['> 1%', 'last 2 versions']
      }
    },
    
    // Webpack options
    options: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@components': path.resolve(__dirname, 'src/components'),
          '@utils': path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js']
      },
      
      externals: isDevelopment ? {} : {
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      
      plugins: [],
      
      module: {
        rules: [
          // Note: CSS/SCSS, image, and font loaders are included by default in Frosty CLI
          // Only add additional rules here for custom file types or processing
          {
            test: /\.graphql$/,
            use: 'graphql-tag/loader'
          }
        ]
      },
      
      // Server-specific options
      server: {
        plugins: [],
        module: {
          rules: [
            // Note: node-loader for .node files is included by default
            // Add server-specific rules here if needed
          ]
        }
      }
    }
  };
};
```

### Environment-Specific Configuration

```js
module.exports = (env, argv) => {
  const config = {
    src: 'src',
    output: 'dist',
    serverEntry: 'server.js',
    client: {
      main: {
        entry: 'src/app.tsx'
      }
    }
  };
  
  // Development-specific settings
  if (argv.mode === 'development') {
    config.options = {
      ...config.options,
      resolve: {
        alias: {
          '@': './src'
        }
      },
      devServer: {
        hot: true,
        overlay: true
      }
    };
  }
  
  // Production-specific settings
  if (argv.mode === 'production') {
    config.options = {
      ...config.options,
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all'
        }
      }
    };
  }
  
  return config;
};
```

## Examples

### Project Structure Example

```
my-frosty-app/
├── server.config.js
├── package.json
├── src/
│   ├── app.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── utils/
│       └── api.ts
├── server/
│   └── index.js
└── dist/           # Generated build output
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "frosty run --watch --debug",
    "build": "frosty run --build-only",
    "start": "frosty run",
    "dev:admin": "frosty run --watch --debug src/admin.tsx",
    "build:prod": "NODE_ENV=production frosty run --build-only"
  }
}
```
