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
    }
    const handleOnBlur = () => {
    }
    const handleOnItemClick = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onItemClick && onItemClick(itemData, e)
        setIsSelect(false)
        setSelected(itemData)
        onItemSelect && onItemSelect(itemData, e)
    }
    return <>
        <TextInput rightIcon={<DropdownIcon/>} readOnly placeholder="select" {...inputProps} 
            value={selected?.value}
            onClick={handleOnFocus} onBlur={handleOnBlur}/>
        <ContextMenu selected={selected} {...contextMenuProps} hide={!isSelect} onItemClick={handleOnItemClick}/>
    </>
};