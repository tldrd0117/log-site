import React from "react";
import { Text } from "../Text/Text";
import clsx from "clsx";
import { Image } from "../Image/Image";
import { ImageProps } from "next/image";
import { BaseContainer, BaseContainerProps } from "@/containers/container/BaseContainer";
import { Container, ContainerProps } from "@/containers/container/Container";
import { CardBox } from "../Box/CardBox";

export interface CardContentsProps{
    title?: string
    subTitle?: string
    summary?: string
    image?: ImageProps
    size?: 'sm' | 'md' | 'lg'
}

export interface CardProps extends Omit<ContainerProps, "children">, CardContentsProps{
}

export const Card = (props: CardProps) => {
    const {className, title, subTitle, summary, image} = props
    const containerProps: Omit<ContainerProps, "children"> = props
    let {size} = props
    if(!size) size = "md"
    switch(size){
        case "sm":
            return <Container {...containerProps} tagType={CardBox}
                    className={clsx(["w-64", "p-0", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-36 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-64 p-4">
                        <Text h6 className={clsx(["pb-1", "line-clamp-2"])}>{title}</Text>
                        <Text p className="pb-2 truncate">{subTitle}</Text>
                        <Text span className="line-clamp-5">{summary}</Text>
                    </div>
                </Container>
        case "md":
            return <Container {...containerProps} tagType={CardBox}
                    className={clsx(["w-72", "flex-initial", "p-0", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-44 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-72 p-5">
                        <Text h5 className="pb-1.5 line-clamp-2">{title}</Text>
                        <Text h6 className="pb-3 truncate">{subTitle}</Text>
                        <Text p className="line-clamp-5">{summary}</Text>
                    </div>
                </Container>
        case "lg":
            return <Container {...containerProps} tagType={CardBox}
                    className={clsx(["w-96", "p-0", "grow", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-64 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-96 p-6">
                        <Text h4 className="pb-2 line-clamp-2">{title}</Text>
                        <Text h6 className="pb-4 truncate">{subTitle}</Text>
                        <Text p className="line-clamp-5">{summary}</Text>
                    </div>
                </Container>
    }
};