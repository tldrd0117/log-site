import Category from "../models/category.model"


export const getCategory = async (limit: number, offset: number) => {
    const total = await Category.countDocuments();
    const list = await Category.find().limit(limit).skip(offset).sort({order: -1}).lean().exec()
    return {
        total, 
        list,
        pageCount: Math.ceil(total/limit), 
        pageIndex: Math.floor(offset/limit),
        pageSize: limit
    }
}

export const createCategory = async (name: string) => {
    return await Category.create({name})
}

export const putCategory = async (id:string, name: string) => {
    return await Category.updateOne({_id: id}, {name})
}

export const deleteCategory = async (id:string) => {
    return await Category.deleteOne({_id: id})
}

const categoryService = {
    getCategory,
    createCategory,
    putCategory,
    deleteCategory,
}

export default categoryService