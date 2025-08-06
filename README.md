# Frosty

A fast, flexible, and modern JSX-based UI library.

## Features

- ⚡ Fast rendering and reconciliation
- 🧩 Flexible component model
- 🎨 Built-in style and CSS support
- 🪝 Modern hooks API
- 🌐 SSR-ready

## Installation

```sh
npm install frosty
```

## Usage

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
```

See the [API documentation](./docs) for more details.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT © O2ter Limited