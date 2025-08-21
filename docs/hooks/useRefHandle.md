# useRefHandle

The `useRefHandle` hook allows you to expose imperative methods or properties from a child component to its parent. This is useful for scenarios where the parent needs to directly interact with the child component, such as triggering animations, focusing inputs, or resetting forms.

## Features

- **Expose Methods**: Share imperative methods from a child component to its parent
- **Flexible Integration**: Works seamlessly with functional components

## Usage

```tsx
import { useRef } from 'frosty';
import { useRefHandle } from 'frosty';

function ChildComponent({ ref, ...props }) {
  const localRef = useRef(null);

  useRefHandle(ref, {
    focus: () => {
      if (localRef.current) {
        localRef.current.focus();
      }
    },
    reset: () => {
      if (localRef.current) {
        localRef.current.value = '';
      }
    },
  });

  return <input ref={localRef} type="text" />;
}

function ParentComponent() {
  const childRef = useRef(null);

  const handleFocus = () => {
    if (childRef.current) {
      childRef.current.focus();
    }
  };

  const handleReset = () => {
    if (childRef.current) {
      childRef.current.reset();
    }
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleReset}>Reset Input</button>
    </div>
  );
}
```

## Parameters

1. **`ref`**: A `ref` object passed from the parent component.  
   This is where the exposed methods or properties will be attached

2. **`methods`**: An object containing the methods or properties to expose.  
   Each key in the object represents a method or property that the parent can access

## Returns

The `useRefHandle` hook does not return any value.

## Example

### Exposing Custom Methods

```tsx
import { useRef } from 'frosty';
import { useRefHandle } from 'frosty';

function Modal({ ref, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  useRefHandle(ref, {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  });

  if (!isOpen) return null;

  return (
    <div className="modal">
      <p>This is a modal</p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  );
}

function App() {
  const modalRef = useRef(null);

  return (
    <div>
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      <Modal ref={modalRef} />
    </div>
  );
}
```

## Notes

- **Avoid Overuse**: Use `useRefHandle` sparingly. Prefer declarative patterns whenever possible.
- **Type Safety**: When using TypeScript, define the type of the exposed methods for better type safety

## See Also

- [useRef](./useRef.md) – For creating mutable references.