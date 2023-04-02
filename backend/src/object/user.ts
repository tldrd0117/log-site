import Joi from 'joi'
import { getI18next } from "../utils/i18n";
import { email, password, userName } from './common'
import _ from 'lodash'


export const getJoinUserObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        name: _.cloneDeep(userName).required()
            .label(i18next.t("name"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
        email: _.cloneDeep(email).required().label(i18next.t("email"))
            .label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            }),
        password: _.cloneDeep(password).required()
            .label(i18next.t("password"))
            .messages({
                "string.length": i18next.t("validate.password"),
                "any.required": i18next.t("validate.required2")
            })
    })
}

export const getLoginUserObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        email: _.cloneDeep(email).required().label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            }),
        password: _.cloneDeep(password).required()
            .label(i18next.t("password"))
            .messages({
                "string.length": i18next.t("validate.password"),
                "any.required": i18next.t("validate.required2")
            })
    })
}

export const getUserInfoObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        email: _.cloneDeep(email).required().label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            })
    })
}