import clsx from "clsx";
import { BorderBox } from "@/components/Box/BorderBox";
import React from "react";
import { Text } from "@/components/Text/Text";
import { PrimaryButton } from "../Button/PrimaryButton";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LOGIN_STATE, useLoginState } from "@/data/hooks/user";

export interface AppBarProps{
    title: string

}

export const AppBar = (props: AppBarProps) => {
    const {title} = props
    const {data: loginState} = useLoginState()

    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const handleLogout = () => {
        queryClient.clear()
        router.refresh()
    }
    const isLogin = loginState === LOGIN_STATE.LOGIN

    return <>
        <BorderBox className={clsx(["p-4", "flex", "justify-between"])}>
            <div className="place-self-center">
                <Text h5 className="italic font-bold">{title}</Text>
            </div>
            <div className="place-self-center">
                <PrimaryButton isShow={!isLogin} onClick={() => router.push(`user/login?redirect=${pathname}`)} className={"ml-2"} label="로그인"/>
                <PrimaryButton isShow={isLogin} className={"ml-2"} label="정보수정"/>
                <PrimaryButton  isShow={isLogin} onClick={() => handleLogout()} className={"ml-2"} label="로그아웃"/>
                <PrimaryButton  isShow={!isLogin} onClick={() => router.push(`user/join?redirect=${pathname}`)} className={"ml-2"} label="회원가입"/>
            </div>
        </BorderBox>
    </>
}