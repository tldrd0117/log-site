import React from "react";
import { BaseCheckBoxProps, BaseCheckBox } from "./BaseCheckBox";
import '@djthoms/pretty-checkbox';
import {DoneIcon} from '../Icon/DoneIcon'

export interface CheckBoxProps extends BaseCheckBoxProps{
}

export const CheckBox = (props: CheckBoxProps) => {
    return (
        <>
            <BaseCheckBox {...props}
                icon={<DoneIcon className="icon" width={18} height={18}/>}
                hasFocus={true}
            />
        </>
    );
};