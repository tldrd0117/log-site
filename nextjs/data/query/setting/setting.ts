import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth"
import { addCategories, addSetting, deleteSettings, getCategories, getSettingList } from "../../api/setting"
import { CategoriesCreate, SettingCreate, SettingsDelete } from "../../api/interfaces/setting"
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
            console.log("queryFn", fetchDataOptions)
            return await getSettingList({ limit: fetchDataOptions.pageSize, 
                offset: fetchDataOptions.pageSize * fetchDataOptions.pageIndex }, encPublicKey!!, token!!)
        },
    })
}

export const useSettingListInfinity = (limit: number) => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.POST_LIST, limit],
        queryFn: async ({ pageParam = 0}) => {
            return await getSettingList({ limit: limit, offset: pageParam * limit }, encPublicKey!!, token!!)
        },
        getNextPageParam: (lastPage, allPage) => {
            // DEFAULT_LIMIT * lastPage
            if( allPage.length * limit < lastPage.total)
                return allPage.length + 1
        },
        getPreviousPageParam: (firstPage) => {
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 10,
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.SETTING.CATEGORIES],
        queryFn: async () => {
            return await getCategories()
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