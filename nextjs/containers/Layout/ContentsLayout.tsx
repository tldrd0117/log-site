import { BorderBox } from '@/components/Box/BorderBox'
import clsx from 'clsx'
import React from 'react'

export interface ContentsLayoutProps{
    children?: React.ReactNode
}

export const ContentsLayout = (props: ContentsLayoutProps) => {
    const {children} = props
    return (
        <BorderBox className={clsx(['p-8', 'mt-4'])}>
            {children}
        </BorderBox>
    )
}