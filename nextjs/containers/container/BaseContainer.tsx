import React from "react";

export interface BaseContainerProps{
    children?: React.ReactNode
    hide?: boolean
    className?: string
    as?: React.ElementType
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    key?: string
}

export const BaseContainer = (props: BaseContainerProps) => {
    const {children, hide, className, as, onClick} = props
    const Box = as || "div"
    return <>
        {hide? null : <Box className={className} onClick={onClick}>
            {children}
        </Box>}
    </>
};