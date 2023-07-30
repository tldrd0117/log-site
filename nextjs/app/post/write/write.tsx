'use client'
import React, {Fragment, useState} from "react";
import { AppBar } from "@/components/AppBar/AppBar";
import { BorderBox } from "@/components/Box/BorderBox";
import { TextInput } from "@/components/Input/TextInput";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { PageLayout } from "@/containers/layout/PageLayout";
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { TagInput } from "@/components/Input/TagInput";
import { Select } from "@/components/Select/Select";
import { CardBox } from "@/components/Box/CardBox";
import { INPUT_STYLE_TYPE } from "@/components/Input/StylableInput";
import { FloatBottomLayout } from "@/containers/layout/FloatBottomLayout";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Modal } from "@/components/Modal/Modal";
import * as runtime from 'react/jsx-runtime'
import {compile, run} from '@mdx-js/mdx'
import { Text } from "@/components/Text/Text";
import { ListItemData } from "@/components/ContextMenu/ContextMenu";
import { usePost, usePostMutation, usePostUpdateMutation } from "@/data/query/post/query";
import { DynamicLoginRequired } from "@/app/common/DynamicLoginRequired";
import { useCategoryAll, useCategoryList } from "@/data/query/category/query";
import QUERY_KEYS from "@/data/query/auth";
import { POST_LIST } from "@/data/query/common/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface WriteProps{
    id: string
}

export default function Write ({id}: WriteProps){
    let {data}: any = usePost(id)
    let {
        source,
        mdxContent,
        tags,
        title,
        category,
    }: any = data
    const isEdit = id?.length
    const {mutate} = usePostMutation()
    const {mutate: mutateUpdate} = usePostUpdateMutation()
    const {data: categories} = useCategoryAll()
    const router = useRouter()

    const [code, setCode] = useState(source || "")
    const [tagValue, setTagValue] = useState(tags?.map((item: any)=>item.name) || [])
    const [titleValue, setTitleValue] = useState(title || "")
    const [selectedCategory, setSelectedCategory]: any = useState(category?{id: category?._id, value: category?.name} : {})
    const [isPreview, setIsPreview] = useState(false)
    const [mdxModule, setMdxModule]:any = useState()
    const MdxContent = mdxModule ? mdxModule.default : Fragment

    const queryClient = useQueryClient()

    const handleCodeMirrorChange = (value: string) => {
        setCode(value)
    }

    const handleCategoryChange = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setSelectedCategory(itemData)
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

    const handleOnClickComplete = async () => {
        if(isEdit){
            mutateUpdate({
                _id: data._id,
                text: code,
                title: titleValue,
                tags: tagValue,
                category: selectedCategory.id,
            }, {
                onSuccess: async () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.POST.LIST],
                        })
                        router.push('/post/list')
                    }, 500)
                }
            })
        } else {
            mutate({
                text: code,
                title: titleValue,
                tags: tagValue,
                category: selectedCategory.id,
            }, {
                onSuccess: async () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.POST.LIST],
                        })
                        router.push('/post/list')
                    }, 500)
                }
            })
        }
        
    }

    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }, {
            href: "/post/list",
            label: "PostList"
        }, {
            href: "/post/write",
            label: isEdit? title : "PostWrite"
        }]}/>
        <DynamicLoginRequired>
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
                tagtype: CardBox,
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
                listItemsData: categories?.list?.map((item:any)=>({id: item._id, value: item.name})),
            }}
            onItemSelect={handleCategoryChange}
            selected={isEdit?selectedCategory: undefined}
            />
            <TagInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE} className="mt-4"
                onTagChange={handleOnTagsChange}
                tagValue={tagValue}/>
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
                        <PrimaryButton onClick={() => handleOnClickComplete()} label="작성완료"/>
                    </div>
                }
                />
        </DynamicLoginRequired>
        <Modal isShow={isPreview} onClose={() => setIsPreview(false)}>
            <BorderBox className="p-16 prose max-h-screen overflow-auto min-w-[62ch]">
                <Text h3>{titleValue}</Text>
                <Text p>{selectedCategory.value}</Text>
                <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tagValue} readOnly/>
                <MdxContent/>
            </BorderBox>
        </Modal>
    </>
}



