import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt } from "./utils/common";
import { CategoriesCreate, SettingUpdate } from "./interfaces/setting";

export const getSetting = async (key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return await response.json();
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
    return await response.json();
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
    return await response.json();
};

