import getApp from '../../src/app'
import supertest, { SuperTest, Test, Response, Request } from 'supertest'
import { importJWK, JWK, KeyLike } from 'jose';
import authService from '../../src/services/auth.service';
import { userEncFactory } from '../utils/userUtils';
import sha256 from 'crypto-js/sha256';

describe('auth controller test', () => {
    let request: SuperTest<Test>

    beforeEach(async ()=>{
        const app = await getApp()
        request = supertest(app.callback())
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

    
});