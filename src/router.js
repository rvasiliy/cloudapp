import Router from '@koa/router';
import home from "./pages/home.js";

const router = new Router();

router.get('/', home);

export default router;
