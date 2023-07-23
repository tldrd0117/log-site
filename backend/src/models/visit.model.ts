import { Schema, model, connect, Date, Types } from "mongoose";

interface IVisit{
    _id: Types.ObjectId
    target: string; // blog 혹은 post id
    count: number;
    createAt: Date; 
}

export {IVisit}

const visitSchema = new Schema<IVisit>({
    target: { type: String, required: true },
    count: { type: Number, required: true },
    createAt: { type: Date, required: true, default: Date.now },
})

visitSchema.index({target:1, createAt: 1}, {unique: true})

const Visit = model<IVisit>('Visit', visitSchema);

export default Visit