import React, { MouseEventHandler } from "react";
import { Container, ContainerProps } from "@/containers/container/Container";
import clsx from "clsx";

export interface ListItemProps extends ContainerProps{
}

export const ListItem = (props: ListItemProps) => {
    const {className} = props
    return <>
        <Container {...props} className={clsx(["break-all", className])} tagType={"li"} />
    </>
}