import Router from 'koa-router';
import mime from 'mime-types'
import { decMiddleware, validateTokenMiddleware } from '../middlewares/middlewares';
import authService from '../services/auth.service';
import response from '../utils/response';

const router = new Router({
    prefix: "/auth"
});

router.get('/publicKey', async (ctx) => {
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'Get public key'
    */
    ctx.body = response.makeSuccessBody(await authService.getPublicJWK())
})

router.post('/verify', decMiddleware, validateTokenMiddleware, async (ctx) => {
    /*	
        #swagger.tags = ['Auth']
        #swagger.summary = 'verify token'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/Empty"
                    }
                }
            }
        }
    */
    ctx.body = response.makeSuccessBody({})
})

export default router
