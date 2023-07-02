import { DecodedUserInfo } from "../interfaces/auth"
import { SettingCreate, SettingUpdate } from "../interfaces/setting"
import Setting, { ISetting } from "../models/setting.model"
import { MessageError } from "../utils/error"
import userService from "./user.service"

const getSetting = async (userInfo: DecodedUserInfo) => {
    if(userInfo.role === "admin"){
        return await Setting.find().lean().exec()
    } else if(userInfo.role === "user") {
        return await Setting.find({userId: userInfo._id}).lean().exec()
    } else {
        return []
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

const settingService = {
    getSetting,
    addSettings,
    putSetting,
    deleteSetting
}

export default settingService