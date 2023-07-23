import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt, makeStringErrorByResponse } from "./utils/common";
import { Visit } from "./interfaces/visit";

export const addVisit = async (obj: Visit, key: KeyLike) => {
    const response = await fetch(`${BASE_URL}/visit/`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const getVisit = async (target: string) => {
    const response = await fetch(`${BASE_URL}/visit/?target=${target}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json()
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        console.error(errorStr)
        throw new Error(errorStr)
    }
    return res;
};