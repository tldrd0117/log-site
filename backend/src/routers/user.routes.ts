
import Router from 'koa-router';
import authService from '../services/auth.service';
import { getJoinUserObject, getLoginUserObject } from '../object/user'
import response from '../utils/response';
import { Context, Next } from 'koa';
import userService from '../services/user.service';
import { UserJoin, UserLogin } from '../interfaces/user'
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from "../middlewares/middlewares"
import { geti18next } from '../utils/i18n';

const router = new Router({
    prefix: "/user"
});

router.post('/join', decMiddleware, validateMiddlewareFactory(getJoinUserObject), async (ctx) => {
    const result = await userService.doJoin(ctx.request.body as UserJoin)
    const userInfo = await userService.getUserByEmail(result.email)
    const token = await authService.getToken(userInfo.toJSON())
    ctx.body = response.makeSuccessBody({
        token
    })
})

router.post('/login', decMiddleware, validateMiddlewareFactory(getLoginUserObject), async (ctx) => {
    const result = await userService.doLogin(ctx.request.body as UserLogin)
    if(result){
        const userInfo = await userService.getUserByEmail(result.email)
        const token = await authService.getToken(userInfo.toJSON())
        ctx.body = response.makeSuccessBody({
            token
        })
    }
    else{
        const lang = ctx.acceptsLanguages()[0]
        console.log(lang)
        const i18next = await geti18next(lang)
        ctx.body = response.makeErrorBody({
            error: i18next.t('validate.password')
        })
    }
})

export default router



