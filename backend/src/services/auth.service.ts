import fs from 'fs'
import ms from 'ms'
import jwt, { Secret } from 'jsonwebtoken';
import jose from 'node-jose'
import jwktopem, { JWK } from 'jwk-to-pem'

const getToken = async (payload: any) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [key] = keyStore.all({ use: 'sig' })
    
    const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }
    payload = JSON.stringify({
      exp: Math.floor((Date.now() + ms('1d')) / 1000),
      iat: Math.floor(Date.now() / 1000),
      sub: 'test',
      ...payload
    })
    return await jose.JWS.createSign(opt, key)
      .update(payload)
      .final()
}

const getPublicKey = async () => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    return keyStore.toJSON()
}

const verifyToekn = async (token: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [ firstKey ] = (keyStore.toJSON() as any).keys
    const publicKey = jwktopem( firstKey )
    return jwt.verify(token, publicKey)
}

const authService = {
    getToken,
    getPublicKey,
    verifyToekn
}

export default authService