import React from "react";
import { CompContainer, CompContainerProps } from "@/containers/container/CompContainer";

export interface ListProps extends CompContainerProps{
}

export const List = (props: ListProps) => {
    return <CompContainer {...props} as={"ul"} />
}