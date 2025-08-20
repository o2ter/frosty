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

## Configuration

### Server Configuration File

The CLI uses a `server.config.js` file (or custom configuration specified with `-c`) to configure the build and server options.

**Basic Configuration Structure:**

```javascript
export default {
  // Output directory for build artifacts
  output: './dist',
  
  // Server options
  serverOptions: {
    // Express server configuration options
  },
  
  // Application entries
  applications: {
    main: {
      path: '/',           // Route path
      entry: './src/app.js' // Entry point
    }
  }
};
```

**Advanced Configuration Example:**

```javascript
export default {
  output: './build',
  
  serverOptions: {
    cors: true,
    compression: true,
  },
  
  applications: {
    main: {
      path: '/',
      entry: './src/main.tsx'
    },
    admin: {
      path: '/admin',
      entry: './src/admin.tsx'
    }
  },
  
  // Custom webpack configuration
  webpack: (config) => {
    // Modify webpack config
    return config;
  }
};
```

### Environment Variables

The CLI supports environment variables through `.env` files:

```bash
# .env
PORT=3000
NODE_ENV=development
API_URL=http://localhost:4000
```

## Development Workflow

### 1. Development Server

Start the development server with hot-reloading:

```bash
npx frosty run --watch --debug
```

This will:
- Build your application in development mode
- Start a server on port 8080 (or specified port)
- Watch for file changes and rebuild automatically
- Serve static assets
- Enable hot module replacement

### 2. Production Build

Create a production build:

```bash
npx frosty run --build-only
```

This will:
- Bundle and optimize your application
- Generate minified JavaScript and CSS
- Create a production-ready server bundle
- Output everything to the specified output directory

### 3. Running Production Build

Run a previously built application:

```bash
npx frosty run --no-build
```

## Project Structure

The CLI expects your project to follow this structure:

```
my-frosty-app/
├── src/
│   ├── app.tsx          # Main application component
│   ├── components/      # Reusable components
│   └── pages/          # Page components
├── public/             # Static assets
├── server.config.js    # CLI configuration
├── package.json
└── .env               # Environment variables
```

## Built-in Features

### Static Asset Serving

The CLI automatically serves static assets from the `public` directory at the root path.

### CSS Support

- CSS modules
- Sass/SCSS support
- PostCSS processing
- Automatic CSS extraction in production

### TypeScript Support

Full TypeScript support out of the box with:
- JSX/TSX compilation
- Type checking
- Source maps in development

### Hot Module Replacement

In watch mode, the CLI provides hot module replacement for faster development.

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
npx frosty run --port 3001
```

**Build errors:**
- Check your `server.config.js` syntax
- Ensure all entry files exist
- Verify TypeScript/JSX syntax

**Module not found errors:**
- Check import paths
- Ensure dependencies are installed
- Verify file extensions

### Debug Mode

Enable debug mode for verbose output:

```bash
npx frosty run --debug
```

## Advanced Usage

### Multiple Applications

Configure multiple applications with different routes:

```javascript
export default {
  applications: {
    main: {
      path: '/',
      entry: './src/main.tsx'
    },
    admin: {
      path: '/admin',
      entry: './src/admin.tsx'
    },
    dashboard: {
      path: '/dashboard',
      entry: './src/dashboard.tsx'
    }
  }
};
```

### Server Middleware

Add custom Express middleware:

```javascript
export default async (app, env) => {
  // Custom middleware
  app.use('/api', (req, res) => {
    res.json({ message: 'Custom API endpoint' });
  });
  
  // Database connections, etc.
  env.db = await connectToDatabase();
};
```

## API Reference

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `output` | string | `'./dist'` | Output directory for build artifacts |
| `serverOptions` | object | `{}` | Express server configuration |
| `applications` | object | `{}` | Application entry points and routes |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment mode | `'development'` |
| `FROSTY_CLI_ROOT` | CLI installation directory | Auto-detected |
| `PROJECT_ROOT` | Project root directory | Current working directory |
