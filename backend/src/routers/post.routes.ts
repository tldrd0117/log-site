
import Router from 'koa-router';
const router = new Router({
    prefix: "/post"
});

router.get("/list", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get("/", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.post("/", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.put("/", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.del("/", async (ctx) => {
    
});

export default router

