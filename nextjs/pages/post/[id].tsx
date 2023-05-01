import React from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import { PageLayout } from '@/containers/Layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { Text } from '@/components/Text/Text'

export interface PostProps{
    title: string
    content: string
    code: MDXRemoteSerializeResult
}

export default function Post (props: PostProps){
    const {title, content, code} = props
    console.log("code", code.frontmatter)
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
                        <Text h3>{code.frontmatter.title as string}</Text>
                        <Text p>{code.frontmatter.category as string}</Text>
                        <Text span>{code.frontmatter.tags as string}</Text>
                        <MDXRemote {...code} 
                            components={{
                            }}
                            lazy/>
                    </div>
                </ContentsLayout>
            </PageLayout>
        </>
    )
}

import fs from 'fs'

export async function getServerSideProps() {
    const source = fs.readFileSync('./pages/post/example.mdx', 'utf8')
    // const source = 'Some **mdx** text, with a component '
    const code = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: []
        },
        parseFrontmatter: true
    })
    return {
      props: {
        code
      }
    }
}