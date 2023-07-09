import sha256 from 'crypto-js/sha256'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User, { IUser } from '../../src/models/user.model'
import { createTestHashDbName } from '../utils/testUtils'
import { initI18n } from '../../src/utils/i18n'
import { getAddCategoriesObject, getAddCategoryString, getSettingUpdateObject } from '../../src/object/setting'
import { MD5 } from 'crypto-js'
import SettingType from '../../src/models/settingType.model'
import Role from '../../src/models/role.model'

const validateOptions = {
    errors: { wrap: { label: '' } },
    abortEarly: false,
}

describe("setting object", function(){
    let mongo: Mongo
    let user: IUser
    let settingType: string
    let settingTypeUids: Array<string>
    let role: string
    
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await initI18n()
    })

    beforeEach(async () => {
        const settingTypes: any = await SettingType.find();
        settingType = settingTypes[0]._id.toString()
        settingTypeUids = settingTypes.map((settingType: any) => settingType.id.toString())
        const roleTypes = await Role.find()

        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: roleTypes[0]._id.toString(),
        })
    })

    afterEach(async () => {
        await mongo.resetDatabase();
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })
    
    describe("Test getSettingUpdateObject", () => {
        it("test id property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                name: "123",
                value: "123"
            })
            await expect(settingObject.validateAsync({
                _id: "",
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 아이디은 필수 값 입니다')
        })

        it("test type property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                type: settingType,
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                type: settingType,
                name: "123",
                value: "123"
            })

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                type: settingType,
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                type: settingType,
                name: "123",
                value: "123"
            })

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                type: "errorType",
                name: "123",
                value: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 타입은 올바른 형식이 아닙니다')
            
        })

        it("test role property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            let valid: any = false;
            settingTypeUids.forEach(element => {
                valid = settingObject.validate({
                    _id: user._id.toString(),
                    role: element,
                    name: "123",
                    value: "123"
                }, validateOptions)
                expect(valid.value).toStrictEqual({
                    _id: user._id.toString(),
                    role: element,
                    name: "123",
                    value: "123"
                })
            });

            ["home", "$", "#", "1"].forEach(element => {
                valid = settingObject.validate({
                    _id: user._id.toString(),
                    role: element,
                    name: "123",
                    value: "123"
                }, validateOptions)
                console.log(valid)
                expect(valid.error.details[0].message).toBe("권한은 올바른 형식이 아닙니다")
            });
        })
        it("test userId property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                userId: user._id.toString(),
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                userId: user._id.toString(),
                name: "123",
                value: "123"
            })
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                userId: "",
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                userId: "",
                name: "123",
                value: "123"
            })
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                userId: "1",
                name: "123",
                value: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '유저 아이디은 올바른 형식이 아닙니다')
        })
        it("test name property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                name: "123",
                value: "123",
            })

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                value: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 이름은 필수 값 입니다')


            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "",
                value: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 이름은 필수 값 입니다')

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "a".repeat(65),
                value: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 이름은 최대 64글자 이하만 가능합니다')
        })
        it("test value property", async () => {
            const settingObject = await getSettingUpdateObject("ko")
            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123",
                value: "123"
            }, validateOptions)).resolves.toMatchObject({
                _id: user._id.toString(),
                name: "123",
                value: "123",
            })

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123"
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 값은 필수 값 입니다')


            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123",
                value: ""
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 값은 필수 값 입니다')

            await expect(settingObject.validateAsync({
                _id: user._id.toString(),
                name: "123",
                value: "a".repeat(65),
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '설정 값은 최대 64글자 이하만 가능합니다')
        })
    })
    describe("Test getAddCategoryString", () => {
        it("test category", async () => {
            const settingObject = await getAddCategoryString("ko")
            await expect(settingObject.validateAsync(
                "hello"
            , validateOptions)).resolves.toBe("hello")
            await expect(settingObject.validateAsync(
                ""
            , validateOptions)).rejects.toHaveProperty('details[0].message', '카테고리은 필수 값 입니다')
            await expect(settingObject.validateAsync(
                "가".repeat(41)
            , validateOptions)).rejects.toHaveProperty('details[0].message', '카테고리은 최대 40글자 이하만 가능합니다')
        })
    })
    describe("Test getAddCategoriesObject", () => {
        it("test categories", async () => {
            const settingObject = await getAddCategoriesObject("ko")
            await expect(settingObject.validateAsync({
                categories: ["hello"]
            }, validateOptions)).resolves.toStrictEqual({
                categories: ["hello"]
            })
            const error = settingObject.validate({
                categories: []
            })
            console.log(JSON.stringify(error))
            await expect(settingObject.validateAsync({
                categories: []
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '카테고리 리스트는 [카테고리]만 가능합니다')

            await expect(settingObject.validateAsync({
                categories: ["가".repeat(41)]
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '카테고리은 최대 40글자 이하만 가능합니다')

            await expect(settingObject.validateAsync({
                categories: "a".repeat(1001).split("")
            }, validateOptions)).rejects.toHaveProperty('details[0].message', '카테고리 리스트은 최대 1000개 이하만 가능합니다')
        })
    })
})