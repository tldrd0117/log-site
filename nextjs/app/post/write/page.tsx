import React from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Write from "./write";
import { GetServerSidePropsContext } from "next";
import { prefetchPost } from "@/data/hooks/post";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";

export interface WriteProps{
    code: MDXRemoteSerializeResult
    source: string
    categories: string[]
}

export default async function WritePage (context: GetServerSidePropsContext<{id: string}>){
    const id = context.params?.id as string || ""
    await prefetchPost(id)
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <Write id={id}/>
        </Hydrate>
    </>
}
