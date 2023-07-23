import { add, endOfDay, startOfDay } from "date-fns"
import Visit from "../models/visit.model"
import VisitHistory from "../models/visitHistory.model"

const getVisit = async (target: string) => {
    const result = await Visit.find({ target }).lean().exec()
    if(result.length === 0){
        return makeEmptyVisit(target)
    } else {
        return result
    }
}

const makeEmptyVisit = (target: string) => {
    return [{
        target,
        count: 0
    }]
}

const addVisit = async (ip: string, target: string) => {
    return addVisitByDate(ip, target, new Date())
}

const validateDate = async (ip: string, target: string, date: Date) => {
    const data = await VisitHistory.find({ ip, target, createAt: {
        $lte: date
    }, expiredAt: {
        $gte: date
    } })
    return !data.length
}

const addVisitByDate = async (ip: string, target: string, date: Date) => {
    const validate = await validateDate(ip, target, date)
    if(validate){
        const tomorrow = add(date, { days: 1})
        await VisitHistory.create({ ip, target, createAt: date, expiredAt: tomorrow })
        return await Visit.updateOne({ target, createAt: startOfDay(date) }, { $inc: { count: 1 } }, { upsert: true })
    }
}

const removeVisit = async (target: string) => {
    return await Visit.deleteOne({ target })
}

const visitService = {
    getVisit,
    addVisit,
    removeVisit,
    addVisitByDate
}

export default visitService;