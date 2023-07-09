import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface ISetting{
    _id: Types.ObjectId
    type: Types.ObjectId
    role: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    value: string;
    createAt: Date;
    updateAt: Date;
}

export {ISetting}

const settingSchema = new Schema<ISetting>({
    type: {type: Schema.Types.ObjectId, required: true, ref: "SettingType"},
    role: {type: Schema.Types.ObjectId, required: true, ref: "Role"},
    userId: {type: Schema.Types.ObjectId, required: true, ref:"User"},
    name: {type: String, required: true},
    value: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
})

settingSchema.index({type:1}, {unique: false})
settingSchema.index({role:1}, {unique: false})
settingSchema.index({userId:1}, {unique: false})
settingSchema.index({name:1}, {unique: false})
settingSchema.index({userId:1, name:1, value: 1}, {unique: true})

const Setting = model<ISetting>('Setting', settingSchema);

export default Setting