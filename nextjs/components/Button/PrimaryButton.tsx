import React, { MouseEventHandler } from 'react'
import { BaseButton } from './BaseButton'
import {clsx} from 'clsx'
import styles from './button.module.scss'

interface PrimaryButtonProps{
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
    const {label, onClick, disabled, className} = props
    return <BaseButton 
        {...props}
        className={clsx(["text-stone-800", "bg-gradient-to-b", "from-slate-200", "to-slate-300",
            "hover:bg-gradient-to-r", "hover:from-slate-100", "hover:to-slate-200", "hover:text-stone-700",
            "rounded-full", "pt-2", "pb-2", "pl-4", "pr-4", className])}
        />
}