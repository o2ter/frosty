# useResourceErrors

The `useResourceErrors` hook allows you to access the list of errors being tracked in the `ResourceErrors` context. This hook provides a way to monitor, display, and manage errors from asynchronous resource operations across your application.

## Features

- **Error Monitoring**: Access all resource errors from a centralized location
- **Retry Support**: Each error includes a retry function to re-attempt failed operations
- **Status Tracking**: Monitor loading and refreshing states for each error
- **Unique Identification**: Each error has a unique token for tracking purposes

## Usage

```tsx
import { useResourceErrors } from 'frosty';

function ErrorDisplay() {
  const errors = useResourceErrors();

  if (errors.length === 0) {
    return <div>No errors to display</div>;
  }

  return (
    <div className="error-list">
      <h3>Application Errors ({errors.length})</h3>
      {errors.map(({ token, error, refresh, refreshing, loading }) => (
        <div key={token} className="error-item">
          <div className="error-message">
            Error: {error instanceof Error ? error.message : String(error)}
          </div>
          <div className="error-actions">
            <button 
              onClick={refresh} 
              disabled={refreshing || loading}
              className={refreshing ? 'refreshing' : ''}
            >
              {refreshing ? 'Retrying...' : loading ? 'Loading...' : 'Retry'}
            </button>
          </div>
          {loading && <div className="error-status">Operation in progress...</div>}
        </div>
      ))}
    </div>
  );
}
```

## Parameters

The `useResourceErrors` hook takes no parameters.

## Returns

An array of error objects, where each error object contains:

- **token**: `string` - A unique identifier for the error
- **error**: `any` - The error object or message from the failed operation
- **refresh**: `() => Promise<void>` - Function to retry the operation that caused the error
- **refreshing**: `boolean` - Whether the operation is currently being retried
- **loading**: `boolean` - Whether the operation is still in progress

## Requirements

This hook must be used within a component that is wrapped by the `ResourceErrors` provider component. If no provider is found, a default context will be created automatically.

## Examples

### Basic Error List

```tsx
import { useResourceErrors } from 'frosty';

function SimpleErrorList() {
  const errors = useResourceErrors();

  return (
    <div>
      {errors.length > 0 ? (
        <ul>
          {errors.map(({ token, error, refresh }) => (
            <li key={token}>
              {error.message || error}
              <button onClick={refresh}>Retry</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No errors</p>
      )}
    </div>
  );
}
```

### Advanced Error Management

```tsx
import { useResourceErrors } from 'frosty';
import { useState } from 'frosty';

function ErrorManager() {
  const errors = useResourceErrors();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleErrors = errors.filter(error => !dismissed.has(error.token));

  const dismissError = (token: string) => {
    setDismissed(prev => new Set([...prev, token]));
  };

  const retryAll = async () => {
    const retryPromises = visibleErrors.map(({ refresh }) => refresh());
    await Promise.allSettled(retryPromises);
  };

  const clearDismissed = () => {
    setDismissed(new Set());
  };

  return (
    <div className="error-manager">
      <div className="error-header">
        <h3>Errors ({visibleErrors.length})</h3>
        {visibleErrors.length > 1 && (
          <button onClick={retryAll}>Retry All</button>
        )}
        {dismissed.size > 0 && (
          <button onClick={clearDismissed}>Show Dismissed</button>
        )}
      </div>

      {visibleErrors.map(({ token, error, refresh, refreshing, loading }) => (
        <div key={token} className="error-card">
          <div className="error-content">
            <strong>Error:</strong> {error.message || error}
          </div>
          
          <div className="error-meta">
            <span>ID: {token.slice(0, 8)}...</span>
            {loading && <span className="status">Loading</span>}
            {refreshing && <span className="status">Retrying</span>}
          </div>

          <div className="error-actions">
            <button 
              onClick={refresh} 
              disabled={refreshing || loading}
            >
              {refreshing ? 'Retrying...' : 'Retry'}
            </button>
            <button 
              onClick={() => dismissError(token)}
              className="dismiss-btn"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}

      {visibleErrors.length === 0 && errors.length > 0 && (
        <p>All errors have been dismissed. <button onClick={clearDismissed}>Show All</button></p>
      )}
    </div>
  );
}
```

### Error Toast Notifications

```tsx
import { useResourceErrors } from 'frosty';
import { useEffect, useState } from 'frosty';

function ErrorToasts() {
  const errors = useResourceErrors();
  const [notifications, setNotifications] = useState<Array<{
    token: string;
    message: string;
    timestamp: number;
  }>>([]);

  // Convert errors to notifications
  useEffect(() => {
    const newNotifications = errors
      .filter(error => !notifications.some(n => n.token === error.token))
      .map(error => ({
        token: error.token,
        message: error.error instanceof Error ? error.error.message : String(error.error),
        timestamp: Date.now(),
      }));

    if (newNotifications.length > 0) {
      setNotifications(prev => [...prev, ...newNotifications]);
    }
  }, [errors]);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    const timers = notifications.map(notification => 
      setTimeout(() => {
        setNotifications(prev => 
          prev.filter(n => n.token !== notification.token)
        );
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications]);

  const dismissNotification = (token: string) => {
    setNotifications(prev => prev.filter(n => n.token !== token));
  };

  return (
    <div className="toast-container">
      {notifications.map(({ token, message, timestamp }) => {
        const error = errors.find(e => e.token === token);
        return (
          <div key={token} className="toast error-toast">
            <div className="toast-content">
              <strong>Error:</strong> {message}
            </div>
            <div className="toast-actions">
              {error && (
                <button 
                  onClick={error.refresh}
                  disabled={error.refreshing}
                  className="retry-btn"
                >
                  {error.refreshing ? '⟳' : '↻'}
                </button>
              )}
              <button 
                onClick={() => dismissNotification(token)}
                className="close-btn"
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Error Analytics

```tsx
import { useResourceErrors } from 'frosty';
import { useEffect, useMemo } from 'frosty';

function ErrorAnalytics() {
  const errors = useResourceErrors();

  const errorStats = useMemo(() => {
    const stats = {
      total: errors.length,
      loading: errors.filter(e => e.loading).length,
      refreshing: errors.filter(e => e.refreshing).length,
      failed: errors.filter(e => !e.loading && !e.refreshing).length,
      errorTypes: {} as Record<string, number>,
    };

    errors.forEach(({ error }) => {
      const type = error instanceof Error ? error.constructor.name : typeof error;
      stats.errorTypes[type] = (stats.errorTypes[type] || 0) + 1;
    });

    return stats;
  }, [errors]);

  // Log error statistics
  useEffect(() => {
    if (errors.length > 0) {
      console.log('Error Statistics:', errorStats);
    }
  }, [errorStats]);

  return (
    <div className="error-analytics">
      <h4>Error Analytics</h4>
      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Total Errors:</span>
          <span className="stat-value">{errorStats.total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Loading:</span>
          <span className="stat-value">{errorStats.loading}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Retrying:</span>
          <span className="stat-value">{errorStats.refreshing}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Failed:</span>
          <span className="stat-value">{errorStats.failed}</span>
        </div>
      </div>

      {Object.keys(errorStats.errorTypes).length > 0 && (
        <div className="error-types">
          <h5>Error Types:</h5>
          <ul>
            {Object.entries(errorStats.errorTypes).map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Integration with ResourceErrors

To use this hook, wrap your application or component tree with the `ResourceErrors` provider:

```tsx
import { ResourceErrors, useResourceErrors } from 'frosty';

function App() {
  return (
    <ResourceErrors>
      <ErrorDisplay />
      <MyApplication />
    </ResourceErrors>
  );
}

function ErrorDisplay() {
  const errors = useResourceErrors();
  // Component implementation
}
```

## Notes

- **Provider Requirement**: Must be used within a `ResourceErrors` provider component
- **Automatic Integration**: Resource hooks (`useResource`, `useIterableResource`) automatically register their errors with this system
- **Error Lifecycle**: Errors are automatically removed when the originating component unmounts or the error is resolved
- **Memory Management**: The error list is automatically cleaned up to prevent memory leaks
- **Default Context**: If no provider is found, a default context is created, but explicit providers are recommended for better control

## Best Practices

1. **Centralized Error Display**: Use this hook to create a global error display component
2. **Error Categorization**: Group errors by type or source for better user experience
3. **Automatic Retry**: Implement intelligent retry logic with exponential backoff
4. **User Feedback**: Provide clear feedback about error states and retry attempts
5. **Logging**: Log errors for debugging and analytics purposes

## See Also

- [ResourceErrors](./useResource.md#resourceerrors) – The context provider component for error management
- [useResource](./useResource.md) – Hook for managing asynchronous resources
- [useIterableResource](./useResource.md#useiterableresource) – Hook for managing iterable resources
- [ErrorBoundary](../components/ErrorBoundary.md) – Component for catching render errors
