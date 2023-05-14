import app from '../../src/app'
import authService from '../../src/services/auth.service';
import {PublicKey} from '../../src/interfaces/auth'
import jose, {CompactEncrypt, compactDecrypt, importJWK, JSONWebKeySet, KeyLike, JWK} from 'jose'
import exp from 'constants';
import { encFactory } from '../utils/encUtils';
import sha256 from 'crypto-js/sha256';

describe('auth service test', () => {
    it('Check encryption and decryption using JWK', async () => {
        const publicJWK: JSONWebKeySet = (await authService.getPublicJWK()) as JSONWebKeySet

        const targetPublicKey: JWK = publicJWK.keys.find((key: JWK)=>key.alg === "RSA-OAEP-256") || {}
        expect(targetPublicKey).toHaveProperty("alg")
        const rsaPublicKey: KeyLike = (await importJWK(targetPublicKey)) as KeyLike
        expect(rsaPublicKey).toBeDefined()
        // Encrypting plaintext using a public key
        const email = "admin@nnn.com"
        const password = sha256('1234').toString()
        const jwt = await encFactory.makeEncObject({email, password}, rsaPublicKey)
        console.log("#jwt",jwt)
        expect(jwt).toBeDefined()
        const result = await authService.decryptJSON(jwt)
        expect(result.email).toEqual(email)
        expect(result.password).toEqual(password)
    })

    it('Check Token validation', async () => {
        // 만료 테스트
        const expiredToken: string = (await authService.getTokenByExp({}, "0")) as string
        expect(expiredToken).toBeDefined()
        expect(authService.verifyToken(expiredToken)).rejects.toThrow("jwt expired")
        
        // 하루 테스트
        const oneDayToken: string = (await authService.getTokenByExp({}, "1d")) as string
        expect(oneDayToken).toBeDefined()
        expect(authService.verifyToken(oneDayToken)).resolves.toMatchObject({
            "exp": expect.any(Number), 
            "iat": expect.any(Number)
        })
        
    })
});