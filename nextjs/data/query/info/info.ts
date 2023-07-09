import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../common/queryKeys"
import { getTypes } from "@/data/api/info"
import { useSetRecoilState } from "recoil"
import { roleTypeMapState, settingTypeMapState } from "@/data/recoil/states/user"
import { BasicTypes } from "@/data/api/interfaces/common"

export const useTypes = () => {
    const setSettingTypeMap = useSetRecoilState(settingTypeMapState)
    const setRoleTypeMap = useSetRecoilState(roleTypeMapState)
    return useQuery([QUERY_KEYS.INFO.TYPE], async () => {
        let value = await getTypes()
        let settingTypeMap: any = {
            name: {},
            _id: {},
        }, roleTypeMap: any = {
            name: {},
            _id: {},
        }
        value.settingTypes.forEach((type: BasicTypes) => {
            settingTypeMap.name[type.name] = type._id
        })
        value.roleTypes.forEach((type: BasicTypes) => {
            roleTypeMap.name[type.name] = type._id
        })
        value.settingTypes.forEach((type: BasicTypes) => {
            settingTypeMap._id[type._id] = type.name
        })
        value.roleTypes.forEach((type: BasicTypes) => {
            roleTypeMap._id[type._id] = type.name
        })
        setSettingTypeMap(settingTypeMap)
        setRoleTypeMap(roleTypeMap)
        return value
    })
}