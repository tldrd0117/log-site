import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyParser';
import helloWorldRouter from './routers/helloworld.routes'
import authRouter from './routers/auth.routes'
import postRouter from './routers/post.routes'
import userRouter from './routers/user.routes'
import { errorHandleMiddleware } from './middlewares/middlewares';

import Cabin from 'cabin';
import requestReceived from 'request-received'
import responseTime from 'koa-better-response-time'
import requestId from 'koa-better-request-id'
import { Signale } from 'signale'
import Axe from 'axe'
import { initI18n } from './utils/i18n';

const getApp = async () => {
    const app = new Koa();
    const router = new Router();
    const cabin = new Cabin({
        logger: new Axe({
            logger: new Signale(),
            // meta: {
            //     pickedFields: ['request','response'],
            //     omittedFields: ['app'],
            //     hideHTTP: true,
            //     hideMeta: false
            // },
        })
    });
    const port: number = 3000;
    await initI18n()

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

    app.use(errorHandleMiddleware)
    
    app.use(helloWorldRouter.routes())
    app.use(authRouter.routes())
    app.use(postRouter.routes())
    app.use(userRouter.routes())

    app.use(router.routes());
    
    return app
}


export default getApp;