import { env } from 'node:process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import webpack from 'webpack';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import dotenv from 'dotenv';

import pkg from '../package.json' assert { type: 'json' };

const APP_VERSION = pkg.version;
const ROOT = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(ROOT, '../.env') });

export default {
  mode: 'production',
  entry: {
    main: path.resolve(ROOT, 'index.js'),
  },
  target: ['web'],
  devtool: 'source-map',
  output: {
    clean: true,
    filename: './js/[name].js',
    path: path.resolve(ROOT, `./dist/${APP_VERSION}`),
  },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
  },
  resolve: {
    modules: ['node_modules', ROOT],
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(APP_VERSION),
    }),
    sentryWebpackPlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_PROJECT,
      authToken: env.SENTRY_AUTH_TOKEN,
      release: {
        name: APP_VERSION,
        dist: 'src-other',
      },
      sourcemaps: {
        filesToDeleteAfterUpload: '**/*.js.map',
      },
    }),
  ],
};
