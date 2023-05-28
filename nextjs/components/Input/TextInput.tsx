import React, { useState } from 'react'
import { BaseInputProps, BaseInput } from './BaseInput'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconElement } from '../Icon/BaseIcon'
import { CancelIcon } from '../Icon/CancelIcon'
import { IconButton } from '../IconButton/IconButton'
import { StylableInput, StylableInputProps } from './StylableInput'

export interface TextInputProps extends StylableInputProps{
    icon?: IconElement
    rightIcon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}


export const TextInput = (props: TextInputProps) => {
    const {icon, rightIcon, cancelButton, onCancel, ...rest} = props
    return <>
        <StylableInput
            type='text'
            inputClassName={clsx([{ 'pl-10': icon }, { 'pl-4': !icon }, { 'pr-8': cancelButton }, { 'pr-4': !cancelButton }])}
            leftComponent={<div className='absolute m-2'>{icon}</div>}
            rightComponent={<>
                <div className='flex absolute m-2 right-0 bottom-0'>
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
            </>}
            {...rest}
        />
    </>
}
