import Tag from "../models/tags.model"

export const findOrCreateIfNotExist =async (name: string) => {
    return await Tag.findOneAndUpdate({name}, {name}, {upsert: true, new: true, setDefaultsOnInsert: true}).lean();
}

const tagService = {
    findOrCreateIfNotExist,
}

export default tagService