
import Router from 'koa-router';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import postService from '../services/post.service';
import { getPostListObject, getPostObject, getPostCreateObject, getPostUpdateObject, getPostDelObject, getPostSearchListObject, getPostCreateArrayObject, getPostDelArrayObject } from '../object/post';
import response from '../utils/response';
import { PostCreate, PostDelete, PostGet, PostGetList, PostSearchList, PostUpdate } from '../interfaces/post';

const router = new Router({
    prefix: "/post"
});

router.get("/list", validateMiddlewareFactory(getPostListObject), async (ctx) => {
    /*	
        #swagger.parameters[$ref] = ["#/components/parameters/offset", "#/components/parameters/limit"]
    */
    const postGetList: PostGetList = ctx.request.query as unknown as PostGetList;
    const result = await postService.getList(postGetList.limit, postGetList.offset)
    ctx.body = response.makeSuccessBody(result);
});


router.get("/", validateMiddlewareFactory(getPostObject), async (ctx) => {
    /*	
        #swagger.parameters[$ref] = ["#/components/parameters/_id"]
    */
    const postGet: PostGet = ctx.request.query as unknown as PostGet;
    const result = await postService.getPost(postGet._id)
    ctx.body = response.makeSuccessBody(result.toJSON());
});

router.post("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostCreateObject), async (ctx) => {
    /*	#swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateObject"
                    },
                    "example": {
                        "author": "...(authorId)",
                        "authorName": "testUser",
                        "summary": "example summary",
                        "text": "example text",
                        "parent": "",
                        "relatedPosts": []
                    }
                }
            }
        }
    */
    const postCreate: PostCreate = ctx.request.body as PostCreate;
    const result = await postService.post(postCreate)
    ctx.body = response.makeSuccessBody(result.toJSON());
});

router.post("/list", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostCreateArrayObject), async (ctx) => {
    /*	#swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateArrayObject"
                    },
                    "example": [{
                        "author": "...(authorId)",
                        "authorName": "testUser",
                        "summary": "example summary",
                        "text": "example text",
                        "relatedPosts": []
                    }, {
                        "author": "...(authorId)",
                        "authorName": "testUser",
                        "summary": "example summary2",
                        "text": "example text2",
                        "relatedPosts": []
                    }]
                }
            }
        }
    */
    const postCreates: Array<PostCreate> = ctx.request.body as Array<PostCreate>;
    const result = await postService.postMany(postCreates)
    ctx.body = response.makeSuccessBody({
        list: result
    });
});

router.get("/list/search", validateMiddlewareFactory(getPostSearchListObject), async (ctx) => {
    /*	
        #swagger.parameters[$ref] = [
            "#/components/parameters/offset", 
            "#/components/parameters/limit",
            "#/components/parameters/word"
        ]
    */
    const postSearchList: PostSearchList = ctx.request.query as unknown as PostSearchList;
    const result = await postService.searchList(postSearchList.limit, postSearchList.offset, postSearchList.word)
    ctx.body = response.makeSuccessBody(result);
});

router.put("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostUpdateObject), async (ctx) => {
    /*	#swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateArrayObject"
                    },
                    "example": {
                        "_id": "...(postId)",
                        "summary": "example summary",
                        "text": "example text",
                        "relatedPosts": []
                    }
                }
            }
        }
    */
    const postUpdate: PostUpdate = ctx.request.body as PostUpdate;
    const result = await postService.putPost(postUpdate)
    ctx.body = response.makeSuccessBody(result);
});

router.delete("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostDelObject), async (ctx) => {
    /*	#swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateArrayObject"
                    },
                    "example": {
                        _id: "...(postId)"
                    }
                }
            }
        }
    */
    const postDelete: PostDelete = ctx.request.body as PostDelete;
    const result = await postService.delPost(postDelete._id)
    ctx.body = response.makeSuccessBody(result);
});

router.delete("/list", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostDelArrayObject), async (ctx) => {
    /*	#swagger.security = [{
            bearer:[]
        }]
        #swagger.requestBody = {
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/definitions/getPostCreateArrayObject"
                    },
                    "example": [{
                        _id: "...(postId)"
                    }, {
                        _id: "...(postId)"
                    }]
                }
            }
        }
    */
    const postDeletes: Array<PostDelete> = ctx.request.body as Array<PostDelete>;
    const result = await postService.delPosts(postDeletes.map(v=>v._id))
    ctx.body = response.makeSuccessBody(result);

});

export default router

