'use client'
import dynamic from 'next/dynamic'
import { LOGIN_STATE, useLoginState } from "@/data/query/user";
import { tokenState } from "@/data/recoil/states/user";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export default function LoginRequired ({ children }: { children: React.ReactNode }) {
    // const {data: loginState, isLoading} = useLoginState()
    const pathname = usePathname()
    const router = useRouter()
    const [token, setToken] = useRecoilState(tokenState)
    const isLogin = token !== ""
    if(!isLogin){
        redirect(`/user/login?redirect=${pathname}`)
    }
    return <>
        {isLogin? children: null}
    </>
}