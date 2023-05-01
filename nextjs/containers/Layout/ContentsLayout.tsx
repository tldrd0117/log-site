import { BorderBox } from '@/components/Box/BorderBox'
import clsx from 'clsx'
import React from 'react'
import { Container, ContainerProps } from '../container/Container'

export interface ContentsLayoutProps extends ContainerProps{
}

export const ContentsLayout = (props: ContentsLayoutProps) => {
    const {children, className} = props
    return (
        <Container {...props} className={clsx(['p-8', className])} />
    )
}