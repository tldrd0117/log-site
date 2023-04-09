import getApp from '../../src/app'
import { encFactory } from '../utils/encUtils'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'
import jose, {CompactEncrypt, compactDecrypt, importJWK, JSONWebKeySet, JWK, KeyLike, decodeJwt, JWTPayload} from 'jose'
import sha256 from 'crypto-js/sha256';
import createMongo, { Mongo } from '../../src/utils/mongo';
import User, { IUser } from '../../src/models/user.model';
import { createTestHashDbName } from '../utils/testUtils';
import Post, { IPost } from '../../src/models/post.model';
import { PostCreate } from '../../src/interfaces/post';
import postService from '../../src/services/post.service';
import { Types } from 'mongoose';

describe("post test", () => {
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
        await User.syncIndexes();
        await Post.syncIndexes();
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

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("request post", async () => {
        // const response: Response = await request.get("/auth/publicKey").expect(200)
        const enc = await encFactory.makeEncObject({
            author: user._id,
            authorName: user.name,
            summary: "summary1",
            text: "text1",
        }, rsaPublicKey)
        const response: Response = await request.post("/post")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body).toMatchObject({
            author: user._id.toString(),
            authorName: user.name,
            summary: "summary1",
            text: "text1",
            result: "success"
        })
    })

    it("request post list", async () => {
        const enc = await encFactory.makeEncObject([{
            author: user._id,
            authorName: user.name,
            summary: "summary1",
            text: "text1",
        },{
            author: user._id,
            authorName: user.name,
            summary: "summary2",
            text: "text2",
        }], rsaPublicKey)
        const response: Response = await request.post("/post/list")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body).toMatchObject({
            list:[{
                author: user._id.toString(),
                authorName: user.name,
                summary: "summary1",
                text: "text1",
                _id: expect.any(String),
                createAt: expect.any(String),
                updateAt: expect.any(String),
                relatedPosts: expect.any(Array),
                order: expect.any(Number)
            },{
                author: user._id.toString(),
                authorName: user.name,
                summary: "summary2",
                text: "text2",
                _id: expect.any(String),
                createAt: expect.any(String),
                updateAt: expect.any(String),
                relatedPosts: expect.any(Array),
                order: expect.any(Number)
            }],
            result: "success"
        })
        
    })

    it("request get post", async () => {
        const enc = await encFactory.makeEncObject({
            _id: post._id.toString()
        }, rsaPublicKey)
        const response: Response = await request.get("/post")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        
        expect(response.body).toMatchObject({
            author: {
                _id: user._id.toString(),
                name: user.name
            },
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            result: "success"
        })
    })

    it("request get post list", async () => {
        let arr = [];
        for(let i = 0; i < 10; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "summary"+i,
                text: "text"+i,
            })
        }

        const postEnc = await encFactory.makeEncObject(arr, rsaPublicKey)
        const postResponse: Response = await request.post("/post/list")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc: postEnc })
            .expect(200)
        
        expect(postResponse.body.result).toBe("success")

        const getEnc = await encFactory.makeEncObject({
            limit: 10,
            offset: 1
        }, rsaPublicKey)
        const response: Response = await request.get("/post/list")
            .set('Accept-Language', 'en')
            .send({ enc: getEnc })
            .expect(200)
        
        let expectArr: any = []
        arr.forEach(v=>{
            expectArr.push(expect.objectContaining({
                ...v,
                author:{
                    _id: v.author.toString(),
                    name: v.authorName
                }
            }))
        })
        
        expect(response.body).toMatchObject({
            list: expect.arrayContaining(expectArr),
            result: "success"
        })
    })

    it("request search post list", async () => {
        let arr = [];
        for(let i = 0; i < 100; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "summary"+i,
                text: "text"+i,
            })
        }

        const postEnc = await encFactory.makeEncObject(arr, rsaPublicKey)
        const postResponse: Response = await request.post("/post/list")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc: postEnc })
            .expect(200)
        
        expect(postResponse.body.result).toBe("success")

        const getEnc = await encFactory.makeEncObject({
            limit: 20,
            offset: 0,
            word: "text1"
        }, rsaPublicKey)
        const response: Response = await request.get("/post/list/search")
            .set('Accept-Language', 'en')
            .send({ enc: getEnc })
            .expect(200)
        
        let expectArr: any = []
        arr.forEach(v=>{
            if(v.text.includes("text1")){
                expectArr.push(expect.objectContaining({
                    ...v,
                    author:{
                        _id: v.author.toString(),
                        name: v.authorName
                    }
                }))
            }
        })
        expect(expectArr).toHaveLength(11)
        expect(response.body.list).toHaveLength(11)
        expect(response.body).toMatchObject({
            list: expect.arrayContaining(expectArr),
            result: "success"
        })
    })

    it("request put post", async () => {
        const enc = await encFactory.makeEncObject({
            _id: post._id,
            summary: "summary1",
            text: "text1",
        }, rsaPublicKey)
        const response: Response = await request.put("/post")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body).toMatchObject(expect.objectContaining({
            acknowledged: true,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 0,
            upsertedId: null,
            result: "success"
        }))

        const updatedPost = await postService.getPost(post._id.toString())
        expect(updatedPost).toMatchObject(expect.objectContaining({
            _id: post._id,
            summary: "summary1",
            text: "text1",
        }))
    })

    it("request del post", async () => {
        const enc = await encFactory.makeEncObject({
            _id: post._id.toString(),
        }, rsaPublicKey)
        const response: Response = await request.del("/post")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body).toMatchObject(expect.objectContaining({
            acknowledged: true,
            deletedCount: 1,
            result: "success"
        }))
    })

    it("request del posts",async () => {
        let arr = [];
        for(let i = 0; i < 100; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "summary"+i,
                text: "text"+i,
            })
        }

        const postEnc = await encFactory.makeEncObject(arr, rsaPublicKey)
        const postResponse: Response = await request.post("/post/list")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc: postEnc })
            .expect(200)
        
        expect(postResponse.body.result).toBe("success")

        const requestDelArr = postResponse.body.list.map((obj: any)=> ({
            _id: obj._id
        }))

        const enc = await encFactory.makeEncObject(requestDelArr, rsaPublicKey)
        const response: Response = await request.del("/post/list")
            .set('Authorization', `Bearer ${token}`)
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        expect(response.body).toMatchObject(expect.objectContaining({
            acknowledged: true,
            deletedCount: 100,
            result: "success"
        }))


    });
})