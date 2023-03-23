import getApp from '../../src/app'
import { userEncFactory } from '../utils/userUtils'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'
import jose, {CompactEncrypt, compactDecrypt, importJWK, JSONWebKeySet, JWK, KeyLike, decodeJwt, JWTPayload} from 'jose'
import sha256 from 'crypto-js/sha256';
import createMongo, { Mongo } from '../../src/utils/mongo';
import User, { IUser } from '../../src/models/user.model';
import { createTestHashDbName } from '../utils/testUtils';

describe('user test', () => {
    let request: any, rsaPublicKey: KeyLike, signRsaPublicKey: KeyLike

    let mongo: Mongo
    let user: IUser
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
    })

    beforeEach(async () => {
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: "admin",
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

    it("Join request successful", async () => {
        let enc = await userEncFactory.makeEncObject({
            name: "nnnna",
            email: "admin@email.com",
            password: sha256("12232").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        const claims: JWTPayload = decodeJwt(joinResponse.body.token)
        expect(claims).toMatchObject({
            name: "nnnna",
            email: "admin@email.com",
            role: "guest",
            createAt: expect.any(String),
            exp: expect.any(Number),
            iat: expect.any(Number),
        })
        expect(joinResponse.body.result).toBe("success")
    })
    
    it("Join request fail - ko", async () => {
        let enc = await userEncFactory.makeEncObject({
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(3)
        expect(joinResponse.body.error.details[0].message).toBe(`이름은 필수 값 입니다`)
        expect(joinResponse.body.error.details[1].message).toBe(`이메일은 필수 값 입니다`)
        expect(joinResponse.body.error.details[2].message).toBe(`비밀번호는 필수 값 입니다`)

        enc = await userEncFactory.makeEncObject({
            name: "12",
            email: "admin@email",
            password: "12323",
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .send({ enc })
            .expect(400)

        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(4)
        expect(joinResponse.body.error.details[0].message).toBe(`이름은 한글과 영어만 가능합니다`)
        expect(joinResponse.body.error.details[1].message).toBe(`이름은 최소 3글자 이상만 가능합니다`)
        expect(joinResponse.body.error.details[2].message).toBe(`이메일 형식이 올바르지 않습니다`)
        expect(joinResponse.body.error.details[3].message).toBe(`이메일 또는 비밀번호가 잘못되었습니다`)

        enc = await userEncFactory.makeEncObject({
            name: "aaaaaIaaaaaIaaaaaIaaaaa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(1)
        expect(joinResponse.body.error.details[0].message).toBe(`이름은 최대 20글자 이하만 가능합니다`)

        enc = await userEncFactory.makeEncObject({
            name: "aa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(1)
        expect(joinResponse.body.error.details[0].message).toBe(`이름은 최소 3글자 이상만 가능합니다`)
    })

    it("Join request fail - en", async () => {
        let enc = await userEncFactory.makeEncObject({
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(3)
        expect(joinResponse.body.error.details[0].message).toBe(`Name is a required value`)
        expect(joinResponse.body.error.details[1].message).toBe(`Email is a required value`)
        expect(joinResponse.body.error.details[2].message).toBe(`Incorrect email or password`)

        enc = await userEncFactory.makeEncObject({
            name: "12",
            email: "admin@email",
            password: "12323",
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)

        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(4)
        expect(joinResponse.body.error.details[0].message).toBe(`Korean and English only`)
        expect(joinResponse.body.error.details[1].message).toBe(`Name must be at least 3 characters long`)
        expect(joinResponse.body.error.details[2].message).toBe(`Email format is incorrect`)
        expect(joinResponse.body.error.details[3].message).toBe(`Incorrect email or password`)

        enc = await userEncFactory.makeEncObject({
            name: "aaaaaIaaaaaIaaaaaIaaaaa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(1)
        expect(joinResponse.body.error.details[0].message).toBe(`Name must be no more than 20 characters long`)

        enc = await userEncFactory.makeEncObject({
            name: "aa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error.details).toHaveLength(1)
        expect(joinResponse.body.error.details[0].message).toBe(`Name must be at least 3 characters long`)
    })

    it("Login request success", async () => {
        let enc = await userEncFactory.makeEncObject({
            email: "root@naver.com",
            password: sha256("123451").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/login")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)

        const claims: JWTPayload = decodeJwt(joinResponse.body.token)
        expect(claims).toMatchObject({
            name: "lsj",
            email: "root@naver.com",
            role: "admin",
            createAt: expect.any(String),
            exp: expect.any(Number),
            iat: expect.any(Number),
        })
        expect(joinResponse.body.result).toBe("success")
    })

    it("Login request fail - en", async () => {
        let enc = await userEncFactory.makeEncObject({
            email: "root@naver.com",
            password: sha256("12232").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/login")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)

        expect(joinResponse.body.error).toBe("Incorrect email or password")
        expect(joinResponse.body.result).toBe("fail")

        enc = await userEncFactory.makeEncObject({
            email: "root@2naver.com",
            password: sha256("123451").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/login")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        
        expect(joinResponse.body.error).toBe("Incorrect email or password")
        expect(joinResponse.body.result).toBe("fail")
    })

    it("Login request fail - en", async () => {
        let enc = await userEncFactory.makeEncObject({
            email: "root@naver.com",
            password: sha256("12232").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/login")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(200)
        
        expect(joinResponse.body.error).toBe("이메일 또는 비밀번호가 잘못되었습니다")
        expect(joinResponse.body.result).toBe("fail")

        enc = await userEncFactory.makeEncObject({
            email: "root@2naver.com",
            password: sha256("123451").toString(),
        }, rsaPublicKey)
        joinResponse = await request.post("/user/login")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(200)
        
        expect(joinResponse.body.error).toBe("이메일 또는 비밀번호가 잘못되었습니다")
        expect(joinResponse.body.result).toBe("fail")
    })

});