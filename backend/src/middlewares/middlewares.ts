import { Context, Next } from "koa";
import authService from "../services/auth.service";
import joi from "joi"
import response from "../utils/response";

export const decMiddleware = async (ctx: Context, next: Next) => {
    const body = ctx.request.body as EncData
    ctx.request.body = await authService.decryptJSON(body.enc)
    return next();
}

export const validateTokenMiddleware = async (ctx: Context, next: Next) => {
    try{
        ctx.header.authorization = ctx.header.authorization.replace('Bearer ', '')
        const result = await authService.verifyToken(ctx.header.authorization)
        if(Object.hasOwnProperty.call(result, 'exp')){
            return next();
        } else {
            ctx.body = response.makeErrorBody({
                error:{
                    message: 'Token expired'
                }
            })
            ctx.status = 401
        }
    } catch (e) {
        console.error(e)
    }
}

export const validateMiddlewareFactory = (getObjectFunction: (param: any) => Promise<joi.ObjectSchema<any>>) => {
    return async (ctx: Context, next: Next) => {
        try{
            const lang = ctx.acceptsLanguages()[0]
            const object: joi.ObjectSchema<any> = await getObjectFunction(lang)
            const result = await object.validateAsync(ctx.request.body, {
                errors: { wrap: { label: '' } },
                abortEarly: false,
            })
            return next();
        }
        catch(error){
            if(error instanceof joi.ValidationError){
                ctx.request.body = {
                    error
                }
            }
            const body: ErrorBody = ctx.request.body as ErrorBody
            ctx.body = response.makeErrorBody({
                error: body.error
            })
            ctx.status = 400
        }
    }
}
