import Koa from 'koa';

const app = new Koa();

const PORT = 42301;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Listening https://${HOST}:${PORT}/`);
});
