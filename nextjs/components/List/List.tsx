import React from "react";
import { Container, ContainerProps } from "@/containers/container/Container";

export interface ListProps extends ContainerProps{
}

export const List = (props: ListProps) => {
    return <Container {...props} as={"ul"} />
}