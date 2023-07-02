'use client'
import React from 'react'
import { PrimaryButton } from '../Button/PrimaryButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BorderBox } from '../Box/BorderBox'
import clsx from 'clsx'

export interface TopMenuItem{
    title: string
    path: string
}

export interface TopMenuProps{
    items: Array<TopMenuItem>
    className: string
}

export const TopMenu = ({items, className} : TopMenuProps) => {
    const router = useRouter()
    const handleClick = (path: string) => {
        router.push(path)
    }
    return <>
        <BorderBox className={clsx(["flex", "pl-2" ,className, "rounded-xl"])}>
            {
                items.map(item => {
                    return <PrimaryButton className='mx-1 my-2' label={item.title} onClick={() => handleClick(item.path)} key={item.path}/>
                })
            }
        </BorderBox>
    </>
}