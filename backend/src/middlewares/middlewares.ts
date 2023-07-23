import { Context, Next } from "koa";
import authService from "../services/auth.service";
import joi from "joi"
import { MessageCodeStatusError, MessageError, MessageStatusError, UnknownError } from "../utils/error";
import { getJoinUserObject, getLoginUserObject } from '../object/user'
import { ErrorHandler } from '../utils/error'
import { TokenExpiredError, NotBeforeError, JsonWebTokenError } from "jsonwebtoken";
import { EncData } from "../interfaces/common";

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
        throw new MessageCodeStatusError('validate.decrypt', 400)
    }
}

export const validateTokenMiddleware = async (ctx: Context, next: Next) => {
    console.log("validateTokenMiddleware", ctx.header)
    try{
        ctx.header.authorization = ctx.header.authorization.replace('Bearer ', '')
        const result = await authService.verifyToken(ctx.header.authorization)
        return await next()
    } catch(e){
        if(e instanceof TokenExpiredError){
            throw new MessageCodeStatusError('validate.token.expired', 401)
        } else if(e instanceof NotBeforeError){
            throw new MessageCodeStatusError('validate.token.notBefore', 401)
        } else if (e instanceof JsonWebTokenError) {
            throw new MessageCodeStatusError('validate.token.invalid', 401)
        } else {
            throw e
        }
    }
}

export const validateMiddlewareFactory = (getObjectFunction: (param: any) => Promise<joi.AnySchema<any>>) => {
    return async (ctx: Context, next: Next) => {
        try{
            const lang = ctx.acceptsLanguages()[0]
            const objectFunction: joi.AnySchema<any> = await getObjectFunction(lang)
            if(ctx.request.method === "GET"){
                const result = await objectFunction.validateAsync(ctx.request.query, {
                    errors: { wrap: { label: '' } },
                    abortEarly: false,
                })
            } else {
                const result = await objectFunction.validateAsync(ctx.request.body, {
                    errors: { wrap: { label: '' } },
                    abortEarly: false,
                })
            }
            return next();
        }
        catch(error){
            throw error
        }
    }
}
