# Styling in Frosty

Frosty provides flexible and powerful styling capabilities through three main properties: `className`, `style`, and `inlineStyle`. This guide covers how to use each property effectively.

## Table of Contents

- [className Property](#classname-property)
- [style Property](#style-property)
- [inlineStyle Property](#inlinestyle-property)
- [Comparison Between Properties](#comparison-between-properties)
- [Best Practices](#best-practices)
- [Examples](#examples)

## className Property

The `className` property is used to apply CSS classes to elements. It supports various formats for maximum flexibility.

### Type Definition

```typescript
type ClassName = Many<string | _.Falsey>;
type Many<T> = T | _.RecursiveArray<T>;
```

### Basic Usage

```tsx
// Simple string
<div className="container">Content</div>

// Multiple classes
<div className="container large primary">Content</div>
```

### Dynamic Classes

```tsx
function Button({ primary, large, disabled }: ButtonProps) {
  return (
    <button 
      className={`button ${primary ? 'primary' : 'secondary'} ${large ? 'large' : ''} ${disabled ? 'disabled' : ''}`}
    >
      Click me
    </button>
  );
}
```

### Array Format

```tsx
function Card({ highlighted, expandable }: CardProps) {
  const classes = [
    'card',
    highlighted && 'highlighted',
    expandable && 'expandable'
  ];
  
  return <div className={classes}>Card content</div>;
}
```

### Nested Arrays

Frosty supports deeply nested arrays of class names:

```tsx
function Component() {
  const baseClasses = ['base', 'component'];
  const conditionalClasses = [
    condition1 && 'class1',
    condition2 && ['class2', 'class3']
  ];
  
  return (
    <div className={[baseClasses, conditionalClasses]}>
      Content
    </div>
  );
}
```

### Falsy Values

Falsy values (`null`, `undefined`, `false`, `''`) are automatically filtered out:

```tsx
function StatusIndicator({ online, loading }: StatusProps) {
  return (
    <div className={[
      'status',
      online && 'online',
      loading && 'loading',
      null, // Ignored
      undefined, // Ignored
      false && 'never-applied' // Ignored
    ]}>
      Status
    </div>
  );
}
```

## style Property

The `style` property applies CSS-in-JS styles that are automatically processed and can be cached by Frosty's style builder.

### Type Definition

```typescript
type StyleProp<T> = Many<T | _.Falsey>;
```

Where `T` extends `ExtendedCSSProperties`, which includes standard CSS properties plus Frosty-specific extensions.

### Basic Usage

```tsx
function StyledComponent() {
  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      Styled content
    </div>
  );
}
```

### Dynamic Styles

```tsx
function ThemedButton({ theme, size }: ButtonProps) {
  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
    padding: size === 'large' ? '1rem 2rem' : '0.5rem 1rem',
    fontSize: size === 'large' ? '1.2rem' : '1rem'
  };
  
  return <button style={buttonStyle}>Click me</button>;
}
```

### Array of Styles

You can pass multiple style objects that will be merged:

```tsx
function Card({ highlighted, disabled }: CardProps) {
  const baseStyles = {
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };
  
  const conditionalStyles = [
    highlighted && {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)'
    },
    disabled && {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  ];
  
  return (
    <div style={[baseStyles, conditionalStyles]}>
      Card content
    </div>
  );
}
```

### Extended CSS Properties

Frosty supports extended CSS properties beyond standard CSS:

```tsx
function ResponsiveComponent() {
  return (
    <div style={{
      // Standard CSS
      display: 'flex',
      flexDirection: 'column',
      
      // Vendor prefixes handled automatically
      userSelect: 'none',
      
      // Custom properties
      '--custom-color': '#ff6b6b',
      
      // Complex values
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
    }}>
      Content
    </div>
  );
}
```

### Style Caching

Frosty automatically caches styles to improve performance:

```tsx
// These styles will be cached and reused
const reusableStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

function Component1() {
  return <div style={reusableStyle}>Component 1</div>;
}

function Component2() {
  return <div style={reusableStyle}>Component 2</div>;
}
```

## inlineStyle Property

The `inlineStyle` property applies styles directly as inline CSS without processing through Frosty's style builder.

### Type Definition

```typescript
inlineStyle?: CSSProperties;
```

### Basic Usage

```tsx
function QuickStyledComponent() {
  return (
    <div inlineStyle={{
      color: 'red',
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      Quick styled content
    </div>
  );
}
```

### When to Use inlineStyle

Use `inlineStyle` when you need:
- Direct inline CSS without style processing
- Maximum specificity for style overrides
- Styles that should not be cached or shared

```tsx
function OverrideComponent() {
  return (
    <div 
      className="default-styled"
      inlineStyle={{
        // These styles will override any class styles
        color: 'red !important',
        fontSize: '20px'
      }}
    >
      Override content
    </div>
  );
}
```

## Comparison Between Properties

| Property | Processing | Caching | Specificity | Use Case |
|----------|------------|---------|-------------|----------|
| `className` | None | CSS classes | Low (depends on CSS) | Semantic styling, design systems |
| `style` | CSS-in-JS | Yes | High (generated classes) | Dynamic styles, themes |
| `inlineStyle` | Minimal | No | Highest (inline styles) | Quick overrides, one-off styles |

### Example Combining All Three

```tsx
function ComplexStyledComponent({ theme, urgent, customColor }: Props) {
  return (
    <div
      className={[
        'card',
        theme === 'dark' && 'dark-theme',
        urgent && 'urgent'
      ]}
      style={{
        padding: '1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}
      inlineStyle={customColor ? { 
        borderColor: customColor 
      } : undefined}
    >
      Content with all three styling approaches
    </div>
  );
}
```

## Best Practices

### 1. Use className for Static Styles

```tsx
// ✅ Good - Use CSS classes for static styles
<button className="btn btn-primary">Submit</button>

// ❌ Avoid - Don't use style for static styling
<button style={{ padding: '8px 16px', backgroundColor: '#007bff' }}>Submit</button>
```

### 2. Use style for Dynamic Styles

```tsx
// ✅ Good - Use style for dynamic values
<div style={{ 
  width: `${progress}%`,
  backgroundColor: isComplete ? 'green' : 'orange'
}}>
  Progress Bar
</div>

// ❌ Avoid - Don't create many className variations
<div className={`progress-bar width-${Math.round(progress)}`}>
  Progress Bar
</div>
```

### 3. Combine Approaches Strategically

```tsx
function Card({ size, color, highlighted }: CardProps) {
  return (
    <div
      className={[
        'card', // Base styles from CSS
        `card--${size}`, // Size variations from CSS
        highlighted && 'card--highlighted'
      ]}
      style={[
        // Dynamic color theming
        color && { borderColor: color },
        // Runtime calculations
        { 
          transform: `scale(${highlighted ? 1.05 : 1})`,
          transition: 'transform 0.2s ease'
        }
      ]}
    >
      Card content
    </div>
  );
}
```

### 4. Optimize Performance

```tsx
// ✅ Good - Memoize style objects
const memoizedStyle = useMemo(() => ({
  backgroundColor: computeColor(props),
  transform: `translate(${x}px, ${y}px)`
}), [props, x, y]);

return <div style={memoizedStyle}>Content</div>;

// ❌ Avoid - Creating new objects on each render
return (
  <div style={{
    backgroundColor: computeColor(props),
    transform: `translate(${x}px, ${y}px)`
  }}>
    Content
  </div>
);
```

### 5. Use TypeScript for Type Safety

```tsx
interface StyledComponentProps {
  className?: ClassName;
  style?: StyleProp<ExtendedCSSProperties>;
  inlineStyle?: CSSProperties;
}

function StyledComponent({ className, style, inlineStyle }: StyledComponentProps) {
  return (
    <div
      className={className}
      style={style}
      inlineStyle={inlineStyle}
    >
      Content
    </div>
  );
}
```

## Examples

### Responsive Design

```tsx
function ResponsiveLayout() {
  const { innerWidth } = useWindowMetrics();
  
  const containerStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: innerWidth > 768 
      ? 'repeat(3, 1fr)' 
      : '1fr',
    padding: innerWidth > 768 ? '2rem' : '1rem'
  };
  
  return (
    <div 
      className="responsive-container"
      style={containerStyle}
    >
      {items.map(item => (
        <div key={item.id} className="grid-item">
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### Theme-Based Styling

```tsx
function ThemedComponent() {
  const theme = useContext(ThemeContext);
  
  const themeStyles = {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontFamily: theme.typography.fontFamily
  };
  
  return (
    <div
      className="themed-component"
      style={themeStyles}
    >
      Theme-aware content
    </div>
  );
}
```

### Conditional Styling

```tsx
function StatusCard({ status, priority }: StatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#6c757d';
    }
  };
  
  return (
    <div
      className={[
        'status-card',
        `status-card--${status}`,
        priority === 'high' && 'status-card--priority'
      ]}
      style={{
        borderLeftColor: getStatusColor(status),
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid'
      }}
    >
      <h3>Status: {status}</h3>
      <p>Priority: {priority}</p>
    </div>
  );
}
```

This styling system provides the flexibility to handle everything from simple static styles to complex dynamic theming and animations, making Frosty suitable for any web application styling needs.
