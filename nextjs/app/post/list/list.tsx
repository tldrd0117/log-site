'use client'
import React from "react";
import { clsx } from "clsx";
import { AppBar } from "@/components/AppBar/AppBar";
import { List } from "@/components/List/List";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { FlexList } from "@/components/List/FlexList";
import { CardListItem } from "@/components/ListItem/CardListItem";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { PageLayout } from "@/containers/layout/PageLayout";
import { BorderBox } from "@/components/Box/BorderBox";
import { usePostListInfinity } from "@/data/query/post/query";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { redirect, useRouter } from "next/navigation";
import { Text } from "@/components/Text/Text";
import { parseISO } from "date-fns";

export interface PostListProps{
}

export function PostList (props: PostListProps) {
    const { data, fetchNextPage, hasNextPage} = usePostListInfinity()
    if(!data){
        redirect("/")
    }
    const { pages }: any = data
    console.log(data, pages)
    const router = useRouter()
    const handleItemClick = (id: string) => {
        console.log(id)
        router.push(`/post/${id}`)
    }
    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }, {
            href: "/post/list",
            label: "PostList"
        }]}/>
        <FlexList className="mt-4">
            {
                pages? pages.map((page: any) => {
                    return (page && page.list && page.list.length)? page.list.map((item: any) => {
                        return <CardListItem onClick={() => handleItemClick(item._id)}
                            key={item._id} 
                            title={item.title} 
                            date={parseISO(item.createAt)}
                            tags={item.tags.map((tag:any) => tag.name)}
                            author={item.authorName}/>
                    }): <Text p>없습니다</Text>
                }): <Text p>없습니다</Text>
            }
        </FlexList>
        {
            hasNextPage? <PrimaryButton onClick={() => fetchNextPage()} label="next"/>: null
        }
    </>
}