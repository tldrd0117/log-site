import React, { MouseEventHandler } from 'react'
import { BaseButton } from './BaseButton'
import {clsx} from 'clsx'

interface PrimaryButtonProps{
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
    return <BaseButton 
        {...props}
        className={clsx(["text-black", "bg-white"])}
        />
}