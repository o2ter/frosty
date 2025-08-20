# useDocument

The `useDocument` hook provides access to the current document object in the browser environment. This is useful when you need to interact with the DOM directly or use document-specific APIs.

## Features

- **DOM Access**: Direct access to the document object in browser environments
- **Safe Access**: Throws a helpful error when used outside of a component or in unsupported environments
- **Renderer Integration**: Works with Frosty's renderer system

## Usage

```tsx
import { useDocument } from 'frosty';

function DocumentTitle() {
  const document = useDocument();
  
  useEffect(() => {
    // Update document title based on component state
    document.title = "My Frosty App";
  }, [document]);
  
  return (
    <div>
      <p>Current document title: {document.title}</p>
    </div>
  );
}
```

## Parameters

This hook doesn't accept any parameters.

## Returns

- **`document`**: The current document object from the renderer

## Example

### Accessing Document Properties

```tsx
import { useDocument, useEffect } from 'frosty';

function DocumentMetadata() {
  const document = useDocument();
  
  useEffect(() => {
    // Log document properties
    console.log('Document URL:', document.URL);
    console.log('Document ready state:', document.readyState);
    
    // Add a custom meta tag
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Built with Frosty';
    document.head.appendChild(meta);
  }, [document]);
  
  return <div>Document accessed</div>;
}
```

## Notes

- This hook must be used within a Frosty component during render.
- It will throw an error if used outside a component or with an unsupported renderer.
- The hook provides access to the document object in the renderer context, which may differ from the global `window.document` in certain environments.

## See Also

- [useWindow](./useWindow.md) – For accessing the window object.
- [useVisibility](./useVisibility.md) – For tracking document visibility state.
- [useEffect](./useEffect.md) – For performing side effects after render.