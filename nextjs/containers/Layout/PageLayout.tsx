import React from "react";
import { Container, ContainerProps } from "../container/Container";
import clsx from "clsx";
import style from './PageLayout.module.scss'

export interface PageLayoutProps extends ContainerProps {
    className?: string;
}

export const PageLayout = (props: PageLayoutProps) => {
    const { className, children } = props;
    return <>
        <Container {...props} className={clsx([style.background,"overflow-auto","absolute","w-full", "h-full", "p-4", className])}/>
    </>
}