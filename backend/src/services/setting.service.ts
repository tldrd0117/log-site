import { MD5 } from "crypto-js"
import { DecodedUserInfo } from "../interfaces/auth"
import { SettingCreate, SettingUpdate } from "../interfaces/setting"
import Setting, { ISetting } from "../models/setting.model"
import SettingType from "../models/settingType.model"
import { MessageError } from "../utils/error"
import userService from "./user.service"
import Role from "../models/role.model"

const getSettingList = async (userInfo: DecodedUserInfo, limit: number, offset: number) => {
    const roleTypes = await Role.find()
    const role = roleTypes.find((type) => type._id.toString() === userInfo.role)
    let list: Array<any>, total;
    try{
        if(role.name === "admin"){
            total = await Setting.countDocuments()
            list = await Setting.find().limit(limit).skip(offset).sort({updateAt: -1}).populate("type").populate("role").populate({
                path:"userId",
                select: "name"
            }).lean().exec()
            return { 
                total, 
                list, 
                pageCount: Math.ceil(total/limit), 
                pageIndex: Math.floor(offset/limit),
                pageSize: limit  
            }
        } else if(role.name === "user") {
            total = await Setting.countDocuments({userId: userInfo._id})
            list = await Setting.find({userId: userInfo._id}).limit(limit).skip(offset).sort({updateAt: -1}).populate("type").populate("role").populate({
                path:"userId",
                select: "name"
            }).lean().exec()
            return { 
                total, 
                list, 
                pageCount: Math.ceil(total/limit), 
                pageIndex: Math.floor(offset/limit),
                pageSize: limit  
            }
        } else {
            total = 0
            list = []
            return { 
                total, 
                list, 
                pageCount: Math.ceil(total/limit), 
                pageIndex: Math.floor(offset/limit),
                pageSize: limit  
            }
        }
    } catch(e) {
        throw new MessageError("setting.notFound")
    }
}

const getCategories = async () => {
    return await Setting.find({name: "category"}, "_id name value").lean().exec()
}

const addSettings = async (settings: Array<SettingCreate>) => {
    const userId = settings[0].userId.toString();
    if(!settings.every(v=>v.userId.toString()===userId)){
        throw new MessageError("user.diff")
    }
    if(userService.checkExistUserById(userId.toString())){
        const created =  await Setting.create(settings)
        return created
    } else {
        throw new MessageError("user.notFound")
    }
}

const putSetting = async (setting: SettingUpdate) => {
    if(setting.userId && userService.checkExistUserById(setting.userId.toString())){
        return await Setting.updateOne({_id: setting._id}, {$set: setting})
    } else if(!setting.userId){
        setting.userId = undefined
        return await Setting.updateOne({_id: setting._id}, {$set: setting})
    } else {
        throw new MessageError("user.notFound")
    }
}

const putSettingList =async (settingList: Array<SettingUpdate>) => {
    for(let i = 0; i < settingList.length; ++i){
        await putSetting(settingList[i])
    }
}

const deleteSetting = async (ids: Array<string>) => {
    return await Setting.deleteMany({_id: { $in: ids}})
}

const getSettingTypes = async () => {
    return await SettingType.find()
}

const settingService = {
    getSettingList,
    getCategories,
    addSettings,
    putSetting,
    putSettingList,
    deleteSetting,
    getSettingTypes
}

export default settingService