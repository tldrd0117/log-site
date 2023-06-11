import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '../../getQueryClient'
import Post from './post'
import { GetServerSidePropsContext } from 'next'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { compileMDX } from 'next-mdx-remote/rsc'


export const PostComponent = ({id, content, frontmatter}: any) => {
    const tags = (frontmatter.tags as string).split("(((").slice(1)
    return (
        <>
        <Post postId={id} mdxContents={content} 
            title={frontmatter.title as string}
            category={frontmatter.category as string}
            tags={tags}
             />
        </>
    )
}

export default async function Page(context: GetServerSidePropsContext<{id: string}>) {
    if(!context.params || !context.params.id) {
        return {
            notFound: true
        }
    }
    const id = context.params.id
    const queryClient = getQueryClient()
    const dehydratedState = dehydrate(queryClient)
    let {source} = await getData(id)
    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
        },
        parseFrontmatter: true
    }})
  return (
    <Hydrate state={dehydratedState}>
        <PostComponent
            content={content}
            frontmatter={frontmatter}
            id={id}
        />
    </Hydrate>
  )
}

export async function getData(id: string) {
    const source = await fetch(`http://localhost:3000/example.mdx`).then(res => res.text())
    
    return {
        source
    }
}