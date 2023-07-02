export interface TokenPayload{
    email: string
    role: string
}

export interface DecodedUserInfo{
    exp: number
    iat: number
    _id: string
    name: string
    email: string
    role: string
    createdAt: string
}

export interface PublicKeyProp{
    kty: string
    kid: string
    use: string
    alg: string
    e: string
    n: string
}

export interface PublicKey{
    keys: Array<PublicKeyProp>
}