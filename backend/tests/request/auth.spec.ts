import getApp from '../../src/app'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'
import { importJWK, JWK, KeyLike } from 'jose';
import authService from '../../src/services/auth.service';
import { encFactory } from '../utils/encUtils';
import sha256 from 'crypto-js/sha256';

describe('auth controller test', () => {
    let request: SuperTest<Test>
    let rsaPublicKey: KeyLike

    beforeEach(async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
    })

    beforeEach( async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
        const response: Response = await request.get("/auth/publicKey").expect(200)
        expect(response.body).toBeDefined()
        const encPublicKey: JWK = response.body.keys.find((key: JWK)=>key.use === "enc")
        rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
    })
    
    it('request publicKey',  async () => {
        try{
            let joinResponse: Response = await request.get('/auth/publicKey')
                .expect(200)

            expect(joinResponse.body.keys).toHaveLength(2)
        } catch(e) {
            throw new Error(e)
        }
    });

    it('request verify', async () => {
        const enc = await encFactory.makeEncObject({}, rsaPublicKey)
        let token = await authService.getTokenByExp({}, "1d")
        let verifyResponse: Response = await request.post('/auth/verify')
            .set('Authorization', `Bearer ${token}`)
            .send({ enc })
            .expect(200)
        expect(verifyResponse.body).toHaveProperty("result", "success")


        token = await authService.getTokenByExp({}, "0")
        verifyResponse = await request.post('/auth/verify')
            .set('Authorization', `Bearer ${token}`)
            .send({ enc })
            .expect(401)
        expect(verifyResponse.body).toHaveProperty("result", "fail")
        expect(verifyResponse.body).toHaveProperty("error[0].message", "Expired token")


        token = await authService.getTokenByExp({nbf: (Date.now() + 2000)/1000}, "0")
        verifyResponse = await request.post('/auth/verify')
            .set('Authorization', `Bearer ${token}`)
            .send({ enc })
            .expect(401)
        expect(verifyResponse.body).toHaveProperty("result", "fail")
        expect(verifyResponse.body).toHaveProperty("error[0].message", "Token is not active yet")

        verifyResponse = await request.post('/auth/verify')
            .set('Authorization', `Bearer ${"it is fake token"}`)
            .send({ enc })
            .expect(401)
        expect(verifyResponse.body).toHaveProperty("result", "fail")
        expect(verifyResponse.body).toHaveProperty("error[0].message", "Invalid token")
    })


    
});