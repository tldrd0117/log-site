import { Schema, model, connect, Date, Types } from "mongoose";

interface IVisitHistory{
    _id: Types.ObjectId
    ip: string;
    target: string;
    type: string;
    createAt: Date;
    expiredAt: Date;
}

export {IVisitHistory}

const visitHistorySchema = new Schema<IVisitHistory>({
    ip: { type: String, required: true },
    target: { type: String, required: true },
    type: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    expiredAt: { type: Date, required: true, default: () => Date.now() + (1000 * 60 * 60 * 24) }
})

visitHistorySchema.index({target:1, type: 1}, {unique: false})
visitHistorySchema.index({type: 1}, {unique: false})
visitHistorySchema.index({ip:1, target:1, expiredAt: 1}, {unique: true})

const VisitHistory = model<IVisitHistory>('VisitHistory', visitHistorySchema);

export default VisitHistory