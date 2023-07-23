import React, { useEffect } from "react";
import { BaseContainerProps } from "./BaseContainer";

export interface ContainerProps extends BaseContainerProps{
    tagtype?: React.ElementType
    onClick?: (e: React.MouseEvent<any>) => void
}

export const Container = (props: ContainerProps) => {
    const {children, hide, className, tagtype} = props
    let Container = tagtype || "div"
    return <>
        {hide? null : <Container {...props}/>}
    </>
};