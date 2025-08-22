# useRendererStorage

The `useRendererStorage` hook provides renderer-scoped persistent storage that maintains data across component renders and updates. This storage is tied to the specific renderer instance and provides a way to store data that persists beyond individual component lifecycles.

## Features

- **Renderer-Scoped**: Storage is isolated per renderer instance
- **Persistent**: Data persists across component unmounts and remounts
- **WeakMap Based**: Uses WeakMap for efficient memory management and garbage collection
- **Type Safe**: Full TypeScript support with generic typing
- **Cross-Component**: Share data between different components within the same renderer

## Usage

```tsx
import { useRendererStorage } from 'frosty';
import { useState, useEffect } from 'frosty';

interface AppPreferences {
  theme: 'light' | 'dark';
  language: string;
  autoSave: boolean;
  notifications: boolean;
}

function PreferencesManager() {
  const [preferences, setPreferences] = useRendererStorage<AppPreferences>(
    'user-preferences',
    {
      theme: 'light',
      language: 'en',
      autoSave: true,
      notifications: true
    }
  );

  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const updatePreference = <K extends keyof AppPreferences>(
    key: K, 
    value: AppPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setIsDirty(true);
  };

  const savePreferences = () => {
    // In a real app, this would persist to a backend
    console.log('Saving preferences:', preferences);
    setIsDirty(false);
    setLastSaved(new Date());
  };

  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      language: 'en',
      autoSave: true,
      notifications: true
    });
    setIsDirty(true);
  };

  // Auto-save when enabled
  useEffect(() => {
    if (preferences.autoSave && isDirty) {
      const timeout = setTimeout(savePreferences, 2000);
      return () => clearTimeout(timeout);
    }
  }, [preferences.autoSave, isDirty]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Application Preferences</h2>
      <p style={{ color: '#6c757d', marginBottom: '30px' }}>
        These settings are stored in renderer storage and persist across component updates
      </p>

      <div style={{
        display: 'grid',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Theme Setting */}
        <div style={{
          padding: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: preferences.theme === 'dark' ? '#2d3748' : '#ffffff',
          color: preferences.theme === 'dark' ? '#ffffff' : '#000000'
        }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Theme</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => updatePreference('theme', 'light')}
              style={{
                padding: '8px 16px',
                backgroundColor: preferences.theme === 'light' ? '#007bff' : 'transparent',
                color: preferences.theme === 'light' ? 'white' : (preferences.theme === 'dark' ? 'white' : 'black'),
                border: `1px solid ${preferences.theme === 'light' ? '#007bff' : '#dee2e6'}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => updatePreference('theme', 'dark')}
              style={{
                padding: '8px 16px',
                backgroundColor: preferences.theme === 'dark' ? '#007bff' : 'transparent',
                color: preferences.theme === 'dark' ? 'white' : (preferences.theme === 'dark' ? 'white' : 'black'),
                border: `1px solid ${preferences.theme === 'dark' ? '#007bff' : '#dee2e6'}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* Language Setting */}
        <div style={{
          padding: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: preferences.theme === 'dark' ? '#2d3748' : '#ffffff',
          color: preferences.theme === 'dark' ? '#ffffff' : '#000000'
        }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Language</h4>
          <select
            value={preferences.language}
            onChange={(e) => updatePreference('language', e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              backgroundColor: preferences.theme === 'dark' ? '#4a5568' : 'white',
              color: preferences.theme === 'dark' ? 'white' : 'black',
              width: '200px'
            }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="zh">🇨🇳 中文</option>
          </select>
        </div>

        {/* Boolean Settings */}
        <div style={{
          padding: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: preferences.theme === 'dark' ? '#2d3748' : '#ffffff',
          color: preferences.theme === 'dark' ? '#ffffff' : '#000000'
        }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Features</h4>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={preferences.autoSave}
                onChange={(e) => updatePreference('autoSave', e.target.checked)}
                style={{ transform: 'scale(1.2)' }}
              />
              <span>💾 Auto-save preferences</span>
            </label>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => updatePreference('notifications', e.target.checked)}
                style={{ transform: 'scale(1.2)' }}
              />
              <span>🔔 Enable notifications</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: preferences.theme === 'dark' ? '#2d3748' : '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{
          fontSize: '14px',
          color: preferences.theme === 'dark' ? '#a0aec0' : '#6c757d'
        }}>
          {isDirty ? (
            <span style={{ color: '#ffc107' }}>⚠️ Unsaved changes</span>
          ) : lastSaved ? (
            <span style={{ color: '#28a745' }}>
              ✅ Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>No changes</span>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={resetPreferences}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: preferences.theme === 'dark' ? '#ffffff' : '#6c757d',
              border: `1px solid ${preferences.theme === 'dark' ? '#4a5568' : '#dee2e6'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset to Defaults
          </button>
          
          {!preferences.autoSave && (
            <button
              onClick={savePreferences}
              disabled={!isDirty}
              style={{
                padding: '8px 16px',
                backgroundColor: isDirty ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isDirty ? 'pointer' : 'not-allowed'
              }}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <details style={{ marginTop: '30px' }}>
        <summary style={{ 
          cursor: 'pointer', 
          padding: '10px',
          backgroundColor: preferences.theme === 'dark' ? '#2d3748' : '#e9ecef',
          borderRadius: '4px'
        }}>
          Debug Info
        </summary>
        <pre style={{
          padding: '15px',
          backgroundColor: preferences.theme === 'dark' ? '#1a202c' : '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          marginTop: '10px',
          fontSize: '12px',
          color: preferences.theme === 'dark' ? '#e2e8f0' : '#495057',
          overflow: 'auto'
        }}>
          {JSON.stringify(preferences, null, 2)}
        </pre>
      </details>
    </div>
  );
}
```

## Parameters

1. **key**: `string` - The unique identifier for the stored data.
2. **defaultValue**: `T` - The default value to use if no data exists for the key.

## Returns

`[T, (value: T | ((prev: T) => T)) => void]` - A tuple containing:
- The current stored value
- A setter function to update the stored value

## Examples

### Cross-Component Shopping Cart

```tsx
import { useRendererStorage } from 'frosty';
import { useState } from 'frosty';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartData {
  items: CartItem[];
  total: number;
  lastUpdated: string;
}

// Shopping Cart Hook
function useShoppingCart() {
  const [cartData, setCartData] = useRendererStorage<CartData>('shopping-cart', {
    items: [],
    total: 0,
    lastUpdated: new Date().toISOString()
  });

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setCartData(prev => {
      const existingItem = prev.items.find(item => item.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prev.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity: 1 }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        total: newTotal,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const removeItem = (productId: string) => {
    setCartData(prev => {
      const newItems = prev.items.filter(item => item.id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        total: newTotal,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCartData(prev => {
      const newItems = prev.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        total: newTotal,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const clearCart = () => {
    setCartData({
      items: [],
      total: 0,
      lastUpdated: new Date().toISOString()
    });
  };

  return {
    cartData,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: cartData.items.reduce((sum, item) => sum + item.quantity, 0)
  };
}

// Product List Component
function ProductList() {
  const { addItem } = useShoppingCart();
  
  const products = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      image: '🎧',
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: '⌚',
      description: 'Advanced fitness tracking and smartphone integration'
    },
    {
      id: '3',
      name: 'Laptop Stand',
      price: 49.99,
      image: '💻',
      description: 'Ergonomic adjustable laptop stand for better posture'
    },
    {
      id: '4',
      name: 'Bluetooth Speaker',
      price: 89.99,
      image: '🔊',
      description: 'Portable speaker with rich sound and long battery life'
    }
  ];

  return (
    <div>
      <h3>Products</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white'
            }}
          >
            <div style={{
              fontSize: '48px',
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              {product.image}
            </div>
            <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
            <p style={{
              color: '#6c757d',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              {product.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                ${product.price}
              </span>
              <button
                onClick={() => addItem(product)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart Component
function ShoppingCartWidget() {
  const { cartData, removeItem, updateQuantity, clearCart, itemCount } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div style={{ position: 'relative' }}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        🛒
        {itemCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '400px',
          maxHeight: '500px',
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '15px',
            borderBottom: '1px solid #dee2e6',
            backgroundColor: '#f8f9fa'
          }}>
            <h4 style={{ margin: '0' }}>Shopping Cart ({itemCount} items)</h4>
          </div>

          <div style={{
            maxHeight: '350px',
            overflowY: 'auto',
            padding: '10px'
          }}>
            {cartData.items.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#6c757d'
              }}>
                Your cart is empty
              </div>
            ) : (
              cartData.items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #f8f9fa'
                  }}
                >
                  <div style={{
                    fontSize: '24px',
                    marginRight: '10px'
                  }}>
                    {item.image}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                      {formatPrice(item.price)} each
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid #dee2e6',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      −
                    </button>
                    
                    <span style={{
                      minWidth: '30px',
                      textAlign: 'center',
                      fontSize: '14px'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid #dee2e6',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: 'none',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartData.items.length > 0 && (
            <div style={{
              padding: '15px',
              borderTop: '1px solid #dee2e6',
              backgroundColor: '#f8f9fa'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <strong>Total: {formatPrice(cartData.total)}</strong>
                <button
                  onClick={clearCart}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    color: '#dc3545',
                    border: '1px solid #dc3545',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Clear Cart
                </button>
              </div>
              
              <button style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Main App Component
function ShoppingApp() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Shopping Demo</h1>
      <p style={{ color: '#6c757d', marginBottom: '40px' }}>
        Cart data is stored in renderer storage and persists across component updates
      </p>
      
      <ProductList />
      <ShoppingCartWidget />
    </div>
  );
}
```

### Form State Management

```tsx
import { useRendererStorage } from 'frosty';
import { useState, useEffect } from 'frosty';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    marketing: boolean;
  };
  currentStep: number;
  isCompleted: boolean;
  lastModified: string;
}

function MultiStepFormManager() {
  const [formData, setFormData] = useRendererStorage<FormData>('multi-step-form', {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    preferences: {
      newsletter: false,
      notifications: true,
      marketing: false
    },
    currentStep: 1,
    isCompleted: false,
    lastModified: new Date().toISOString()
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof data === 'object' && data !== null 
        ? { ...prev[section], ...data }
        : data,
      lastModified: new Date().toISOString()
    }));
  };

  const nextStep = () => {
    if (formData.currentStep < 4) {
      updateFormData('currentStep', formData.currentStep + 1);
    }
  };

  const prevStep = () => {
    if (formData.currentStep > 1) {
      updateFormData('currentStep', formData.currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    const errors: string[] = [];

    switch (formData.currentStep) {
      case 1:
        if (!formData.personalInfo.firstName) errors.push('First name is required');
        if (!formData.personalInfo.lastName) errors.push('Last name is required');
        if (!formData.personalInfo.email) errors.push('Email is required');
        if (formData.personalInfo.email && !formData.personalInfo.email.includes('@')) {
          errors.push('Valid email is required');
        }
        break;
      case 2:
        if (!formData.address.street) errors.push('Street address is required');
        if (!formData.address.city) errors.push('City is required');
        if (!formData.address.state) errors.push('State is required');
        if (!formData.address.zipCode) errors.push('ZIP code is required');
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const submitForm = () => {
    if (validateCurrentStep()) {
      updateFormData('isCompleted', true);
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
      },
      preferences: {
        newsletter: false,
        notifications: true,
        marketing: false
      },
      currentStep: 1,
      isCompleted: false,
      lastModified: new Date().toISOString()
    });
    setValidationErrors([]);
  };

  const getStepTitle = () => {
    switch (formData.currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Address Information';
      case 3: return 'Preferences';
      case 4: return 'Review & Submit';
      default: return 'Form';
    }
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => updateFormData('personalInfo', { firstName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => updateFormData('personalInfo', { lastName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updateFormData('personalInfo', { email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => updateFormData('personalInfo', { phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Street Address *
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => updateFormData('address', { street: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  City *
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => updateFormData('address', { city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  State *
                </label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => updateFormData('address', { state: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => updateFormData('address', { zipCode: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Country
              </label>
              <select
                value={formData.address.country}
                onChange={(e) => updateFormData('address', { country: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <h4>Communication Preferences</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { key: 'newsletter', label: 'Newsletter updates', description: 'Receive our monthly newsletter' },
                  { key: 'notifications', label: 'Push notifications', description: 'Get notified about important updates' },
                  { key: 'marketing', label: 'Marketing communications', description: 'Receive promotional offers and deals' }
                ].map(({ key, label, description }) => (
                  <label key={key} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '15px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.preferences[key as keyof typeof formData.preferences]}
                      onChange={(e) => updateFormData('preferences', { [key]: e.target.checked })}
                      style={{ marginTop: '2px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{label}</div>
                      <div style={{ fontSize: '14px', color: '#6c757d' }}>{description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <h4>Personal Information</h4>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div><strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</div>
                <div><strong>Email:</strong> {formData.personalInfo.email}</div>
                {formData.personalInfo.phone && (
                  <div><strong>Phone:</strong> {formData.personalInfo.phone}</div>
                )}
              </div>
            </div>
            
            <div>
              <h4>Address</h4>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div>{formData.address.street}</div>
                <div>{formData.address.city}, {formData.address.state} {formData.address.zipCode}</div>
                <div>{formData.address.country}</div>
              </div>
            </div>
            
            <div>
              <h4>Preferences</h4>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div>Newsletter: {formData.preferences.newsletter ? 'Yes' : 'No'}</div>
                <div>Notifications: {formData.preferences.notifications ? 'Yes' : 'No'}</div>
                <div>Marketing: {formData.preferences.marketing ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Multi-Step Form</h2>
      
      {/* Progress Bar */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span>Step {formData.currentStep} of 4</span>
          <span style={{ fontSize: '14px', color: '#6c757d' }}>
            Last modified: {new Date(formData.lastModified).toLocaleString()}
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(formData.currentStep / 4) * 100}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      {/* Step Content */}
      <div style={{
        padding: '30px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: 'white',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>{getStepTitle()}</h3>
        {renderStep()}
        
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            color: '#721c24'
          }}>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {formData.currentStep > 1 && (
            <button
              onClick={prevStep}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Previous
            </button>
          )}
        </div>

        <button
          onClick={resetForm}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#dc3545',
            border: '1px solid #dc3545',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Reset Form
        </button>

        <div>
          {formData.currentStep < 4 ? (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitForm}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {formData.isCompleted && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          color: '#155724',
          textAlign: 'center'
        }}>
          ✅ Form submitted successfully!
        </div>
      )}
    </div>
  );
}
```

## Browser Support

- **Universal**: Works in all environments where Frosty is supported
- **Memory Efficient**: Uses WeakMap for automatic garbage collection
- **Cross-Platform**: Consistent behavior across different platforms

## Common Use Cases

- **User Preferences**: Store application settings and user preferences
- **Form State**: Maintain form data across multiple steps or sessions
- **Shopping Carts**: Persist cart contents across page navigation
- **UI State**: Remember collapsed/expanded states, selected tabs, etc
- **Cache Management**: Store computed or fetched data temporarily
- **Cross-Component Communication**: Share data between disconnected components

## Performance Considerations

- **WeakMap Storage**: Automatically cleans up when renderer is garbage collected
- **Efficient Updates**: Only stores data that actually changes
- **Memory Optimization**: Data is tied to renderer lifecycle
- **No Serialization**: Direct object storage without JSON parsing overhead

## Notes

- **Renderer Scope**: Data is isolated per renderer instance
- **Lifecycle**: Data persists until the renderer is destroyed
- **Memory Management**: Uses WeakMap for automatic cleanup
- **Type Safety**: Full TypeScript support with generic typing

## See Also

- [useState](./useState.md) – Manage component-level state.
- [useLocalStorage](./useLocalStorage.md) – Persist data in browser localStorage.
- [useSessionStorage](./useSessionStorage.md) – Store data for the session duration.
