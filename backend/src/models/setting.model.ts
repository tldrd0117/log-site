import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface ISetting{
    _id: Types.ObjectId
    type: string
    role: string;
    userId: Types.ObjectId;
    name: string;
    value: string;
    createAt: Date;
    updateAt: Date;
}

export {ISetting}

const settingSchema = new Schema<ISetting>({
    type: {type: String, required: true},
    role: {type: String, required: true},
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