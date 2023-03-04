
import Router from 'koa-router';
var unless = require('koa-unless');
const router = new Router({
    prefix: "/user"
});

router.post("/register", async (ctx) => {
    console.log("register")
    ctx.body = 'register';
});

router.post("/login", async (ctx) => {
    // if(ctx.request.body.password === "password"){
    //     ctx.body = "pwd"
    // } else {
        ctx.body = "login";
    // }
});

export default router

