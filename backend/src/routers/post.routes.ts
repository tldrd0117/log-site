
import Router from 'koa-router';
import { decMiddleware, validateMiddlewareFactory, validateTokenMiddleware } from '../middlewares/middlewares';
import postService from '../services/post.service';
import { getPostListObject, getPostObject, getPostCreateObject, getPostUpdateObject, getPostDelObject, getPostSearchListObject } from '../object/post';

const router = new Router({
    prefix: "/post"
});

router.get("/list", decMiddleware, validateMiddlewareFactory(getPostListObject), async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get("/list/search", decMiddleware, validateMiddlewareFactory(getPostSearchListObject), async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get("/", decMiddleware, validateMiddlewareFactory(getPostObject), async (ctx) => {
    ctx.body = 'Hello World!';
});

router.post("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostCreateObject), async (ctx) => {
    ctx.body = 'Hello World!';
});

router.put("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostUpdateObject), async (ctx) => {
    ctx.body = 'Hello World!';
});

router.del("/", decMiddleware, validateTokenMiddleware, validateMiddlewareFactory(getPostDelObject), async (ctx) => {
    
});

export default router

