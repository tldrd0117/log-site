import Router from 'koa-router';
import mime from 'mime-types'
import { decMiddleware, validateTokenMiddleware } from '../middlewares/middlewares';
import authService from '../services/auth.service';
import response from '../utils/response';
import sha256 from 'crypto-js/sha256';

const router = new Router({
    prefix: "/test"
});

router.get('/token', async (ctx) => {
    /*
        #swagger.tags = ['Test']
        #swagger.summary = 'Get token'
    */
    ctx.body = await authService.getToken({})
})

router.post('/enc', async (ctx) => {
    /*
        #swagger.tags = ['Test']
        #swagger.summary = 'Encrypt data'
    */
    const body: any = ctx.request.body
    if(body && body.password){
        body.password = sha256("********").toString()
    }
    const encryptData = await authService.encryptData(JSON.stringify(ctx.request.body))
    ctx.response.body = {enc: encryptData}
})

router.post("/userInfo", validateTokenMiddleware, async (ctx) => {
    /*  #swagger.tags = ['Test']
        #swagger.summary = 'Get user info'
        #swagger.security = [{
            bearer:[]
        }]
    */
    const token: any = ctx.header.authorization
    ctx.response.body = await authService.decryptToken(token)
})

export default router
