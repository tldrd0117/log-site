import getApp from '../../src/app'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'

describe('auth controller test', () => {
    let request: SuperTest<Test>
    beforeEach(async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
    })
    

    it('request tokens And verify',  async () => {
        try{
            const test: Test = request.get('/auth/tokens')
            const req: Request = test.expect(200)
            const res: Response = await req
            expect(res.body).toBeDefined()
            const testVerify: Test = request.post("/auth/verify")
                .set('Accept', 'application/json')
                .send({token: res.body.token})
                .expect(200)
            
            const resVerify: Response = await testVerify
            expect(resVerify.body).toBeDefined()
        } catch(e) {
            throw new Error(e)
        }
    });

    
});