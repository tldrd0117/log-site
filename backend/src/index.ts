import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyParser';

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.use(bodyParser());

router.get(/.*/, async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(port, ()=> {
	console.log(`Koa server is listening on port ${port}`);
});