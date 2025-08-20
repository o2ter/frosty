# useSessionStorage

The `useSessionStorage` hook provides a way to synchronize component state with the browser's sessionStorage, allowing data to persist only for the current browser session. Unlike localStorage, sessionStorage data is cleared when the tab is closed but syncs across the same tab/window.

## Features

- **Session Persistence**: Data persists across page reloads but only for the current session
- **Same-Tab Synchronization**: Automatically syncs with sessionStorage changes within the same tab
- **Type Safety**: Maintains string and null types for sessionStorage values
- **Error Handling**: Gracefully handles sessionStorage errors (quota exceeded, disabled storage, etc.).
- **Automatic Cleanup**: Removes items when set to null or undefined

## Usage

```tsx
import { useSessionStorage } from 'frosty';

function SessionForm() {
  const [formData, setFormData] = useSessionStorage('form-draft', '');
  const [step, setStep] = useSessionStorage('form-step', '1');

  return (
    <div>
      <h2>Multi-step Form (Step {step})</h2>
      <textarea
        value={formData || ''}
        onChange={(e) => setFormData(e.target.value)}
        placeholder="Enter your data..."
      />
      <button onClick={() => setStep('2')}>Next Step</button>
      <button onClick={() => {
        setFormData(null);
        setStep('1');
      }}>
        Reset Form
      </button>
    </div>
  );
}
```

## Parameters

1. **key**: `string` - The sessionStorage key to use for storing the value.
2. **initialValue**: `string | null` (optional) - The default value to use when no value exists in sessionStorage.

## Returns

A tuple containing:
- **value**: `string | null` - The current value from sessionStorage or the initial value
- **setValue**: `(value: string | null | undefined | ((prev: string | null | undefined) => string | null | undefined)) => void` - Function to update the sessionStorage value

## Examples

### Basic Usage

```tsx
import { useSessionStorage } from 'frosty';

function TabSettings() {
  const [viewMode, setViewMode] = useSessionStorage('view-mode', 'grid');

  return (
    <div>
      <h2>Current View: {viewMode}</h2>
      <button onClick={() => setViewMode('grid')}>Grid View</button>
      <button onClick={() => setViewMode('list')}>List View</button>
      <button onClick={() => setViewMode('card')}>Card View</button>
    </div>
  );
}
```

### Temporary Form State

```tsx
import { useSessionStorage } from 'frosty';

function TemporaryNote() {
  const [note, setNote] = useSessionStorage('temp-note', '');
  const [lastSaved, setLastSaved] = useSessionStorage('last-saved', '');

  const saveNote = () => {
    // Simulate saving to server
    console.log('Saving note:', note);
    setLastSaved(new Date().toLocaleTimeString());
  };

  const clearNote = () => {
    setNote(null);
    setLastSaved(null);
  };

  return (
    <div>
      <h2>Temporary Note</h2>
      <textarea
        value={note || ''}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your temporary note here..."
        rows={10}
        style={{ width: '100%' }}
      />
      <div>
        <button onClick={saveNote}>Save Note</button>
        <button onClick={clearNote}>Clear Note</button>
        {lastSaved && <p>Last saved: {lastSaved}</p>}
      </div>
    </div>
  );
}
```

### Shopping Session

```tsx
import { useSessionStorage } from 'frosty';

function ShoppingSession() {
  const [sessionCart, setSessionCart] = useSessionStorage('session-cart', '[]');
  const [currentCategory, setCurrentCategory] = useSessionStorage('current-category', 'all');

  const addToCart = (item) => {
    setSessionCart((currentCart) => {
      const items = JSON.parse(currentCart || '[]');
      items.push({ ...item, addedAt: Date.now() });
      return JSON.stringify(items);
    });
  };

  const clearSession = () => {
    setSessionCart(null);
    setCurrentCategory('all');
  };

  const cartItems = JSON.parse(sessionCart || '[]');

  return (
    <div>
      <h2>Shopping Session</h2>
      <p>Category: {currentCategory}</p>
      <p>Cart Items: {cartItems.length}</p>
      
      <select 
        value={currentCategory || 'all'} 
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      <button onClick={() => addToCart({
        id: Date.now(),
        name: 'Sample Item',
        category: currentCategory
      })}>
        Add Sample Item
      </button>

      <button onClick={clearSession}>Clear Session</button>

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category} 
            (added: {new Date(item.addedAt).toLocaleTimeString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Wizard Progress

```tsx
import { useSessionStorage } from 'frosty';

function SetupWizard() {
  const [currentStep, setCurrentStep] = useSessionStorage('wizard-step', '1');
  const [wizardData, setWizardData] = useSessionStorage('wizard-data', '{}');

  const updateWizardData = (stepData) => {
    setWizardData((current) => {
      const data = JSON.parse(current || '{}');
      return JSON.stringify({ ...data, ...stepData });
    });
  };

  const nextStep = () => {
    const step = parseInt(currentStep || '1');
    setCurrentStep((step + 1).toString());
  };

  const prevStep = () => {
    const step = parseInt(currentStep || '1');
    if (step > 1) setCurrentStep((step - 1).toString());
  };

  const resetWizard = () => {
    setCurrentStep('1');
    setWizardData('{}');
  };

  const data = JSON.parse(wizardData || '{}');
  const step = parseInt(currentStep || '1');

  return (
    <div>
      <h2>Setup Wizard - Step {step}</h2>
      
      {step === 1 && (
        <div>
          <h3>Personal Information</h3>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => updateWizardData({ name: e.target.value })}
            placeholder="Name"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Preferences</h3>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => updateWizardData({ email: e.target.value })}
            placeholder="Email"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Review</h3>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}

      <div>
        {step > 1 && <button onClick={prevStep}>Previous</button>}
        {step < 3 && <button onClick={nextStep}>Next</button>}
        <button onClick={resetWizard}>Reset</button>
      </div>
    </div>
  );
}
```

### Functional Updates

```tsx
import { useSessionStorage } from 'frosty';

function CounterSession() {
  const [counter, setCounter] = useSessionStorage('session-counter', '0');

  const increment = () => {
    setCounter((current) => {
      const num = parseInt(current || '0');
      return (num + 1).toString();
    });
  };

  const decrement = () => {
    setCounter((current) => {
      const num = parseInt(current || '0');
      return (num - 1).toString();
    });
  };

  const reset = () => {
    setCounter('0');
  };

  return (
    <div>
      <h2>Session Counter: {counter}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## sessionStorage vs localStorage

| Feature | sessionStorage | localStorage |
|---------|----------------|--------------|
| **Persistence** | Until tab/window closes | Until explicitly cleared |
| **Scope** | Single tab/window | All tabs/windows |
| **Cross-tab sync** | No | Yes |
| **Use cases** | Temporary session data | Long-term user preferences |

## Error Handling

The hook automatically handles sessionStorage errors:

- **Storage Disabled**: When sessionStorage is disabled by the browser
- **Quota Exceeded**: When the storage quota is full
- **Security Restrictions**: When running in certain contexts

Errors are logged to the console, and the hook continues to function with in-memory state only.

## Common Use Cases

- **Form Drafts**: Save form progress temporarily
- **Wizard State**: Maintain multi-step process state
- **View Preferences**: Remember view modes for the current session
- **Temporary Calculations**: Store intermediate results
- **Navigation State**: Remember expanded/collapsed states

## Notes

- **String Values Only**: sessionStorage only stores strings. Use `JSON.stringify`/`JSON.parse` for objects.
- **Session Scope**: Data is cleared when the tab is closed
- **No Cross-Tab Sync**: Unlike localStorage, sessionStorage doesn't sync across tabs
- **Same Origin**: Data is only accessible within the same origin (protocol + domain + port)

## See Also

- [useLocalStorage](./useLocalStorage.md) – Sync state with localStorage (persistent across sessions).
- [useState](./useState.md) – Manage local component state.
- [useEffect](./useEffect.md) – Perform side effects in functional components.
