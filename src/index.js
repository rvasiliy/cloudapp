import { dirname, resolve } from 'node:path';
import { env } from 'node:process';
import { fileURLToPath } from 'node:url';

import 'dotenv/config.js';
import Koa from 'koa';
import Pug from 'koa-pug';
import serve from 'koa-static';
import router from './router.js';
import pkg from '../package.json' assert { type: 'json' };

const APP_VERSION = pkg.version;
const PORT = env.PORT || 8080;
const HOST = env.HOST || 'localhost';
const ROOT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const app = new Koa();
app.use(serve(resolve(ROOT_PATH, './public'), {})).use(router.routes());

new Pug({
  app,
  viewPath: resolve(ROOT_PATH, './src/views'),
  locals: { APP_VERSION },
});

app.listen(PORT, HOST, () => {
  console.log(`Listening https://${HOST}:${PORT}/`);
});
