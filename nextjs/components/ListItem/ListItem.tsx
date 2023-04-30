import React from "react";
import { Container, ContainerProps } from "@/containers/container/Container";

export interface ListItemProps extends ContainerProps{
}

export const ListItem = (props: ListItemProps) => {
    return <>
        <Container {...props} as={"li"} />
    </>
}