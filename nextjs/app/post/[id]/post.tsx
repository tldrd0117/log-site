'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Text } from '@/components/Text/Text'
import { useQuery } from '@tanstack/react-query'
import { TagInput } from '@/components/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/Input/StylableInput'
import { getData } from './page'
import MdxRemoteWrapper from '@/components/MdxRemoteWrapper/MdxRemoteWrapper'


export interface PostProps{
    code: MDXRemoteSerializeResult
    source: string
}

export default function Post ({mdxContents, title, category, tags}: any){
    return (
        <>
            <PageLayout>
                <AppBar title='blog' login account join/>
                <ContentsLayout tagType={BorderBox} className='mt-4'>
                    <Breadcrumbs items={[{
                        href: "/",
                        label: "Home"
                    }, {
                        href: "/post/list",
                        label: "PostList"
                    }, {
                        href: "/post/list",
                        label: "title"
                    }]}/>
                    <div className ={"prose mt-16 mx-auto"}>
                        <Text h3>{title}</Text>
                        <Text p>{category}</Text>
                        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tags} readOnly/>
                        {
                            mdxContents
                        }
                    </div>
                </ContentsLayout>
            </PageLayout>
        </>
    )
}