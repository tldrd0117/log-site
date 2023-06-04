'use client'
import React from "react";
import { MDXRemote } from "next-mdx-remote";

const MdxRemoteWrapper = (props: any) => {
    console.log(props)
    return <>
        <MDXRemote {...props}/>
    </>
}

export default MdxRemoteWrapper
