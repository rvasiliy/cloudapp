import { dirname, resolve } from 'node:path';
import { env } from 'node:process';
import { fileURLToPath } from 'node:url';

import 'dotenv/config.js';
import Koa from 'koa';
import serve from 'koa-static';
import router from './router.js';

const PORT = env.PORT || 8080;
const HOST = env.HOST || 'localhost';
const PUBLIC_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../public');

const app = new Koa();

app.use(serve(PUBLIC_ROOT, {})).use(router.routes());

app.listen(PORT, HOST, () => {
  console.log(`Listening https://${HOST}:${PORT}/`);
});
