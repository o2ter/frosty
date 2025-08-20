# Frosty Documentation

Welcome to the Frosty UI library documentation! This document provides an overview of the library, installation instructions, usage examples, and additional resources to help you get started.

## Overview

Frosty is a fast, flexible, and modern JSX-based UI library designed to simplify the process of building user interfaces. With its efficient rendering and reconciliation, flexible component model, and modern hooks API, Frosty aims to enhance your development experience.

## Installation

To install Frosty, you can use npm:

```sh
npm install frosty
```

## Usage

Here’s a simple example of how to use Frosty in your application:

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

## CLI

Frosty includes a powerful CLI tool for building and running applications. See the [CLI documentation](./CLI.md) for detailed usage instructions and configuration options.

## API Documentation

For detailed information about the API and available components, please refer to the API documentation in the `./docs` directory.

### Components
- [ErrorBoundary](./components/ErrorBoundary.md) - Error handling component
- [PropsProvider](./components/PropsProvider.md) - Context provider for props

### Hooks
- [Core Hooks](./hooks/) - Complete list of available hooks including useState, useEffect, useContext, and more

## Contributing

We welcome contributions! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.