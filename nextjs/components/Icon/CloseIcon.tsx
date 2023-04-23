import React from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const CloseIcon = (props: IconProps) => {
    const { width = 24, height = 24, fillColor = "black" } = props;
    return <BaseIcon>
        <svg data-testid={"close-icon"} xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 96 960 960" width={width}>
            <path fill={fillColor} d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    </BaseIcon>
};