import React from "react";
import { Card, CardContentsProps, CardProps } from "../Card/Card";
import { CompContainer } from "@/containers/container/CompContainer";
import { ListItem } from "./ListItem";


export const CardListItem = (props: CardProps) => {
    return <>
        <ListItem {...props} tagType={Card} className="list-none" />
    </>
}