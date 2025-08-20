# Frosty Documentation Style Guide

This style guide ensures consistency across all Frosty documentation.

## File Structure

### Hook Documentation

Each hook documentation file should follow this structure:

```markdown
# hookName

Brief description of what the hook does and its primary purpose.

## Features

- **Feature Name**: Brief description without ending period
- **Another Feature**: Brief description without ending period

## Usage

```tsx
// Basic usage example
```

## Parameters

1. **parameterName**: `Type` _(optional)_  
   Description of the parameter without ending period

2. **anotherParameter**: `Type`  
   Description of the parameter without ending period

## Returns

Description of what the hook returns, including the type and structure.

- **property**: Description without ending period
- **anotherProperty**: Description without ending period

## Example

### Example Title

```tsx
// More detailed example
```

## Notes

- **Note Title**: Description without ending period
- **Another Note**: Description without ending period
```

### Component Documentation

Each component documentation file should follow this structure:

```markdown
# ComponentName

Brief description of what the component does and its primary purpose.

## Features

- **Feature Name**: Brief description without ending period

## Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `propName` | `Type` | `default` | Description without ending period |

## Usage

```tsx
// Basic usage example
```

## Example

### Example Title

```tsx
// More detailed example
```

## Notes

- **Note Title**: Description without ending period
```

## Style Rules

### General Formatting

1. **Headings**: Use title case for main headings, sentence case for subheadings
2. **Code Blocks**: Always specify the language (tsx, jsx, js, etc.)
3. **Lists**: Use consistent bullet points, no ending periods for list items
4. **Links**: Use relative paths for internal links, descriptive text for external links

### Naming Conventions

1. **Hook Names**: Use `hookName` format (no backticks in main heading)
2. **Component Names**: Use `ComponentName` format (no backticks in main heading)
3. **Parameters**: Use `parameterName` format with backticks in parameter lists
4. **Properties**: Use `propertyName` format with backticks in return descriptions

### Code Examples

1. **Import Statements**: Always show imports from 'frosty'
2. **Component Examples**: Use functional components with descriptive names
3. **Error Handling**: Show proper error handling patterns in examples
4. **Loading States**: Include loading state examples where applicable

### Typography

1. **Emphasis**: Use **bold** for important terms and property names
2. **Code**: Use `backticks` for code elements, types, and property names
3. **Italics**: Use _italics_ for optional parameters: `_(optional)_`
4. **Punctuation**: No ending periods for list items, feature descriptions, or parameter descriptions

### Example Structure

```markdown
# useExample

The `useExample` hook provides functionality for managing example data with automatic caching and error handling.

## Features

- **Data Management**: Handles complex data operations efficiently
- **Error Handling**: Built-in error recovery and retry mechanisms
- **Performance**: Optimized for high-performance applications

## Usage

```tsx
import { useExample } from 'frosty';

function ExampleComponent() {
  const { data, loading, error } = useExample();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{data}</div>;
}
```

## Parameters

1. **config**: `ExampleConfig` _(optional)_  
   Configuration object for customizing behavior

2. **deps**: `any[]` _(optional)_  
   Array of dependencies that trigger updates when changed

## Returns

The hook returns an object with the following properties:

- **data**: The current data value
- **loading**: Boolean indicating if data is being fetched
- **error**: Error object if an error occurred
- **refresh**: Function to manually refetch data

## Example

### Basic Usage

```tsx
import { useExample } from 'frosty';

function DataComponent() {
  const { data, loading, error, refresh } = useExample({
    endpoint: '/api/data'
  });

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {data}</div>}
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

## Notes

- **Caching**: Data is automatically cached between renders
- **Error Recovery**: Includes built-in retry mechanisms for failed requests
- **Dependencies**: Use the deps array to control when data is refetched
```

## Consistency Checklist

Before publishing documentation, ensure:

- [ ] Heading format follows conventions (no backticks in main headings)
- [ ] Feature list items don't end with periods
- [ ] Parameter descriptions follow the established format
- [ ] Code examples include proper imports
- [ ] Examples show realistic use cases
- [ ] Error handling is demonstrated where appropriate
- [ ] Loading states are shown for async operations
- [ ] Notes section provides helpful additional context
- [ ] Links use relative paths for internal references
- [ ] Typography follows the established patterns
