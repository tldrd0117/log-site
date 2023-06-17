import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '../../getQueryClient'
import Post from './post'
import { GetServerSidePropsContext } from 'next'
import { prefetchPost } from '@/data/hooks/post'


export default async function Page(context: GetServerSidePropsContext<{id: string}>) {
    const id = context.params?.id as string || ""
    await prefetchPost(id)
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <Post id={id}/>
        </Hydrate>
    </>
}
