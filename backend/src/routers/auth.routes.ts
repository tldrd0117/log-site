import Router from 'koa-router';
import mime from 'mime-types'
import { validateTokenMiddleware } from '../middlewares/middlewares';
import authService from '../services/auth.service';

const router = new Router({
    prefix: "/auth"
});

router.get('/publicKey', async (ctx) => {
    ctx.body = await authService.getPublicJWK()
})


// router.get('/tokens', async (ctx) => {
//     const token = await authService.getToken({})
//     ctx.body = {token};
// })

// router.post('/verify', validateTokenMiddleware, async (ctx) => {
//     try{
//         const body: any = ctx.request.body;
//         ctx.body = await authService.verifyToken(body.token)
//     } catch (e) {
//         console.error(e)
//     }
// })

export default router
