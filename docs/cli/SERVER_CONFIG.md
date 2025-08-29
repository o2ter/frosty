# Server Configuration File (server.config.js)

The `server.config.js` file is the main configuration file for Frosty CLI applications. It allows you to customize build settings, server behavior, client applications, and webpack configurations. This file is optional but provides extensive customization capabilities for your Frosty project.

## Overview

The configuration file should be placed in your project root directory and named `server.config.js`. It can export either a configuration object or a function that returns a configuration object.

## Basic Structure

```js
// server.config.js

// Option 1: Export a configuration object
module.exports = {
  // Configuration options...
};

// Option 2: Export a function for dynamic configuration
module.exports = (env, argv) => {
  return {
    // Configuration options based on environment...
  };
};
```

## Configuration Options

All configuration options are optional. If not specified, sensible defaults will be used.

### Directory Configuration

#### `src`
**Type:** `string`  
**Default:** `undefined`  
**Description:** Specifies the source root directory for your application.

```js
module.exports = {
  src: 'src',  // Use 'src' directory as source root
};
```

#### `output`
**Type:** `string`  
**Default:** `'dist'` (relative to current working directory)  
**Description:** Specifies the output directory for build artifacts.

```js
module.exports = {
  output: 'build',  // Output files to 'build' directory
};
```

### Server Configuration

#### `serverEntry`
**Type:** `string`  
**Default:** `undefined`  
**Description:** Path to a custom server entry file that allows you to customize server behavior.

```js
module.exports = {
  serverEntry: 'server.js',  // Custom server configuration
};
```

See [Server Entry Configuration](SERVER_ENTRY.md) for detailed documentation.

### Client Applications

#### `client`
**Type:** `object`  
**Default:** `undefined`  
**Description:** Defines client application entry points and their routing configuration.

```js
module.exports = {
  client: {
    main: {
      entry: 'src/app.js',    // Path to client entry file
      uri: '/',               // (Optional) URI path for routing
    },
    admin: {
      entry: 'src/admin.js',  // Additional client app
      uri: '/admin',          // Mounted at /admin path
    }
  }
};
```

**Structure:**
- **Key:** Application name (used for bundle naming)
- **`entry`:** Path to the client entry file relative to project root
- **`uri`** _(optional)_: URI path where the application should be mounted (defaults to `/`)

### Module Resolution

#### `moduleSuffixes`
**Type:** `object`  
**Default:** `{ client: ['.browser', '.web', ''], server: ['.node', '.server', '.web', ''] }`  
**Description:** Custom module resolution suffixes for client and server builds.

```js
module.exports = {
  moduleSuffixes: {
    client: ['.browser', '.web', '.client', ''],
    server: ['.node', '.server', '.ssr', '']
  }
};
```

This allows you to have platform-specific versions of modules:
- `utils.js` - Common version
- `utils.browser.js` - Browser-specific version
- `utils.node.js` - Node.js-specific version

### Babel Configuration

#### `polyfills`
**Type:** `object`  
**Default:** `{}`  
**Description:** Polyfill options passed to Babel's `@babel/preset-env` for client builds.

```js
module.exports = {
  polyfills: {
    useBuiltIns: 'entry',
    corejs: 3,
    targets: {
      browsers: ['> 1%', 'last 2 versions']
    }
  }
};
```

### Webpack Configuration

#### `options`
**Type:** `object`  
**Default:** `{}`  
**Description:** Advanced webpack configuration options.

```js
module.exports = {
  options: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    plugins: [
      // Additional webpack plugins
    ],
    module: {
      rules: [
        // Additional webpack module rules
      ]
    },
    server: {
      plugins: [
        // Server-specific webpack plugins
      ],
      module: {
        rules: [
          // Server-specific webpack module rules
        ]
      }
    }
  }
};
```

**Sub-options:**
- **`resolve`**: Custom webpack resolve options (alias, etc.)
- **`externals`**: Webpack externals configuration
- **`plugins`**: Additional webpack plugins for both client and server
- **`module.rules`**: Additional webpack module rules
- **`server.plugins`**: Server-specific webpack plugins
- **`server.module.rules`**: Server-specific webpack module rules

## Dynamic Configuration

You can export a function to create dynamic configurations based on environment variables or build arguments:

```js
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = argv.mode === 'development';

  return {
    output: isProduction ? 'dist' : 'dev-build',
    
    client: {
      main: {
        entry: 'src/app.js',
        uri: '/'
      }
    },

    polyfills: isProduction ? {
      useBuiltIns: 'entry',
      corejs: 3
    } : {},

    options: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      },
      
      // Development-specific configuration
      ...(isDevelopment && {
        plugins: [
          new webpack.HotModuleReplacementPlugin()
        ]
      }),

      // Production-specific configuration
      ...(isProduction && {
        externals: {
          'lodash': '_'
        }
      })
    }
  };
};
```

**Function Parameters:**
- **`env`**: Environment variables passed to webpack
- **`argv`**: Command line arguments passed to webpack

## Common Patterns

### Multi-Application Setup

```js
module.exports = {
  client: {
    // Main customer-facing app
    app: {
      entry: 'src/app/index.js',
      uri: '/'
    },
    
    // Admin dashboard
    admin: {
      entry: 'src/admin/index.js', 
      uri: '/admin'
    },
    
    // API documentation
    docs: {
      entry: 'src/docs/index.js',
      uri: '/docs'
    }
  },
  
  serverEntry: 'server.js',
  
  options: {
    resolve: {
      alias: {
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@app': path.resolve(__dirname, 'src/app'),
        '@admin': path.resolve(__dirname, 'src/admin')
      }
    }
  }
};
```

### Environment-Based Configuration

```js
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isTest = process.env.NODE_ENV === 'test';

  return {
    src: 'src',
    output: isProduction ? 'dist' : 'dev',
    
    client: {
      main: {
        entry: isTest ? 'src/test-app.js' : 'src/app.js',
        uri: '/'
      }
    },

    serverEntry: isProduction ? 'production-server.js' : 'dev-server.js',

    moduleSuffixes: {
      client: isProduction 
        ? ['.prod.browser', '.browser', '.web', '']
        : ['.dev.browser', '.browser', '.web', ''],
      server: isProduction
        ? ['.prod.node', '.node', '.server', ''] 
        : ['.dev.node', '.node', '.server', '']
    },

    polyfills: isProduction ? {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: '> 0.25%, not dead'
    } : {},

    options: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@config': path.resolve(__dirname, isProduction ? 'config/prod' : 'config/dev')
        }
      }
    }
  };
};
```

### Custom Webpack Configuration

```js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  client: {
    main: {
      entry: 'src/app.js',
      uri: '/'
    }
  },

  options: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils')
      },
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    },

    externals: {
      // Don't bundle these dependencies
      'axios': 'axios',
      'moment': 'moment'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3001'),
        'process.env.VERSION': JSON.stringify(require('./package.json').version)
      }),
      
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],

    module: {
      rules: [
        // Only add custom loaders here - CSS/SCSS, images, fonts are handled by Frosty CLI
        // Handle SVG files as React components
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        },
        
        // Handle GraphQL files
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: 'graphql-tag/loader'
        }
      ]
    },

    server: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL)
        })
      ],
      
      module: {
        rules: [
          // Server-specific overrides (Frosty CLI handles most assets automatically)
          {
            test: /\.(png|jpg|gif|svg)$/,
            use: {
              loader: 'null-loader'  // Don't process images on server
            }
          }
        ]
      }
    }
  }
};
```

## TypeScript Support

You can use TypeScript for your configuration file by naming it `server.config.ts`:

```ts
// server.config.ts
import path from 'path';
import type { Configuration } from 'webpack';

interface FrostyConfig {
  src?: string;
  output?: string;
  serverEntry?: string;
  client?: Record<string, {
    entry: string;
    uri?: string;
  }>;
  moduleSuffixes?: {
    client?: string[];
    server?: string[];
  };
  polyfills?: object;
  options?: {
    resolve?: Configuration['resolve'];
    externals?: Configuration['externals'];
    plugins?: Configuration['plugins'];
    module?: Configuration['module'];
    server?: {
      plugins?: Configuration['plugins'];
      module?: Configuration['module'];
    };
  };
}

const config: FrostyConfig = {
  src: 'src',
  output: 'dist',
  
  client: {
    main: {
      entry: 'src/app.tsx',
      uri: '/'
    }
  },

  options: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
};

export default config;
```

## Environment Variables

The configuration function receives environment variables that can be used for customization:

```js
module.exports = (env, argv) => {
  // Environment variables passed from CLI
  const {
    CONFIG_FILE,    // Configuration file path
    INPUT_FILE,     // Input file from command line
    PORT,           // Server port
    SRCROOT,        // Source root directory
    OUTPUT_DIR      // Output directory
  } = env;

  return {
    src: SRCROOT || 'src',
    output: OUTPUT_DIR || 'dist',
    // ... rest of configuration
  };
};
```

### .env Files Support

Frosty CLI automatically loads environment variables from `.env` files in your project root. The following files are supported (in order of precedence):

1. **`.env.local`** - Local overrides, loaded first (should be in `.gitignore`)
2. **`.env`** - Default environment variables

Both files are optional and will only be loaded if they exist. Environment variables defined in these files will be available in your application code through `process.env`.

#### File Format

```bash
# .env
API_URL=https://api.example.com
DEBUG=false
FEATURE_FLAGS=feature1,feature2,feature3

# .env.local (overrides .env values)
API_URL=http://localhost:3001
DEBUG=true
```

#### Usage in Code

```js
// Client or server code
const apiUrl = process.env.API_URL || 'http://localhost:3000';
const isDebug = process.env.DEBUG === 'true';
const features = process.env.FEATURE_FLAGS?.split(',') || [];
```

#### Best Practices for .env Files

1. **Never commit `.env.local`** - Add it to your `.gitignore`
2. **Commit `.env` with safe defaults** - Use non-sensitive default values
3. **Use `.env.example`** - Document required variables
4. **Prefix client variables** - Consider prefixing client-side variables for clarity

```bash
# .env.example (committed to repo)
API_URL=https://api.example.com
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-here
CLIENT_ANALYTICS_KEY=
```

```bash
# .gitignore
.env.local
```

#### Security Considerations

- **Server-only variables**: Sensitive variables (API keys, database URLs) are only available on the server side
- **Client-side exposure**: For exposing data to the client, the `useServerResource` hook provides excellent security and SSR support
- **Validation**: Consider validating required environment variables at startup

```js
// Validate required environment variables
const requiredEnvVars = ['API_URL', 'DATABASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

### Exposing Client Variables with useServerResource

The `useServerResource` hook provides an excellent way to expose environment variables and configuration to the client with full SSR support:

**config/AppConfig.server.tsx**
```tsx
import { useServerResource } from 'frosty/web';

export const AppConfigProvider = ({ children }: { children: ElementNode }) => {
  const encoded = useServerResource('app-config', () => JSON.stringify({
    apiUrl: process.env.API_URL || 'http://localhost:3001',
    version: require('../package.json').version,
    environment: process.env.NODE_ENV || 'development'
  }), []);

  const config = JSON.parse(encoded);
  
  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};
```

**config/AppConfig.tsx**
```tsx
import { useServerResource } from 'frosty/web';

export const AppConfigProvider = ({ children }: { children: ElementNode }) => {
  const encoded = useServerResource('app-config');
  const config = JSON.parse(encoded);
  
  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};
```

**Benefits:**
- **Server-side rendering**: Works seamlessly with SSR
- **Security**: Only exposes what you explicitly serialize
- **Flexibility**: Can include complex objects, not just strings

## Integration with CLI Commands

The configuration is used by various CLI commands:

### Build Command
```bash
npx frosty run --build-only
```
Uses `output`, `client`, `options` for build configuration.

### Development Server
```bash
npx frosty run --watch --debug
```
Uses all configuration options, especially `serverEntry` for custom server behavior.

### Custom Configuration File
```bash
npx frosty run --configuration my-config.js
```
Loads a different configuration file instead of the default `server.config.js`.

## Best Practices

### 1. Keep Configuration Modular

```js
// config/base.js
module.exports = {
  src: 'src',
  client: {
    main: {
      entry: 'src/app.js',
      uri: '/'
    }
  }
};

// config/development.js
const base = require('./base');

module.exports = {
  ...base,
  output: 'dev-build',
  options: {
    plugins: [
      // Development plugins
    ]
  }
};

// server.config.js
module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return isDev 
    ? require('./config/development')
    : require('./config/production');
};
```

### 2. Use Environment Variables

```js
require('dotenv').config();

module.exports = {
  serverEntry: process.env.SERVER_ENTRY || 'server.js',
  
  client: {
    main: {
      entry: process.env.CLIENT_ENTRY || 'src/app.js',
      uri: '/'
    }
  },

  options: {
    resolve: {
      alias: {
        '@api': process.env.API_BASE_URL || 'http://localhost:3001'
      }
    }
  }
};
```

### 3. Validate Configuration

```js
const path = require('path');
const fs = require('fs');

module.exports = (env, argv) => {
  const config = {
    src: 'src',
    output: 'dist',
    client: {
      main: {
        entry: 'src/app.js',
        uri: '/'
      }
    }
  };

  // Validate entry files exist
  Object.values(config.client).forEach(({ entry }) => {
    const entryPath = path.resolve(__dirname, entry);
    if (!fs.existsSync(entryPath)) {
      throw new Error(`Client entry file not found: ${entry}`);
    }
  });

  return config;
};
```

### 4. Document Your Configuration

```js
/**
 * Frosty Configuration
 * 
 * This configuration sets up:
 * - Main client application at /
 * - Admin dashboard at /admin
 * - Custom server with authentication
 * - Development/production environment handling
 */
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Source directory
    src: 'src',
    
    // Output directory - different for dev/prod
    output: isProduction ? 'dist' : 'dev-build',
    
    // Custom server with auth middleware
    serverEntry: 'server/index.js',
    
    // Multiple client applications
    client: {
      // Main customer app
      app: {
        entry: 'src/client/app.js',
        uri: '/'
      },
      
      // Admin dashboard (protected route)
      admin: {
        entry: 'src/client/admin.js',
        uri: '/admin'
      }
    },

    // Webpack customizations
    options: {
      resolve: {
        alias: {
          '@shared': path.resolve(__dirname, 'src/shared'),
          '@client': path.resolve(__dirname, 'src/client'),
          '@server': path.resolve(__dirname, 'src/server')
        }
      }
    }
  };
};
```

## Troubleshooting

### Common Issues

1. **Configuration not loading**: Ensure `server.config.js` is in your project root
2. **Path resolution errors**: Use absolute paths with `path.resolve(__dirname, ...)`
3. **Build failures**: Check that all entry files exist and are valid
4. **Module resolution issues**: Verify `moduleSuffixes` configuration
5. **TypeScript errors**: Ensure proper type definitions if using TypeScript config

### Debug Tips

- Use `console.log` in your configuration function to debug values
- Check webpack build output for configuration-related errors
- Use `--debug` flag with Frosty CLI for detailed error messages
- Validate file paths exist before referencing them in configuration

## Migration from Other Tools

### From Create React App

```js
// server.config.js
const path = require('path');

module.exports = {
  src: 'src',
  output: 'build',  // CRA uses 'build'
  
  client: {
    main: {
      entry: 'src/index.js',  // CRA entry point
      uri: '/'
    }
  },

  options: {
    resolve: {
      alias: {
        // Maintain CRA's absolute imports
        'src': path.resolve(__dirname, 'src')
      }
    }
    // Note: CSS handling (including CSS modules) is handled internally by Frosty
  }
};
```

### From Next.js

```js
// server.config.js
module.exports = {
  src: 'src',  // or '' if files are in root
  
  client: {
    main: {
      entry: 'pages/_app.js',  // Next.js app entry
      uri: '/'
    }
  },

  options: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        // Note: '~' alias is automatically set to the src directory when specified
      }
    }
  }
};
```

## See Also

- [CLI Documentation](CLI.md) - Main CLI commands and options
- [Server Entry Configuration](SERVER_ENTRY.md) - Custom server setup
- [Webpack Documentation](https://webpack.js.org/) - Advanced webpack configuration
- [Babel Documentation](https://babeljs.io/) - Babel configuration options
