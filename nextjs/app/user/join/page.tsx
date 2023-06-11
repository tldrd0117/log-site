import React from 'react'
import Join from './join'
import { prefetchEncPublicKey } from '@/data/hooks/auth'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'

export interface JoinProps{
}

export default async function JoinPage (props: JoinProps) {
    await prefetchEncPublicKey()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <Join/>
        </Hydrate>
    </>
}