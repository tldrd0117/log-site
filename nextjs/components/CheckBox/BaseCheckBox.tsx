import React from "react";
import { Checkbox, CheckboxProps } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export interface BaseCheckBoxProps extends CheckboxProps{
}

export const BaseCheckBox = (props: BaseCheckBoxProps) => {
    return (
        <>
            <Checkbox {...props} />
        </>
    );
};