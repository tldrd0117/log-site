import React, { MouseEventHandler } from 'react'

export interface BaseButtonProps{
    label: string
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    isShow?: boolean
}

export const BaseButton = ({ label, className, onClick, disabled, type, isShow }: BaseButtonProps) => {
    if(isShow === undefined) isShow = true
    return <>
        {
            isShow?<button
                className={className}
                onClick={onClick}
                disabled={disabled}
                type={type}
                >
                {label}
            </button>: null
        }
        
    </>
}