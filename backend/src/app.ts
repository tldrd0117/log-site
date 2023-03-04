import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyParser';
import logger from 'koa-logger'
import helloWorldRouter from './controllers/helloworld.controller'
import authRouter from './controllers/auth.controller'
import postRouter from './controllers/post.controller'
import userRouter from './controllers/user.controller'

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.use(logger())
app.use(bodyParser());
app.use(helloWorldRouter.routes())
app.use(authRouter.routes())
app.use(postRouter.routes())
app.use(userRouter.routes())

app.use(router.routes());

export default app;