import app from '../../src/app'
import createMongo, {Mongo} from '../../src/utils/mongo'
import { createTestHashDbName } from '../utils/testUtils'

describe('db Connect', () => {
    let mongo: Mongo
    beforeEach(()=>{
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
    })

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it('exist mongo instance', () => {
        expect(mongo).toBeDefined()
    })

    it('not Connect test', async () => {
        await expect(mongo.disconnect()).rejects.toThrow()
        await expect(mongo.resetDatabase()).rejects.toThrow()
        await expect(mongo.useDb()).rejects.toThrow()
    })

    it('try db connect', async () => {
        expect(mongo.isConnect()).toBeFalsy()
        await mongo.connect();
        expect(mongo.isConnect()).toBeTruthy()
        await mongo.db.connection.dropDatabase()
        await mongo.disconnect();
    });
  });