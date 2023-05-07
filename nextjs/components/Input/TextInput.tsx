import React, { useState } from 'react'
import { BaseInputProps, BaseInput } from './BaseInput'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconElement } from '../Icon/BaseIcon'
import { CancelIcon } from '../Icon/CancelIcon'
import { IconButton } from '../IconButton/IconButton'

export interface TextInputProps extends BaseInputProps{
    icon?: IconElement
    rightIcon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}

export const TextInput = (props: TextInputProps) => {
    const {icon, cancelButton, value, className, placeholder, disabled, readOnly, rightIcon,
        onChange, onKeyDown, onKeyUp, onFocus, onBlur, onCancel, onClick} = props
    return <>
        <div className={clsx(['relative h-10', className])}>
            <div className="absolute rounded-lg bg-slate-200 w-full">
                <span className='absolute left-0 m-2'>{ icon }</span>
                <BaseInput
                    type="text"
                    className={clsx(['text-base', 'rounded-lg', 
                        'bg-transparent', 'focus:outline-none', 'focus:ring', "w-full",
                        'focus:border-blue-500', 'h-10', 
                        {'pl-10': icon}, {'pl-4': !icon}, 
                        {'pr-8': cancelButton}, {'pr-4': !cancelButton}])}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                    />
                <div className='absolute right-0 top-0 m-2 flex pointer-events-none'>
                    {
                        rightIcon
                    }
                    {
                        cancelButton && 
                        <IconButton
                            className='pointer-events-auto'
                            icon={<CancelIcon />}
                            onClick={onCancel}
                        />
                    }
                </div>
            </div>
        </div>
    </>
}
