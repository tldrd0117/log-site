import tagService from "../../src/services/tag.service"
import visitService from "../../src/services/visit.service"
import createMongo, { Mongo } from "../../src/utils/mongo"
import { createTestHashDbName } from "../utils/testUtils"
import { add, endOfDay, startOfDay } from 'date-fns'


describe("tag service test", function(){
    let mongo: Mongo
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
    })
    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })
    it("check tag", async () => {
        const result1 = await tagService.findOrCreateIfNotExist("test")
        const result2 = await tagService.findOrCreateIfNotExist("test")
        expect(result1._id.toString()).toBe(result2._id.toString())
    })

})