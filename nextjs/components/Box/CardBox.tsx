import React from "react";
import { BaseBox, BaseBoxProps } from "./BaseBox";
import clsx from "clsx";
import styles from './BorderBox.module.scss';


interface CardBoxProps extends BaseBoxProps{
}

export const CardBox = (props: CardBoxProps) => {
    const {children, isHide, className} = props
    return <BaseBox isHide={isHide} className={clsx(["bg-slate-200","shadow-lg","rounded-lg","p-4",className])}>
        {children}
    </BaseBox>
};