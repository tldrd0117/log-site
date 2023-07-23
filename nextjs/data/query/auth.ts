import { getPublicKey } from "../api/auth"
import { getEncPublicKey } from "../security/enc"
import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "./common/constants"
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"
import { KeyLike } from "jose"


export const prefetchPublicKey = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.AUTH.PUBLIC_KEY], async () => {
        const publicKey = await getPublicKey()
        return await getEncPublicKey(publicKey)
    })
}

export const useEncPubicKey = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.AUTH.PUBLIC_KEY],
        queryFn: async () => {
            const publicKey = await getPublicKey()
            const enc = await getEncPublicKey(publicKey)
            return enc;
        },
    })
}

export default QUERY_KEYS
