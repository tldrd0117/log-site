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
import { usePostListInfinity } from "@/data/hooks/post";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { useRouter } from "next/navigation";

export interface PostListProps{
}

export function PostList (props: PostListProps) {
    const { data, fetchNextPage, hasNextPage} = usePostListInfinity()
    const { pages }: any = data
    const router = useRouter()
    const handleItemClick = (id: string) => {
        console.log(id)
        router.push(`/post/${id}`)
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
                }]}/>
                <FlexList className="mt-4">
                    {
                        pages? pages.map((page: any) => {
                            return page? page.list.map((item: any) => {
                                return <>
                                    <CardListItem onClick={() => handleItemClick(item._id)} key={item._id} title={item.summary} subTitle={item.createAt} summary={item.authorName}/>
                                </>
                            }): null
                        }): null
                    }
                </FlexList>
                {
                    hasNextPage? <PrimaryButton onClick={() => fetchNextPage()} label="next"/>: null
                }
            </ContentsLayout>
        </PageLayout>
        
    </>
}