import _ from 'lodash';
import os from 'os';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default async (env, argv) => {

  const { CONFIG_FILE = 'server.config.js', INPUT_FILE } = env;

  const serverConfig = await (async () => {
    try {
      return await import(path.resolve(process.cwd(), CONFIG_FILE));
    } catch {
      return {};
    }
  })();

  const config = _.isFunction(serverConfig) ? serverConfig(env, argv) : serverConfig;
  const IS_PRODUCTION = argv.mode !== 'development';

  const {
    PORT = 8080,
    SRCROOT = config.src,
    OUTPUT_DIR = config.output || path.resolve(import.meta.dirname, 'dist'),
  } = env;

  const frostyDeps = await (async () => {
    try {
      const resolved = import.meta.resolve('frosty');
      return {
        frosty: resolved.endsWith('/dist/index.js') ? resolved.replace('/index.js', '') : resolved,
      };
    } catch {
      const { rollupConfig: { input } } = await import(path.resolve(import.meta.dirname, '../../rollup.config.mjs'));
      const resolved = {};
      for (const [k, v] of _.entries(input)) {
        if (k === 'index') continue;
        resolved[`frosty/${k}`] = path.resolve(import.meta.dirname, '../..', v);
      }
      return {
        ...resolved,
        frosty: path.resolve(import.meta.dirname, '../../src/index'),
      };
    }
  })();

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
        ...SRCROOT ? {
          '~': path.resolve(process.cwd(), SRCROOT),
        } : {},
        ...frostyDeps,
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

  const server = config.serverEntry ? path.resolve(process.cwd(), config.serverEntry) : path.resolve(import.meta.dirname, './src/server/default.js');

  const random = crypto.randomUUID();
  const tempDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  const applications = path.resolve(tempDir, `applications-${random}.js`);
  const inputs = INPUT_FILE ? { main: { entry: INPUT_FILE, uri: '/' } } : config.client;

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
          'core-js/stable',
          path.resolve(import.meta.dirname, './src/client/index.js'),
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
        ...config.options?.server?.plugins ?? [],
        config.serverAssets && new CopyPlugin({ patterns: config.serverAssets }),
      ]),
      target: 'node',
      entry: {
        server: [
          'core-js/stable',
          path.resolve(import.meta.dirname, './src/server/index.js'),
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
