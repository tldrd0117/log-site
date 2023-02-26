import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../chaiUtils'
import supertest from 'supertest'

describe('hello world! test', () => {
    let request: any
    beforeEach(()=>{
        request = supertest(app.callback())
    })

    it('responds hello world', () => {
        return request.get('/')
            .expect('content-type', "text/plain; charset=utf-8")
            .expect(200)
            .then((response: any)=>{
                expect(response.text).to.equals("Hello World!");
            })
    });
  });