import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../chaiUtils'
import supertest from 'supertest'

describe('auth controller test', () => {
    let request: any
    beforeEach(()=>{
        request = supertest(app.callback())
    })

    it('responds tokens and verify', (done) => {
        request.get('/auth/tokens')
            .expect(200)
            .then((response: any)=>{
                expect(response.text).to.be.a("string");

                request.post("/auth/verify")
                    .set('Accept', 'application/json')
                    .send({token: response.text})
                    .expect(200)
                    .then((response: any)=>{
                        console.log(response.text)
                        expect(response.text).to.be.a("string");
                        done()
                    })
            })
    });
});