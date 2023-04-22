import React, { ChangeEventHandler, KeyboardEventHandler } from 'react'
import { BaseInput, BaseInputProps } from '../Input/BaseInput'

export interface BasePasswordInputProps extends BaseInputProps{
}

export const BasePasswordInput = (props: BasePasswordInputProps) => {
    const {ref, value, className, placeholder, disabled, onChange, onKeyDown, onKeyUp, onFocus, onBlur} = props
    return <>
        <BaseInput
            type="password"
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