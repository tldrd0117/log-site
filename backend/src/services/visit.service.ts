import { add, endOfDay, startOfDay } from "date-fns"
import Visit from "../models/visit.model"
import VisitHistory from "../models/visitHistory.model"
import { GetPopularVisit, GetVisit, VisitType } from "../interfaces/visit"
import postService from "./post.service"

const getVisit = async (obj: GetVisit) => {
    const result = await Visit.find(obj).lean().exec()
    if(result.length === 0){
        return makeEmptyVisit(obj)
    } else {
        return result
    }
}

const getPopularVisit = async (obj: GetPopularVisit) => {
    const { limit, type } = obj
    if(type === "Post"){
        return await Visit.find({ type }).sort({ count: -1 }).limit(limit).populate({
            path: "target",
            populate: [{
                path: "author",
                select: '_id name'
            },{
                path: "category",
                select: '_id name'
            },{
                path: "tags",
                select: '_id name'
            }]
        }).lean().exec()
    } else {
        return await Visit.find({ type }).sort({ count: -1 }).limit(limit).populate("target").lean().exec()

    } 
}

const makeEmptyVisit = (visit: GetVisit) => {
    return [{
        ...visit,
        count: 0
    }]
}

const addVisit = async (ip: string, target: string, type: VisitType) => {
    if(type === "Post"){
        return await addPostVisit(ip, target, new Date(), type)
    } else if( type === "blog"){
        return await addVisitByDate(ip, target, new Date(), type)
    }
    return {}

}

const validateHistory = async (ip: string, target: string, date: Date, type: VisitType) => {
    const data = await VisitHistory.find({ ip, target, type, createAt: {
        $lte: date
    }, expiredAt: {
        $gte: date
    } })
    return !data.length
}

const addVisitByDate = async (ip: string, target: string, date: Date, type: VisitType) => {
    const validate = await validateHistory(ip, target, date, type)
    if(validate){
        const tomorrow = add(date, { days: 1})
        await VisitHistory.create({ ip, target, type, createAt: date, expiredAt: tomorrow })
        return await Visit.updateOne({ target, type, createAt: startOfDay(date) }, { $inc: { count: 1 } }, { upsert: true })
    }
    return {}
}

const addPostVisit = async (ip: string, target: string, date: Date, type: VisitType) => {
    const post = await postService.getPost(target)
    if(post){
        console.log(post)
        const validate = await validateHistory(ip, target, date, type)
        if(validate){
            const tomorrow = add(date, { days: 1})
            await VisitHistory.create({ ip, target, type, createAt: date, expiredAt: tomorrow })
            const res = await Visit.updateOne({ target, type: "Post"}, { $inc: { count: 1 } }, { upsert: true })
            if(post?.tags?.length){
                for(let tag of post.tags){
                    await Visit.updateOne({ target: tag._id, type: "Tag", createAt: startOfDay(date) }, { $inc: { count: 1 } }, { upsert: true })
                }
            }
            if(post?.category?._id){
                await Visit.updateOne({ target: post.category._id, type: "Category", createAt: startOfDay(date) }, { $inc: { count: 1 } }, { upsert: true })
            }
            return res
        }
    }
    return {}

}

const removeVisit = async (target: string) => {
    return await Visit.deleteOne({ target })
}

const visitService = {
    getVisit,
    getPopularVisit,
    addVisit,
    removeVisit,
    addVisitByDate
}

export default visitService;