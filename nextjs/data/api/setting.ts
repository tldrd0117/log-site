import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt, makeStringErrorByResponse } from "./utils/common";
import { CategoriesCreate, SettingCreate, SettingUpdate } from "./interfaces/setting";

export const getSetting = async (key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await response.json();
    console.log("getSetting", res)
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const putSetting = async (obj: SettingUpdate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting`, {
        method: "PUT",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const addCategories = async (obj: CategoriesCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/addCategories`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const addSetting = async (obj: SettingCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

