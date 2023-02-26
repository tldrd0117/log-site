import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../chaiUtils'
import createMongo, {Mongo} from '../../src/utils/mongo'

describe('db Connect', () => {
    let mongo: Mongo
    beforeEach(()=>{
        mongo = createMongo(process.env.DB_ADDRESS || "", "log-site-test");
    })

    it('exist mongo instance', () => {
        expect(mongo).to.not.undefined
    })

    it('not Connect test', async () => {
        await mongo.disconnect().should.be.rejected
        await mongo.resetDatabase().should.be.rejected
        await mongo.useDb().should.be.rejected
    })

    it('try db connect', async () => {
        expect(mongo.isConnect()).to.be.false
        await mongo.connect();
        expect(mongo.isConnect()).to.be.true
        await mongo.disconnect();
    });
  });