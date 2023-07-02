import jose, {EncryptJWT, KeyLike, CompactEncrypt, base64url} from 'jose'

class EncFactory{
    constructor(){

    }

    async makeEncObject(object: object, rsaPublicKey: KeyLike){
        const encodedText = base64url.encode(JSON.stringify(object))
        const text = new Uint8Array(Buffer.from(encodedText));
        return await new CompactEncrypt(
            text
        )
        .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
        .encrypt(rsaPublicKey)
    }
}

const encFactory = new EncFactory()

export {
    encFactory
}