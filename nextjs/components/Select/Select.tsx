import clsx from "clsx";
import React, { useEffect, useState, FocusEvent, useRef, ChangeEvent} from "react";
import { TextInput } from "../Input/TextInput";
import { ContextMenu, ContextMenuProps, ListItemData } from "../ContextMenu/ContextMenu";
import { BorderBox } from "../Box/BorderBox";
import { TextInputProps } from "../Input/TextInput";
import { DropdownIcon } from "../Icon/DropdownIcon";
import { useFormik } from "formik";

export interface SelectProps extends ContextMenuProps{
    inputProps?: TextInputProps
    contextMenuProps?: ContextMenuProps
    onItemSelect?: (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    selected?: ListItemData
}

export const Select = (props: SelectProps) => {
    const {onItemClick, contextMenuProps, inputProps, onItemSelect} = props
    const [isSelect, setIsSelect] = useState(false)
    const [selected, setSelected] = useState<ListItemData>({id:"",value: ""})
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        setSelected(props.selected || {id:"",value: ""})
    },[])
    const handleOnFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        setIsSelect(true)
        console.log("focus")
        inputProps?.onFocus && inputProps.onFocus(e)
    }
    const handleOnBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        setIsSelect(false)
        console.log("blur")
        inputProps?.onBlur && inputProps.onBlur(e)
    }
    const handleOnItemClick = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log(itemData)
        onItemClick && onItemClick(itemData, e)
        setIsSelect(false)
        setSelected(itemData)
        onItemSelect && onItemSelect(itemData, e)
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputProps?.onChange && inputProps.onChange(e)
    }
    return <>
        <TextInput className="cursor-pointer" ref={inputRef} rightIcon={<DropdownIcon/>} readOnly placeholder="select" {...inputProps} 
            onFocus={handleOnFocus} onBlur={handleOnBlur} onChange={handleOnChange}
            value={selected?.value}/>
        <ContextMenu selected={selected} {...contextMenuProps} hide={!isSelect} onItemClick={handleOnItemClick}/>
    </>
};