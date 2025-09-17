//
//  webpack.mjs
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import os from 'os';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const { dirname: __dirname } = import.meta;

export default async (env, argv) => {

  const {
    CONFIG_FILE = 'server.config.js',
    INPUT_FILE,
    PORT = 8080,
  } = env;

  const serverConfig = await (async () => {
    const configPath = path.resolve(process.cwd(), CONFIG_FILE);
    if (!fs.existsSync(configPath)) return {};
    const { default: resolved } = await import(configPath);
    return resolved;
  })();

  const config = _.isFunction(serverConfig) ? serverConfig(env, argv) : serverConfig;
  const IS_PRODUCTION = argv.mode !== 'development';

  const {
    SRCROOT = config.src,
    OUTPUT_DIR = config.output || path.resolve(__dirname, 'dist'),
  } = env;

  const frostyDeps = await (async () => {
    try {
      const resolved = new URL(import.meta.resolve('frosty'));
      return {
        frosty: decodeURI(path.dirname(resolved.pathname)),
      };
    } catch {
      const { rollupConfig: { input } } = await import(path.resolve(__dirname, '../../rollup.config.mjs'));
      const resolved = {};
      for (const [k, v] of _.entries(input)) {
        if (k === 'index') continue;
        resolved[`frosty/${k}`] = path.resolve(__dirname, '../..', v);
      }
      return {
        ...resolved,
        frosty: path.resolve(__dirname, '../../src/index'),
      };
    }
  })();

  const babelLoaderConfiguration = ({ server }) => ({
    test: /\.(ts|tsx|m?js)?$/i,
    use: {
      loader: path.resolve(__dirname, 'node_modules/babel-loader'),
      options: {
        compact: IS_PRODUCTION,
        cacheDirectory: true,
        configFile: false,
        presets: [
          [path.resolve(__dirname, 'node_modules/@babel/preset-env'), {
            targets: server ? { node: 'current' } : 'defaults',
            ...server ? {} : config.polyfills ?? {},
          }],
          [path.resolve(__dirname, "node_modules/@babel/preset-react"), {
            development: !IS_PRODUCTION,
            runtime: 'automatic',
            importSource: 'frosty',
          }],
          path.resolve(__dirname, 'node_modules/@babel/preset-typescript'),
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
      path.resolve(__dirname, 'node_modules/css-loader'),
      {
        loader: path.resolve(__dirname, 'node_modules/postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [
              'autoprefixer',
            ],
          }
        }
      },
      path.resolve(__dirname, 'node_modules/sass-loader'),
    ].filter(Boolean),
  });

  const imageLoaderConfiguration = ({ server }) => ({
    test: /\.(gif|jpe?g|a?png|svg)$/i,
    use: {
      loader: path.resolve(__dirname, 'node_modules/file-loader'),
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
      loader: path.resolve(__dirname, 'node_modules/file-loader'),
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
        ...SRCROOT ? {
          '~': path.resolve(process.cwd(), SRCROOT),
        } : {},
        ...frostyDeps,
        ...config.options?.resolve?.alias ?? {},
      },
    },
    externals: config.options?.externals,
  };

  const webpackPlugins = _.compact([
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(!IS_PRODUCTION) }),
    fs.existsSync(path.join(process.cwd(), '.env')) && new Dotenv({ path: path.join(process.cwd(), '.env') }),
    fs.existsSync(path.join(process.cwd(), '.env.local')) && new Dotenv({ path: path.join(process.cwd(), '.env.local') }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    ...config.options?.plugins ?? [],
  ]);

  const server = config.serverEntry ? path.resolve(process.cwd(), config.serverEntry) : path.resolve(__dirname, 'src/server/default.ts');

  const random = crypto.randomUUID();
  const tempDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  const applications = path.resolve(tempDir, `applications-${random}.js`);
  const inputs = INPUT_FILE ? { main: { entry: path.join(process.cwd(), INPUT_FILE), uri: '/' } } : config.client;

  fs.writeFileSync(applications, `
    ${_.map(inputs, ({ entry }, name) => `import * as ${name} from '${path.resolve(process.cwd(), entry)}';`).join('\n')}
    export { ${_.keys(inputs).join(',')} };
  `);

  const moduleSuffixes = {
    client: config.moduleSuffixes?.client ?? ['.browser', '.web', ''],
    server: config.moduleSuffixes?.server ?? ['.node', '.server', '.web', ''],
  };

  return [
    ..._.map(inputs, ({ entry }, name) => ({
      ...webpackConfiguration,
      optimization: webpackOptimization({ server: false }),
      plugins: webpackPlugins,
      entry: {
        [`${name}_bundle`]: [
          path.resolve(__dirname, 'node_modules/core-js/stable'),
          path.resolve(__dirname, 'src/client/index.js'),
        ],
      },
      output: {
        path: path.join(OUTPUT_DIR, 'public'),
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
        new webpack.EnvironmentPlugin({ PORT }),
        new webpack.DefinePlugin({
          __applications__: JSON.stringify(_.mapValues(inputs, x => ({
            path: x.uri,
          }))),
        }),
        ...config.options?.server?.plugins ?? [],
      ]),
      target: 'node',
      entry: {
        server: [
          path.resolve(__dirname, 'node_modules/core-js/stable'),
          path.resolve(__dirname, 'src/server/index.js'),
        ],
      },
      output: {
        path: OUTPUT_DIR,
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
      externals: [
        ...webpackConfiguration.externals || [],
        nodeExternals(),
      ],
      module: {
        rules: [
          babelLoaderConfiguration({ server: true }),
          cssLoaderConfiguration({ server: true }),
          imageLoaderConfiguration({ server: true }),
          fontLoaderConfiguration({ server: true }),
          {
            test: /\.node$/,
            use: {
              loader: path.resolve(__dirname, 'node_modules/node-loader'),
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
