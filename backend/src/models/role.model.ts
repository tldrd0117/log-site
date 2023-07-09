import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface IRole{
    _id: Types.ObjectId
    name: string;
    uid: string;
}

export {IRole}

const schema = new Schema<IRole>({
    name: {type: String, required: true},
    uid: {type: String, required: true, minlength: 32, maxlength: 32},
})

schema.index({name:1}, {unique: true})
schema.index({uid:1}, {unique: true})

const Role = model<IRole>('Role', schema);

export default Role