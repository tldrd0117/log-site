import fs from 'fs'
import ms from 'ms'
import jwt, { Secret } from 'jsonwebtoken';
import jose, { JWK } from 'node-jose'
import { KeyLike, importJWK } from 'jose';

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
        .update(payload, "utf8")
        .final()) as any
}

const getPublicJWK = async () => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    return enryptKey.toJSON()
}

const getEncPublicKey = async () => {
    const publicJWK : any = await getPublicJWK()
    const targetPublicKey: any = publicJWK.keys.find((key: any)=>key.alg === "RSA-OAEP-256") || {}
    const rsaPublicKey: KeyLike = (await importJWK(targetPublicKey)) as KeyLike
    return rsaPublicKey
}

const getPrivateJWK = async () => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    return enryptKey.toJSON(true)
}

const encryptData = async (data: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    const text = jose.util.base64url.encode(data, "utf8")
    return await jose.JWE.createEncrypt({
        format: 'compact'
    }, enryptKey.all({use: "enc"})).update(text).final()
}

const decryptData = async (data: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const enryptKey: JWK.KeyStore = await jose.JWK.asKeyStore(ks.toString())
    const decoded = await jose.JWE.createDecrypt(enryptKey).decrypt(data)
    return jose.util.base64url.decode(decoded.plaintext.toString()).toString()
}

const decryptJSON =async (data: string) => {
    const decData: string = await decryptData(data)
    return JSON.parse(decData)
}

const verifyToken = async (token: string) => {
    const ks = fs.readFileSync('secret/Keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [ publicKey ] = keyStore.all({ use: 'sig' })
    return jwt.verify(token, publicKey.toPEM())
}

const decryptToken = async (token: string) => {
    return jwt.decode(token)
}

const authService = {
    doLogin,
    getToken,
    getTokenByExp,
    getPublicJWK,
    getEncPublicKey,
    getPrivateJWK,
    verifyToken,
    decryptData,
    encryptData,
    decryptJSON,
    decryptToken
}

export default authService