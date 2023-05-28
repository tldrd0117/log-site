import { PostCreate, PostDelete, PostGet, PostGetList, PostSearchList, PostUpdate } from "./interfaces/post";
import { BASE_URL, makeQueryString } from "./utils/common";

export const getPostList = async (queryStringObj: PostGetList) => {
    const queryString = makeQueryString<PostGetList>(queryStringObj);
    const response = await fetch(`${BASE_URL}/post/list?${queryString}`);
    return await response.json();
};

export const createPost = async (requestObj: PostCreate) => {
    const response = await fetch(`${BASE_URL}/post/`, {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
};

export const deletePost = async (obj: PostDelete) => {
    const response = await fetch(`${BASE_URL}/post/`, {
        method: "DELETE",
        body: JSON.stringify(obj),
    });
    return await response.json();
};

export const getPost = async (obj: PostGet) => {
    const queryString = makeQueryString<PostGet>(obj);
    const response = await fetch(`${BASE_URL}/post?${queryString}`);
    return await response.json();
};

export const updatePost = async (obj: PostUpdate) => {
    const response = await fetch(`${BASE_URL}/post`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
};

export const searchPosts = async (obj: PostSearchList) => {
    const queryString = makeQueryString<PostSearchList>(obj);
    const response = await fetch(`${BASE_URL}/post/list/search?${queryString}`);
    return await response.json();
};