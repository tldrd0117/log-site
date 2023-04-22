import React, { MouseEventHandler } from "react";
import { IconElement } from "../Icon/BaseIcon";
import clsx from "clsx";

export interface BaseIconButtonProps{
    icon: IconElement
    className: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const BaseIconButton = (props: BaseIconButtonProps) => {
    const {className, onClick, icon} = props
    return (
        <>
            <button  className={clsx([className])}>
                {icon}
            </button>
        </>
    );
};