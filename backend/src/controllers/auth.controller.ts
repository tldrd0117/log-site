import Router from 'koa-router';
import fs from 'fs'
import mime from 'mime-types'
import jwt, { Secret } from 'jsonwebtoken';
import jose from 'node-jose'
import ms from 'ms'
import jwktopem, { JWK } from 'jwk-to-pem'

const router = new Router({
    prefix: "/auth"
});


router.get('/tokens', async (ctx) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [key] = keyStore.all({ use: 'sig' })
    
    const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }
    const payload = JSON.stringify({
      exp: Math.floor((Date.now() + ms('1d')) / 1000),
      iat: Math.floor(Date.now() / 1000),
      sub: 'test',
    })
    const token = await jose.JWS.createSign(opt, key)
      .update(payload)
      .final()
    ctx.body = token;
})

router.get('/jwks', async (ctx) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    ctx.body = keyStore.toJSON()
})

router.post('/verify', async (ctx) => {
    const body: any = ctx.request.body
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [ firstKey ] = (keyStore.toJSON() as any).keys
    const publicKey = jwktopem( firstKey )
    try {
        const decoded = jwt.verify(body.token, publicKey)
        ctx.body = decoded
    } catch (e) {
        console.error(e)
    }
})

export default router
