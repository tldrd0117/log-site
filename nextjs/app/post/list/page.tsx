import React from "react";
import { PostList } from "./list";
import { prefetchEncPublicKey } from "@/data/hooks/auth";
import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { prefetchPostList } from "@/data/hooks/post";

export interface PostListProps{
}

export default async function PostListPage (props: PostListProps) {
    await prefetchEncPublicKey()
    await prefetchPostList()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <PostList/>
        </Hydrate>
    </>
}