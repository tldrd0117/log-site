import { MutationFunction, QueryClient, UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { loginUser, registerUser } from "../api/user"
import { JWK, JWTPayload, KeyLike, importJWK } from "jose"
import { encPassword, getEncPublicKey, getLoginInfo } from "../security/enc"
import { UserJoin, UserLogin } from "../api/interfaces/user"
import { makeStringErrorByResponse } from "../api/utils/common"
import { useRouter, useSearchParams } from "next/navigation"
import { QUERY_KEYS } from "./common/queryKeys"


export const login = async (queryClient: QueryClient, data: UserLogin) => {
    const jwk = queryClient.getQueryData([QUERY_KEYS.AUTH.ENC_PUBLIC_KEY])
    const encPwd = encPassword(data.password)
    const encPublicKey: KeyLike = await getEncPublicKey(jwk)
    const res = await loginUser({
        email: data.email, password: encPwd
    }, encPublicKey)
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
}

export const useLoginMutation = () => {
    console.log("useLoginMutation")
    const queryClient = useQueryClient()
    const router = useRouter()
    const params = useSearchParams()
    return useMutation<any, Error, UserLogin, any>({
        mutationFn: (data) => login(queryClient, data),
        onError: (error) => {
            console.log("error", error)
        },
        onSettled: () => {
            console.log("onSettled")
        },
        onSuccess: async (data) => {
            console.log("onSuccess")
            const userInfo: JWTPayload = getLoginInfo(data.token);
            queryClient.setQueryData([QUERY_KEYS.USER.TOKEN], data.token)
            queryClient.setQueryData([QUERY_KEYS.USER.INFO], userInfo)
            queryClient.setQueryData([QUERY_KEYS.USER.LOGIN_STATE], LOGIN_STATE.LOGIN)
            console.log("success",queryClient.getQueryData([QUERY_KEYS.USER.LOGIN_STATE]))
            const redirectUrl = params.get("redirect")
            console.log("redirectUrl", redirectUrl)
            if(redirectUrl && redirectUrl.length){
                router.push(redirectUrl)
            } else {
                router.replace("/")
            }
        },
    })
}

export const useLoginInfo = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.INFO]
    })
}

export const LOGIN_STATE = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

export const useLoginState = () : UseQueryResult<string, unknown> => {
    const queryClient = useQueryClient()
    return useQuery([QUERY_KEYS.USER.LOGIN_STATE], () => {
        console.log("running", "useLoginState")
        const token = queryClient.getQueryData([QUERY_KEYS.USER.TOKEN])
        if(token) return LOGIN_STATE.LOGIN
        return LOGIN_STATE.LOGOUT
    }, {
        initialData: LOGIN_STATE.LOGOUT
    })
}

export const join = async (queryClient: QueryClient, data: UserJoin) => {
    const jwk = queryClient.getQueryData([QUERY_KEYS.AUTH.ENC_PUBLIC_KEY])
    const encPwd = encPassword(data.password)
    const encPublicKey: KeyLike = await getEncPublicKey(jwk)
    const res = await registerUser({
        name: data.name, email: data.email, password: encPwd
    }, encPublicKey)
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
}

export const useJoinMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<any, Error, UserJoin, any>({
        mutationFn: (data) => join(queryClient, data),
        onError: (error) => {
            console.log("error", error)
        },
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_KEYS.USER.TOKEN], data.token)
            router.push("/")
        }
    })
}