import Joi from 'joi'
import { getI18next } from "../utils/i18n";
import _ from 'lodash'
import { id, limit, offset, searchWord,
    userName, summary, text, order, idArray, settingType, role, settingName, settingValue, categories, category, optionId } from './common'
import i18next from 'i18next';

export const getSettingUpdateObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    const messages = {
        "any.required": i18next.t("validate.required"),
        "string.base": i18next.t("validate.string"),
        "string.min": i18next.t("validate.min"),
        "string.max": i18next.t("validate.max"),
        "string.pattern.name": i18next.t("validate.pattern.type"),
        "string.empty": i18next.t("validate.required"),
        "any.only": i18next.t("validate.valid")
    }
    return Joi.object({
        _id: _.cloneDeep(id).label(i18next.t("settingId")).required().messages(messages),
        type: _.cloneDeep(settingType).label(i18next.t("settingType")).messages(messages),
        role: _.cloneDeep(role).label(i18next.t("role")).messages(messages),
        userId: _.cloneDeep(optionId).label(i18next.t("userId")).messages(messages),
        name: _.cloneDeep(settingName).label(i18next.t("settingName")).required().messages(messages),
        value: _.cloneDeep(settingValue).label(i18next.t("settingValue")).required().messages(messages),
    })
    .label(i18next.t("settingUpdate"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

export const getAddCategoryString=async (lng: string) => {
    const i18next = await getI18next(lng)
    
    return _.cloneDeep(category).required().label(i18next.t("category"))
        .messages({
            "any.required": i18next.t("validate.required"),
            "string.base": i18next.t("validate.string"),
            "string.min": i18next.t("validate.min"),
            "string.max": i18next.t("validate.max"),
            "string.pattern.name": i18next.t("validate.pattern.type"),
            "string.empty": i18next.t("validate.required"),
        })
}

export const getAddCategoriesObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        categories: Joi.array().items(await getAddCategoryString(lng))
            .min(1).max(1000).required()
            .label(i18next.t("categories"))
            .messages({
                "array.base": i18next.t("validate.array.type"),
                "array.max": i18next.t("validate.array.max"),
                "array.min": i18next.t("validate.array.min"),
                "array.includesRequiredKnowns": i18next.t("validate.array.includes")
            })
    })
    .label(i18next.t("addCategories"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}
