import React from 'react'
import Login from './login'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { prefetchEncPublicKey } from '@/data/hooks/auth'

export interface LoginProps{
}

export default async function LoginPage (props: LoginProps) {
    await prefetchEncPublicKey()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <Login/>
        </Hydrate>
    </>
}