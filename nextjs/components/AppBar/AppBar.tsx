import clsx from "clsx";
import { BorderBox } from "@/components/Box/BorderBox";
import React from "react";
import { Text } from "@/components/Text/Text";
import { PrimaryButton } from "../Button/PrimaryButton";
import { useRouter } from "next/navigation";

export interface AppBarProps{
    title: string
    login: boolean
    account: boolean
    join: boolean

}

export const AppBar = (props: AppBarProps) => {
    const {title, login, account, join} = props
    const router = useRouter()
    return <>
        <BorderBox className={clsx(["p-4", "flex", "justify-between"])}>
            <div className="place-self-center">
                <Text h5 className="italic font-bold">{title}</Text>
            </div>
            <div className="place-self-center">
                <PrimaryButton onClick={() => router.push("user/login")} isShow={login} className={"ml-2"} label="로그인"/>
                <PrimaryButton isShow={account} className={"ml-2"} label="정보수정"/>
                <PrimaryButton onClick={() => router.push("user/join")} isShow={join} className={"ml-2"} label="회원가입"/>
            </div>
        </BorderBox>
    </>
}