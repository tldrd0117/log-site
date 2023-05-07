import React, { ReactNode } from 'react'
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
    code: MDXRemoteSerializeResult
    source: string
}

export default function Post (props: PostProps){
    const {code} = props
    let {source} = props
    source = source.slice(source.indexOf("---")+3)
    source = source.slice(source.indexOf("---")+3)

    const tags = (code.frontmatter.tags as string).split("(((").slice(1)
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
                        <TagInput className="mt-4 bg-transparent" placeholder="태그" tagValue={tags} readOnly/>
                        
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
import { TagInput } from '@/components/Input/TagInput'

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
    console.log(code)
    return {
      props: {
        code, source
      }
    }
}