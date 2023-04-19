import React, { ChangeEventHandler, KeyboardEventHandler } from 'react'

export interface BaseInputProps{
    ref?: React.RefObject<HTMLInputElement>
    value?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const BaseTextInput = (props: BaseInputProps) => {
    const {ref, value, className, placeholder, disabled, onChange, onKeyDown, onKeyUp, onFocus, onBlur} = props
    return <>
        <input
            type="text"
            ref={ref}
            className={className}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    </>
}