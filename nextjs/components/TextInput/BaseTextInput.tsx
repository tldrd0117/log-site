import React, { ChangeEventHandler, KeyboardEventHandler } from 'react'
import { BaseInput, BaseInputProps } from '../Input/BaseInput'

export interface BaseTextInputProps extends BaseInputProps{
}

export const BaseTextInput = (props: BaseTextInputProps) => {
    const {ref, value, className, placeholder, disabled, onChange, onKeyDown, onKeyUp, onFocus, onBlur} = props
    return <>
        <BaseInput
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