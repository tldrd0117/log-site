import { Context } from "koa";
import response from "./response";
import { ValidationError } from "joi";
import { getI18next, getI18nextByCtx } from "./i18n";

export class MessageStatusError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class MessageCodeStatusError extends Error {
    status: number;
    code: string;
    constructor(code: string, status: number) {
        super(code);
        this.code = code;
        this.status = status;
    }
}

export class MessageCodeError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class MessageError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class MessageErrors extends Error {
    errors: Array<Error>
    constructor(errors: Array<Error>) {
        const msgs = errors.map((e) => e.message).join(", ")
        super(msgs);
        this.errors = errors
    }
}

export class UnknownError extends Error {
    code: number;
    constructor() {
        super("error.unknown");
        this.code = 500;
    }
}

export class ErrorHandler{
    constructor(){
    }
    handle(ctx: Context, error: Error|string){
        console.error(error)
        if(typeof error === "string"){
            ctx.body = response.makeErrorBodyByMessage(error)
            ctx.status = 400
        }
        else if(error instanceof ValidationError){
            ctx.body = response.makeErrorBodyByValidationError(error)
            ctx.status = 400
        }
        else if(error instanceof MessageCodeStatusError){
            const errorMsg = getI18nextByCtx(ctx).t(error.code)
            ctx.body = response.makeErrorBodyByMessage(errorMsg)
            ctx.status = error.status
        }
        else if(error instanceof MessageStatusError){
            ctx.body = response.makeErrorBodyByError(error)
            ctx.status = error.status
        }
        else if(error instanceof MessageErrors){
            ctx.body = response.makeErrorBodyByErrors(error.errors)
            ctx.status = 400
        }
        else {
            ctx.body = response.makeErrorBodyByMessage("unknown error")
            ctx.status = 500
        }
    }

}