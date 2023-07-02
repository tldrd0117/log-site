'use client'
import clsx from "clsx";
import { BorderBox } from "@/components/Box/BorderBox";
import React, { useEffect } from "react";
import { Text } from "@/components/Text/Text";
import { PrimaryButton } from "../Button/PrimaryButton";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LOGIN_STATE, useLoginState } from "@/data/query/user";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { tokenState, userInfoState } from "@/data/recoil/user";

export interface AppBarProps{
    title: string

}

export const AppBar = (props: AppBarProps) => {
    const {title} = props
    // const {data: loginState} = useLoginState()
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const token = useRecoilValue(tokenState)
    const resetToken = useResetRecoilState(tokenState)
    const resetUserInfo = useResetRecoilState(userInfoState)
    const handleLogout = () => {
        console.log("logout")
        resetToken()
        resetUserInfo()
        setTimeout(() => {
            console.log("appbar replace")
            queryClient.clear()
            router.replace("/")
        }, 0);
    }

    const handleClickTitle = () => {
        router.push("/")
    }

    const isLogin = token !== ""

    return <>
        <BorderBox className={clsx(["p-4", "flex", "justify-between"])}>
            <div className="place-self-center cursor-pointer" onClick={handleClickTitle}>
                <Text h5 className="italic font-bold">{title}</Text>
            </div>
            <div className="place-self-center">
                <PrimaryButton isShow={!isLogin} onClick={() => router.push(`user/login?redirect=${pathname}`)} className={"ml-2"} label="로그인"/>
                <PrimaryButton isShow={isLogin} className={"ml-2"} label="정보수정"/>
                <PrimaryButton isShow={isLogin} onClick={() => handleLogout()} className={"ml-2"} label="로그아웃"/>
                <PrimaryButton isShow={!isLogin} onClick={() => router.push(`user/join?redirect=${pathname}`)} className={"ml-2"} label="회원가입"/>
                <PrimaryButton isShow={isLogin} onClick={() => router.push(`user/setting`)} className={"ml-2"} label="설정"/>
            </div>
        </BorderBox>
    </>
}