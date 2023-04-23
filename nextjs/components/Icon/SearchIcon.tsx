import React from "react";
import { IconProps, BaseIcon } from "./BaseIcon";


export const SearchIcon = (props: IconProps) => {
    const { width = 24, height = 24, fillColor = "black" } = props;
    return <BaseIcon>
        <svg data-testid={"search-icon"} xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 96 960 960" width={width}>
            <path fill={fillColor} d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z"/>
            </svg>
    </BaseIcon>
};