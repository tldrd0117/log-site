import React from "react";

export interface BaseContainerProps{
    children?: React.ReactNode
    hide?: boolean
    className?: string
    as?: React.ElementType
}

export const BaseContainer = (props: BaseContainerProps) => {
    const {children, hide, className, as} = props
    const Box = as || "div"
    return <>
        {hide? null : <Box className={className}>
            {children}
        </Box>}
    </>
};