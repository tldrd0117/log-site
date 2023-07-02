import Router from 'koa-router';
import authService from '../services/auth.service';
import settingService from '../services/setting.service';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import { DecodedUserInfo } from '../interfaces/auth';
import { SettingCreate, SettingUpdate } from '../interfaces/setting';
import response from '../utils/response';
import { getAddCategoriesObject, getSettingUpdateObject } from '../object/setting';

const router = new Router({
    prefix: "/setting"
});

router.post("/addCategories", decMiddleware, validateTokenMiddleware, 
    validateMiddlewareFactory(getAddCategoriesObject), async (ctx) => {
    /*	
        #swagger.tags = ['Setting']
        #swagger.summary = 'Add category'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getAddCategoriesObject"
                    },
                    "example": {
                        categories: ["카테고리1", "카테고리2", "카테고리3"]
                    }
                }
            }
        }
    */
    const token = ctx.header.authorization
    const userInfo: any = await authService.decryptToken(token)
    const body: any = ctx.request.body
    const categories = body.categories
    console.log(categories)
    const settings: Array<SettingCreate> = categories.map((category: string) => ({
        type: 'site',
        role: userInfo.role,
        userId: userInfo._id,
        name: 'category',
        value: category,
    }));
    const result = await settingService.addSettings(settings)
    ctx.body = response.makeSuccessBody({ list: result});
})

router.get('/', validateTokenMiddleware, async (ctx) => {
    /*
        #swagger.tags = ['Setting']
        #swagger.summary = 'Get Setting'
        #swagger.security = [{
            bearer:[]
        }]
        
    */
   
    const token = ctx.header.authorization
    const userInfo: any = await authService.decryptToken(token)
    const setting = await settingService.getSetting(userInfo as DecodedUserInfo)
    console.log(setting)
    ctx.body = response.makeSuccessBody({ list: setting});
})

router.put('/', decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getSettingUpdateObject), async (ctx) => {
    /*
        #swagger.tags = ['Setting']
        #swagger.summary = 'put Setting'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateArrayObject"
                    },
                    "example": {
                        "_id": (...settingId);
                        "type": "user",
                        "role": "user";
                        "userId": "userId";
                        "name": "category";
                        "value": "new Category";
                    }
                }
            }
        }
    */
    const settingUpdate: SettingUpdate = ctx.request.body as SettingUpdate;
    const result = await settingService.putSetting(settingUpdate)
    ctx.body = response.makeSuccessBody({ list: result});

})

export default router
