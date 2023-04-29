import clsx from "clsx";
import { BorderBox } from "@/components/Box/BorderBox";
import React from "react";
import { Text } from "@/components/Text/Text";
import { PrimaryButton } from "../Button/PrimaryButton";

export interface AppBarProps{
    title: string
    login: boolean
    account: boolean
    join: boolean

}

export const AppBar = (props: AppBarProps) => {
    const {title, login, account, join} = props
    return <>
        <BorderBox className={clsx(["p-4", "flex", "justify-between"])}>
            <div className="place-self-center">
                <Text h5 className="italic font-bold">{title}</Text>
            </div>
            <div className="place-self-center">
                <PrimaryButton className={"ml-2"} label="로그인"/>
                <PrimaryButton className={"ml-2"} label="정보수정"/>
                <PrimaryButton className={"ml-2"} label="회원가입"/>
            </div>
        </BorderBox>
    </>
}