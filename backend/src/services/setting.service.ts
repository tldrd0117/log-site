import { MD5 } from "crypto-js"
import { DecodedUserInfo } from "../interfaces/auth"
import { SettingCreate, SettingUpdate } from "../interfaces/setting"
import Setting, { ISetting } from "../models/setting.model"
import SettingType from "../models/settingType.model"
import { MessageError } from "../utils/error"
import userService from "./user.service"
import Role from "../models/role.model"

const getSetting = async (userInfo: DecodedUserInfo) => {
    const roleTypes = await Role.find()
    const role = roleTypes.find((type) => type._id.toString() === userInfo.role)
    try{
        if(role.name === "admin"){
            return await Setting.find().populate("type").populate("role").populate({
                path:"userId",
                select: "name"
            }).lean().exec()
        } else if(role.name === "user") {
            return await Setting.find({userId: userInfo._id}).populate("type").populate("role").populate({
                path:"userId",
                select: "name"
            }).lean().exec()
        } else {
            return []
        }
    } catch(e) {
        throw new MessageError("setting.notFound")
    }
    
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

const deleteSetting = async (_id: string) => {
    return await Setting.deleteOne({_id: _id})
}

const getSettingTypes = async () => {
    return await SettingType.find()
}

const settingService = {
    getSetting,
    addSettings,
    putSetting,
    deleteSetting,
    getSettingTypes
}

export default settingService