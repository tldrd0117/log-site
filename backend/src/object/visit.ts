import Joi from "joi"
import { getI18next } from "../utils/i18n"
import { id, visitTarget } from "./common"
import _ from 'lodash'

export const getVisitObject = async (lng: string) => {
    const i18next = await getI18next(lng)
    return Joi.object({
        target: _.cloneDeep(visitTarget).required()
            .label(i18next.t("visitTarget"))
            .messages({
                "any.required": i18next.t("validate.required"),
                "string.base": i18next.t("validate.string"),
                "string.pattern.name": i18next.t("validate.pattern.type"),
            })
    })
    .label(i18next.t("visit"))
    .messages({
        "object.base": i18next.t("validate.object.type"),
    })
}