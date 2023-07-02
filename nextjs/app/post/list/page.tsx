import React from "react";
import { PostList } from "./list";
import { prefetchPublicKey } from "@/data/query/auth";
import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { prefetchPostList } from "@/data/query/post/prefetch";
import { AppBarContentsTemplate } from "@/templates/AppBarContentsTemplate";

export interface PostListProps{
}

export default async function PostListPage (props: PostListProps) {
    await prefetchPublicKey()
    await prefetchPostList()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <PostList/>
        </Hydrate>
    </>
}