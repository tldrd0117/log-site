import { getPublicKey } from "../api/auth"
import { getEncPublicKey } from "../security/enc"
import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "./common/queryKeys"
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"
import { KeyLike } from "jose"


export const prefetchPublicKey = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.AUTH.PUBLIC_KEY], async () => {
        return await getPublicKey()
    })
}

export const usePublicKey = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.AUTH.PUBLIC_KEY],
        queryFn: async () => {
            return await getPublicKey()
        }
    })
}

export const useEncPubicKey = () => {
    const {data: publicKey} = usePublicKey()
    return useQuery<any, any, KeyLike, QueryKey>({
        queryKey: [QUERY_KEYS.AUTH.ENC_PUBLIC_KEY],
        queryFn: async () => {
            const encPublicKey = await getEncPublicKey(publicKey)
            return encPublicKey
        }
    })
}

export default QUERY_KEYS
