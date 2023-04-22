import React, { FC, ReactElement } from 'react'
import Image, {StaticImageData} from 'next/image'
import clsx from 'clsx';

export interface BaseIconProps {
    children?: React.SVGProps<SVGSVGElement>;
}

export interface IconProps{
    width?: number;
    height?: number;
    fillColor?: string;
    className?: string
}

export interface IconElement extends ReactElement<IconProps>{
}

export const BaseIcon = (props: BaseIconProps) => {
    return <>
        {props.children}
    </>
};