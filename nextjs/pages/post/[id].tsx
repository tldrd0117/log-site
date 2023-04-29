import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import React from 'react'

export interface PostProps{
    title: string
    content: string
}

export const Post = (props: PostProps) => {
    const {title, content} = props
    return (
        <>
            <AppBar title='blog' login account join/>
            <ContentsLayout>
                
            </ContentsLayout>
        </>
    )
}