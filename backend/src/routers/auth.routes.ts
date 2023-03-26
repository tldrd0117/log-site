import Router from 'koa-router';
import mime from 'mime-types'
import { decMiddleware, validateTokenMiddleware } from '../middlewares/middlewares';
import authService from '../services/auth.service';
import response from '../utils/response';

const router = new Router({
    prefix: "/auth"
});

router.get('/publicKey', async (ctx) => {
    ctx.body = await authService.getPublicJWK()
})

router.post('/verify', decMiddleware, validateTokenMiddleware, async (ctx) => {
    ctx.body = response.makeSuccessBody({})
})

export default router
