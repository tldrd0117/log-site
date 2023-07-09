
import Router from 'koa-router';
import authService from '../services/auth.service';
import { getJoinUserObject, getLoginUserObject } from '../object/user'
import response from '../utils/response';
import { Context, Next } from 'koa';
import userService from '../services/user.service';
import { UserJoin, UserLogin } from '../interfaces/user'
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from "../middlewares/middlewares"
import { getI18next } from '../utils/i18n';
import { types } from 'joi';
import { use } from 'chai';

const router = new Router({
    prefix: "/user"
});

router.post('/join', decMiddleware, validateMiddlewareFactory(getJoinUserObject), async (ctx) => {
    /*
        #swagger.tags = ['User']
        #swagger.summary = 'Join'
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getJoinUserObject"
                    },
                    "example": {
                        "name": "testUser",
                        "email": "testUser@example.com",
                        "password": "testPassword"
                    }
                }
            }
        }
    */
    const user = ctx.request.body as UserJoin
    const types = await userService.getRoleTypes()
    const userType = types.find((type) => type.name === 'user')
    user.role = userType?._id.toString()
    const result = await userService.doJoin(user as UserJoin)
    const userInfo = await userService.getUserByEmail(result.email)
    const token = await authService.getToken(userInfo.toJSON())
    ctx.body = response.makeSuccessBody({
        token
    })
})

router.post('/login', decMiddleware, validateMiddlewareFactory(getLoginUserObject), async (ctx) => {
    /*
        #swagger.tags = ['User']
        #swagger.summary = 'Login'
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getLoginUserObject"
                    },
                    "example": {
                        "email": "testUser@example.com",
                        "password": "testPassword"
                    }
                }
            }
        }
    */
    const result = await userService.doLogin(ctx.request.body as UserLogin)
    if (result) {
        const userInfo = await userService.getUserByEmail(result.email)
        console.log("login", userInfo.toJSON())
        const token = await authService.getToken(userInfo.toJSON())
        ctx.body = response.makeSuccessBody({
            token
        })
    }
    else {
        const lang = ctx.acceptsLanguages()[0]
        const i18next = await getI18next(lang)
        ctx.body = response.makeErrorBody({
            error: i18next.t('validate.password')
        })
    }
})

export default router



