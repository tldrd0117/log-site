import Router from 'koa-router';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import response from '../utils/response';
import categoryService from '../services/category.service';
import { CategoryCreate, CategoryDelete, CategoryGetList, CategoryUpdate } from '../interfaces/category';
import { getCategoryCreateObject, getCategoryDelObject, getCategoryListObject, getCategoryUpdateObject } from '../object/category';

const router = new Router({
    prefix: "/category"
});

router.get("/list", validateMiddlewareFactory(getCategoryListObject), async (ctx) => {
    /*	
        #swagger.tags = ['Category']
        #swagger.summary = 'Get Category list'
        #swagger.parameters[$ref] = ["#/components/parameters/offset", "#/components/parameters/limit"]
    */
    const categoryGetList: CategoryGetList = ctx.request.query as unknown as CategoryGetList;
    const result = await categoryService.getCategory(categoryGetList.limit, categoryGetList.offset)
    ctx.body = response.makeSuccessBody(result);
})

router.post("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getCategoryCreateObject), async (ctx) => {
    /*	
        #swagger.tags = ['Category']
        #swagger.summary = 'Create Category'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getCategoryCreateObject"
                    },
                    "example": {
                        "name": "category Name",
                    }
                }
            }
        }
    */
        const categoryCreate: CategoryCreate = ctx.request.body as CategoryCreate;
        const result = await categoryService.createCategory(categoryCreate.name)
        ctx.body = response.makeSuccessBody(result.toJSON());
})

router.put("/",decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getCategoryUpdateObject), async (ctx) => {
    /*	#swagger.tags = ['Category']
        #swagger.summary = 'Update Category'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getCategoryUpdateObject"
                    },
                    "example": {
                        "_id": "...(categoryId)",
                        "name": "example category",
                    }
                }
            }
        }
    */
        const categoryUpdate: CategoryUpdate = ctx.request.body as CategoryUpdate;
        const result = await categoryService.putCategory(categoryUpdate._id, categoryUpdate.name)
        ctx.body = response.makeSuccessBody(result);
})

router.delete("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getCategoryDelObject), async (ctx) => {

    /*	
        #swagger.tags = ['Category']
        #swagger.summary = 'Delete Category'
        #swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getCategoryDelObject"
                    },
                    "example": {
                        _id: "...(postId)"
                    }
                }
            }
        }
    */
    const categoryDelete: CategoryDelete = ctx.request.body as CategoryDelete;
    const result = await categoryService.deleteCategory(categoryDelete._id)
    ctx.body = response.makeSuccessBody(result);
})

export default router
