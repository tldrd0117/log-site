import Router from 'koa-router';
import send from 'koa-send';
import path from 'path';
const router = new Router({
    prefix: "/helloworld"
});

router.get("/", async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get("/swagger-output.json", async (ctx) => {
    await send(ctx, 'swagger-output.json', {root: path.resolve(__dirname, '../')})
});

export default router
