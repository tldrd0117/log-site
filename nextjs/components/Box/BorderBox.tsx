import React from "react";
import clsx from "clsx";
import styles from './BorderBox.module.scss';
import { BaseContainer, BaseContainerProps } from "@/containers/container/BaseContainer";


interface BorderBoxProps extends BaseContainerProps{
}

export const BorderBox = (props: BorderBoxProps) => {
    const {className} = props
    return <BaseContainer {...props} className={clsx(["border-solid", "border-transparent",
    "border-4","rounded", styles.bgClipGradientBorder, "bg-origin-border", "shadow-lg", "bg-gradient-border from-indigo-500 to-fuchsia-500"
    , className])}>
    </BaseContainer>
};