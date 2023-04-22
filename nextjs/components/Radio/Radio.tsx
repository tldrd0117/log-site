import React from "react";
import '@djthoms/pretty-checkbox';
import { BaseRadio, BaseRadioProps } from "./BaseRadio";

export interface RadioProps extends BaseRadioProps{
}

export const Radio = (props: RadioProps) => {
    return (
        <>
            <BaseRadio {...props} 
            
            />
        </>
    );
};