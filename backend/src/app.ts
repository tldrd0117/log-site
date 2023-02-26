import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyParser';
import helloWorldRouter from './controllers/helloworld.controller'
import authRouter from './controllers/auth.controller'

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.use(bodyParser());
app.use(helloWorldRouter.routes())
app.use(authRouter.routes())

app.use(router.routes());

export default app;