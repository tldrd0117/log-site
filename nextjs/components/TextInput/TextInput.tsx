import React, { useState } from 'react'
import { BaseTextInputProps, BaseTextInput } from './BaseTextInput'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconElement } from '../Icon/BaseIcon'
import { CancelIcon } from '../Icon/CancelIcon'

export interface TextInputProps extends BaseTextInputProps{
    icon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLImageElement>
}

export const TextInput = (props: TextInputProps) => {
    const {icon, cancelButton, ref, value, className, placeholder, disabled, 
        onChange, onKeyDown, onKeyUp, onFocus, onBlur, onCancel} = props
    return <>
        <div>
            <div className="absolute rounded-lg bg-slate-200">
                <span className='absolute left-0 m-2'>{ icon }</span>
                <BaseTextInput
                    className={clsx(['text-base', 'rounded-lg', 'bg-transparent', 'focus:outline-none', 'focus:ring', 
                        'focus:border-blue-500', 'h-10', {'pl-10': icon}, {'pl-4': !icon}, {'pr-8': cancelButton}, {'pr-4': !cancelButton}])}
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
                {
                    cancelButton && <span onClick={onCancel} className='absolute right-0 m-2'><CancelIcon/></span>
                }
            </div>
        </div>
    </>
}
