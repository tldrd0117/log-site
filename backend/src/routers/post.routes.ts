
import Router from 'koa-router';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import postService from '../services/post.service';
import { getPostListObject, getPostObject, getPostCreateObject, getPostUpdateObject, getPostDelObject, getPostSearchListObject, getPostCreateArrayObject, getPostDelArrayObject } from '../object/post';
import response from '../utils/response';
import { PostCreate, PostDelete, PostGet, PostGetList, PostSearchList, PostUpdate } from '../interfaces/post';

const router = new Router({
    prefix: "/post"
});

router.get("/list", decMiddleware, validateMiddlewareFactory(getPostListObject), async (ctx) => {
    const postGetList: PostGetList = ctx.request.body as PostGetList;
    const result = await postService.getList(postGetList.limit, postGetList.offset)
    ctx.body = response.makeSuccessBody(result);
});


router.get("/", decMiddleware, validateMiddlewareFactory(getPostObject), async (ctx) => {
    const postGet: PostGet = ctx.request.body as PostGet;
    const result = await postService.getPost(postGet._id)
    ctx.body = response.makeSuccessBody(result.toJSON());
});

router.post("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostCreateObject), async (ctx) => {
    const postCreate: PostCreate = ctx.request.body as PostCreate;
    const result = await postService.post(postCreate)
    ctx.body = response.makeSuccessBody(result.toJSON());
});

router.post("/list", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostCreateArrayObject), async (ctx) => {
    const postCreates: Array<PostCreate> = ctx.request.body as Array<PostCreate>;
    const result = await postService.postMany(postCreates)
    ctx.body = response.makeSuccessBody({
        list: result
    });
});

router.get("/list/search", decMiddleware, validateMiddlewareFactory(getPostSearchListObject), async (ctx) => {
    const postSearchList: PostSearchList = ctx.request.body as PostSearchList;
    const result = await postService.searchList(postSearchList.limit, postSearchList.offset, postSearchList.word)
    ctx.body = response.makeSuccessBody(result);
});

router.put("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostUpdateObject), async (ctx) => {
    const postUpdate: PostUpdate = ctx.request.body as PostUpdate;
    const result = await postService.putPost(postUpdate)
    ctx.body = response.makeSuccessBody(result);
});

router.del("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostDelObject), async (ctx) => {
    const postDelete: PostDelete = ctx.request.body as PostDelete;
    const result = await postService.delPost(postDelete._id)
    ctx.body = response.makeSuccessBody(result);
});

router.del("/list", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostDelArrayObject), async (ctx) => {
    const postDeletes: Array<PostDelete> = ctx.request.body as Array<PostDelete>;
    const result = await postService.delPosts(postDeletes.map(v=>v._id))
    ctx.body = response.makeSuccessBody(result);

});

export default router

