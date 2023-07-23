
import React from "react";
import { Text } from "../Text/Text";
import clsx from "clsx";
import { Image } from "../Image/Image";
import { ImageProps } from "next/image";
import { BaseContainer, BaseContainerProps } from "@/containers/container/BaseContainer";
import { Container, ContainerProps } from "@/containers/container/Container";
import { CardBox } from "../Box/CardBox";
import { formatDistanceToNow } from "date-fns";
import { ko } from 'date-fns/locale'
import { Tag } from "../Tag/Tag";
import { TagInput } from "../Input/TagInput";
import { INPUT_STYLE_TYPE } from "../Input/StylableInput";

export interface CardContentsProps{
    title: string
    subTitle?: string
    date?: Date
    summary?: string
    author?: string
    image?: ImageProps
    tags?: Array<string>
    size?: 'sm' | 'md' | 'lg'
}

export interface CardProps extends Omit<ContainerProps, "children">, CardContentsProps{
}

export const Card = (props: CardProps) => {
    const {className, title, subTitle, summary, image, date, tags, author} = props
    const containerProps: Omit<ContainerProps, "children"> = props
    let {size} = props
    if(!size) size = "md"
    switch(size){
        case "sm":
            return <Container {...containerProps} tagtype={CardBox}
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
                        {
                            subTitle? <Text p className="pb-3 truncate">{subTitle}</Text>: null
                        }
                        {
                            date? <Text span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Text>: null
                        }
                        <Text span className="line-clamp-5">{summary}</Text>
                    </div>
                </Container>
        case "md":
            return <Container {...containerProps} tagtype={CardBox}
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
                        {
                            subTitle? <Text h6 className="pb-3 truncate">{subTitle}</Text>: null
                        }
                        {
                            date? <Text span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Text>: null
                        }
                        {
                            author? <Text span className="pb-3">{author}</Text>: null
                        }
                        <Text p className="line-clamp-5">{summary}</Text>
                        {
                            tags? 
                            <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="bg-transparent" tagValue={tags} readOnly/>: null
                        }
                    </div>
                </Container>
        case "lg":
            return <Container {...containerProps} tagtype={CardBox}
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
                        {
                            subTitle? <Text h6 className="pb-3 truncate">{subTitle}</Text>: null
                        }
                        {
                            date? <Text span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Text>: null
                        }
                        <Text p className="line-clamp-5">{summary}</Text>
                    </div>
                </Container>
    }
};