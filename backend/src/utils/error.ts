import { Context } from "koa";
import response from "./response";
import { ValidationError } from "joi";

export class MessageStatusError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
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
        if(error instanceof String){
            ctx.body = response.makeErrorBody({
                error: error
            })
            ctx.status = 400
        }
        else if(error instanceof ValidationError){
            ctx.body = response.makeErrorBody({
                error: error.details
            })
            ctx.status = 400
        }
        else if(error instanceof MessageStatusError){
            ctx.body = response.makeErrorBody({
                error: error.message
            })
            ctx.status = error.status
        }
        else if(error instanceof MessageErrors){
            ctx.body = response.makeErrorBody({
                error: error.errors
            })
            ctx.status = 400
        }
        else {
            ctx.body = response.makeErrorBody({
                error: "unknown error"
            })
            ctx.status = 500
        }
    }

}