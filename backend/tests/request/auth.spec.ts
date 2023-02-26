import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../chaiUtils'
import supertest from 'supertest'

describe('auth controller test', () => {
    let request: any
    beforeEach(()=>{
        request = supertest(app.callback())
    })

    it('responds jkws', () => {
        return request.get('/.well-known/jwks.json')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: any)=>{
                expect(response.body.keys[0]).to.have.keys('kty', 'kid', 'use', 'alg', 'e', 'n', 'd', 'p', 'q', 'dp', 'dq', 'qi');
            })
    });
  });