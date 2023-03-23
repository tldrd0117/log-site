import User, { IUser } from '../../src/models/user.model'
import userService from '../../src/services/user.service'
import createMongo, { Mongo } from '../../src/utils/mongo'
import { createTestHashDbName } from '../utils/testUtils'
import sha256 from 'crypto-js/sha256'

describe("user service test", function(){
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

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("get user", async () => {
        const user = await userService.getUserByEmail("root@naver.com")
        expect(user).toMatchObject({
            name: "lsj",
            email: "root@naver.com",
            role: "admin",
            createAt: expect.any(Date),
        })
    })

    it("check Email Duplicate", async () => {
        // 중복되지 않음
        const result1 = await userService.checkEmailDuplicate("roo2t@naver.com")
        expect(result1).toBeTruthy()

        // 중복됨
        const result2 = await userService.checkEmailDuplicate("root@naver.com")
        expect(result2).toBeFalsy()
    })

    it("check Name Duplicate", async () => {
        // 중복되지 않음
        const result1 = await userService.checkNameDuplicate("lsj2")
        expect(result1).toBeTruthy()

        // 중복됨
        const result2 = await userService.checkNameDuplicate("lsj")
        expect(result2).toBeFalsy()
    })

    it("do Join", async () => {
        const result = await userService.doJoin({
            name: "lsj2",
            email: "123@comm.com",
            password: sha256("1234").toString(),
        })

        expect(result.name).toBe("lsj2")
        expect(result.email).toBe("123@comm.com")
        expect(result.password).toBe(sha256("1234").toString())
    })

    it("get User by email", async () => {
        const result = await userService.getUserByEmail("root@naver.com")
        console.log(result)
        expect(result.name).toBe("lsj")
        expect(result.email).toBe("root@naver.com")
    })
})