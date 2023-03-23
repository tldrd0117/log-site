import fs from 'fs'
import ms from 'ms'
import jwt, { Secret } from 'jsonwebtoken';
import jose, { JWK } from 'node-jose'
import jwktopem from 'jwk-to-pem'
import { PublicKey } from '../interfaces/auth';

const doLogin = async (payload: any) => {
    const data = decryptData(payload)
}

const getToken = async (payload: any) => {
    return await getTokenByExp(payload, '1d')
}

const getTokenByExp = async (payload: any, exp: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [key] = keyStore.all({ use: 'sig' })

    const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }
    
    payload = JSON.stringify({
        exp: Math.floor((Date.now() + ms(exp)) / 1000),
        iat: Math.floor(Date.now() / 1000),
        ...payload
    })
    return (await jose.JWS.createSign(opt, key)
        .update(payload)
        .final()) as any
}

const getPublicJWK = async () => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    return enryptKey.toJSON()
}

const getPrivateJWK = async () => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    return enryptKey.toJSON(true)
}

const decryptData = async (data: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    return await jose.JWE.createDecrypt(enryptKey).decrypt(data)
}

const decryptJSON =async (data: string) => {
    const decData = await decryptData(data)
    return JSON.parse(decData.plaintext.toString())
}

const verifyToken = async (token: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [ publicKey ] = keyStore.all({ use: 'sig' })
    return jwt.verify(token, publicKey.toPEM())
}

const authService = {
    doLogin,
    getToken,
    getTokenByExp,
    getPublicJWK,
    getPrivateJWK,
    verifyToken,
    decryptData,
    decryptJSON
}

export default authService