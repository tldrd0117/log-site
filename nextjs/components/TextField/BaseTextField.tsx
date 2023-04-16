import React, { ChangeEventHandler } from 'react'

interface BaseTextFieldProps{
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export const BaseTextField = (props: BaseTextFieldProps) => {
    const {value, onChange} = props
    return <>
        <input
            type='text' 
            onChange={onChange}
            value={value}
        />
    </>
}