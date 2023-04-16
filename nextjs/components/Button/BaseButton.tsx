import React, { MouseEventHandler } from 'react'

interface ButtonProps{
    label: string
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    
}

export const BaseButton = ({ label, className, onClick, disabled }: ButtonProps) => {
    return <>
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            >
            {label}
        </button>
    </>
}