import React, { ChangeEventHandler, KeyboardEventHandler } from 'react'

interface BaseTextFieldProps{
    value?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>
}

export const BaseTextInput = (props: BaseTextFieldProps) => {
    const {value, className, placeholder, disabled, onChange, onKeyDown, onKeyUp} = props
    return <>
        <input
            type='text'
            className={className}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />
    </>
}