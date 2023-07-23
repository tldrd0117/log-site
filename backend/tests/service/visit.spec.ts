import visitService from "../../src/services/visit.service"
import createMongo, { Mongo } from "../../src/utils/mongo"
import { createTestHashDbName } from "../utils/testUtils"
import { add, endOfDay, startOfDay } from 'date-fns'


describe("visit service test", function(){
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
    it("add visit", async () => {
        const res = await visitService.getVisit("blog")
        const currentCount = res[0].count
        await visitService.addVisit(new Date().getTime().toString(), "blog")
        const nextRes = await visitService.getVisit("blog")
        expect(currentCount + 1).toBe(nextRes[0].count)
    })

    it("add visit Same Ip", async () => {
        const res = await visitService.getVisit("blog")
        const currentCount = res[0].count
        await visitService.addVisit("same Ip", "blog")
        await visitService.addVisit("same Ip", "blog")
        const nextRes = await visitService.getVisit("blog")
        expect(currentCount + 1).toBe(nextRes[0].count)
    })

    it("add visit diff Ip", async () => {
        const res = await visitService.getVisit("blog")
        const currentCount = res[0].count
        await visitService.addVisit("same Ip", "blog")
        await visitService.addVisit("diff Ip", "blog")
        const nextRes = await visitService.getVisit("blog")
        expect(currentCount + 2).toBe(nextRes[0].count)

    })

    it("add visit Same Ip if today visit not exist", async () => {
        // await visitService.removeVisit("blog")
        const yesterDay = add(new Date(), {days: -1})
        await visitService.addVisitByDate("same Ip","blog", yesterDay)
        const res = await visitService.getVisit("blog")
        expect(res.length).toBe(1)
        await visitService.addVisit("same Ip", "blog")
        await visitService.addVisit("same Ip", "blog")
        const nextRes = await visitService.getVisit("blog")
        expect(nextRes.length).toBe(2)
    })

    it("get visit", async () => {
        const res = await visitService.getVisit("blog")
        expect(res[0].count).toBe(0)
    })

    it("get visit 2",async () => {
        const currentDate = new Date()
        const yesterDay = add(currentDate, { days: -1 })
        await visitService.addVisit("same Ip", "blog")
        await visitService.addVisit("diff Ip", "blog")
        await visitService.addVisit("same Ip", "blog")
        await visitService.addVisit("diff Ip", "blog")
        await visitService.addVisitByDate("same Ip", "blog", yesterDay)
        await visitService.addVisitByDate("same Ip", "blog", yesterDay)
        await visitService.addVisitByDate("same Ip", "blog", yesterDay)
        await visitService.addVisitByDate("diff Ip", "blog", yesterDay)
        await visitService.addVisitByDate("diff Ip", "blog", yesterDay)
        const res = await visitService.getVisit("blog")
        expect(res.length).toBe(2)
        expect(res[0].count).toBe(2)
        expect(res[1].count).toBe(2)
        console.log(res)
    })
})