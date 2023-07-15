import Router from 'koa-router';
import authService from '../services/auth.service';
import settingService from '../services/setting.service';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import { DecodedUserInfo } from '../interfaces/auth';
import { SettingCreate, SettingGetList, SettingUpdate, SettingsDelete } from '../interfaces/setting';
import response from '../utils/response';
import { getAddCategoriesObject, getSettingCreateObject, getSettingListObject, getSettingUpdateObject, getSettingsDeleteObject } from '../object/setting';
import { MD5 } from 'crypto-js';

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
    const settingTypes = await settingService.getSettingTypes()
    const siteType = settingTypes.find((type) => type.name === 'site')
    const settings: Array<SettingCreate> = categories.map((category: string) => ({
        type: siteType._id,
        role: userInfo.role,
        userId: userInfo._id,
        name: 'category',
        value: category,
    }));
    const result = await settingService.addSettings(settings)
    ctx.body = response.makeSuccessBody({ list: result });
})

router.post("/", decMiddleware, validateTokenMiddleware, 
    validateMiddlewareFactory(getSettingCreateObject), async (ctx) => {
    /*	
        #swagger.tags = ['Setting']
        #swagger.summary = 'Add Setting'
        #swagger.security = [{
            bearer:[]
        }]

        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getSettingCreateObject"
                    },
                    "example": {
                        "type": "(...typeId)",
                        "name": "category",
                        "value": "new Category"
                    }
                }
            }
        }
    */
    const token = ctx.header.authorization
    const userInfo: any = await authService.decryptToken(token)
    const body: SettingCreate = ctx.request.body as SettingCreate
    body.role = userInfo.role
    body.userId = userInfo._id
    const result = await settingService.addSettings([body])
    ctx.body = response.makeSuccessBody({ list: result });
})

router.get('/list', validateTokenMiddleware, validateMiddlewareFactory(getSettingListObject), async (ctx) => {
    /*
        #swagger.tags = ['Setting']
        #swagger.summary = 'Get Setting'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.parameters[$ref] = ["#/components/parameters/offset", "#/components/parameters/limit"]
        
    */
   
    const token = ctx.header.authorization
    const postGetList: SettingGetList = ctx.request.query as unknown as SettingGetList;
    const userInfo: any = await authService.decryptToken(token)
    const setting = await settingService.getSettingList(userInfo as DecodedUserInfo, postGetList.limit, postGetList.offset)
    ctx.body = response.makeSuccessBody({ ...setting});
    console.log("/", ctx.body)
})

router.get('/categories', async (ctx) => {
    /*
        #swagger.tags = ['Setting']
        #swagger.summary = 'Get Categories'
    */
    const setting = await settingService.getCategories()
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
                        "$ref": "#/definitions/getSettingUpdateObject"
                    },
                    "example": {
                        "_id": "(...settingId)",
                        "type": "user",
                        "role": "user",
                        "userId": "userId",
                        "name": "category",
                        "value": "new Category"
                    }
                }
            }
        }
    */
    const settingUpdate: SettingUpdate = ctx.request.body as SettingUpdate;
    const result = await settingService.putSetting(settingUpdate)
    ctx.body = response.makeSuccessBody({ list: result});

})

router.delete('/', decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getSettingsDeleteObject), async (ctx) => {
    /*
        #swagger.tags = ['Setting']
        #swagger.summary = 'delete Setting'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getSettingsDeleteObject"
                    },
                    "example": {
                        "ids": ["(...settingId)"],
                    }
                }
            }
        }
    */
    const settingDelete: SettingsDelete = ctx.request.body as SettingsDelete;
    const result = await settingService.deleteSetting(settingDelete.ids)
    ctx.body = response.makeSuccessBody({ list: result});
})


export default router
