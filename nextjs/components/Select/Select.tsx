import clsx from "clsx";
import React, { MouseEventHandler, ReactNode, use, useEffect, useState } from "react";
import { TextInput } from "../Input/TextInput";
import { ContextMenu, ContextMenuProps, ListItemData } from "../ContextMenu/ContextMenu";
import { BorderBox } from "../Box/BorderBox";
import { TextInputProps } from "../Input/TextInput";
import { DropdownIcon } from "../Icon/DropdownIcon";

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
    useEffect(()=>{
        setSelected(props.selected || {id:"",value: ""})
    },[])
    const handleOnFocus = () => {
        setIsSelect(true)
        console.log("focus")
    }
    const handleOnBlur = () => {
        setIsSelect(false)
        console.log("blur")
    }
    const handleOnItemClick = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log(itemData)
        onItemClick && onItemClick(itemData, e)
        setIsSelect(false)
        setSelected(itemData)
        onItemSelect && onItemSelect(itemData, e)
    }
    return <>
        <TextInput rightIcon={<DropdownIcon/>} readOnly placeholder="select" {...inputProps} 
            onFocus={handleOnFocus} onBlur={handleOnBlur}
            value={selected?.value}/>
        <ContextMenu selected={selected} {...contextMenuProps} hide={!isSelect} onItemClick={handleOnItemClick}/>
    </>
};