import { MD5 } from 'crypto-js'
import User, { IUser } from '../../src/models/user.model'
import userService from '../../src/services/user.service'
import createMongo, { Mongo } from '../../src/utils/mongo'
import { createTestHashDbName } from '../utils/testUtils'
import sha256 from 'crypto-js/sha256'
import Role from '../../src/models/role.model'
import { BasicType } from 'joi'
import { Types } from 'mongoose'

describe("user service test", function(){
    let mongo: Mongo
    let user: IUser
    let roleTypes: Array<any>
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
    })

    beforeEach(async () => {
        roleTypes = await Role.find({})
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: roleTypes[0]._id.toString(),
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
        console.log(user)
        expect(user).toMatchObject({
            _id: expect.any(Types.ObjectId),
            name: "lsj",
            email: "root@naver.com",
            role: expect.any(Types.ObjectId),
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
            role: roleTypes[0]._id.toString(),
        })

        expect(result.name).toBe("lsj2")
        expect(result.email).toBe("123@comm.com")
        expect(result.password).toBe(sha256("1234").toString())
    })

    it("do Join if name duplicated", async () => {
        await expect(userService.doJoin({
            name: "lsj",
            email: "123@comm.com",
            password: sha256("1234").toString(),
        })).rejects.toHaveProperty('errors[0].message', 'user.name.duplicated')
    })

    it("do Join if email duplicated", async () => {
        await expect(userService.doJoin({
            name: "lsj2",
            email: "root@naver.com",
            password: sha256("1234").toString(),
        })).rejects.toHaveProperty('errors[0].message', 'user.email.duplicated')
    })

    it("do Join if name and email duplicated", async () => {
        await expect(userService.doJoin({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("1234").toString(),
        })).rejects.toMatchObject({
            errors: [
                expect.objectContaining({
                    message: 'user.name.duplicated',
                    status: 400
                }),
                expect.objectContaining({
                    message: 'user.email.duplicated',
                    status: 400
                }),
            ],
        })
    })

    it("get User by email", async () => {
        const result = await userService.getUserByEmail("root@naver.com")
        expect(result.name).toBe("lsj")
        expect(result.email).toBe("root@naver.com")
    })

    it("search User By Name",async () => {
        
        await userService.doJoin({
            name: "lsj3",
            email: "12323@comm.com",
            password: sha256("1234").toString(),
            role: roleTypes[0]._id.toString(),
        })

        await userService.doJoin({
            name: "lsj2",
            email: "1234444@comm.com",
            password: sha256("1234").toString(),
            role: roleTypes[0]._id.toString(),
        })

        await userService.doJoin({
            name: "jjy",
            email: "12344446@comm.com",
            password: sha256("1234").toString(),
            role: roleTypes[0]._id.toString(),
        })

        const result = await userService.searchUserByName("lsj")
        expect(result).toHaveLength(3)
        const result2 = await userService.searchUserByName("jjy")
        expect(result2).toHaveLength(1)
        const result3 = await userService.searchUserByName("lsj2")
        expect(result3).toHaveLength(1)
    })
})