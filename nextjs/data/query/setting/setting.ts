import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth"
import { addCategories, addSetting, getSetting } from "../../api/setting"
import { CategoriesCreate, SettingCreate } from "../../api/interfaces/setting"
import { useRecoilState, useRecoilValue } from "recoil"
import { settingTypeMapState, tokenState } from "../../recoil/states/user"
import _ from "lodash"

export const useSetting = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useQuery({
        queryKey:[QUERY_KEYS.SETTING.DATA], 
        queryFn: async () => {
            return await getSetting(encPublicKey!!, token!!)
        },
        onError: (error) => {
            console.error(error)
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

export const useAddSettingMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    const settingTypeMap = useRecoilValue(settingTypeMapState)

    return useMutation({
        mutationFn: async (data: SettingCreate) => {
            data = _.cloneDeep(data)
            data.type = settingTypeMap.name[data.type]
            return await addSetting(data, encPublicKey!!, token!!)
        }
    })
}