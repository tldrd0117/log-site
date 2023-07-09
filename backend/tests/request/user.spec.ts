import getApp from '../../src/app'
import { encFactory } from '../utils/encUtils'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'
import jose, {CompactEncrypt, compactDecrypt, importJWK, JSONWebKeySet, JWK, KeyLike, decodeJwt, JWTPayload} from 'jose'
import sha256 from 'crypto-js/sha256';
import createMongo, { Mongo } from '../../src/utils/mongo';
import User, { IUser } from '../../src/models/user.model';
import { createTestHashDbName } from '../utils/testUtils';
import Role from '../../src/models/role.model';

describe('user test', () => {
    let request: any, rsaPublicKey: KeyLike, signRsaPublicKey: KeyLike
    let mongo: Mongo
    let user: IUser
    let roles: Array<any>
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
    })

    beforeEach(async () => {
        roles = await Role.find({})
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: roles[0]._id.toString()
        })
    })

    afterEach(async () => {
        await mongo.resetDatabase();
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
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
        let enc = await encFactory.makeEncObject({
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
            role: expect.any(String),
            createAt: expect.any(String),
            exp: expect.any(Number),
            iat: expect.any(Number),
        })
        expect(joinResponse.body.result).toBe("success")
    })

    it("Join request with required fields error - ko",async () => {
        let enc = await encFactory.makeEncObject({
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(3)
        expect(joinResponse.body.error[0].message).toBe(`이름은 필수 값 입니다`)
        expect(joinResponse.body.error[1].message).toBe(`이메일은 필수 값 입니다`)
        expect(joinResponse.body.error[2].message).toBe(`비밀번호는 필수 값 입니다`)
    })

    it("Join request with length error - ko", async () => {
        let enc = await encFactory.makeEncObject({
            name: "##",
            email: "admin@email",
            password: "12323",
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)

        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(4)
        expect(joinResponse.body.error[0].message).toBe(`이름은 한글, 영어, 숫자만 가능합니다`)
        expect(joinResponse.body.error[1].message).toBe(`이름은 최소 3글자 이상만 가능합니다`)
        expect(joinResponse.body.error[2].message).toBe(`이메일 형식이 올바르지 않습니다`)
        expect(joinResponse.body.error[3].message).toBe(`이메일 또는 비밀번호가 잘못되었습니다`)
    })

    it("Join request with name maximum length error - ko", async () => {
        let enc = await encFactory.makeEncObject({
            name: "aaaaaIaaaaaIaaaaaIaaaaa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`이름은 최대 20글자 이하만 가능합니다`)
    })

    it("Join request with name minimum length error - ko", async () => {
        let enc = await encFactory.makeEncObject({
            name: "aa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`이름은 최소 3글자 이상만 가능합니다`)
    })

    it("Join request with name duplicated error - ko", async () => {
        let enc = await encFactory.makeEncObject({
            name: "lsj",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`이름이 중복되었습니다`)
    })

    it("Join request with email duplicated error - ko", async () => {
        let enc = await encFactory.makeEncObject({
            name: "lsj2",
            email: "root@naver.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'ko')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`이메일이 중복되었습니다`)
    })

    it("Join request with required fields error - en",async () => {
        let enc = await encFactory.makeEncObject({
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(3)
        expect(joinResponse.body.error[0].message).toBe(`Name is a required value`)
        expect(joinResponse.body.error[1].message).toBe(`Email is a required value`)
        expect(joinResponse.body.error[2].message).toBe(`Incorrect email or password`)
    })

    it("Join request with length error - en", async () => {
        let enc = await encFactory.makeEncObject({
            name: "##",
            email: "admin@email",
            password: "12323",
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)

        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(4)
        expect(joinResponse.body.error[0].message).toBe(`Korean, English or Number only`)
        expect(joinResponse.body.error[1].message).toBe(`Name must be at least 3 characters long`)
        expect(joinResponse.body.error[2].message).toBe(`Email format is incorrect`)
        expect(joinResponse.body.error[3].message).toBe(`Incorrect email or password`)
    })

    it("Join request with name maximum length error - en", async () => {
        let enc = await encFactory.makeEncObject({
            name: "aaaaaIaaaaaIaaaaaIaaaaa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`Name must be no more than 20 characters long`)
    })

    it("Join request with name minimum length error - en", async () => {
        let enc = await encFactory.makeEncObject({
            name: "aa",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`Name must be at least 3 characters long`)
    })

    it("Join request with name duplicated error - en", async () => {
        let enc = await encFactory.makeEncObject({
            name: "lsj",
            email: "admin@email.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`Name is duplicated`)
    })

    it("Join request with email duplicated error - en", async () => {
        let enc = await encFactory.makeEncObject({
            name: "lsj2",
            email: "root@naver.com",
            password: sha256("12323").toString(),
        }, rsaPublicKey)
        let joinResponse = await request.post("/user/join")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(400)
        expect(joinResponse.body.result).toBe("fail")
        expect(joinResponse.body.error).toHaveLength(1)
        expect(joinResponse.body.error[0].message).toBe(`Email is duplicated`)
    })

    it("Login request success", async () => {
        let enc = await encFactory.makeEncObject({
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
            role: roles[0]._id.toString(),
            createAt: expect.any(String),
            exp: expect.any(Number),
            iat: expect.any(Number),
        })
        expect(joinResponse.body.result).toBe("success")
    })

    it("Login request fail - en", async () => {
        let enc = await encFactory.makeEncObject({
            email: "root@naver.com",
            password: sha256("12232").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/login")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)

        expect(joinResponse.body.error).toBe("Incorrect email or password")
        expect(joinResponse.body.result).toBe("fail")

        enc = await encFactory.makeEncObject({
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
        let enc = await encFactory.makeEncObject({
            email: "root@naver.com",
            password: sha256("12232").toString(),
        }, rsaPublicKey)
        let joinResponse: Response = await request.post("/user/login")
            .set('Accept-Language', 'en')
            .send({ enc })
            .expect(200)
        
        expect(joinResponse.body.error).toBe("Incorrect email or password")
        expect(joinResponse.body.result).toBe("fail")

        enc = await encFactory.makeEncObject({
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

});