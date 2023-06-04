'use client'

import React from "react";
import { Text } from "../Text/Text";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface SiteMapProps {
    source: MDXRemoteSerializeResult
}

export const SiteMap = (props: SiteMapProps) => {
    const { source } = props
    return <>
        <div className="prose">
            <MDXRemote {...source}/>
        </div>
    </>
}