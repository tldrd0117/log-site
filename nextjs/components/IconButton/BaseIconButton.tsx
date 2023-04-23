import React, { MouseEventHandler } from "react";
import { IconElement } from "../Icon/BaseIcon";
import clsx from "clsx";

export interface BaseIconButtonProps{
    icon: IconElement
    className?: string
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const BaseIconButton = (props: BaseIconButtonProps) => {
    const {className, onClick, icon, disabled} = props
    return (
        <>
            <button onClick={onClick} className={clsx(["disabled:opacity-50",className])} disabled={disabled}>
                {icon}
            </button>
        </>
    );
};