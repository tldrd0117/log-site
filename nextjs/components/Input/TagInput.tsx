import React, { SyntheticEvent, useRef, useState } from 'react'
import { BaseInputProps, BaseInput } from './BaseInput'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconElement } from '../Icon/BaseIcon'
import { CancelIcon } from '../Icon/CancelIcon'
import { IconButton } from '../IconButton/IconButton'
import { Tag } from '../Tag/Tag'
import { KeyboardEvent } from 'react'
import { ChangeEvent } from 'react'
import style from './input.module.scss'
import { read } from 'fs'

export interface TextInputProps extends BaseInputProps{
    icon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
    tagValue?: Array<string>
}

export const TagInput = (props: TextInputProps) => {
    const {icon, cancelButton, value, className, placeholder, disabled, tagValue, readOnly,
        onChange, onKeyDown, onKeyUp, onFocus, onBlur, onCancel} = props
    const [tags, setTags] = useState<Array<string>>(tagValue || [])
    const [inputValue, setInputValue] = useState<string>(value || "")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.nativeEvent.isComposing){
            return;
        }
        if(event.key === "Enter"){
            setTags([...tags, inputValue || ""])
            setInputValue("")
        } else if(event.key === "Backspace"){
            if(inputValue === ""){
                setTags(tags.slice(0, -1))
            }
        }
        onKeyDown && onKeyDown(event)
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        onChange && onChange(event)
    }
    return <>
        <div className={clsx(['relative rounded-lg bg-slate-200 h-auto', className])} onClick={()=>inputRef.current?.focus()}>
            <div className="flex flex-wrap flex-1">
                {
                    tags.map((tag, index) => {
                        return <Tag className='mx-1 my-1 flex-none' key={index}>{tag}</Tag>
                    })
                }
                <div className='w-auto flex items-center flex-auto pl-2'>
                    {
                        icon?<span className='relative inline-block bottom-0 m-2'>{ icon }</span>:null
                    }
                    <span>{inputValue}</span>
                    <div className={clsx(['inline-grid', style.tagInput])}>
                        <BaseInput
                            type="text"
                            className={clsx(['text-base', 'rounded-lg', 
                                'bg-transparent', 'focus:outline-none', "caret-black",
                                'bg-slate-200', "whitespace-pre", 'text-transparent',
                                'focus:border-blue-500', 'h-10', "w-full", "px-0", style.input,
                                ])}
                            ref={inputRef}
                            value={inputValue}
                            disabled={disabled}
                            onChange={handleOnChange}
                            onKeyDown={(e)=>handleKeyDown(e)}
                            onKeyUp={onKeyUp}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            readOnly={readOnly}
                            />
                    </div>
                </div>
                
                {
                    cancelButton && 
                    <IconButton
                        icon={<CancelIcon />}
                        className='relative bottom-0 right-0 m-2'
                        onClick={onCancel}
                    />
                }
            </div>
        </div>
    </>
}
