import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyParser';
import helloWorldRouter from './routers/helloworld.routes'
import authRouter from './routers/auth.routes'
import postRouter from './routers/post.routes'
import userRouter from './routers/user.routes'
import testRouter from './routers/test.routes'
import infoRouter from './routers/info.routes'
import visitRouter from './routers/visit.routes'
import settingRouter from './routers/setting.routes'
import categoryRouter from './routers/category.routes'
import { errorHandleMiddleware } from './middlewares/middlewares';

import Cabin from 'cabin';
import requestReceived from 'request-received'
import responseTime from 'koa-better-response-time'
import requestId from 'koa-better-request-id'
import { Signale } from 'signale'
import Axe from 'axe'
import { initI18n } from './utils/i18n';
import { koaSwagger } from 'koa2-swagger-ui';
import cors from '@koa/cors';
import createMongo from './utils/mongo';
import sha256 from 'crypto-js/sha256';


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


    app.use(cors());
    

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
    app.use(testRouter.routes())
    app.use(settingRouter.routes())
    app.use(infoRouter.routes())
    app.use(visitRouter.routes())
    app.use(categoryRouter.routes())

    app.use(router.routes());

    app.use(
        koaSwagger({
            routePrefix: '/swagger', // host at /swagger instead of default /docs
            swaggerOptions: {
                url: '/helloworld/swagger-output.json', // example path to json
                // @ts-ignore
                requestInterceptor: async (req: any) => {
                    console.log(req)
                    if(req.method && req.method !== "GET"){
                        const encryptData = await fetch('/test/enc', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: req.body,
                        });
                        req.body = await encryptData.text()
                    }
                    return req
                }
            },
        }),
    );
    console.log("buildApp")
    
    return app
}

export const connectMongo = () => {
    const mongo = createMongo(undefined, "log-site-dev")
    mongo.connect()
} 


export default getApp;