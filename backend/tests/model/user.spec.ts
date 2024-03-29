import app from '../../src/app'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User from '../../src/models/user.model'
import { createTestHashDbName } from '../utils/testUtils';


describe('user model test', () => {
    let mongo: Mongo
    beforeEach(async ()=>{
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
    })
    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("verify user indexes", async ()=>{
        let indexes = await User.listIndexes()
        expect(indexes.map(v=>v.key)).toMatchObject([{_id:1}, {name:1}, {email:1}, {name:1, email:1}])
    })

    describe("insert user And Find", ()=>{
        it("insert one user", async () => {
            await expect(User.count()).resolves.toEqual(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            })
            expect(await User.count()).toEqual(1)
            const result = await User.find({})
            expect(result).toHaveLength(1)
        })

        it("check duplicated name user", async () => {
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            })
            await expect(User.create({
                name: "lsj",
                email: "root@naver.com222",
                password: "123451"
            })).rejects.toThrow()
        })

        it("check duplicated email user", async () => {
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com",
                password: "123451"
            })
            await expect(User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            })).rejects.toThrow()
        })

        it("insert two diff user", async () => {
            expect(await User.count()).toEqual(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com22",
                password: "123451"
            })
            await expect(User.create({
                name: "lsj33",
                email: "root@naver.com33",
                password: "123451"
            })).resolves.toBeDefined()
        })
    })
    
  });