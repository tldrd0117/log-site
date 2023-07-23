import { KeyLike } from "jose";
import { PostCreate, PostDelete, PostGet, PostGetList, PostSearchList, PostUpdate } from "./interfaces/post";
import { BASE_URL, encrypt, makeQueryString } from "./utils/common";

export const getPostList = async (queryStringObj: PostGetList) => {
    const queryString = makeQueryString<PostGetList>(queryStringObj);
    const response = await fetch(`${BASE_URL}/post/list?${queryString}`);
    return await response.json();
};

export const createPost = async (requestObj: PostCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/post/`, {
        method: "POST",
        body: await encrypt(requestObj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return await response.json();
};

export const deletePost = async (obj: PostDelete, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/post/`, {
        method: "DELETE",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

    });
    return await response.json();
};

export const deletePostList = async (arr: Array<PostDelete>, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/post/list`, {
        method: "DELETE",
        body: await encrypt(arr, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

    });
    return await response.json();
};


export const getPost = async (obj: PostGet) => {
    const queryString = makeQueryString<PostGet>(obj);
    const response = await fetch(`${BASE_URL}/post?${queryString}`);
    return await response.json();
};

export const updatePost = async (obj: PostUpdate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/post`, {
        method: "PUT",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return await response.json();
};

export const searchPosts = async (obj: PostSearchList) => {
    const queryString = makeQueryString<PostSearchList>(obj);
    const response = await fetch(`${BASE_URL}/post/list/search?${queryString}`);
    return await response.json();
};