/* eslint no-var: 0 */

const _ = require('lodash');
const path = require('path');

module.exports = (env, argv) => {

  const babelLoaderConfiguration = ({ server }) => ({
    test: /\.(ts|tsx|m?js)?$/i,
    use: {
      loader: 'babel-loader',
      options: {
        compact: false,
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
          }],
          [
            "@babel/preset-react",
            {
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
      alias: {
        '~': path.resolve(__dirname, '../../src'),
        'frosty': path.resolve(__dirname, '../../src'),
      },
    },
  });

  const webpackConfiguration = {
    mode: false ? 'production' : 'development',
    devtool: false ? false : 'cheap-module-source-map',
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      minimize: false
    },
  };

  const moduleSuffixes = {
    client: ['.browser', '.web', ''],
    server: ['.node', '.server', '.web', ''],
  };

  return [
    {
      ...webpackConfiguration,
      entry: {
        main_bundle: [
          'core-js/stable',
          path.resolve(__dirname, './main/index.tsx'),
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
        ]
      }
    },
    {
      ...webpackConfiguration,
      target: 'node',
      entry: {
        server: [
          'core-js/stable',
          path.resolve(__dirname, './index.ts'),
        ],
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      resolve: {
        ...webpackConfiguration.resolve,
        extensions: [
          ...moduleSuffixes.server.flatMap(x => [`${x}.tsx`, `${x}.jsx`]),
          ...moduleSuffixes.server.flatMap(x => [`${x}.ts`, `${x}.mjs`, `${x}.js`]),
          '...'
        ],
      },
      module: {
        rules: [
          babelLoaderConfiguration({ server: true }),
          {
            test: /\.node$/,
            use: {
              loader: 'node-loader',
              options: {
                name: '[name].[contenthash].[ext]',
              }
            }
          },
        ]
      },
      performance: {
        hints: false,
      }
    }
  ];
};
