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
