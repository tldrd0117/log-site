import sha256 from "crypto-js/sha256";
import User, { IUser } from "../../src/models/user.model";
import createMongo, { Mongo } from "../../src/utils/mongo";
import { createTestHashDbName, objectValueToString } from "../utils/testUtils";
import settingService from "../../src/services/setting.service";
import authService from "../../src/services/auth.service";
import { DecodedUserInfo } from "../../src/interfaces/auth";
import userService from "../../src/services/user.service";
import mongoose, { Document } from "mongoose";
import { SettingUpdate } from "../../src/interfaces/setting";
import { settingValue } from "../../src/object/common";
import { MD5 } from "crypto-js";
import Role from "../../src/models/role.model";
import SettingType from "../../src/models/settingType.model";
import _ from "lodash";

describe("Setting Service Test", function () {
    let mongo: Mongo
    let user: IUser
    let token: string
    let decodedToken: DecodedUserInfo
    let roleTypes: any
    let settingTypes: any

    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
    })

    beforeEach(async () => {
        roleTypes = await Role.find()
        settingTypes = await SettingType.find()
        user = (await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: roleTypes[0]._id.toString(),
        })).toJSON() as IUser
        token = await authService.getToken(user)
        decodedToken = await authService.decryptToken(token) as DecodedUserInfo
        console.log(decodedToken)
    })

    beforeEach(async () => {
        await settingService.addSettings([{
            type: settingTypes[1]._id.toString(),
            role: roleTypes[0]._id.toString(),
            userId: user._id.toString(),
            name: "test",
            value: "testValue"
        },{
            type: settingTypes[1]._id.toString(),
            role: roleTypes[0]._id.toString(),
            userId: user._id.toString(),
            name: "test2",
            value: "testValue2"
        }])
    })

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("getSetting test", async () => {
        const setting: any = await settingService.getSetting(decodedToken)
        console.log(setting)
        expect(setting.length).toBe(2)
        expect(setting).toStrictEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test2',
                    value: 'testValue2',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                }),
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test',
                    value: 'testValue',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                })
            ])
        )
    });

    it("addSettings test", async function () {
        await settingService.addSettings([{
            type: settingTypes[1]._id.toString(),
            role: roleTypes[0]._id.toString(),
            userId: user._id.toString(),
            name: "test3",
            value: "testValue3"
        },{
            type: settingTypes[1]._id.toString(),
            role: roleTypes[0]._id.toString(),
            userId: user._id.toString(),
            name: "test4",
            value: "testValue4"
        }])
        const setting: any = await settingService.getSetting(decodedToken)
        expect(setting.length).toBe(4)
        expect(setting).toStrictEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test4',
                    value: 'testValue4',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                }),
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test3',
                    value: 'testValue3',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                }),
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test2',
                    value: 'testValue2',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                }),
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'test',
                    value: 'testValue',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                })
            ])
        )
    });

    it("putSetting test", async function () {
        const setting = await settingService.getSetting(decodedToken)
        const settingEdited: any = _.cloneDeep(setting)
        settingEdited[0]._id = settingEdited[0]._id.toString()
        settingEdited[0].type = settingTypes[1]._id.toString()
        settingEdited[0].role = roleTypes[0]._id.toString()
        settingEdited[0].userId = user._id.toString()
        settingEdited[0].name = 'testEdited'
        settingEdited[0].value = 'testValueEdited'
        await settingService.putSetting(settingEdited[0] as SettingUpdate)
        const newSetting = await settingService.getSetting(decodedToken)
        expect(newSetting).toStrictEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    type: expect.objectContaining({
                        _id: settingTypes[1]._id,
                        name: settingTypes[1].name,
                    }),
                    role: expect.objectContaining({
                        _id: roleTypes[0]._id,
                        name: roleTypes[0].name,
                    }),
                    userId: expect.objectContaining({
                        _id: user._id,
                        name: user.name,
                    }),
                    name: 'testEdited',
                    value: 'testValueEdited',
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                }),
                
            ])
        )
    });

    it("deleteSetting test", async function () {
        const setting = await settingService.getSetting(decodedToken)
        expect(setting).toHaveLength(2)
        await settingService.deleteSetting(setting[0]._id.toString())
        const latelySetting = await settingService.getSetting(decodedToken)
        expect(latelySetting).toHaveLength(1)
    });
})