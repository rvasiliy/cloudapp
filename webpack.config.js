import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import CopyPlugin from 'copy-webpack-plugin';

import pkg from './package.json' assert { type: 'json' };

const ROOT = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: {
    main: path.resolve(ROOT, './src-ui/index.js'),
  },
  target: ['web'],
  output: {
    clean: true,
    filename: './js/[name].js',
    path: path.resolve(ROOT, `./public/${pkg.version}`),
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
  ],
};
