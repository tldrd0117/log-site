import { BorderBox } from '@/components/Box/BorderBox'
import clsx from 'clsx'
import React from 'react'

export interface ContentsLayoutProps{
    children?: React.ReactNode
    className?: string
}

export const ContentsLayout = (props: ContentsLayoutProps) => {
    const {children, className} = props
    return (
        <BorderBox className={clsx(['p-8', className])}>
            {children}
        </BorderBox>
    )
}