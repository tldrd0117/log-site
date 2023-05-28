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
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import { getPost } from '@/data/api/post'
import { TagInput } from '@/components/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/Input/StylableInput'
import { useRouter } from 'next/router'



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

    const router = useRouter()
    const _id = router.query.id as string

    const {data} = useQuery({ queryKey: ['getPost'], queryFn: () => getPost({ _id })})
    return (
        <>
            <PageLayout>
                <AppBar title='blog' login account join/>
                <p>{JSON.stringify(data)}</p>
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
                        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tags} readOnly/>
                        
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
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext<{id: string}>) {
    if(!context.params || !context.params.id) {
        return {
            notFound: true
        }
    }
    const _id = context.params.id
    console.log(_id)
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['getPost'], () => getPost({_id}))
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
        code, source,
        dehydratedState: dehydrate(queryClient),
      }
    }
}