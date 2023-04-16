import React, { MouseEventHandler } from 'react'
import { PrimaryButton } from './PrimaryButton'
import { SecondaryButton } from './SecondaryButton'
import { BaseButton } from './BaseButton'

interface ButtonProps{
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    primary?: boolean
    secondary?: boolean
}

export const Button = (props: ButtonProps) => {
    const { primary, secondary } = props
    if(primary){
        return <PrimaryButton {...props}/>
    }
    if(secondary){
        return <SecondaryButton {...props}/>
    }
    return <BaseButton {...props}/>
}