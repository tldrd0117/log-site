import jose, {EncryptJWT, KeyLike, CompactEncrypt} from 'jose'

class EncFactory{
    constructor(){

    }

    async makeEncObject(object: object, rsaPublicKey: KeyLike){
        return await new CompactEncrypt(
            new TextEncoder().encode(JSON.stringify(object)),
        )
        .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
        .encrypt(rsaPublicKey)
    }
}

const encFactory = new EncFactory()

export {
    encFactory
}