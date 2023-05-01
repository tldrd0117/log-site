import React from "react";
import { Text } from "../Text/Text";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface SiteMapProps {
    source: MDXRemoteSerializeResult

}

export const SiteMap = (props: SiteMapProps) => {
    const { source } = props
    serialize
    return <>
        <div className="prose">
            <MDXRemote {...source}/>
        </div>
    </>
}