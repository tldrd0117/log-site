import Router from "koa-router";
import visitService from "../services/visit.service";
import { GetPopularVisit, Visit } from "../interfaces/visit";
import response from "../utils/response";
import { decMiddleware, validateMiddlewareFactory } from "../middlewares/middlewares";
import { getVisitCreateObject, getVisitObject } from "../object/visit";


const router = new Router({
    prefix: "/visit"
});

router.get('/', validateMiddlewareFactory(getVisitObject), async (ctx) => {
    /*	
        #swagger.tags = ['Visit']
        #swagger.summary = 'Get visit'
        #swagger.parameters[$ref] = ["#/components/parameters/target"]
    */
    const query: Visit = ctx.request.query as unknown as Visit;
    const result = await visitService.getVisit(query)
    ctx.body = response.makeSuccessBody({list: result});
})

router.get('/popular', async (ctx) => {
    /*	
        #swagger.tags = ['Visit']
        #swagger.summary = 'Get popular tags'
        #swagger.parameters[$ref] = ["#/components/parameters/limit", "#/components/parameters/type"]
    */
    const query: GetPopularVisit = ctx.request.query as unknown as GetPopularVisit;
    const result = await visitService.getPopularVisit(query)
    ctx.body = response.makeSuccessBody({list: result});
})

router.post('/', decMiddleware, validateMiddlewareFactory(getVisitCreateObject), async (ctx) => {
    /*	
        #swagger.tags = ['Visit']
        #swagger.summary = 'post visit'
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getVisitObject"
                    },
                    "example": {
                        "target": "blog",
                    }
                }
            }
        }
    */
    const body: Visit = ctx.request.body as Visit;
    const result = await visitService.addVisit(ctx.ip, body.target, body.type)
    ctx.body = response.makeSuccessBody(result);
})


export default router