import { atom } from "recoil";
import { persistAtom } from "../persist";

const ATOM_KEYS = {
    TOKEN: "token",
    USER_INFO: "userInfo",
    SETTING_TYPES: "settingTypes",
    ROLE_TYPES: "roleTypes",
    SETTING_TYPE_SELECT_LIST: "settingTypeSelectList",
    ROLE_TYPE_SELECT_LIST: "roleTypeSelectList",
}

export const tokenState = atom({
    key: ATOM_KEYS.TOKEN,
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const userInfoState = atom({
    key: ATOM_KEYS.USER_INFO,
    default: {},
    effects_UNSTABLE: [persistAtom],
})

export const settingTypeMapState = atom({
    key: ATOM_KEYS.SETTING_TYPES,
    default: {},
    effects_UNSTABLE: [persistAtom],
    
})

export const roleTypeMapState = atom({
    key: ATOM_KEYS.ROLE_TYPES,
    default: {},
    effects_UNSTABLE: [persistAtom],
})

export const settingTypeSelectList = atom({
    key: ATOM_KEYS.SETTING_TYPE_SELECT_LIST,
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const roleTypeSelectList = atom({
    key: ATOM_KEYS.ROLE_TYPE_SELECT_LIST,
    default: [],
    effects_UNSTABLE: [persistAtom],
})