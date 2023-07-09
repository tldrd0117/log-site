import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface ISettingType{
    _id: Types.ObjectId
    name: string;
    uid: string;
}

export {ISettingType}

const schema = new Schema<ISettingType>({
    name: {type: String, required: true},
    uid: {type: String, required: true, minlength: 32, maxlength: 32},
})

schema.index({name:1}, {unique: true})
schema.index({uid:1}, {unique: true})

const SettingType = model<ISettingType>('SettingType', schema);


export default SettingType