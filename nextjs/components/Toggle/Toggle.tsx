import React from "react";
import '@djthoms/pretty-checkbox';
import { BaseToggle, BaseToggleProps } from "./BaseToggle";

export interface ToggleProps extends BaseToggleProps{
}

export const Toggle = (props: ToggleProps) => {
    return (
        <>
            <BaseToggle 
            {...props}     
            />
        </>
    );
};