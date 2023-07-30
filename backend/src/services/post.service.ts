import { Types } from "mongoose"
import { PostCreate, PostUpdate } from "../interfaces/post"
import Post, { IPost } from "../models/post.model"
import * as mongodb from 'mongodb';
import userService from "./user.service";
import { MessageError } from "../utils/error";
import tagService from "./tag.service";

const getPost = async (postId: string) => {
    const post = await Post.findOne({_id: postId}).populate({
        path: 'author',
        select: '_id name'
    }).populate({
        path: 'tags',
        select: '_id name'
    }).populate({
        path: 'category',
        select: '_id name'
    }).lean().exec()
    return post
}

const getList = async (limit: number, offset: number) => {
    const total = await getPostTotalCount()
    const list =  await Post.find().limit(limit).skip(offset).sort({order: -1}).populate({
        path: 'author',
        select: '_id name'
    }).populate({
        path: 'tags',
        select: '_id name'
    }).populate({
        path: 'category',
        select: '_id name'
    }).lean().exec()
    return {
        total, 
        list, 
        pageCount: Math.ceil(total/limit), 
        pageIndex: Math.floor(offset/limit),
        pageSize: limit
    }
}

const searchList = async (limit: number, offset: number, word: string) => {
    const total = await Post.countDocuments({
        $or: [
            {text: {$regex: word, $options: 'i'}},
            {summary: {$regex: word, $options: 'i'}},
        ]
    })
    const list = await Post.find({
        $or: [
            {text: {$regex: word, $options: 'i'}},
            {summary: {$regex: word, $options: 'i'}},
        ]
    }).limit(limit).skip(offset).sort({order: 1}).populate({
        path: 'author',
        select: '_id name'
    }).populate({
        path: 'tags',
        select: '_id name'
    }).populate({
        path: 'category',
        select: '_id name'
    }).lean().exec()
    return {
        total, list
    }
}

const convertTags = async (tags: Types.ObjectId[]) => {
    let ids = [], obj: any = {}
    for(let tag of tags){
        obj = await tagService.findOrCreateIfNotExist(tag.toString())
        ids.push(obj._id)
    }
    return ids
}

const post = async (postCreate: PostCreate) => {
    if(userService.checkExistUserById(postCreate.author.toString())){
        if(postCreate.tags){
            postCreate.tags = await convertTags(postCreate.tags)
        }
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
        for(let postCreate of postCreates){
            if(postCreate.tags){
                postCreate.tags = await convertTags(postCreate.tags)
            }
        }
        const creates = await Post.create(postCreates)
        return creates
    } else {
        throw new MessageError("user.notFound")
    }
}

const putPost = async (postUpdate: PostUpdate) => {
    if(postUpdate.author && userService.checkExistUserById(postUpdate.author.toString())){
        if(postUpdate.tags){
            postUpdate.tags = await convertTags(postUpdate.tags)
        }
        return await Post.updateOne({_id: postUpdate._id}, {$set: postUpdate})
    } else if(!postUpdate.author){
        postUpdate.author = undefined
        postUpdate.authorName = undefined
        if(postUpdate.tags){
            postUpdate.tags = await convertTags(postUpdate.tags)
        }
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