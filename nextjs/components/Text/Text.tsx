import React from "react";
import clsx from "clsx";
import { BaseText, BaseTextProps } from "./BaseText";

export interface TextProps extends BaseTextProps{
}

export const Text = (props: TextProps) => {
    const {children, h1, h2, h3, h4, h5, h6, p, span, className} = props
    return <>
        <BaseText h1={h1} h2={h2} h3={h3} h4={h4} h5={h5} h6={h6} p={p} span={span} 
        className={clsx([className])}>{children}</BaseText>
    </>
};