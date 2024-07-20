import Koa from 'koa';
import router from './router.js';

const app = new Koa();

app.use(router.routes());

const PORT = 42301;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Listening https://${HOST}:${PORT}/`);
});
