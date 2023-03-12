import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../utils/chaiUtils'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'

describe('user test', () => {
    let request: any
    beforeEach(()=>{
        request = supertest(app.callback())
    })

    it('request login', (done) => {
        request.get('/user/login')
            .send({id: "admin", password: "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.X7Kp-H3L8fvUrDyVSD1g9eRqwjRHmevccbajAzYkWimGEYyXE-oSGngasGebCNPJn8m7_ruE64pO633HZKNUIA6MNlHbcXXcJqb-mU7mAUgZ7oKoYCWunqmVnfaFfmkVlq8xlXjDqEqoky8CHZoMJz_1_4lLQwYW7u1Yssubczej9kdS3h7Wq3-S1BnsQjSiCxIOAT-oeVcdOabNJLUfXGcHtxOXAF5pRB1y0iIPslGvI4HntMuqQs6jinitGRlc2boCRnDQsh6zP2VkEV-ljRlhU3TZUaXTJPT6teP0fXVQ4r5MqVb7cdywFTQc9QEzumtZl781O1_s-zrs9F4Kcw.SCgA0rjzH5mEF2am.vrY8VQ.M1aXYNPIblGqbZV5Gtr_wA"})
            .expect(200)
            .then((response: Response)=> {
                console.log(response.text)
                expect(response.body.result).to.be.equal("success")
                done()
            })
    })

    // it('responds hello world', () => {
    //     return request.post('/user/login')
    //         // .set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJrSTVNakk1T1VZNU9EYzFOMFE0UXpNME9VWXpOa1ZHTVRKRE9VRXpRa0ZDT1RVM05qRTJSZyJ9.eyJpc3MiOiJodHRwczovL3NhbmRyaW5vLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NjMyNTAxZjQ2OGYwZjE3NTZmNGNhYjAiLCJhdWQiOiJQN2JhQnRTc3JmQlhPY3A5bHlsMUZEZVh0ZmFKUzRyViIsImV4cCI6MTQ2ODk2NDkyNiwiaWF0IjoxNDY4OTI4OTI2fQ.NaNeRSDCNu522u4hcVhV65plQOiGPStgSzVW4vR0liZYQBlZ_3OKqCmHXsu28NwVHW7_KfVgOz4m3BK6eMDZk50dAKf9LQzHhiG8acZLzm5bNMU3iobSAJdRhweRht544ZJkzJ-scS1fyI4gaPS5aD3SaLRYWR0Xsb6N1HU86trnbn-XSYSspNqzIUeJjduEpPwC53V8E2r1WZXbqEHwM9_BGEeNTQ8X9NqCUvbQtnylgYR3mfJRL14JsCWNFmmamgNNHAI0uAJo84mu_03I25eVuCK0VYStLPd0XFEyMVFpk48Bg9KNWLMZ7OUGTB_uv_1u19wKYtqeTbt9m1YcPMQ")
    //         .expect('content-type', "text/plain; charset=utf-8")
    //         // .expect(200)
    //         .then((response: any)=>{
    //             expect(response.text).to.equals("Hello World!");
    //         })
    // });
});