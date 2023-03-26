import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface IPost{
    _id: Types.ObjectId
    authorId: Types.ObjectId
    authorName: string;
    summary: string;
    text: string;
    createAt: Date;
    updateAt: Date;
    parent?: Types.ObjectId;
    relatedPosts?: Types.Array<Types.ObjectId>;
    order?: number
}

export {IPost}

const postSchema = new Schema<IPost>({
    authorId: {type: Schema.Types.ObjectId, required: true, ref:"User"},
    authorName: {type: String, required: true},
    summary: {type: String, required: true},
    text: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
    parent: { type: Schema.Types.ObjectId, ref:"Post"},
    relatedPosts: { type: [Schema.Types.ObjectId], ref:"Post"},
    order: { type: Number }
})

postSchema.plugin(AutoIncrement, {inc_field: 'order'})

const Post = model<IPost>('Post', postSchema);

export default Post