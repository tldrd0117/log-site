import mongoose, { Schema, model, connect, Date, Types } from "mongoose";

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface IPost{
    _id: Types.ObjectId
    author: Types.ObjectId
    authorName: string;
    summary: string;
    category?: Types.ObjectId;
    title: string;
    text: string;
    createAt: Date;
    updateAt: Date;
    parent?: Types.ObjectId;
    relatedPosts?: Types.Array<Types.ObjectId>;
    tags?: Types.Array<Types.ObjectId>;
    order?: number
}

export {IPost}

const postSchema = new Schema<IPost>({
    author: {type: Schema.Types.ObjectId, required: true, ref:"User"},
    authorName: {type: String, required: true},
    summary: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, required: true, ref:"Category"},
    title: {type: String, required: true},
    text: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
    parent: { type: Schema.Types.ObjectId, ref:"Post"},
    relatedPosts: { type: [Schema.Types.ObjectId], ref:"Post"},
    tags: { type: [Schema.Types.ObjectId], ref:"Tag"},
    order: { type: Number }
})

postSchema.plugin(AutoIncrement, {inc_field: 'order'})

const Post = model<IPost>('Post', postSchema);

export default Post