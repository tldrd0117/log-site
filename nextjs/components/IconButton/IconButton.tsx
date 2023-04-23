import React, { MouseEventHandler } from "react";
import { BaseIconButton, BaseIconButtonProps } from "./BaseIconButton";

export interface IconButtonProps extends BaseIconButtonProps{
}

export const IconButton = (props: IconButtonProps) => {
    const {className, onClick, icon, disabled} = props
    return (
        <>
            <BaseIconButton
                className={className}
                icon={icon}
                onClick={onClick}
                disabled={disabled}
            />
        </>
    );
};