import Joi from 'joi'
import { getI18next } from "../utils/i18n";
import _ from 'lodash'
import { id, limit, offset, searchWord,
    userName, summary, text, order, idArray } from './common'


export const getPostListObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "number.base": i18next.t("validate.number.type"),
        "number.integer": i18next.t("validate.number.integer"),
        "number.min": i18next.t("validate.number.min"),
        "number.max": i18next.t("validate.number.max"),
    }
    return Joi.object({
        limit: _.cloneDeep(limit).required()
            .label(i18next.t("limit"))
            .messages(messages),
            
        offset: _.cloneDeep(offset).required()
            .label(i18next.t("offset"))
            .messages(messages),
    }).label(i18next.t("postList"))
    
}

export const getPostObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        _id: _.cloneDeep(id).required()
            .label(i18next.t("postId"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.pattern.name": i18next.t("validate.pattern.type"),
            })
    })
}

export const getPostSearchListObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "number.base": i18next.t("validate.number.type"),
        "number.integer": i18next.t("validate.number.integer"),
        "number.min": i18next.t("validate.number.min"),
        "number.max": i18next.t("validate.number.max"),
        "string.base": i18next.t("validate.string"),
        "string.pattern.name": i18next.t("validate.pattern.type"),
        "string.min": i18next.t("validate.min"),
        "string.max": i18next.t("validate.max"),
        
    }
    return Joi.object({
        limit: _.cloneDeep(limit).required()
            .label(i18next.t("limit")).messages(messages),
        offset: _.cloneDeep(offset).required()
            .label(i18next.t("offset")).messages(messages),
        word: _.cloneDeep(searchWord)
            .label(i18next.t("searchWord")).messages(messages)
    })
    
}


export const getPostCreateObject = async (lng: string) => {
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
        author: _.cloneDeep(id).required()
            .label(i18next.t("author")).messages(messages),
        authorName: _.cloneDeep(userName).required()
            .label(i18next.t("authorName")).messages(messages),
        summary: _.cloneDeep(summary).required()
            .label(i18next.t("summary")).messages(messages),
        text: _.cloneDeep(text).label(i18next.t("text")).required().messages(messages),
        parent: _.cloneDeep(id).label(i18next.t("parent")).messages(messages),
        relatedPosts: _.cloneDeep(idArray).label(i18next.t("relatedPosts")).messages(messages),
    })
}

export const getPostUpdateObject = async (lng: string) => {
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
        _id: _.cloneDeep(id).label(i18next.t("postId")).required().messages(messages),
        author: _.cloneDeep(id).label(i18next.t("author")).messages(messages),
        authorName: _.cloneDeep(userName).label(i18next.t("authorName")).messages(messages),
        summary: _.cloneDeep(summary).label(i18next.t("summary")).messages(messages),
        text: _.cloneDeep(text).label(i18next.t("text")).messages(messages),
        parent: _.cloneDeep(id).label(i18next.t("parent")).messages(messages),
        relatedPosts: _.cloneDeep(idArray).label(i18next.t("relatedPosts")).messages(messages),
    })
}

export const getPostDelObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        _id: _.cloneDeep(id).label(i18next.t("postId")).required()
        .messages({
            "any.required": i18next.t("validate.required"),
            "string.base": i18next.t("validate.string"),
            "string.pattern.name": i18next.t("validate.pattern.type"),
        })
    })
    
}