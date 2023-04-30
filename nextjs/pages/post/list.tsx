import React from "react";
import { clsx } from "clsx";
import { AppBar } from "@/components/AppBar/AppBar";
import { List } from "@/components/List/List";
import { ContentsLayout } from "@/containers/Layout/ContentsLayout";
import { FlexList } from "@/components/List/FlexList";
import { CardListItem } from "@/components/ListItem/CardListItem";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

export interface PostListProps{
}

export const PostList = (props: PostListProps) => {
    return <>
        <AppBar title='blog' login account join/>
        <ContentsLayout className="mt-4">
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/post/list",
                label: "PostList"
            }]}/>
            <FlexList className="mt-4">
                {
                    [...Array(10)].map((_, i) => {
                        return <>
                            <CardListItem key={i} title="title" subTitle="subTitle" summary="summary"/>
                        </>
                    })
                }
            </FlexList>
        </ContentsLayout>
    </>
}