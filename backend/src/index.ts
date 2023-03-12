import app from './app'

const port = 3000;
app.listen(port, ()=> {
	console.log(`Koa server is listening on port ${port}`);
});
