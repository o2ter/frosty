# useSearchParams

The `useSearchParams` hook provides a convenient way to read and update URL search parameters (query string). It returns a `URLSearchParams` object for reading and a setter function for updating the URL parameters, automatically managing browser history.

## Features

- **URLSearchParams API**: Full access to the standard URLSearchParams interface
- **Automatic Updates**: Components re-render when search parameters change
- **History Management**: Choose between pushing new history entries or replacing current
- **Type Safety**: Works with any valid URLSearchParams initializer
- **Reactive**: Automatically syncs with URL changes from other sources

## Usage

```tsx
import { useSearchParams } from 'frosty/web';

function SearchInterface() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, category, page: 1 });
  };

  const updateCategory = (newCategory) => {
    setSearchParams({ q: query, category: newCategory, page: 1 });
  };

  const nextPage = () => {
    setSearchParams({ q: query, category, page: page + 1 });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      
      <select value={category} onChange={(e) => updateCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>

      <p>Results for "{query}" in {category} (Page {page})</p>
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
}
```

## Parameters

None - this hook takes no parameters.

## Returns

A tuple containing:
1. **searchParams**: `URLSearchParams` - The current search parameters object
2. **setSearchParams**: `(params, config?) => void` - Function to update search parameters

### setSearchParams Function

- **params**: `string | URLSearchParams | Array<[string, string]> | Record<string, string> | ((current: URLSearchParams) => URLSearchParams | string | Array | Record)` - New search parameters
- **config**: `{ replace?: boolean }` - Optional configuration
  - **replace**: `boolean` - If `true`, replaces current history entry instead of pushing new one

## Examples

### Basic Parameter Management

```tsx
import { useSearchParams } from 'frosty/web';

function FilterControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    inStock: searchParams.has('inStock')
  };

  const updateFilter = (key, value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };

  const toggleInStock = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (newParams.has('inStock')) {
        newParams.delete('inStock');
      } else {
        newParams.set('inStock', 'true');
      }
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <h3>Filters</h3>
      
      <select 
        value={filters.category} 
        onChange={(e) => updateFilter('category', e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={filters.priceMin}
        onChange={(e) => updateFilter('priceMin', e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={filters.priceMax}
        onChange={(e) => updateFilter('priceMax', e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={toggleInStock}
        />
        In Stock Only
      </label>

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
```

### Pagination Component

```tsx
import { useSearchParams } from 'frosty/web';

function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const goToPage = (page) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    }, { replace: true }); // Replace to avoid cluttering history
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div>
      <button onClick={prevPage} disabled={currentPage <= 1}>
        Previous
      </button>
      
      <span> Page {currentPage} of {totalPages} </span>
      
      <button onClick={nextPage} disabled={currentPage >= totalPages}>
        Next
      </button>

      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{
              fontWeight: page === currentPage ? 'bold' : 'normal',
              margin: '0 2px'
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Search with Debounce

```tsx
import { useSearchParams } from 'frosty/web';
import { useState } from 'frosty';
import { useEffect } from 'frosty';

function SearchWithDebounce() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (inputValue) {
          newParams.set('q', inputValue);
        } else {
          newParams.delete('q');
        }
        newParams.delete('page'); // Reset to page 1 on new search
        return newParams;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Update input when URL changes (e.g., back/forward navigation)
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== inputValue) {
      setInputValue(urlQuery);
    }
  }, [searchParams]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search with debounce..."
      />
      <p>Current search: {searchParams.get('q') || 'None'}</p>
    </div>
  );
}
```

### Complex Filter Form

```tsx
import { useSearchParams } from 'frosty/web';

function AdvancedFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentFilters = () => ({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    tags: searchParams.getAll('tags'),
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'relevance',
    sortOrder: searchParams.get('sortOrder') || 'asc'
  });

  const updateFilters = (updates) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'tags') {
          // Handle array values for tags
          newParams.delete('tags');
          value.forEach(tag => newParams.append('tags', tag));
        } else if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      return newParams;
    });
  };

  const filters = getCurrentFilters();

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    updateFilters({ tags: newTags });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>

      <div>
        <label>Tags:</label>
        {['popular', 'new', 'sale', 'featured'].map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={filters.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      <div>
        <label>Price Range:</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => updateFilters({ minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => updateFilters({ maxPrice: e.target.value })}
        />
      </div>

      <div>
        <label>Sort by:</label>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value })}
        >
          <option value="relevance">Relevance</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
        
        <select
          value={filters.sortOrder}
          onChange={(e) => updateFilters({ sortOrder: e.target.value })}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <button type="button" onClick={() => setSearchParams({})}>
        Clear All Filters
      </button>
    </form>
  );
}
```

### Tab Navigation

```tsx
import { useSearchParams } from 'frosty/web';

function TabNavigation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const setActiveTab = (tab) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', tab);
      return newParams;
    }, { replace: true });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'related', label: 'Related Items' }
  ];

  return (
    <div>
      <nav>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? '#007bff' : '#f8f9fa',
              color: activeTab === tab.id ? 'white' : 'black'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div>
        {activeTab === 'overview' && <div>Overview content...</div>}
        {activeTab === 'details' && <div>Details content...</div>}
        {activeTab === 'reviews' && <div>Reviews content...</div>}
        {activeTab === 'related' && <div>Related items...</div>}
      </div>
    </div>
  );
}
```

### URL State Synchronization

```tsx
import { useSearchParams } from 'frosty/web';
import { useState } from 'frosty';
import { useEffect } from 'frosty';

function StateSyncExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localState, setLocalState] = useState({
    name: '',
    age: '',
    city: ''
  });

  // Sync URL to local state
  useEffect(() => {
    setLocalState({
      name: searchParams.get('name') || '',
      age: searchParams.get('age') || '',
      city: searchParams.get('city') || ''
    });
  }, [searchParams]);

  // Sync local state to URL (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        
        Object.entries(localState).forEach(([key, value]) => {
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
        });

        return newParams;
      }, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [localState]);

  const updateField = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>Form with URL Sync</h3>
      <input
        placeholder="Name"
        value={localState.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <input
        placeholder="Age"
        value={localState.age}
        onChange={(e) => updateField('age', e.target.value)}
      />
      <input
        placeholder="City"
        value={localState.city}
        onChange={(e) => updateField('city', e.target.value)}
      />
      
      <p>Current URL: {window.location.search}</p>
    </div>
  );
}
```

## URLSearchParams Methods

The `searchParams` object provides the full URLSearchParams API:

- **get(name)**: Get the first value for a parameter
- **getAll(name)**: Get all values for a parameter
- **has(name)**: Check if a parameter exists
- **set(name, value)**: Set a parameter value
- **append(name, value)**: Add a parameter value
- **delete(name)**: Remove a parameter
- **keys()**: Iterate over parameter names
- **values()**: Iterate over parameter values
- **entries()**: Iterate over [name, value] pairs

## Common Patterns

### Parameter Defaults

```tsx
const page = parseInt(searchParams.get('page') || '1');
const limit = parseInt(searchParams.get('limit') || '10');
```

### Multiple Values

```tsx
const tags = searchParams.getAll('tags');
const selectedCategories = searchParams.getAll('category');
```

### Conditional Updates

```tsx
setSearchParams(prev => {
  const newParams = new URLSearchParams(prev);
  if (someCondition) {
    newParams.set('special', 'true');
  } else {
    newParams.delete('special');
  }
  return newParams;
});
```

## Notes

- **Automatic Encoding**: Parameter names and values are automatically URL-encoded
- **History Management**: By default, updates push new history entries. Use `{ replace: true }` to replace.
- **Reactive Updates**: Components automatically re-render when search parameters change
- **Browser Navigation**: Works seamlessly with browser back/forward buttons

## See Also

- [useLocation](./useLocation.md) – Access full location information and navigation methods.
- [useState](./useState.md) – Manage local component state.
- [useEffect](./useEffect.md) – React to search parameter changes.
