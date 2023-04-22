import React from "react";
import { clsx } from "clsx";
import Image from 'next/image'

export interface BaseImageProps {
    className?: string;
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const BaseImage = (props: BaseImageProps) => {
    const { className, src, alt, width, height } = props;
    return (
        <>
            <Image
                className={clsx([className])}
                width={width}
                height={height}
                src={src}
                alt={alt}
            />
        </>
    );
};