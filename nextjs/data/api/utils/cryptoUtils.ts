import jose, {EncryptJWT, KeyLike, CompactEncrypt, decodeJwt} from 'jose'

const makeEncObject = async function(object: object, rsaPublicKey: KeyLike){
    const text = new Uint8Array(Buffer.from(JSON.stringify(object)));
    return await new CompactEncrypt(
        text
    )
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(rsaPublicKey)
}

const decryptToken = async function(token: string){
    return decodeJwt(token)
}

export {
    makeEncObject,
    decryptToken
}