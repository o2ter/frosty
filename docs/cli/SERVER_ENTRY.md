# Server Entry Configuration

The `serverEntry` option in Frosty CLI allows you to customize the server behavior by providing your own server entry file. This gives you full control over server configuration, middleware setup, and custom server logic.

## Overview

When building a Frosty application, the CLI automatically creates a server to serve your application. By default, it uses a minimal server configuration, but you can customize this behavior by specifying a `serverEntry` file in your `server.config.js`.

## Configuration

Add the `serverEntry` option to your `server.config.js`:

```js
module.exports = {
  serverEntry: 'server.js',  // Path to your custom server entry file
  // ... other configuration options
};
```

The path is relative to your project root directory.

## Server Entry File Structure

Your server entry file should export specific functions and objects that Frosty CLI expects:

```js
// server.js
import { Server } from '@o2ter/server-js';

// Optional: Custom server options
export const serverOptions = {
  http: 'v1',
  express: {
    cors: {
      credentials: true,
      origin: true,
    },
    rateLimit: {
      windowMs: 1000,
      limit: 1000,
    },
  },
};

// Optional: Custom server setup function
export default async (app, serverEnv) => {
  // Add custom middleware
  app.use('/api', (req, res, next) => {
    // Your API middleware
    next();
  });

  // Add custom routes
  app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
  });

  // Access server environment variables
  console.log('Server environment:', serverEnv);
};
```

## Exports

### `serverOptions` (Optional)

An object containing server configuration options that will be passed to the `@o2ter/server-js` Server constructor.

**Type:** `Server.Options`

**Example:**
```js
export const serverOptions = {
  http: 'v1',
  express: {
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'https://yourdomain.com'],
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100, // limit each IP to 100 requests per windowMs
    },
    bodyParser: {
      json: { limit: '10mb' },
      urlencoded: { limit: '10mb', extended: true },
    },
  },
};
```

### `default` Export (Optional)

A function that receives the server app instance and server environment. Use this to add custom middleware, routes, and server logic.

**Type:** `(app: Server, serverEnv: object) => void | Promise<void>`

**Parameters:**
- `app`: The server instance created by Frosty CLI
- `serverEnv`: Environment object shared across server modules

**Example:**
```js
export default async (app, serverEnv) => {
  // Database connection
  serverEnv.db = await connectToDatabase();

  // Authentication middleware
  app.use('/api', authenticateUser);

  // API routes
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);

  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
};
```

## Use Cases

### API Server Setup

```js
// server.js
import express from 'express';
import { connectDB } from './database';
import apiRoutes from './routes/api';

export const serverOptions = {
  express: {
    cors: {
      credentials: true,
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://yourdomain.com' 
        : true,
    },
  },
};

export default async (app, serverEnv) => {
  // Database setup
  serverEnv.db = await connectDB();

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API routes
  app.use('/api', apiRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: serverEnv.db ? 'connected' : 'disconnected'
    });
  });
};
```

### Authentication Setup

```js
// server.js
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export const serverOptions = {
  express: {
    cors: {
      credentials: true,
      origin: true,
    },
  },
};

export default async (app, serverEnv) => {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  }));

  // Passport configuration
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(async (username, password, done) => {
    // Your authentication logic
    try {
      const user = await authenticateUser(username, password);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // Authentication routes
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
  });

  app.post('/auth/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out successfully' });
  });
};
```

### Environment-Specific Configuration

```js
// server.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serverOptions = {
  express: {
    cors: {
      credentials: true,
      origin: process.env.NODE_ENV === 'production'
        ? process.env.ALLOWED_ORIGINS?.split(',')
        : true,
    },
    rateLimit: process.env.NODE_ENV === 'production' ? {
      windowMs: 15 * 60 * 1000,
      limit: 100,
    } : undefined,
  },
};

export default async (app, serverEnv) => {
  if (process.env.NODE_ENV === 'development') {
    // Development-only middleware
    app.use('/api', createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }));
  } else {
    // Production API setup
    app.use('/api', productionApiRoutes);
  }

  // Environment-specific logging
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('dev'));
  }
};
```

## Integration with Frosty CLI

The server entry file is integrated into the build process:

1. **Build Time**: Webpack resolves the `serverEntry` path and includes it in the server bundle
2. **Runtime**: The CLI server imports your exports and uses them to configure the server
3. **Static Assets**: Your custom server still serves the built client assets automatically
4. **Routing**: Frosty's client routes are automatically added after your custom setup

## Default Behavior

If no `serverEntry` is specified, Frosty uses a minimal default configuration:

```js
// Default server configuration
export const serverOptions = {
  http: 'v1',
  express: {
    cors: {
      credentials: true,
      origin: true,
    },
    rateLimit: {
      windowMs: 1000,
      limit: 1000,
    },
  },
};

export default () => {};
```

## TypeScript Support

You can use TypeScript for your server entry file:

```ts
// server.ts
import { Server } from '@o2ter/server-js';

export const serverOptions: Server.Options = {
  http: 'v1',
  express: {
    cors: {
      credentials: true,
      origin: true,
    },
  },
};

export default async (app: Server, serverEnv: Record<string, any>): Promise<void> => {
  // Your TypeScript server logic
};
```

## Best Practices

### 1. Environment Variables
Use environment variables for configuration:

```js
export const serverOptions = {
  express: {
    cors: {
      origin: process.env.CORS_ORIGIN || true,
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000,
      limit: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    },
  },
};
```

### 2. Error Handling
Always include error handling:

```js
export default async (app, serverEnv) => {
  // Global error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ 
        error: err.message,
        stack: err.stack 
      });
    }
  });
};
```

### 3. Graceful Shutdown
Handle process signals for graceful shutdown:

```js
export default async (app, serverEnv) => {
  // Graceful shutdown setup
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    if (serverEnv.db) {
      await serverEnv.db.close();
    }
    process.exit(0);
  });
};
```

### 4. Logging
Implement proper logging:

```js
import winston from 'winston';

export default async (app, serverEnv) => {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  serverEnv.logger = logger;
  
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
};
```

## Troubleshooting

### Common Issues

1. **Module not found**: Ensure the `serverEntry` path is correct relative to your project root
2. **Import errors**: Make sure all dependencies are installed and properly imported
3. **Server won't start**: Check for syntax errors and ensure exports are correctly defined
4. **TypeScript errors**: Ensure proper type definitions for @o2ter/server-js

### Debug Tips

- Use `console.log` in your server entry to verify it's being loaded
- Check the webpack build output for any bundling errors
- Use `--debug` flag with Frosty CLI for detailed error messages
- Verify your server entry file can be imported independently

## See Also

- [CLI Configuration](CLI.md) - Main CLI documentation
- [Server Hooks](../hooks/useServerResource.md) - Server-side data handling
- [@o2ter/server-js Documentation](https://github.com/o2ter/server-js) - Server framework details
