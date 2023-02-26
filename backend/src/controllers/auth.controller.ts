import Router from 'koa-router';
import fs from 'fs'
import mime from 'mime-types'
const router = new Router();

router.get("/.well-known/jwks.json", async (ctx) => {
    const JWKeys = fs.readFileSync("secret/keys.json");
    const jsonType = mime.lookup('json') || "";
    ctx.response.set("content-type", jsonType);
    ctx.body = JWKeys.toString("utf-8");
});

export default router
