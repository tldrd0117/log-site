import React, { MouseEventHandler } from 'react'
import { BaseButton } from './BaseButton'
import {clsx} from 'clsx'

interface SecondaryButtonProps{
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

export const SecondaryButton = (props: SecondaryButtonProps) => {
    return <BaseButton
        {...props}
        className={clsx(["text-white", "bg-black"])}
        />
}