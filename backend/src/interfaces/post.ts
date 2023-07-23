import { Types } from "mongoose";
import { IPost } from "../models/post.model";

export interface PostCreate{
    author: Types.ObjectId
    authorName: string;
    summary: string;
    category: string;
    title: string;
    text: string;
    parent?: Types.ObjectId;
    relatedPosts?: Array<Types.ObjectId>;
    tags?: Array<Types.ObjectId>;
    order?: number
}

export interface PostUpdate{
    _id: Types.ObjectId
    author?: Types.ObjectId
    authorName?: string;
    summary?: string;
    category?: string;
    title?: string;
    text: string;
    parent?: Types.ObjectId;
    relatedPosts?: Array<Types.ObjectId>;
    tags?: Array<Types.ObjectId>;
    order?: number
}

export interface PostGetList{
    limit: number;
    offset: number;
}

export interface PostSearchList extends PostGetList{
    word: string;
}

export interface PostList{
    list: Array<IPost>
    total: number
}

export interface PostGet{
    _id: string;
}

export interface PostDelete{
    _id: string;
}