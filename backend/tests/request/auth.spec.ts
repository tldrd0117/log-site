import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../utils/chaiUtils'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'

describe('auth controller test', () => {
    let request: SuperTest<Test>
    beforeEach(()=>{
        request = supertest(app.callback())
    })

    it('request tokens And verify',  async () => {
        try{
            const test: Test = request.get('/auth/tokens')
            const req: Request = test.expect(200)
            const res: Response = await req
            expect(res.body).to.be.a("object")
            const testVerify: Test = request.post("/auth/verify")
                .set('Accept', 'application/json')
                .send({token: res.body.token})
                .expect(200)
            
            const resVerify: Response = await testVerify
            expect(resVerify.body).to.be.a("object")
        } catch(e) {
            console.log(e)
            throw new Error(e)
        }
    });

    
});