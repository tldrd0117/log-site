'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Text } from '@/components/Text/Text'
import { TagInput } from '@/components/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/Input/StylableInput'
import { usePost } from '@/data/query/post/query'


export interface PostProps{
    id: string
}

export default function Post ({id}: PostProps){
    const {data} = usePost(id)
    let {
        source,
        mdxContent,
        tags,
        title,
        category,
    }: any = data
    console.log("mdxContent", mdxContent)
    return (
        <>
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
                <Text p>{category.name}</Text>
                <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tags.map((item:any) => item.name)} readOnly/>
                {
                    mdxContent
                }
            </div>
        </>
    )
}