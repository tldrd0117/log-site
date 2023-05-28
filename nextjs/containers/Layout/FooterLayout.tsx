import { BorderBox } from "@/components/Box/BorderBox";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

export interface FooterProps {
    className?: string
    children?: React.ReactNode
}

export const FooterLayout = (props: FooterProps) => {
    const {className, children} = props
    return <>
        <footer className={className}>
            <BorderBox className="p-8">
                {children}
            </BorderBox>
        </footer>
    </>
}