import { Types } from "mongoose"
import { PostCreate, PostUpdate } from "../interfaces/post"
import Post, { IPost } from "../models/post.model"
import * as mongodb from 'mongodb';
import userService from "./user.service";

const getPost = async (postId: string) => {
    return await Post.findOne({_id: postId}).populate({
        path: 'author',
        select: '_id name'
    })
}

const getList = async (limit: number, offset: number) => {
    return await Post.find().limit(limit).skip(offset).sort({order: 1}).populate({
        path: 'author',
        select: '_id name'
    })
}

const searchList = async (limit: number, offset: number, word: string) => {
    return await Post.find({
        $or: [
            {authorName: {$regex: word, $options: 'i'}},
            {text: {$regex: word, $options: 'i'}},
            {summary: {$regex: word, $options: 'i'}},
        ]
    }).limit(limit).skip(offset).sort({order: 1}).populate({
        path: 'author',
        select: '_id name',
    })
}

const post = async (postCreate: PostCreate) => {
    return await Post.create(postCreate)
}

const getPostTotalCount = async () => {
    return await Post.countDocuments()
}

const postMany =async (arr: Array<PostCreate>) => {
    return await Post.create(arr)
}

const putPost = async (postUpdate: PostUpdate) => {
    return await Post.updateOne({_id: postUpdate._id}, {$set: postUpdate})
}

const putPosts = async (arr: Array<PostUpdate>) => {
    for(let i = 0; i < arr.length; ++i){
        await putPost(arr[i])
    }
}

const delPost = async (postId: string) => {
    return await Post.deleteOne({_id: postId})
}

const delPosts =async (arr: Array<string>) => {
    return await Post.deleteMany({_id: {$in: arr}})
}

const postService = {
    post,
    postMany,
    getPost,
    getList,
    searchList,
    putPost,
    putPosts,
    delPost,
    delPosts,
    getPostTotalCount
}

export default postService