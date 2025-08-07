/* eslint no-var: 0 */

const _ = require('lodash');
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const serverConfig = (() => {
  try {
    return require(path.resolve(process.cwd(), 'server.config.js'));
  } catch {
    return {};
  }
})();

const frosty = (() => {
  try {
    return require.resolve('frosty');
  } catch {
    return;
  }
})();

const frostyDevPrj = (() => {
  if (frosty) return {};
  const { rollupConfig: { input } } = require(path.resolve(__dirname, '../../rollup.config.mjs'));
  const resolved = {};
  for (const [k, v] of _.entries(input)) {
    resolved[k === 'index' ? 'frosty' : `frosty/${k}`] = path.resolve(__dirname, '../..', v);
  }
  return resolved;
})();

module.exports = (env, argv) => {

  const config = _.isFunction(serverConfig) ? serverConfig(env, argv) : serverConfig;
  const IS_PRODUCTION = argv.mode !== 'development';

  const babelLoaderConfiguration = ({ server }) => ({
    test: /\.(ts|tsx|m?js)?$/i,
    use: {
      loader: 'babel-loader',
      options: {
        compact: IS_PRODUCTION,
        cacheDirectory: true,
        configFile: false,
        presets: [
          ['@babel/preset-env', {
            exclude: [
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-transform-async-generator-functions',
              '@babel/plugin-transform-async-to-generator',
            ],
            targets: server ? { node: 'current' } : 'defaults',
            ...server ? {} : config.polyfills ?? {},
          }],
          [
            "@babel/preset-react",
            {
              development: !IS_PRODUCTION,
              runtime: 'automatic',
              importSource: 'frosty',
            }
          ],
          '@babel/preset-typescript',
        ]
      },
    },
    resolve: {
      fullySpecified: false,
    },
  });

  const cssLoaderConfiguration = ({ server }) => ({
    test: /\.(css|sass|scss)$/,
    use: [
      !server && MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              'autoprefixer',
            ],
          }
        }
      },
      'sass-loader',
    ].filter(Boolean),
  });

  const imageLoaderConfiguration = ({ server }) => ({
    test: /\.(gif|jpe?g|a?png|svg)$/i,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        publicPath: '/images',
        outputPath: '/images',
        emitFile: !server,
      }
    }
  });

  const fontLoaderConfiguration = ({ server }) => ({
    test: /\.ttf$/i,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        publicPath: '/fonts',
        outputPath: '/fonts',
        emitFile: !server,
      }
    }
  });

  const webpackOptimization = ({ server }) => ({
    minimize: IS_PRODUCTION,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          sourceMap: false,
          compress: true,
          keep_classnames: server,
          format: {
            comments: !IS_PRODUCTION,
          },
        },
      }),
    ],
  });

  const webpackConfiguration = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    devtool: IS_PRODUCTION ? false : 'cheap-module-source-map',
    experiments: {
      topLevelAwait: true,
    },
    resolve: {
      ...config.options?.resolve ?? {},
      alias: {
        ...frosty ? { frosty } : frostyDevPrj,
        ...config.options?.resolve?.alias ?? {},
      },
    },
    externals: config.options?.externals,
  };

  const webpackPlugins = [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(!IS_PRODUCTION) }),
    new Dotenv({ path: path.join(process.cwd(), '.env') }),
    new Dotenv({ path: path.join(process.cwd(), '.env.local') }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    ...config.options?.plugins ?? [],
  ];

  const server = config.serverEntry ? path.resolve(process.cwd(), config.serverEntry) : path.resolve(__dirname, './src/server/default.js');

  const random = crypto.randomUUID();
  const tempDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  const applications = path.resolve(tempDir, `applications-${random}.js`);

  fs.writeFileSync(applications, `
    ${_.map(config.client, ({ entry }, name) => `import * as ${name} from '${path.resolve(process.cwd(), entry)}';`).join('\n')}
    export { ${_.keys(config.client).join(',')} };
  `);

  const moduleSuffixes = {
    client: config.moduleSuffixes?.client ?? ['.browser', '.web', ''],
    server: config.moduleSuffixes?.server ?? ['.node', '.server', '.web', ''],
  };

  return [
    ..._.map(config.client, ({ entry }, name) => ({
      ...webpackConfiguration,
      optimization: webpackOptimization({ server: false }),
      plugins: webpackPlugins,
      entry: {
        [`${name}_bundle`]: [
          'core-js/stable',
          path.resolve(__dirname, './client/index.js'),
        ],
      },
      output: {
        path: config.output ? path.join(config.output, 'public') : path.join(__dirname, 'dist/public'),
      },
      resolve: {
        ...webpackConfiguration.resolve,
        alias: {
          ...webpackConfiguration.resolve.alias,
          __APPLICATION__: path.resolve(process.cwd(), entry),
        },
        extensions: [
          ...moduleSuffixes.client.flatMap(x => [`${x}.tsx`, `${x}.jsx`]),
          ...moduleSuffixes.client.flatMap(x => [`${x}.ts`, `${x}.mjs`, `${x}.js`]),
          '...'
        ],
      },
      module: {
        rules: [
          babelLoaderConfiguration({ server: false }),
          cssLoaderConfiguration({ server: false }),
          imageLoaderConfiguration({ server: false }),
          fontLoaderConfiguration({ server: false }),
          ...config.options?.module?.rules ?? [],
        ]
      }
    })),
    {
      ...webpackConfiguration,
      optimization: webpackOptimization({ server: false }),
      plugins: _.compact([
        ...webpackPlugins,
        ...config.options?.server?.plugins ?? [],
        config.serverAssets && new CopyPlugin({ patterns: config.serverAssets }),
      ]),
      target: 'node',
      plugins: webpackPlugins,
      entry: {
        server: [
          'core-js/stable',
          path.resolve(__dirname, './src/server/index.js'),
        ],
      },
      output: {
        path: config.output || path.resolve(__dirname, 'dist'),
      },
      resolve: {
        ...webpackConfiguration.resolve,
        alias: {
          ...webpackConfiguration.resolve.alias,
          __APPLICATIONS__: applications,
          __SERVER__: server,
        },
        extensions: [
          ...moduleSuffixes.server.flatMap(x => [`${x}.tsx`, `${x}.jsx`]),
          ...moduleSuffixes.server.flatMap(x => [`${x}.ts`, `${x}.mjs`, `${x}.js`]),
          '...'
        ],
      },
      module: {
        rules: [
          babelLoaderConfiguration({ server: true }),
          cssLoaderConfiguration({ server: true }),
          imageLoaderConfiguration({ server: true }),
          fontLoaderConfiguration({ server: true }),
          {
            test: /\.node$/,
            use: {
              loader: 'node-loader',
              options: {
                name: '[name].[contenthash].[ext]',
              }
            }
          },
          ...config.options?.module?.rules ?? [],
          ...config.options?.server?.module?.rules ?? [],
        ]
      },
      performance: {
        hints: false,
      }
    }
  ];
};
