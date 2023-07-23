import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface ITag{
    _id: Types.ObjectId
    name: string;
    createAt: Date;
    updateAt: Date;
}

export {ITag}

const schema = new Schema<ITag>({
    name: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now }
})

schema.index({name:1}, {unique: true})

const Tag = model<ITag>('Tag', schema);

export default Tag