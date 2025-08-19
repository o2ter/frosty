# `useServerResource` Hook

The `useServerResource` hook provides a way to access server-side rendered data and manage resources during the SSR/hydration process. This hook enables sharing data between server and client during the initial page load, supporting data compression and efficient hydration.

## Features

- **SSR Data Sharing**: Access data that was rendered on the server during hydration.
- **Data Compression**: Automatic compression/decompression of large data sets.
- **Hydration Support**: Seamless integration with server-side rendering workflows.
- **Type Safety**: Full TypeScript support with proper typing.
- **Performance Optimized**: Efficient data transfer and storage mechanisms.

## Usage

```tsx
import { useServerResource, useState, useEffect } from 'frosty';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

function UserProfilePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Access server-side rendered user data
  const userProfile = useServerResource<UserProfile>('user-profile');
  
  // Access server-side rendered settings
  const serverSettings = useServerResource<Record<string, any>>('app-settings');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated && !userProfile) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div>Loading user profile...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: '#dc3545'
      }}>
        <h3>Profile Not Found</h3>
        <p>Unable to load user profile data.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>User Profile</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '30px',
        marginTop: '30px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={userProfile.avatar}
            alt={`${userProfile.name}'s avatar`}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #e9ecef'
            }}
          />
          <h2 style={{ marginTop: '15px', marginBottom: '5px' }}>
            {userProfile.name}
          </h2>
          <p style={{ color: '#6c757d', margin: '0' }}>
            {userProfile.email}
          </p>
        </div>

        <div>
          <h3>Profile Information</h3>
          <div style={{
            display: 'grid',
            gap: '15px'
          }}>
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Basic Info</h4>
              <div><strong>User ID:</strong> {userProfile.id}</div>
              <div><strong>Email:</strong> {userProfile.email}</div>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Preferences</h4>
              <div><strong>Theme:</strong> {userProfile.preferences.theme}</div>
              <div><strong>Notifications:</strong> {userProfile.preferences.notifications ? 'Enabled' : 'Disabled'}</div>
              <div><strong>Language:</strong> {userProfile.preferences.language}</div>
            </div>

            {serverSettings && (
              <div style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #bbdefb'
              }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Server Settings</h4>
                <div style={{ fontSize: '14px' }}>
                  <div><strong>API Version:</strong> {serverSettings.apiVersion}</div>
                  <div><strong>Features:</strong> {serverSettings.enabledFeatures?.join(', ')}</div>
                  <div><strong>Environment:</strong> {serverSettings.environment}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: isHydrated ? '#d4edda' : '#fff3cd',
        border: `1px solid ${isHydrated ? '#c3e6cb' : '#ffeaa7'}`,
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Hydration Status</h4>
        <p style={{ margin: 0 }}>
          {isHydrated 
            ? '✅ Component has been hydrated on the client'
            : '⏳ Component is using server-side rendered data'
          }
        </p>
      </div>
    </div>
  );
}
```

## Parameters

1. **key**: `string` - The unique identifier for the server resource.

## Returns

`T | null` - The server resource data of type T, or null if not available.

## Examples

### E-commerce Product Catalog

```tsx
import { useServerResource, useState, useEffect } from 'frosty';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface CatalogData {
  products: Product[];
  categories: string[];
  totalCount: number;
  page: number;
  hasMore: boolean;
}

function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isClientSide, setIsClientSide] = useState(false);
  
  // Get initial product data from server
  const catalogData = useServerResource<CatalogData>('product-catalog');
  
  // Get user preferences from server
  const userPrefs = useServerResource<{
    currency: string;
    region: string;
    favoriteCategories: string[];
  }>('user-preferences');

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const formatPrice = (price: number) => {
    const currency = userPrefs?.currency || 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const filteredProducts = catalogData?.products.filter(product =>
    selectedCategory === 'all' || product.category === selectedCategory
  ) || [];

  if (!catalogData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading product catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Product Catalog</h1>
        <p style={{ color: '#6c757d' }}>
          Showing {filteredProducts.length} of {catalogData.totalCount} products
          {userPrefs && (
            <span> • Region: {userPrefs.region} • Currency: {userPrefs.currency}</span>
          )}
        </p>
      </header>

      {/* Category Filter */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Categories</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #dee2e6',
              backgroundColor: selectedCategory === 'all' ? '#007bff' : 'white',
              color: selectedCategory === 'all' ? 'white' : '#007bff',
              cursor: 'pointer'
            }}
          >
            All Products
          </button>
          {catalogData.categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #dee2e6',
                backgroundColor: selectedCategory === category ? '#007bff' : 'white',
                color: selectedCategory === category ? 'white' : '#007bff',
                cursor: 'pointer'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'white',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (isClientSide) {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (isClientSide) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '15px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
              <p style={{
                color: '#6c757d',
                fontSize: '14px',
                margin: '0 0 15px 0',
                lineHeight: '1.4'
              }}>
                {product.description.length > 100
                  ? product.description.substring(0, 100) + '...'
                  : product.description
                }
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: product.inStock ? '#28a745' : '#dc3545'
                }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#6c757d'
              }}>
                <span>
                  ⭐ {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
                <span style={{
                  backgroundColor: '#e9ecef',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {catalogData.hasMore && (
        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Load More Products
          </button>
        </div>
      )}

      <div style={{
        marginTop: '40px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>SSR Information</h4>
        <p>
          <strong>Data Source:</strong> Server-side rendered catalog data
          <br />
          <strong>Total Products:</strong> {catalogData.totalCount}
          <br />
          <strong>Current Page:</strong> {catalogData.page}
          <br />
          <strong>Hydration Status:</strong> {isClientSide ? 'Hydrated' : 'Server-rendered'}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

### Blog Article with Comments

```tsx
import { useServerResource, useState, useEffect } from 'frosty';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

interface ArticleData {
  article: Article;
  comments: Comment[];
  relatedArticles: Article[];
  totalComments: number;
}

function BlogArticlePage() {
  const [showComments, setShowComments] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Get article data from server
  const articleData = useServerResource<ArticleData>('article-data');
  
  // Get user session from server
  const userSession = useServerResource<{
    userId?: string;
    username?: string;
    avatar?: string;
    isAuthenticated: boolean;
  }>('user-session');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!articleData) {
    return (
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #f0f0f0 25%, transparent 37%, transparent 63%, #f0f0f0 75%)',
          backgroundSize: '400% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite'
        }}>
          <div style={{
            height: '40px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            marginBottom: '20px'
          }}></div>
          <div style={{
            height: '20px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            marginBottom: '10px'
          }}></div>
          <div style={{
            height: '200px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>
    );
  }

  const { article, comments, relatedArticles, totalComments } = articleData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Article Header */}
      <header style={{ marginBottom: '30px' }}>
        {article.featured && (
          <div style={{
            display: 'inline-block',
            backgroundColor: '#ffc107',
            color: '#212529',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            FEATURED
          </div>
        )}
        
        <h1 style={{ margin: '0 0 15px 0', lineHeight: '1.2' }}>
          {article.title}
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '15px',
          borderBottom: '1px solid #dee2e6',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          <div>
            By <strong>{article.author}</strong> • {formatDate(article.publishedAt)}
          </div>
          <div>
            {article.readTime} min read
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article style={{
        lineHeight: '1.8',
        fontSize: '16px',
        marginBottom: '40px'
      }}>
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '20px' }}>
            {paragraph}
          </p>
        ))}
      </article>

      {/* Tags */}
      <div style={{ marginBottom: '30px' }}>
        <h4>Tags</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {article.tags.map(tag => (
            <span
              key={tag}
              style={{
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '12px'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <section style={{
        borderTop: '2px solid #dee2e6',
        paddingTop: '30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3>Comments ({totalComments})</h3>
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              padding: '8px 16px',
              backgroundColor: showComments ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>

        {showComments && (
          <div>
            {userSession?.isAuthenticated ? (
              <div style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={userSession.avatar}
                    alt={userSession.username}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}
                  />
                  <strong>{userSession.username}</strong>
                </div>
                <textarea
                  placeholder="Write a comment..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
                <button style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Post Comment
                </button>
              </div>
            ) : (
              <div style={{
                padding: '15px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 10px 0' }}>
                  Please log in to post a comment.
                </p>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Log In
                </button>
              </div>
            )}

            <div style={{ space: '20px' }}>
              {comments.map(comment => (
                <div
                  key={comment.id}
                  style={{
                    padding: '15px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        marginRight: '10px'
                      }}
                    />
                    <div>
                      <strong>{comment.author}</strong>
                      <div style={{
                        fontSize: '12px',
                        color: '#6c757d'
                      }}>
                        {formatRelativeTime(comment.timestamp)}
                      </div>
                    </div>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.5' }}>
                    {comment.content}
                  </p>
                  
                  {comment.replies && comment.replies.length > 0 && (
                    <div style={{
                      marginTop: '15px',
                      paddingLeft: '20px',
                      borderLeft: '2px solid #e9ecef'
                    }}>
                      {comment.replies.map(reply => (
                        <div key={reply.id} style={{ marginBottom: '10px' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '5px'
                          }}>
                            <img
                              src={reply.avatar}
                              alt={reply.author}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                marginRight: '8px'
                              }}
                            />
                            <strong style={{ fontSize: '14px' }}>{reply.author}</strong>
                            <span style={{
                              fontSize: '11px',
                              color: '#6c757d',
                              marginLeft: '8px'
                            }}>
                              {formatRelativeTime(reply.timestamp)}
                            </span>
                          </div>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            lineHeight: '1.4'
                          }}>
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section style={{
          marginTop: '50px',
          padding: '30px 0',
          borderTop: '2px solid #dee2e6'
        }}>
          <h3>Related Articles</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {relatedArticles.map(related => (
              <div
                key={related.id}
                style={{
                  padding: '15px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (isHydrated) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isHydrated) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <h4 style={{ margin: '0 0 10px 0' }}>{related.title}</h4>
                <div style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  marginBottom: '8px'
                }}>
                  By {related.author} • {formatDate(related.publishedAt)}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#007bff'
                }}>
                  {related.readTime} min read
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{
        marginTop: '40px',
        padding: '15px',
        backgroundColor: isHydrated ? '#d4edda' : '#e2e3e5',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>SSR Status:</strong> {isHydrated ? 'Hydrated on client' : 'Server-side rendered'}
        <br />
        <strong>Data loaded from:</strong> Server resource cache
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
      `}</style>
    </div>
  );
}
```

### Dashboard with Real-time Data

```tsx
import { useServerResource, useState, useEffect } from 'frosty';

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  conversionRate: number;
  pageViews: number;
  bounceRate: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

interface DashboardData {
  metrics: DashboardMetrics;
  chartData: ChartData;
  recentActivity: Array<{
    id: string;
    user: string;
    action: string;
    timestamp: string;
    value?: number;
  }>;
  alerts: Array<{
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: string;
  }>;
}

function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);
  
  // Get initial dashboard data from server
  const dashboardData = useServerResource<DashboardData>('dashboard-data');
  
  // Get user permissions from server
  const userPermissions = useServerResource<{
    canViewRevenue: boolean;
    canViewUsers: boolean;
    canViewAnalytics: boolean;
    role: string;
  }>('user-permissions');

  useEffect(() => {
    // Simulate real-time updates when enabled
    if (isRealTimeEnabled && dashboardData) {
      const interval = setInterval(() => {
        // In a real app, this would fetch new data
        console.log('Fetching real-time updates...');
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled, dashboardData]);

  if (!dashboardData || !userPermissions) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h3>Loading Dashboard...</h3>
          <p style={{ color: '#6c757d' }}>Preparing your analytics data</p>
        </div>
      </div>
    );
  }

  const { metrics, chartData, recentActivity, alerts } = dashboardData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return '#dc3545';
      case 'warning': return '#ffc107';
      default: return '#17a2b8';
    }
  };

  const metricCards = [
    {
      title: 'Total Users',
      value: formatNumber(metrics.totalUsers),
      icon: '👥',
      color: '#007bff',
      visible: userPermissions.canViewUsers
    },
    {
      title: 'Active Users',
      value: formatNumber(metrics.activeUsers),
      icon: '🟢',
      color: '#28a745',
      visible: userPermissions.canViewUsers
    },
    {
      title: 'Revenue',
      value: formatCurrency(metrics.revenue),
      icon: '💰',
      color: '#ffc107',
      visible: userPermissions.canViewRevenue
    },
    {
      title: 'Conversion Rate',
      value: formatPercentage(metrics.conversionRate),
      icon: '📈',
      color: '#17a2b8',
      visible: userPermissions.canViewAnalytics
    },
    {
      title: 'Page Views',
      value: formatNumber(metrics.pageViews),
      icon: '👁️',
      color: '#6f42c1',
      visible: userPermissions.canViewAnalytics
    },
    {
      title: 'Bounce Rate',
      value: formatPercentage(metrics.bounceRate),
      icon: '↩️',
      color: '#fd7e14',
      visible: userPermissions.canViewAnalytics
    }
  ].filter(card => card.visible);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px 0'
        }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0' }}>Dashboard</h1>
            <p style={{ margin: 0, color: '#6c757d' }}>
              Welcome back, {userPermissions.role}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            
            <button
              onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
              style={{
                padding: '8px 16px',
                backgroundColor: isRealTimeEnabled ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isRealTimeEnabled ? '#ffffff' : 'transparent',
                border: '1px solid white',
                animation: isRealTimeEnabled ? 'pulse 2s infinite' : 'none'
              }}></span>
              {isRealTimeEnabled ? 'Real-time ON' : 'Real-time OFF'}
            </button>
          </div>
        </header>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            {alerts.slice(0, 3).map(alert => (
              <div
                key={alert.id}
                style={{
                  padding: '12px 15px',
                  marginBottom: '10px',
                  backgroundColor: 'white',
                  border: `1px solid ${getAlertColor(alert.type)}`,
                  borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{alert.message}</span>
                <span style={{
                  fontSize: '12px',
                  color: '#6c757d'
                }}>
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {metricCards.map(card => (
            <div
              key={card.title}
              style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h4 style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {card.title}
                </h4>
                <span style={{ fontSize: '24px' }}>{card.icon}</span>
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: card.color
              }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px'
        }}>
          {/* Chart */}
          {userPermissions.canViewAnalytics && (
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h3 style={{ margin: '0 0 20px 0' }}>Analytics Chart</h3>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                color: '#6c757d'
              }}>
                Chart visualization would be rendered here
                <br />
                Data: {chartData.datasets.length} datasets, {chartData.labels.length} data points
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Recent Activity</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {recentActivity.slice(0, 10).map(activity => (
                <div
                  key={activity.id}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid #f8f9fa',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{activity.user}</div>
                  <div style={{ color: '#6c757d' }}>{activity.action}</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    marginTop: '2px'
                  }}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          Dashboard data loaded from server-side resources • 
          Last updated: {new Date().toLocaleString()} • 
          User role: {userPermissions.role}
        </footer>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
```

## Browser Support

- **Universal**: Works in all environments where Frosty is supported
- **SSR Compatible**: Designed specifically for server-side rendering workflows
- **Hydration Safe**: Properly handles client-side hydration without mismatches

## Common Use Cases

- **Initial Page Data**: Load essential data during server-side rendering
- **User Authentication**: Share user session data between server and client
- **Configuration**: Pass server configuration and feature flags to client
- **SEO Data**: Provide structured data for search engine optimization
- **A/B Testing**: Share experiment configurations and user assignments
- **Localization**: Provide translated content and locale settings

## Performance Considerations

- **Data Compression**: Large resources are automatically compressed for transfer
- **Memory Efficiency**: Resources are freed after hydration to save memory
- **Network Optimization**: Reduces need for additional API calls during initial load
- **Caching**: Server resources can be cached at multiple levels

## Notes

- **Hydration Only**: This hook is primarily designed for SSR/hydration scenarios
- **Data Serialization**: Only JSON-serializable data can be passed through server resources
- **Security**: Ensure sensitive data is not exposed through server resources
- **Resource Cleanup**: Resources are automatically cleaned up after hydration

## See Also

- [useEffect](./useEffect.md) – Handle side effects during hydration.
- [useState](./useState.md) – Manage client-side state after hydration.
- [useContext](./useContext.md) – Share data across components during SSR.
