import React from "react";

export interface BaseBoxProps{
    children?: React.ReactNode
    isHide?: boolean
    className?: string
}

export const BaseBox = (props: BaseBoxProps) => {
    const {children, isHide, className} = props
    return <>
        {isHide? null : <div className={className}>
            {children}
        </div>}
    </>
};