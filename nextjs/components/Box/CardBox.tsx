import React from "react";
import clsx from "clsx";
import styles from './BorderBox.module.scss';
import { BaseContainer, BaseContainerProps } from "@/containers/container/BaseContainer";


interface CardBoxProps extends BaseContainerProps{
}

export const CardBox = (props: CardBoxProps) => {
    const {className} = props
    return <BaseContainer {...props} className={clsx(["bg-slate-200","shadow-lg","rounded-lg",className])}>
    </BaseContainer>
};