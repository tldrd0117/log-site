import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth"
import { addCategories, addSetting, deleteSettings, getCategories, getSettingList, putSettingList } from "../../api/setting"
import { CategoriesCreate, SettingCreate, SettingUpdateList, SettingsDelete } from "../../api/interfaces/setting"
import { useRecoilState, useRecoilValue } from "recoil"
import { settingTypeMapState, tokenState } from "../../recoil/states/user"
import _ from "lodash"
import { use } from "react"
import { PaginationState } from "@tanstack/react-table"

export const useSettingList = (fetchDataOptions: PaginationState) => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useQuery({
        queryKey: [QUERY_KEYS.SETTING.LIST, fetchDataOptions],
        queryFn: async () => {
            const items = await getSettingList({ limit: fetchDataOptions.pageSize, 
                offset: fetchDataOptions.pageSize * fetchDataOptions.pageIndex }, encPublicKey!!, token!!)
            return items
        },
    })
}


export const useCategories = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.SETTING.CATEGORIES],
        queryFn: async () => {
            const categories  = await getCategories()
            const map: {[key: string]: string} = {}
            categories.list.forEach((item: any) => {
                map[item._id] = item.value
            })
            return {
                map, list: categories.list
            }
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

export const useDeleteSettingsMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useMutation({
        mutationFn: async (data: SettingsDelete) => {
            return await deleteSettings(data, encPublicKey!!, token!!)
        }
    })
}

export const useUpdateSettingListMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useMutation({
        mutationFn: async (data: SettingUpdateList) => {
            return await putSettingList(data, encPublicKey!!, token!!)
        }
    })
}