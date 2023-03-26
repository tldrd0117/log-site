import { Types } from "mongoose";

export interface PostCreate{
    authorId: Types.ObjectId
    authorName: string;
    summary: string;
    text: string;
    parent?: Types.ObjectId;
    relatedPosts?: Array<Types.ObjectId>;
    order?: number
}

export interface PostUpdate{
    _id: Types.ObjectId
    authorId: Types.ObjectId
    authorName: string;
    summary: string;
    text: string;
    parent?: Types.ObjectId;
    relatedPosts?: Array<Types.ObjectId>;
    order?: number
}