import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import { expect } from '../utils/chaiUtils'
import authService from '../../src/services/auth.service';
import {PublicKey} from '../../src/interfaces/auth'
import jose, {CompactEncrypt, compactDecrypt, importJWK, JSONWebKeySet, KeyLike} from 'jose'
import exp from 'constants';

describe('auth service test', () => {
    it('Check encryption and decryption using JWK', async () => {
        const publicJWK: JSONWebKeySet = (await authService.getPublicJWK()) as JSONWebKeySet
        const rsaPublicKey = await importJWK(publicJWK.keys[0],
            'RS256',
          )
        expect(rsaPublicKey).to.exist
        // Encrypting plaintext using a public key
        const plaintext = '1234'
        const jwe = await new CompactEncrypt(
            new TextEncoder().encode(plaintext),
          )
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .encrypt(rsaPublicKey)
        console.log(jwe)
        expect(jwe).to.have.lengthOf.at.least(5)
        const decryptData = await authService.decryptData(jwe)
        expect(decryptData.plaintext.toString()).to.be.equal(plaintext)
    })
});