import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import Koa from 'koa';
import serve from 'koa-static';
import router from './router.js';

const PORT = 42301;
const HOST = 'localhost';
const PUBLIC_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../public');

const app = new Koa();

app.use(serve(PUBLIC_ROOT, {})).use(router.routes());

app.listen(PORT, HOST, () => {
  console.log(`Listening https://${HOST}:${PORT}/`);
});
