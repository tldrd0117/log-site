import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth"
import { addCategories, getSetting } from "../../api/setting"
import { CategoriesCreate } from "../../api/interfaces/setting"
import { useRecoilState } from "recoil"
import { tokenState } from "../../recoil/user"

export const useSetting = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useQuery({
        queryKey:[QUERY_KEYS.SETTING.DATA], 
        queryFn: async () => {
            return await getSetting(encPublicKey!!, token!!)
        }
    })
}

export const useAddCatetoriesMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    useMutation({
        mutationFn: async (data: CategoriesCreate) => {
            return await addCategories(data, encPublicKey!!, token!!)
        }
    })
}