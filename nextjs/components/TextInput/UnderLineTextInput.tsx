import React from 'react'
import { BaseInputProps, BaseTextInput } from './BaseTextInput'
import Image from 'next/image'
import cancelIcon from '../../public/images/cancel_FILL0_wght400_GRAD0_opsz24.svg'

export interface UnderLineInputProps extends BaseInputProps{
    icon?: string
    label?: string
    helperText?: string
    cancelButton?: boolean
}

export const UnderLineTextInput = (props: UnderLineInputProps) => {
    const {icon, cancelButton, label, helperText, ref, value, className, placeholder, disabled, onChange, onKeyDown, onKeyUp, onFocus, onBlur} = props
    return <>
        <div>
        <div className="inline-flex border-b-2 border-gray-300 focus:border-blue-500 h-14 items-center">
            {
                icon && <Image
                    className='m-3'
                    width={24}
                    height={24}
                    src={icon}
                    alt="icon"
                />
            }
            <div className="flex flex-col h-10">
                <label className="text-gray-500 text-xs">{label}</label>
                <BaseTextInput
                    className='text-base'
                    ref={ref}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    />
            </div>
            {
                cancelButton && <Image
                    className='m-3'
                    width={24}
                    height={24}
                    src={cancelIcon}
                    alt="cancelIcon"
                />
            }
        </div>
            {helperText && <div className="text-xs text-gray-500 ml-4 mt-1">{helperText}</div>}
        </div>
    </>
}
