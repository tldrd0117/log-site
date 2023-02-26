import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User from '../../src/models/user.model'
import { expect } from '../chaiUtils'


describe('user model test', () => {
    let mongo: Mongo
    beforeEach(async ()=>{
        mongo = createMongo(process.env.DB_ADDRESS || "", "log-site-test");
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
    })
    afterEach(()=>{
        // mongo.db.connection.dropDatabase()
        return mongo.disconnect()
    })

    it("verify user indexes", async ()=>{
        let indexes = await User.listIndexes()
        expect(indexes.map(v=>v.key)).to.be.deep.equals([{_id:1}, {name:1}, {email:1}, {name:1, email:1}])
    })

    describe("insert user", ()=>{
        it("insert one user", async () => {
            expect(await User.count()).to.be.equal(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            })
            expect(await User.count()).to.be.equal(1)
            const result = await User.find({})
            expect(result).to.be.lengthOf(1)
        })

        it("insert duplicated name user", async () => {
            expect(await User.count()).to.be.equal(0)
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            })
            await User.create({
                name: "lsj",
                email: "root@naver.com222",
                password: "123451"
            }).should.to.be.rejected
        })

        it("insert duplicated email user", async () => {
            expect(await User.count()).to.be.equal(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com",
                password: "123451"
            })
            await User.create({
                name: "lsj",
                email: "root@naver.com",
                password: "123451"
            }).should.be.rejected
        })

        it("insert two diff user", async () => {
            expect(await User.count()).to.be.equal(0)
            await User.create({
                name: "lsj22",
                email: "root@naver.com22",
                password: "123451"
            })
            await User.create({
                name: "lsj33",
                email: "root@naver.com33",
                password: "123451"
            }).should.to.be.not.rejected
        })
    })
    
  });