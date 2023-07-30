import { Schema, model, connect, Date, Types } from "mongoose";

interface IVisit{
    _id: Types.ObjectId
    type: string;
    target: string; // blog 혹은 post id
    count: number;
    createAt: Date;
}

export {IVisit}

const visitSchema = new Schema<IVisit>({
    target: { type: String, required: true, refPath: 'type' },
    type: { type: String, required: true, enum: ['blog', 'Tag', 'Post', 'Category'] },
    count: { type: Number, required: true },
    createAt: { type: Date, required: true, default: Date.now },
})

visitSchema.index({target:1, type:1}, {unique: false})
visitSchema.index({target:1}, {unique: false})
visitSchema.index({type:1}, {unique: false})
visitSchema.index({target:1, type:1, createAt: 1}, {unique: true})

const Visit = model<IVisit>('Visit', visitSchema);

export default Visit