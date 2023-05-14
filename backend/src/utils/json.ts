import { AnySchema } from "joi"

export const joiToParameterQuery = (joiSchema: AnySchema) => {
    const parameters = [];
    const keys = joiSchema.describe().keys
    for (const key in keys) {
        parameters.push({
            in: "query",
            name: key,
            required: keys[key].flags.presence === "required",
            description: keys[key].flags.label,
            schema: {
                type: keys[key].type,
            }
        })
    }
    return parameters

}