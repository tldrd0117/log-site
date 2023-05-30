import { Types } from "mongoose"
import { PostCreate, PostUpdate } from "../interfaces/post"
import Post, { IPost } from "../models/post.model"
import * as mongodb from 'mongodb';
import userService from "./user.service";
import { MessageError } from "../utils/error";

const getPost = async (postId: string) => {
    const post = await Post.findOne({_id: postId}).populate({
        path: 'author',
        select: '_id name'
    })
    return post
}

const getList = async (limit: number, offset: number) => {
    const total = await getPostTotalCount()
    const list =  await Post.find().limit(limit).skip(offset).sort({order: -1}).populate({
        path: 'author',
        select: '_id name'
    })
    return {
        total, list
    }
}

const searchList = async (limit: number, offset: number, word: string) => {
    const total = await Post.countDocuments({
        $or: [
            {authorName: {$regex: word, $options: 'i'}},
            {text: {$regex: word, $options: 'i'}},
            {summary: {$regex: word, $options: 'i'}},
        ]
    })
    const list = await Post.find({
        $or: [
            {authorName: {$regex: word, $options: 'i'}},
            {text: {$regex: word, $options: 'i'}},
            {summary: {$regex: word, $options: 'i'}},
        ]
    }).limit(limit).skip(offset).sort({order: 1}).populate({
        path: 'author',
        select: '_id name',
    })
    return {
        total, list
    }
}

const post = async (postCreate: PostCreate) => {
    if(userService.checkExistUserById(postCreate.author.toString())){
        const created =  await Post.create(postCreate)
        return created
    } else {
        throw new MessageError("user.notFound")
    }
}

const getPostTotalCount = async () => {
    return await Post.countDocuments()
}

const postMany =async (postCreates: Array<PostCreate>) => {
    const author = postCreates[0].author.toString();
    if(!postCreates.every(v=>v.author.toString()===author)){
        throw new MessageError("user.diff")
    }
    else if(userService.checkExistUserById(author)){
        const creates = await Post.create(postCreates)
        return creates
    } else {
        throw new MessageError("user.notFound")
    }
}

const putPost = async (postUpdate: PostUpdate) => {
    if(postUpdate.author && userService.checkExistUserById(postUpdate.author.toString())){
        return await Post.updateOne({_id: postUpdate._id}, {$set: postUpdate})
    } else if(!postUpdate.author){
        postUpdate.author = undefined
        postUpdate.authorName = undefined
        return await Post.updateOne({_id: postUpdate._id}, {$set: postUpdate})
    } else {
        throw new MessageError("user.notFound")
    }
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