import { atom } from "recoil";
import { persistAtom } from "../persist";

const ATOM_KEYS = {
    TOKEN: "token",
    USER_INFO: "userInfo",
    SETTING_TYPES: "settingTypes",
    ROLE_TYPES: "roleTypes",
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