import { getJoinUserObject } from '../../src/object/user'
import sha256 from 'crypto-js/sha256'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User, { IUser } from '../../src/models/user.model'
import { createTestHashDbName } from '../utils/testUtils'
import joi from 'joi'
import { initI18n } from '../../src/utils/i18n'

const validateOptions = {
    errors: { wrap: { label: '' } },
    abortEarly: false,
}

describe("user object", function(){
    let mongo: Mongo
    let user: IUser
    
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
        await initI18n()
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
    
    it("Test for name language format (English/Korean/Number)", async function(){
        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "###",
            password: "456",
            email:"789"
        }, validateOptions)).rejects.toHaveProperty('details[0].message', '이름은 한글, 영어, 숫자만 가능합니다')
    })

    it("Minimum name length test",async () => {
        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "aa",
            password: "456",
            email:"789"
        }, validateOptions)).rejects.toHaveProperty('details[0].message', '이름은 최소 3글자 이상만 가능합니다')
    })

    it("Maximum name length test",async () => {
        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "aaaaaaaaaaaaaaaaaaaaa",
            password: "456",
            email:"789"
        }, validateOptions)).rejects.toHaveProperty('details[0].message', '이름은 최대 20글자 이하만 가능합니다')
    })

    it("Test for valid email format",async () => {

        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "한글이름",
            email:"789",
            password: "456",
        }, validateOptions)).rejects.toHaveProperty('details[0].message', '이메일 형식이 올바르지 않습니다')
        
    })
    it("Test for valid password format",async () => {
        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "한글이름",
            email:"789@222.co",
            password: "456",
        }, validateOptions)).rejects.toHaveProperty('details[0].message', '이메일 또는 비밀번호가 잘못되었습니다')
        
    })
    it("User test success",async () => {
        const userObject = await getJoinUserObject("ko")
        await expect(userObject.validateAsync({
            name: "한글이름",
            email:"789@222.co",
            password: sha256("456").toString(),
        }, validateOptions)).resolves
            .toMatchObject({
                name: "한글이름",
                email:"789@222.co",
                password: sha256("456").toString()
            })
    })
})