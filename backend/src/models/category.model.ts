import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

interface ICategory{
    _id: Types.ObjectId
    name: string;
    createAt: Date;
    updateAt: Date;
}

export {ICategory}

const schema = new Schema<ICategory>({
    name: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now }
})

schema.index({name:1}, {unique: true})

const Category = model<ICategory>('Category', schema);

export default Category