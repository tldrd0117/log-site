import { KeyLike } from "jose";
import { makeEncObject } from "./cryptoUtils";

export const BASE_URL = "http://localhost:3300";

export type QueryObject<T> = {
    [key in keyof T]: string | number | boolean;
}

export const makeQueryString = <T> (obj: QueryObject<T>) => {
    let result = "";
    for (let key in obj) {
        if (result !== "")
            result += "&";
        result += `${key}=${obj[key]}`;
    }
    return result;
}

export const encrypt = async (obj: any, rsaPublicKey: KeyLike) => {
    return JSON.stringify({
        enc: await makeEncObject(obj, rsaPublicKey)
    })
}