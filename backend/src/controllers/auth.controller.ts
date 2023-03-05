import Router from 'koa-router';
import mime from 'mime-types'
import authService from '../services/auth.service';

const router = new Router({
    prefix: "/auth"
});


router.get('/tokens', async (ctx) => {
    ctx.body = await authService.getToken({});
})

router.get('/jwks', async (ctx) => {
    ctx.body = await authService.getPublicKey()
})

router.post('/verify', async (ctx) => {
    try{
        const body: any = ctx.request.body;
        ctx.body = await authService.verifyToekn(body.token)
    } catch (e) {
        console.error(e)
    }
})

export default router
