import { getPublicKey } from "../api/auth"
import { getEncPublicKey } from "../security/enc"
import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "./common/queryKeys"


export const prefetchEncPublicKey = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.AUTH.ENC_PUBLIC_KEY], async () => {
        const publicKey = await getPublicKey()
        return publicKey
    })
}

export default QUERY_KEYS
