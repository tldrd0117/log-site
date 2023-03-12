import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyParser';
import helloWorldRouter from './controllers/helloworld.controller'
import authRouter from './controllers/auth.controller'
import postRouter from './controllers/post.controller'
import userRouter from './controllers/user.controller'

import Cabin from 'cabin';
import requestReceived from 'request-received'
import responseTime from 'koa-better-response-time'
import requestId from 'koa-better-request-id'
import { Signale } from 'signale'
import Axe from 'axe'

const app = new Koa();
const router = new Router();
const cabin = new Cabin({
    logger: new Axe({
        logger: new Signale(),
        meta: {
            pickedFields: ['request','response'],
            omittedFields: ['app'],
            hideHTTP: true,
            hideMeta: false
        },
    })
});
const port: number = 3000;

// adds request received hrtime and date symbols to request object
// (which is used by Cabin internally to add `request.timestamp` to logs
app.use(requestReceived);

// adds `X-Response-Time` header to responses
app.use(responseTime());

// adds or re-uses `X-Request-Id` header
app.use(requestId());

// use the cabin middleware (adds request-based logging and helpers)
app.use(cabin.middleware);

app.use(bodyParser());
app.use(helloWorldRouter.routes())
app.use(authRouter.routes())
app.use(postRouter.routes())
app.use(userRouter.routes())

app.use(router.routes());

export default app;