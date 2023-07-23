import React from "react";
import { Card, CardContentsProps, CardProps } from "../Card/Card";
import { CompContainer } from "@/containers/container/CompContainer";
import { ListItem } from "./ListItem";

interface CardListItemProps extends CardProps{
}

export const CardListItem = (props: CardListItemProps) => {
    return <>
        <li>
            <Card {...props} className={"list-none"}/>
        </li>
        {/* <ListItem {...props} tagtype={Card} className="list-none"/> */}
    </>
}