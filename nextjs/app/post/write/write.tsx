'use client'
import React, {Fragment, useState} from "react";
import { AppBar } from "@/components/AppBar/AppBar";
import { BorderBox } from "@/components/Box/BorderBox";
import { TextInput } from "@/components/Input/TextInput";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { PageLayout } from "@/containers/layout/PageLayout";
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { TagInput } from "@/components/Input/TagInput";
import { Select } from "@/components/Select/Select";
import { CardBox } from "@/components/Box/CardBox";
import { INPUT_STYLE_TYPE } from "@/components/Input/StylableInput";
import { FloatBottomLayout } from "@/containers/layout/FloatBottomLayout";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Modal } from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import * as runtime from 'react/jsx-runtime'
import {compile, run} from '@mdx-js/mdx'
import { Text } from "@/components/Text/Text";
import { ListItemData } from "@/components/ContextMenu/ContextMenu";

export interface WriteProps{
    source: string
}

export default function Write (props: any){
    let {source, frontmatter, categories}: any = props
    let isEdit = source ? true : false
    let tags, title, category
    if(isEdit){
        source = source.slice(source.indexOf("---")+3)
        source = source.slice(source.indexOf("---")+3)
        tags = (frontmatter.tags as string).split("(((").slice(1)
    } else {
    }

    const [code, setCode] = useState(source)
    const [tagValue, setTagValue] = useState(tags)
    const [titleValue, setTitleValue] = useState(frontmatter.title as string || "")
    const [categoryValue, setCategoryValue] = useState(frontmatter.category as string)
    const [isPreview, setIsPreview] = useState(false)
    const [mdxModule, setMdxModule]:any = useState()
    const MdxContent = mdxModule ? mdxModule.default : Fragment

    const handleCodeMirrorChange = (value: string) => {
        setCode(value)
    }

    const handleCategoryChange = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setCategoryValue(itemData.value)
    }

    const handleOnTitleChange = (e: any) => {
        setTitleValue(e.target.value)
    }

    const handleOnTagsChange = (values: Array<string>) => {
        console.log(values  )
        setTagValue(values)
    }

    const handleOnClickPreview = async () => {
        setIsPreview(!isPreview)
        const response = await fetch("/api/mdx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({source: code})
        })
        const result = await response.text()
        const resultJSON = JSON.parse(result)
        const mo = await run(resultJSON.code, runtime)
        setMdxModule(mo)
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
                    label: isEdit? frontmatter.title as string : "PostWrite"
                }]}/>
                <TextInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE}
                    inputClassName = {"px-7 py-8 text-3xl font-bold "}
                    className="mt-8"
                    placeholder="제목" 
                    onChange={handleOnTitleChange}
                    value={ titleValue }/>
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
                    listItemsData: categories.map((item:any)=>({id: item, value: item})),
                }}
                onItemSelect={handleCategoryChange}
                selected={isEdit?{id:frontmatter.category as string, value: frontmatter.category as string}: undefined}
                />
                <TagInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE} className="mt-4"
                    onTagChange={handleOnTagsChange}
                    tagValue={tags}/>
                <CodeMirror
                    className="mt-4"
                    value={code}
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
                            <PrimaryButton onClick={() => handleOnClickPreview()} label="미리보기"/>
                            <PrimaryButton label="작성완료"/>

                        </div>
                    }
                    />
            </ContentsLayout>
        </PageLayout>
        <Modal isShow={isPreview} onClose={() => setIsPreview(false)}>
            <BorderBox className="p-16 prose max-h-screen overflow-auto min-w-[62ch]">
                <Text h3>{titleValue}</Text>
                <Text p>{categoryValue}</Text>
                <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tagValue} readOnly/>
                <MdxContent/>
            </BorderBox>
        </Modal>
    </>
}



