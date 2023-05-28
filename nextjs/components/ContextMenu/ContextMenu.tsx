import { BaseContainer } from "@/containers/container/BaseContainer";
import { BaseContainerProps } from "@/containers/container/BaseContainer";
import clsx from "clsx";
import React from "react";
import { FlexList } from "../List/FlexList";
import { ListItem, ListItemProps } from "../ListItem/ListItem";
import { FlexListProps } from "../List/FlexList";
import { Container, ContainerProps } from "@/containers/container/Container";
import _ from "lodash";

export interface ListItemData{
    id: string
    value: string
}

export interface ContextMenuProps extends ContainerProps{
    listProps?: FlexListProps
    firstListItemProps?: ListItemProps
    lastListItemProps?: ListItemProps
    listItemProps?: ListItemProps
    listItemsData?: Array<ListItemData>
    selected?: ListItemData
    onItemClick?: (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export const ContextMenu = (props: ContextMenuProps) => {
    const {children, hide, className, listItemsData, listItemProps, listProps, onItemClick, firstListItemProps, lastListItemProps} = props
    const {className: listClassName} = listProps || {}
    const handleOnItemClick = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onItemClick && onItemClick(itemData, e)
    }
    return <>
        <Container {...props} className={clsx(["absolute", "z-10", className])}>
            <FlexList className={clsx(['gap-0', listClassName])}>
                {
                    listItemsData?.map((item, index) => {
                        const isSelected = item.id === props.selected?.id
                        let itemProps:any = listItemProps
                        let listItemClassName:any = listItemProps?.className
                        if(index === 0){
                            itemProps = firstListItemProps
                            listItemClassName += ` ${firstListItemProps?.className||""}`
                        } else if(index === listItemsData.length - 1){
                            itemProps = lastListItemProps
                            listItemClassName += ` ${lastListItemProps?.className||""}`
                        } 
                        return <ListItem {...itemProps} 
                            onMouseDown={(e: React.MouseEvent<HTMLLIElement, MouseEvent>)=>handleOnItemClick(item, e)} 
                            className={clsx(["w-full", "hover:bg-violet-300", "p-2", {"bg-slate-400":isSelected},
                            listItemClassName])} key={item.id}>{item.value}</ListItem>
                    })
                }
            </FlexList>
        </Container>
    </>
};