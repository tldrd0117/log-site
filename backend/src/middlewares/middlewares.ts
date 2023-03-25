import { Context, Next } from "koa";
import authService from "../services/auth.service";
import joi from "joi"
import { MessageError, MessageStatusError, UnknownError } from "../utils/error";
import { getJoinUserObject, getLoginUserObject } from '../object/user'
import { ErrorHandler } from '../utils/error'

const errorHandler = new ErrorHandler()

export const errorHandleMiddleware = async (ctx: Context, next: Next) => {
    try{
        await next();
    } catch(e){
        errorHandler.handle(ctx, e)
    }
}

export const decMiddleware = async (ctx: Context, next: Next) => {
    try{
        const body = ctx.request.body as EncData
        ctx.request.body = await authService.decryptJSON(body.enc)
        return next();
    } catch(e){
        throw new UnknownError()
    }
}

export const validateTokenMiddleware = async (ctx: Context, next: Next) => {
    ctx.header.authorization = ctx.header.authorization.replace('Bearer ', '')
    const result = await authService.verifyToken(ctx.header.authorization)
    if(Object.hasOwnProperty.call(result, 'exp')){
        return next();
    } else {
        throw new MessageStatusError('validate.token', 400)
    }
}

export const validateMiddlewareFactory = (getObjectFunction: (param: any) => Promise<joi.ObjectSchema<any>>) => {
    return async (ctx: Context, next: Next) => {
        try{
            const lang = ctx.acceptsLanguages()[0]
            const objectFunction: joi.ObjectSchema<any> = await getObjectFunction(lang)
            const result = await objectFunction.validateAsync(ctx.request.body, {
                errors: { wrap: { label: '' } },
                abortEarly: false,
            })
            return next();
        }
        catch(error){
            if(error.isJoi){
                throw error
            } else {
                throw new UnknownError()
            }
        }
    }
}
