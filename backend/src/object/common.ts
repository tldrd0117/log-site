import Joi from 'joi'
import _ from 'lodash'

export const id = Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/, "str")
export const limit = Joi.number().integer().min(1).max(100)
export const offset = Joi.number().integer().min(0)
export const searchWord = Joi.string().trim().min(0).max(20)
export const userName = Joi.string().trim().pattern(/^([a-zA-Z]|[가-힣]|[0-9])+$/, "str").min(3).max(20) 
export const summary = Joi.string().trim().min(3).max(100)
export const text = Joi.string().trim().min(3).max(10000)
export const order = Joi.number().integer().min(1)
export const idArray = Joi.array().items(_.cloneDeep(id))
export const email = Joi.string().email()
export const password = Joi.string().length(64)
