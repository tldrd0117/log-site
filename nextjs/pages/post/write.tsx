import React from "react";
import { AppBar } from "@/components/AppBar/AppBar";
import { BorderBox } from "@/components/Box/BorderBox";
import { TextInput } from "@/components/Input/TextInput";
import { ContentsLayout } from "@/containers/Layout/ContentsLayout";
import { PageLayout } from "@/containers/Layout/PageLayout";
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export interface WriteProps{
    code: MDXRemoteSerializeResult
    source: string
}

export default function Write (props: WriteProps){
    const {code} = props
    let {source} = props
    source = source.slice(source.indexOf("---")+3)
    source = source.slice(source.indexOf("---")+3)
    console.log(source)
    
    // const contents = source.replace(/---(.|\s)*---/, "")
    const handleCodeMirrorChange = () => {
        console.log("changed")
    }
    return <>
        <PageLayout>
            <AppBar title='blog' login account join/>
            <ContentsLayout tagType={BorderBox} className="mt-4">
                <Breadcrumbs items={[{
                    href: "/",
                    label: "Home"
                }, {
                    href: "/post/list",
                    label: "PostList"
                }, {
                    href: "/post/write",
                    label: code.frontmatter.title as string
                }]}/>
                <TextInput className="mt-4" placeholder="제목" value={code.frontmatter.title as string}/>
                <TextInput className="mt-4" placeholder="카테고리" value={code.frontmatter.category as string}/>
                <TextInput className="mt-4" placeholder="태그" value={code.frontmatter.tags as string}/>
                <CodeMirror
                    className="mt-4"
                    value={source}
                    onChange={handleCodeMirrorChange}
                    minHeight="400px"
                    maxHeight='500px'
                    extensions={[langs.markdown()]}
                    />
            </ContentsLayout>
        </PageLayout>
    </>
}


import fs from 'fs'
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

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
        code, source
      }
    }
}
