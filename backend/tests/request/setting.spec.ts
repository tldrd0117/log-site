import { JWK, KeyLike, importJWK } from 'jose';
import getApp from '../../src/app'
import supertest, { SuperTest, Test, Response } from 'supertest'
import createMongo, { Mongo } from '../../src/utils/mongo';
import { createTestHashDbName } from '../utils/testUtils';
import User, { IUser } from '../../src/models/user.model';
import Post, { IPost } from '../../src/models/post.model';
import sha256 from 'crypto-js/sha256';
import { encFactory } from '../utils/encUtils';

describe('setting request test', () => {
    let request: SuperTest<Test>, rsaPublicKey: KeyLike, signRsaPublicKey: KeyLike
    let mongo: Mongo
    let user: IUser
    let post: IPost
    let token: string

    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
    })

    beforeEach(async () => {
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: "admin",
        })
    })

    beforeEach(async () => {
        post = await Post.create({
            author: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            parent: null
        })
    })

    beforeEach( async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
        const response: Response = await request.get("/auth/publicKey").expect(200)
        expect(response.body).toBeDefined()
        const encPublicKey: JWK = response.body.keys.find((key: JWK)=>key.use === "enc")
        rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
        const signPublicKey: JWK = response.body.keys.find((key: JWK)=>key.use === "sig")
        signRsaPublicKey = (await importJWK(signPublicKey, "RS256")) as KeyLike
    })

    beforeEach( async ()=>{
        const enc = await encFactory.makeEncObject({
            email: user.email,
            password: sha256("123451").toString(),
        }, rsaPublicKey)
        const response: Response = await request.post("/user/login")
                .set('Accept-Language', 'en')
                .send({
                    enc
                })
                .expect(200)
        token = response.body.token
    })

    beforeEach( async () => {
        const enc = await encFactory.makeEncObject({
            categories: ["카테고리1", "카테고리2", "카테고리3"]
        }, rsaPublicKey)
        const response: Response = await request.post("/setting/addCategories/")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body.list.map((v: any)=>v.value)).toEqual(["카테고리1", "카테고리2", "카테고리3"])
    })

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("get setting test", async ()=>{
        const response: Response = await request.get("/setting/")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .expect(200)
        expect(response.body.list.map((v: any)=>v.value))
            .toEqual(expect.arrayContaining(["카테고리1", "카테고리2", "카테고리3"]))
    });

    it("add categories test", async () => {
        const enc = await encFactory.makeEncObject({
            categories: ["카테고리4", "카테고리5", "카테고리6"]
        }, rsaPublicKey)
        const response: Response = await request.post("/setting/addCategories/")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body.list.map((v: any)=>v.value)).toEqual(["카테고리4", "카테고리5", "카테고리6"])
    })
});