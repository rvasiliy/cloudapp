import { env } from 'node:process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import 'dotenv/config.js';

import pkg from './package.json' assert { type: 'json' };

const APP_VERSION = pkg.version;
const ROOT = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: {
    main: path.resolve(ROOT, './src-ui/index.js'),
  },
  target: ['web'],
  devtool: 'source-map',
  output: {
    clean: true,
    filename: './js/[name].js',
    path: path.resolve(ROOT, `./public/${APP_VERSION}`),
  },
  devServer: {
    static: {
      directory: path.resolve(ROOT, './public'),
    },
    port: 42301,
  },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
  },
  resolve: {
    modules: ['node_modules', path.resolve(ROOT, './src-ui')],
    extensions: ['.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src-ui/favicon.ico', to: 'favicon.ico', toType: 'file' }],
    }),
    sentryWebpackPlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_PROJECT,
      authToken: env.SENTRY_AUTH_TOKEN,
      release: {
        name: APP_VERSION,
      },
      sourcemaps: {
        filesToDeleteAfterUpload: '**/*.js.map',
      },
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(APP_VERSION),
    }),
  ],
};
