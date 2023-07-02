import { atom } from "recoil";
import { persistAtom } from "./persist";

const ATOM_KEYS = {
    TOKEN: "token",
    USER_INFO: "userInfo"
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