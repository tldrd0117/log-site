import React from "react";
import { Radio, RadioProps } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export interface BaseRadioProps extends RadioProps{
}

export const BaseRadio = (props: BaseRadioProps) => {
    return (
        <>
            <Radio {...props} />
        </>
    );
};