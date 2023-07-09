import { MutationFunction, QueryClient, QueryKey, UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { loginUser, registerUser } from "../api/user"
import { JWK, JWTPayload, KeyLike, importJWK } from "jose"
import { encPassword, getEncPublicKey, getLoginInfo } from "../security/enc"
import { UserJoin, UserLogin } from "../api/interfaces/user"
import { makeStringErrorByResponse } from "../api/utils/common"
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation"
import { QUERY_KEYS } from "./common/queryKeys"
import { RedirectType } from "next/dist/client/components/redirect"
import { useEffect } from "react"
import { useEncPubicKey } from "./auth"
import { useRecoilSnapshot, useRecoilState } from "recoil"
import { tokenState, userInfoState } from "../recoil/states/user"
import _ from "lodash"

export const useLoginMutation = () => {
    const router = useRouter()
    const params = useSearchParams()
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    return useMutation<any, Error, UserLogin, any>({
        mutationFn: async (data) => {
            data.password = encPassword(data.password)
            return await loginUser(data, encPublicKey as KeyLike)
        },
        onError: (error) => {
            console.log("error", error)
        },
        onSettled: () => {
            console.log("onSettled")
        },
        onSuccess: async (data) => {
            console.log("onSuccess")
            const userInfo: JWTPayload = getLoginInfo(data.token);
            setToken(data.token)
            setUserInfo(userInfo)
            const redirectUrl = params.get("redirect")
            if(redirectUrl && redirectUrl.length){
                router.push(redirectUrl)
            } else {
                router.replace("/")
            }
        },
    })
}

export const LOGIN_STATE = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

export const useLoginState = () : UseQueryResult<string, unknown> => {
    const [token, setToken] = useRecoilState(tokenState)
    return useQuery([QUERY_KEYS.USER.LOGIN_STATE], () => {
        if(token) return LOGIN_STATE.LOGIN
        return LOGIN_STATE.LOGOUT
    })
}

export const useJoinMutation = () => {
    const queryClient = useQueryClient()
    const [token, setToken] = useRecoilState(tokenState)
    const router = useRouter()
    const {data: encPublicKey} = useEncPubicKey()
    return useMutation<any, Error, any, any>({
        mutationFn: async (data) => {
            const newData = _.cloneDeep(data);
            delete newData.passwordConfirm;
            newData.password = encPassword(newData.password)
            return await registerUser(newData, encPublicKey as KeyLike)
        },
        onError: (error) => {
            console.log("error", error)
        },
        onSuccess: (data) => {
            setToken(data.token)
            router.push("/")
        }
    })
}