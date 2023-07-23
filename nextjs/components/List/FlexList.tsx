import React from "react";
import clsx from "clsx";
import { ContainerProps, Container } from "@/containers/container/Container";

export interface FlexListProps extends ContainerProps{
}

export const FlexList = (props: FlexListProps) => {
    let {className} = props
    if(!className?.includes("gap")){
        className += " gap-4"
    }
    return <Container {...props} tagtype={"ul"} className={clsx([`flex flex-wrap`, className])} />
}