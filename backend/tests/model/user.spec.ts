import app from '../../src/app'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User from '../../src/models/user.model'
import { createTestHashDbName } from '../utils/testUtils';
import Role from '../../src/models/role.model';


describe('user model test', () => {
    let mongo: Mongo
    let roles: any
    beforeEach(async ()=>{
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        roles = await Role.find({})
    })
    afterEach(async () => {
        await mongo.resetDatabase();
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    describe("insert user And Find", ()=>{
        it("insert one user", async () => {
            await expect(User.count()).resolves.toEqual(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451",
                role: roles[0]._id.toString()
            })
            expect(await User.count()).toEqual(1)
            const result = await User.find({})
            expect(result).toHaveLength(1)
        })

        it("check duplicated name user", async () => {
            const roles = await Role.find({})
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451",
                role: roles[0]._id.toString()
            })
            await expect(User.create({
                name: "lsj",
                email: "root@naver.com222",
                password: "123451",
                role: roles[0]._id.toString()
            })).rejects.toThrow()
        })

        it("check duplicated email user", async () => {
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com",
                password: "123451",
                role: roles[0]._id.toString()
            })
            await expect(User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451",
                role: roles[0]._id.toString()
            })).rejects.toThrow()
        })

        it("insert two diff user", async () => {
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com22",
                password: "123451",
                role: roles[0]._id.toString()
            })
            await expect(User.create({
                name: "lsj33",
                email: "root@naver.com33",
                password: "123451",
                role: roles[0]._id.toString()
            })).resolves.toBeDefined()
        })
    })
    
  });