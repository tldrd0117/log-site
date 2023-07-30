import Joi from "joi"
import { getI18next } from "../utils/i18n"
import { id, visitTarget, visitType } from "./common"
import _ from 'lodash'

export const getVisitObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        target: _.cloneDeep(visitTarget)
            .label(i18next.t("visitTarget"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
        type: _.cloneDeep(visitType)
            .label(i18next.t("visitType"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
    })
    .label(i18next.t("visit"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

export const getPopularVisitObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        limit: Joi.number().integer().min(1).max(100).required()
            .label(i18next.t("limit"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "number.base": i18next.t("validate.number"),
                "number.min": i18next.t("validate.min"),
                "number.max": i18next.t("validate.max"),
                "number.empty": i18next.t("validate.required"),
            }),
        type: _.cloneDeep(visitType)
            .label(i18next.t("visitType"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
    })
    .label(i18next.t("visit"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

export const getVisitCreateObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        target: _.cloneDeep(visitTarget).required()
            .label(i18next.t("visitTarget"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
        type: _.cloneDeep(visitType).required()
            .label(i18next.t("visitType"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
    })
    .label(i18next.t("visit"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}

