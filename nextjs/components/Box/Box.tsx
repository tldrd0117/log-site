import React from "react";
import { BaseBoxProps } from "./BaseBox";

export interface BoxProps extends BaseBoxProps{
}

export const Box = (props: BoxProps) => {
    const {children, isHide, className} = props
    return <>
        {isHide? null : <div className={className}>
            {children}
        </div>}
    </>
};