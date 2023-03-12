export interface TokenPayload{
    email: string
    role: string
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