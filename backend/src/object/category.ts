import Joi from "joi"
import { getI18next } from "../utils/i18n"
import { category, categoryLimit, id, limit, offset } from "./common"
import _ from 'lodash'

export const getCategoryListObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "number.base": i18next.t("validate.number.type"),
        "number.integer": i18next.t("validate.number.integer"),
        "number.min": i18next.t("validate.number.min"),
        "number.max": i18next.t("validate.number.max"),
    }
    return Joi.object({
        limit: _.cloneDeep(categoryLimit).required()
            .label(i18next.t("limit"))
            .messages(messages),
            
        offset: _.cloneDeep(offset).required()
            .label(i18next.t("offset"))
            .messages(messages),
    })
    .label(i18next.t("category"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
    
}


export const getCategoryCreateObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "string.base": i18next.t("validate.string"),
        "string.min": i18next.t("validate.min"),
        "string.max": i18next.t("validate.max"),
        "string.pattern.name": i18next.t("validate.pattern.type"),
        "string.empty": i18next.t("validate.required"),
    }
    return Joi.object({
        name: _.cloneDeep(category).required()
            .label(i18next.t("name")).messages(messages),
    })
    .label(i18next.t("categoryCreate"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

export const getCategoryUpdateObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "string.base": i18next.t("validate.string"),
        "string.min": i18next.t("validate.min"),
        "string.max": i18next.t("validate.max"),
        "string.pattern.name": i18next.t("validate.pattern.type"),
        "string.empty": i18next.t("validate.required"),
    }
    return Joi.object({
        _id: _.cloneDeep(id).label(i18next.t("categoryId")).required().messages(messages),
        name: _.cloneDeep(category).required()
            .label(i18next.t("name")).messages(messages),
    })
    .label(i18next.t("categoryUpdate"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

export const getCategoryDelObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        _id: _.cloneDeep(id).label(i18next.t("categoryId")).required()
        .messages({
            "any.required": i18next.t("validate.required"),
            "string.base": i18next.t("validate.string"),
            "string.pattern.name": i18next.t("validate.pattern.type"),
        })
    })
    .label(i18next.t("categoryDel"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
    
}