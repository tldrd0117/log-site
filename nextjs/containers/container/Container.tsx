import React from "react";
import { BaseContainerProps } from "./BaseContainer";

export interface ContainerProps extends BaseContainerProps{
    tagType?: React.ElementType<BaseContainerProps>
}

export const Container = (props: ContainerProps) => {
    const {children, hide, className, tagType} = props
    const Container = tagType || "div"
    return <>
        {hide? null : <Container {...props} />}
    </>
};