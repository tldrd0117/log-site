import React from "react";
import { Switch, SwitchProps } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export interface BaseToggleProps extends SwitchProps{
}

export const BaseToggle = (props: BaseToggleProps) => {
    return (
        <>
            <Switch {...props} 
                
            />
        </>
    );
};