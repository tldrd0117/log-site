import React from "react";
import { AppBar } from "@/components/AppBar/AppBar";
import { BorderBox } from "@/components/Box/BorderBox";
import { TextInput } from "@/components/Input/TextInput";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { PageLayout } from "@/containers/layout/PageLayout";
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import Write from "./write";
import { compileMDX } from "next-mdx-remote/rsc";
import { GetServerSidePropsContext } from "next";
import { getPost } from "@/data/api/post";

export interface WriteProps{
    code: MDXRemoteSerializeResult
    source: string
    categories: string[]
}

export default async function Page (context: GetServerSidePropsContext<{id: string}>){
    const id = context.params?.id as string
    let {source, categories}: any = await getData(id)
    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
        },
        parseFrontmatter: true
    }})
    return <>
        <Write id={id} source={source} frontmatter={frontmatter} categories={categories}/>
    </>
}

export async function getData(id: string) {
    const res = await getPost({_id: id})
    // const source = await fetch(`http://localhost:3000/api/exampleMdx`).then(res => res.text())
    const categories = ["카테고리1", "카테고리2", "카테고리3"];
    return {
        source: res?.text, categories
    }
}
