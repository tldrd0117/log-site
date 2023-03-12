
import Router from 'koa-router';
import authService from '../services/auth.service';

const router = new Router({
    prefix: "/user"
});

router.post("/register", async (ctx) => {
    console.log("register")
    ctx.body = 'register';
});

router.get('/login', async (ctx) => {
    const body: any = ctx.request.body;
    const pwd = await authService.decryptData(body.password)
    if(body.id=="admin" && pwd.plaintext.toString()=="1234"){
        ctx.body = {
            result: "success"
        }
    }
})

export default router

