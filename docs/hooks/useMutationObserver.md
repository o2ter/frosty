# useMutationObserver

The `useMutationObserver` hook provides a way to observe changes to the DOM tree using the MutationObserver API. This is useful for tracking dynamic content changes, monitoring third-party modifications, and implementing reactive behaviors based on DOM mutations.

## Features

- **DOM Change Tracking**: Monitor additions, removals, and modifications to DOM elements
- **Flexible Configuration**: Configure which types of mutations to observe (attributes, childList, subtree, etc.).
- **Performance Optimized**: Uses the native MutationObserver API for efficient DOM monitoring
- **Ref Support**: Works with both ref objects and direct node references
- **Automatic Cleanup**: Observers are automatically disconnected when components unmount

## Usage

```tsx
import { useMutationObserver, useRef, useState } from 'frosty';

function DynamicContentTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const [lastMutation, setLastMutation] = useState<string>('');

  useMutationObserver(
    containerRef,
    (mutations) => {
      mutations.forEach((mutation) => {
        setMutationCount(prev => prev + 1);
        
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length > 0) {
            setLastMutation('Node added');
          } else if (mutation.removedNodes.length > 0) {
            setLastMutation('Node removed');
          }
        } else if (mutation.type === 'attributes') {
          setLastMutation(`Attribute ${mutation.attributeName} changed`);
        }
      });
    },
    {
      childList: true,
      attributes: true,
      subtree: true
    }
  );

  const addElement = () => {
    if (containerRef.current) {
      const newDiv = document.createElement('div');
      newDiv.textContent = `Item ${Date.now()}`;
      newDiv.style.padding = '10px';
      newDiv.style.margin = '5px';
      newDiv.style.backgroundColor = '#e3f2fd';
      newDiv.style.borderRadius = '4px';
      containerRef.current.appendChild(newDiv);
    }
  };

  const removeLastElement = () => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      containerRef.current.removeChild(containerRef.current.lastElementChild!);
    }
  };

  const changeColor = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = 
        containerRef.current.style.backgroundColor === 'rgb(255, 193, 7)' 
          ? '#f8f9fa' 
          : '#ffc107';
    }
  };

  return (
    <div>
      <h3>DOM Mutation Tracker</h3>
      
      <div style={{
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p><strong>Mutations detected:</strong> {mutationCount}</p>
        <p><strong>Last mutation:</strong> {lastMutation || 'None yet'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={addElement} style={{ marginRight: '10px' }}>
          Add Element
        </button>
        <button onClick={removeLastElement} style={{ marginRight: '10px' }}>
          Remove Last
        </button>
        <button onClick={changeColor}>
          Change Container Color
        </button>
      </div>

      <div
        ref={containerRef}
        style={{
          minHeight: '200px',
          border: '2px dashed #6c757d',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f8f9fa'
        }}
      >
        <p>Dynamic content area - mutations will be tracked</p>
      </div>
    </div>
  );
}
```

## Parameters

1. **target**: `RefObject<Node> | Node | null | undefined` - The DOM node or ref to observe for mutations.
2. **callback**: `MutationCallback` - Function called when mutations are observed.
3. **options**: `MutationObserverInit` (optional) - Configuration options for what to observe.

### MutationObserverInit Options

- **childList**: `boolean` - Observe direct children additions/removals
- **attributes**: `boolean` - Observe attribute changes
- **attributeOldValue**: `boolean` - Include old attribute values
- **characterData**: `boolean` - Observe text content changes
- **characterDataOldValue**: `boolean` - Include old text content
- **subtree**: `boolean` - Observe descendants as well
- **attributeFilter**: `string[]` - Specific attributes to observe

### MutationRecord Properties

The callback receives `MutationRecord` objects with these properties:
- **type**: `'childList' | 'attributes' | 'characterData'`
- **target**: The node that was changed
- **addedNodes**: Nodes that were added
- **removedNodes**: Nodes that were removed
- **attributeName**: Name of changed attribute
- **oldValue**: Previous value (if requested)

## Returns

`void` - This hook doesn't return any value.

## Examples

### Form Validation Tracker

```tsx
import { useMutationObserver, useRef, useState } from 'frosty';

function FormValidationTracker() {
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationEvents, setValidationEvents] = useState<Array<{
    timestamp: Date;
    field: string;
    action: string;
  }>>([]);

  useMutationObserver(
    formRef,
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          const fieldName = target.getAttribute('name') || target.id || 'unknown';
          
          if (target.classList.contains('error')) {
            setValidationEvents(prev => [...prev, {
              timestamp: new Date(),
              field: fieldName,
              action: 'Error added'
            }]);
          } else if (target.classList.contains('valid')) {
            setValidationEvents(prev => [...prev, {
              timestamp: new Date(),
              field: fieldName,
              action: 'Validation passed'
            }]);
          }
        }
        
        // Track error message additions/removals
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.classList.contains('error-message')) {
              setValidationErrors(prev => [...prev, node.textContent || 'Unknown error']);
            }
          });
          
          mutation.removedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.classList.contains('error-message')) {
              setValidationErrors(prev => 
                prev.filter(error => error !== node.textContent)
              );
            }
          });
        }
      });
    },
    {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class']
    }
  );

  const simulateValidation = (fieldName: string, isValid: boolean) => {
    const field = formRef.current?.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    if (!field) return;

    // Remove existing classes
    field.classList.remove('error', 'valid');
    
    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    if (isValid) {
      field.classList.add('valid');
    } else {
      field.classList.add('error');
      
      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = `${fieldName} is invalid`;
      errorDiv.style.color = 'red';
      errorDiv.style.fontSize = '14px';
      errorDiv.style.marginTop = '5px';
      field.parentElement?.appendChild(errorDiv);
    }
  };

  return (
    <div>
      <h3>Form Validation Tracker</h3>
      
      <form ref={formRef} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            name="password"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            type="button" 
            onClick={() => simulateValidation('email', true)}
            style={{ marginRight: '10px' }}
          >
            Validate Email ✓
          </button>
          <button 
            type="button" 
            onClick={() => simulateValidation('email', false)}
            style={{ marginRight: '10px' }}
          >
            Invalidate Email ✗
          </button>
          <button 
            type="button" 
            onClick={() => simulateValidation('password', Math.random() > 0.5)}
          >
            Random Password Validation
          </button>
        </div>
      </form>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        <div>
          <h4>Current Errors:</h4>
          <ul style={{ color: 'red' }}>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4>Validation Events:</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {validationEvents.slice(-10).map((event, index) => (
              <div key={index} style={{
                padding: '5px',
                fontSize: '12px',
                borderBottom: '1px solid #eee'
              }}>
                <strong>{event.field}:</strong> {event.action} 
                <br />
                <span style={{ color: '#666' }}>
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .error {
          border-color: #dc3545 !important;
          background-color: #ffe6e6 !important;
        }
        .valid {
          border-color: #28a745 !important;
          background-color: #e6ffe6 !important;
        }
      `}</style>
    </div>
  );
}
```

### Content Change Monitor

```tsx
import { useMutationObserver, useRef, useState, useEffect } from 'frosty';

function ContentChangeMonitor() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [changeLog, setChangeLog] = useState<Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>>([]);

  useMutationObserver(
    contentRef,
    (mutations) => {
      mutations.forEach((mutation) => {
        const timestamp = new Date();
        let description = '';

        switch (mutation.type) {
          case 'childList':
            if (mutation.addedNodes.length > 0) {
              const addedText = Array.from(mutation.addedNodes)
                .map(node => node.textContent || node.nodeName)
                .join(', ');
              description = `Added: ${addedText}`;
            }
            if (mutation.removedNodes.length > 0) {
              const removedText = Array.from(mutation.removedNodes)
                .map(node => node.textContent || node.nodeName)
                .join(', ');
              description = `Removed: ${removedText}`;
            }
            break;
            
          case 'attributes':
            description = `Attribute "${mutation.attributeName}" changed on ${mutation.target.nodeName}`;
            break;
            
          case 'characterData':
            description = `Text content changed: "${mutation.target.textContent}"`;
            break;
        }

        if (description) {
          setChangeLog(prev => [{
            type: mutation.type,
            description,
            timestamp
          }, ...prev].slice(0, 20)); // Keep last 20 changes
        }
      });
    },
    {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    }
  );

  const addParagraph = () => {
    if (contentRef.current) {
      const p = document.createElement('p');
      p.textContent = `New paragraph added at ${new Date().toLocaleTimeString()}`;
      p.style.padding = '10px';
      p.style.backgroundColor = '#d4edda';
      p.style.borderRadius = '4px';
      p.style.margin = '10px 0';
      contentRef.current.appendChild(p);
    }
  };

  const modifyText = () => {
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p');
      if (paragraphs.length > 0) {
        const randomP = paragraphs[Math.floor(Math.random() * paragraphs.length)];
        randomP.textContent = `Modified at ${new Date().toLocaleTimeString()}`;
      }
    }
  };

  const addAttribute = () => {
    if (contentRef.current) {
      const randomColor = `hsl(${Math.random() * 360}, 70%, 90%)`;
      contentRef.current.style.backgroundColor = randomColor;
      contentRef.current.setAttribute('data-theme', Math.random() > 0.5 ? 'light' : 'dark');
    }
  };

  const removeParagraph = () => {
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p');
      if (paragraphs.length > 1) { // Keep at least one paragraph
        const lastP = paragraphs[paragraphs.length - 1];
        lastP.remove();
      }
    }
  };

  return (
    <div>
      <h3>Content Change Monitor</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={addParagraph} style={{ marginRight: '10px' }}>
          Add Paragraph
        </button>
        <button onClick={modifyText} style={{ marginRight: '10px' }}>
          Modify Text
        </button>
        <button onClick={addAttribute} style={{ marginRight: '10px' }}>
          Change Attributes
        </button>
        <button onClick={removeParagraph}>
          Remove Last Paragraph
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div
          ref={contentRef}
          style={{
            minHeight: '300px',
            border: '2px solid #007bff',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <h4>Monitored Content Area</h4>
          <p>This is the initial content. Use the buttons above to make changes.</p>
        </div>

        <div>
          <h4>Change Log (Last 20):</h4>
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '10px'
          }}>
            {changeLog.length === 0 ? (
              <p style={{ color: '#6c757d' }}>No changes detected yet</p>
            ) : (
              changeLog.map((change, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    marginBottom: '8px',
                    backgroundColor: change.type === 'childList' ? '#e3f2fd' :
                                   change.type === 'attributes' ? '#fff3e0' : '#f3e5f5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {change.type.toUpperCase()}
                  </div>
                  <div>{change.description}</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                    {change.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Third-Party Integration Monitor

```tsx
import { useMutationObserver, useRef, useState, useEffect } from 'frosty';

function ThirdPartyIntegrationMonitor() {
  const integrationRef = useRef<HTMLDivElement>(null);
  const [thirdPartyChanges, setThirdPartyChanges] = useState<string[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useMutationObserver(
    isMonitoring ? integrationRef : null,
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const description = `Third-party added: ${node.tagName} ${
                node.className ? `(class: ${node.className})` : ''
              }`;
              setThirdPartyChanges(prev => [description, ...prev].slice(0, 10));
            }
          });
        }
      });
    },
    {
      childList: true,
      subtree: true
    }
  );

  // Simulate third-party scripts adding content
  const simulateThirdPartyScript = () => {
    if (integrationRef.current) {
      const widgets = [
        { tag: 'div', class: 'ad-banner', content: '📢 Advertisement' },
        { tag: 'iframe', class: 'social-widget', content: '' },
        { tag: 'script', class: 'analytics-tracker', content: '' },
        { tag: 'div', class: 'chat-widget', content: '💬 Chat Support' },
        { tag: 'div', class: 'popup-modal', content: '🎯 Special Offer!' }
      ];

      const randomWidget = widgets[Math.floor(Math.random() * widgets.length)];
      const element = document.createElement(randomWidget.tag);
      element.className = randomWidget.class;
      element.textContent = randomWidget.content;
      
      if (randomWidget.tag === 'iframe') {
        element.setAttribute('src', 'about:blank');
        element.style.width = '300px';
        element.style.height = '200px';
      }
      
      element.style.padding = '15px';
      element.style.margin = '10px';
      element.style.backgroundColor = '#fff3cd';
      element.style.border = '1px solid #ffeaa7';
      element.style.borderRadius = '4px';
      element.style.display = 'block';

      integrationRef.current.appendChild(element);

      // Simulate removal after some time
      setTimeout(() => {
        if (element.parentNode) {
          element.remove();
        }
      }, 3000 + Math.random() * 2000);
    }
  };

  useEffect(() => {
    // Simulate third-party scripts running periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance
        simulateThirdPartyScript();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>Third-Party Integration Monitor</h3>
      <p>This demonstrates monitoring DOM changes from external scripts, ads, widgets, etc.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsMonitoring(!isMonitoring)}
          style={{
            backgroundColor: isMonitoring ? '#dc3545' : '#28a745',
            color: 'white',
            marginRight: '10px'
          }}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
        <button onClick={simulateThirdPartyScript}>
          Simulate Third-Party Widget
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div
          ref={integrationRef}
          style={{
            minHeight: '400px',
            border: '2px dashed #6c757d',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            position: 'relative'
          }}
        >
          <h4>Third-Party Integration Area</h4>
          <p>External scripts will dynamically add content here.</p>
          <p>Widgets appear and disappear automatically to simulate real third-party behavior.</p>
          
          {!isMonitoring && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '18px'
            }}>
              Monitoring Disabled
            </div>
          )}
        </div>

        <div>
          <h4>Detected Changes:</h4>
          <div style={{
            maxHeight: '350px',
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '15px'
          }}>
            {thirdPartyChanges.length === 0 ? (
              <p style={{ color: '#6c757d' }}>
                {isMonitoring ? 'Waiting for changes...' : 'Monitoring disabled'}
              </p>
            ) : (
              thirdPartyChanges.map((change, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    fontSize: '14px',
                    borderLeft: '3px solid #28a745'
                  }}
                >
                  {change}
                </div>
              ))
            )}
          </div>
          
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Use cases:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
              <li>Ad blocker detection</li>
              <li>Widget load monitoring</li>
              <li>Content security tracking</li>
              <li>Performance impact analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support in Chrome 26+, Firefox 14+, Safari 7+
- **IE Support**: Internet Explorer 11+
- **Universal Availability**: One of the most widely supported modern APIs

## Common Use Cases

- **Form Validation**: Track validation state changes and error messages
- **Content Management**: Monitor dynamic content additions/removals
- **Third-Party Integration**: Watch for external script modifications
- **Accessibility**: Track ARIA attribute changes and dynamic content for screen readers
- **Security**: Monitor for unexpected DOM modifications
- **Analytics**: Track user-generated content changes
- **Performance**: Monitor DOM complexity changes

## Performance Considerations

- **Efficient Observation**: MutationObserver is more efficient than polling or event listeners
- **Batch Processing**: Mutations are batched and delivered asynchronously
- **Selective Observation**: Use specific options to avoid unnecessary callbacks
- **Subtree Caution**: Be careful with `subtree: true` on large DOM trees

## Notes

- **Asynchronous**: Mutation callbacks are called asynchronously after DOM changes
- **Batch Delivery**: Multiple mutations are delivered together for efficiency
- **Automatic Cleanup**: Observers are automatically disconnected when components unmount
- **Node vs Element**: Can observe any Node, not just Elements (includes text nodes, comments, etc.)

## See Also

- [useResizeObserver](./useResizeObserver.md) – Observe element size changes.
- [useIntersectionObserver](./useIntersectionObserver.md) – Observe element visibility changes.
- [useRef](./useRef.md) – Create references to DOM elements for observation.
