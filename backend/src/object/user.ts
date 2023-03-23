import i18next from "i18next";
import Joi from 'joi'
import userService from "../services/user.service";
import { MessageError } from "../utils/error";
import {getI18n} from "../utils/i18n";


const checkNameDuplicate = async (name: string, helpers: any) => {
    const result = await userService.checkNameDuplicate(name)
    if(!result){
        throw new MessageError(i18next.t("validate.duplicate"))
    }
    return name
}

const checkEmailDuplicate =async (email: string, helpers: any) => {
    const result = await userService.checkEmailDuplicate(email)
    if(!result){
        throw new MessageError(i18next.t("validate.duplicate"))
    }
    return email
}

export const getJoinUserObject = async (lng: string) => {
    const {en, ko} = await getI18n()
    const i18next = lng=="en"?en:ko
    return Joi.object({
        name: Joi.string().trim().pattern(/^([a-zA-Z]|[가-힣])+$/, "str").min(3).max(20).required()
            .external(checkNameDuplicate)
            .label(i18next.t("name"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.min": i18next.t("validate.min"),
                "string.max": i18next.t("validate.max"),
                "string.pattern.name": i18next.t("validate.pattern.onlyChar"),
                "string.empty": i18next.t("validate.required"),
            }),
        email: Joi.string().email().required().label(i18next.t("email"))
            .external(checkEmailDuplicate)
            .label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            }),
        password: Joi.string().length(64).required()
            .label(i18next.t("password"))
            .messages({
                "string.length": i18next.t("validate.password"),
                "any.required": i18next.t("validate.required2")
            })
    })
}

export const getLoginUserObject = async (lng: string) => {
    const {en, ko} = await getI18n()
    const i18next = lng=="en"?en:ko
    return Joi.object({
        email: Joi.string().email().required().label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            }),
        password: Joi.string().length(64).required()
            .label(i18next.t("password"))
            .messages({
                "string.length": i18next.t("validate.password"),
                "any.required": i18next.t("validate.required2")
            })
    })
}

export const getUserInfoObject = async (lng: string) => {
    const {en, ko} = await getI18n()
    const i18next = lng=="en"?en:ko
    return Joi.object({
        email: Joi.string().email().required().label(i18next.t("email"))
            .messages({
                "string.base": i18next.t("validate.string"),
                "string.email": i18next.t("validate.email"),
                "any.required": i18next.t("validate.required")
            })
    })
}