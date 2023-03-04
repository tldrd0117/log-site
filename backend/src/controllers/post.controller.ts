
import Router from 'koa-router';
const router = new Router({
    prefix: "/post"
});

router.get("/list", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get("/get", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.post("/get", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.put("/get", async (ctx) => {
    ctx.body = 'Hello World!';
});

export default router

