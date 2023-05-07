import React from "react";
import { CompContainer, CompContainerProps } from "@/containers/container/CompContainer";
import clsx from "clsx";
import { ContainerProps } from "@/containers/container/Container";

export interface FlexListProps extends ContainerProps{
}

export const FlexList = (props: FlexListProps) => {
    let {className} = props
    if(!className?.includes("gap")){
        className += " gap-4"
    }
    return <CompContainer {...props} tagType={"ul"} className={clsx([`flex flex-wrap`, className])} />
}