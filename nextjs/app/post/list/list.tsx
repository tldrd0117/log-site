'use client'
import React, { KeyboardEvent, useCallback, useEffect } from "react";
import { clsx } from "clsx";
import { AppBar } from "@/components/AppBar/AppBar";
import { List } from "@/components/List/List";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { FlexList } from "@/components/List/FlexList";
import { CardListItem } from "@/components/ListItem/CardListItem";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { PageLayout } from "@/containers/layout/PageLayout";
import { BorderBox } from "@/components/Box/BorderBox";
import { usePostListInfinity, usePostSearchInfinity } from "@/data/query/post/query";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { redirect, useRouter } from "next/navigation";
import { Text } from "@/components/Text/Text";
import { parseISO, set } from "date-fns";
import { TextInput } from "@/components/Input/TextInput";
import _ from "lodash";
import { QUERY_KEYS } from "@/data/query/common/constants";
import { useQueryClient } from "@tanstack/react-query";

export interface PostListProps{
}

export function PostList (props: PostListProps) {
    const { data, fetchNextPage, hasNextPage, isFetching} = usePostListInfinity()
    if(!data){
        redirect("/")
    }
    const { pages }: any = data
    const router = useRouter()
    const queryClient = useQueryClient()
    const [searchWord, setSearchWord] = React.useState("")
    const [debounceSearchWord, setDebounceSearchWord] = React.useState("")
    const { data: searchData, fetchNextPage: fetchNextSearchPage, 
        hasNextPage: hasNextSearchPage, isFetching: isFetchingSearch, isFetchedAfterMount} = usePostSearchInfinity(debounceSearchWord)
    const searchPages: any = searchData?.pages
    const handleItemClick = (id: string) => {
        router.push(`/post/${id}`)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
        }
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.currentTarget.value)
        debounceOnChange(e.currentTarget.value)
    }
    const debounceOnChange = useCallback(_.debounce((word) => {
        setDebounceSearchWord(word)
    }, 500), [debounceSearchWord])

    useEffect(() => {
        // if(isSuccessSearch){
            findDocuments(debounceSearchWord)
        // }
    }, [isFetchedAfterMount])

    const findDocuments = (word: string) => {
        console.log("findDocuments", word, word.length)
        if(word.length === 0){
            document.querySelectorAll('.card-list-item *:has(>.search_text_token)').forEach((item: any) => {
                item.innerHTML = item.textContent
            })
        } else {
            const re = new RegExp(`${word}`, 'g');
            document.querySelectorAll('.card-list-item *:not(:has(*))').forEach((item: any) => {
                item.innerHTML = item.textContent.replace(re, `<span class="search_text_token bg-yellow-300">${word}</span>`)
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
        }]}/>
        <div className="flex">
            <TextInput onChange={handleSearchChange}
                value={searchWord}
                onKeyDown={handleKeyDown} bgClassName="mt-4" placeholder="검색어를 입력하세요"/>
            <PrimaryButton className="mt-4 ml-4" label="검색"/>
        </div>

        {
            <FlexList className="mt-4">
                {
                    searchWord?.length? 
                    isFetchingSearch? <Text p>로딩중</Text> :
                    searchPages?.map((page: any) => {
                        return page?.list?.map((item: any) => {
                            return <CardListItem onClick={() => handleItemClick(item._id)}
                                className="card-list-item"
                                key={item._id} 
                                title={item.title} 
                                date={parseISO(item.createAt)}
                                tags={item.tags.map((tag:any) => tag.name)}
                                author={item.authorName}/>
                        })
                    }) || <Text p>빈 화면</Text> :
                    pages?.map((page: any) => {
                        return page?.list?.map((item: any) => {
                            return <CardListItem onClick={() => handleItemClick(item._id)}
                                key={item._id} 
                                className="card-list-item"
                                title={item.title} 
                                date={parseISO(item.createAt)}
                                tags={item.tags.map((tag:any) => tag.name)}
                                author={item.authorName}/>
                        })
                    }) || <Text p>빈 화면</Text>
                }
            </FlexList>
            
        }
        {
            searchWord?.length? 
            hasNextSearchPage? <PrimaryButton onClick={() => fetchNextSearchPage()} label="next"/>: null:
            hasNextPage? <PrimaryButton onClick={() => fetchNextPage()} label="next"/>: null
        }
    </>
}