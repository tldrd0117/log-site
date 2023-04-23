import React from "react";
import { BaseBox, BaseBoxProps } from "./BaseBox";
import clsx from "clsx";
import styles from './BorderBox.module.scss';


interface BorderBoxProps extends BaseBoxProps{
}

export const BorderBox = (props: BorderBoxProps) => {
    const {children, isHide, className} = props
    return <BaseBox isHide={isHide} className={clsx(["border-solid", "border-transparent",
    "border-4","rounded", styles.bgClipGradientBorder, "bg-origin-border", "shadow-lg", "bg-gradient-border from-indigo-500 to-fuchsia-500"
    , "p-4", className])}>
        {children}
    </BaseBox>
};