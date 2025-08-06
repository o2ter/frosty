/* eslint no-var: 0 */

const _ = require('lodash');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const serverConfig = require(path.resolve(process.cwd(), 'server.config.js'));

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
        '~': path.resolve(__dirname, '../../src'),
        'frosty': path.resolve(__dirname, '../../src'),
        ...config.options?.resolve?.alias ?? {},
      },
    },
    externals: config.options?.externals,
  };

  const webpackPlugins = [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(!IS_PRODUCTION) }),
    new LoadablePlugin({ outputAsset: false }),
    new Dotenv({ path: path.join(process.cwd(), '.env') }),
    new Dotenv({ path: path.join(process.cwd(), '.env.local') }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    ...config.options?.plugins ?? [],
  ];

  const moduleSuffixes = {
    client: config.moduleSuffixes?.client ?? ['.browser', '.web', ''],
    server: config.moduleSuffixes?.server ?? ['.node', '.server', '.web', ''],
  };

  return [
    {
      ...webpackConfiguration,
      optimization: webpackOptimization({ server: false }),
      plugins: webpackPlugins,
      entry: {
        main_bundle: [
          'core-js/stable',
          path.resolve(__dirname, './src/index.tsx'),
        ],
      },
      output: {
        path: path.join(__dirname, 'dist/public'),
      },
      resolve: {
        ...webpackConfiguration.resolve,
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
    },
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
          path.resolve(__dirname, './src/index.tsx'),
        ],
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      resolve: {
        ...webpackConfiguration.resolve,
        alias: {
          ...webpackConfiguration.resolve.alias,
          __APPLICATION__: path.resolve(process.cwd(), entry),
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
