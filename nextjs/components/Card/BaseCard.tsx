import React, { ComponentType, ReactNode } from "react";
import { CardBox } from "../Box/CardBox";
import clsx from "clsx";

export interface BaseCardProps{
    boxType?: React.ElementType
    children?: ReactNode
    className?: string
}

export const BaseCard = (props: BaseCardProps) => {
    const {boxType, children, className} = props
    const Card = boxType || CardBox
    return <>
        <Card className={clsx([className])}>
            {children}
        </Card>
    </>
}
