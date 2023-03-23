import getApp from '../../src/app'
import supertest from 'supertest'

describe.only('hello world! test', () => {
    let request: any;
    beforeEach(async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
    })

    it('responds hello world', () => {
        return request.get('/')
            .expect('content-type', "text/plain; charset=utf-8")
            .expect(200)
            .then((response: any)=>{
                expect(response.text).toBe("Hello World!");
            })
    });
});