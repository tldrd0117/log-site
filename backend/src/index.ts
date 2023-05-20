import getApp, { connectMongo } from './app'

const port = 3300;
getApp().then((app)=>{
    connectMongo()
    app.listen(port, ()=> {
        console.log(`Koa server is listening on port ${port}`);
    });
})
