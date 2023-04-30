import React from "react";
import { BaseContainerProps } from "./BaseContainer";
import { Container, ContainerProps } from "./Container";

export interface CompContainerProps extends ContainerProps{
    componentType?: React.ElementType<ContainerProps>
}

export const CompContainer = (props: CompContainerProps) => {
    const {hide, componentType} = props
    const CompContainer = componentType || Container
    return <>
        {hide? null : <CompContainer {...props}/>}
    </>
};