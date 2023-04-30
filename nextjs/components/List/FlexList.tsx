import React from "react";
import { CompContainer, CompContainerProps } from "@/containers/container/CompContainer";
import clsx from "clsx";

export interface FlexListProps extends CompContainerProps{
}

export const FlexList = (props: FlexListProps) => {
    const {className} = props
    return <CompContainer {...props} as={"ul"} className={clsx([`flex flex-wrap gap-4`, className])} />
}