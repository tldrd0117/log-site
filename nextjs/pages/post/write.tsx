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
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

export interface WriteProps{
    code: MDXRemoteSerializeResult
    source: string
    categories: string[]
}

export default function Write (props: WriteProps){
    const {code, categories} = props
    let {source} = props
    source = source.slice(source.indexOf("---")+3)
    source = source.slice(source.indexOf("---")+3)
    console.log(source)

    const tags = (code.frontmatter.tags as string).split("(((").slice(1)
    
    // const contents = source.replace(/---(.|\s)*---/, "")
    const handleCodeMirrorChange = () => {
        console.log("changed")
    }
    return <>
        <PageLayout>
            <AppBar title='blog' login account join/>
            <ContentsLayout tagType={BorderBox} className="mt-4 pb-16">
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
                <TextInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE}
                    inputClassName = {"px-7 py-8 text-3xl font-bold "}
                    className="mt-8"
                    placeholder="제목" 
                    value={code.frontmatter.title as string}/>
                <Select inputProps={{
                    bgClassName: "mt-4 w-40",
                    placeholder: "카테고리",
                    inputStyleType: INPUT_STYLE_TYPE.UNDERLINE,
                }} contextMenuProps={{
                    className: "mt-2",
                    tagType: CardBox,
                    firstListItemProps: {
                        className: "rounded-t-lg",
                    },
                    lastListItemProps: {
                        className: "rounded-b-lg",
                    },
                    listProps: {
                        className: "w-40",
                    },
                    listItemProps: {
                        className: "w-40",
                    },
                    listItemsData: categories.map(item=>({id: item, value: item})),
                }}
                selected={{id:code.frontmatter.category as string, value: code.frontmatter.category as string}}
                />
                <TagInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE} className="mt-4"
                    tagValue={tags}/>
                <CodeMirror
                    className="mt-4"
                    value={source}
                    onChange={handleCodeMirrorChange}
                    minHeight="400px"
                    maxHeight='5000px'
                    extensions={[langs.markdown()]}
                    />
                <FloatBottomLayout
                    leftComponent={
                        <>
                        </>
                    }
                    rightComponent={
                        <div className="flex gap-2 pr-8">
                            <PrimaryButton label="미리보기"/>
                            <PrimaryButton label="작성완료"/>

                        </div>
                    }
                    />
            </ContentsLayout>
        </PageLayout>
    </>
}


import fs from 'fs'
import { TagInput } from "@/components/Input/TagInput";
import { Select } from "@/components/Select/Select";
import { CardBox } from "@/components/Box/CardBox";
import { INPUT_STYLE_TYPE } from "@/components/Input/StylableInput";
import { FloatBottomLayout } from "@/containers/Layout/FloatBottomLayout";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

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
    const categories = ["카테고리1", "카테고리2", "카테고리3"];
    return {
      props: {
        code, source, categories
      }
    }
}
