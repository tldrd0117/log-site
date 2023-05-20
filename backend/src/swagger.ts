const path = require('path');
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const j2s = require('joi-to-swagger');
import { initI18n } from './utils/i18n';
import { joiToParameterQuery } from './utils/json';

const lang = "ko";
const toSwagger = async (obj: any) => {
    let result: any = {}, joiObject
    for(let key in obj){
        joiObject = await obj[key](lang);
        result[key] = j2s(joiObject).swagger
    }
    return result
}

const toSwaggerQueryParam = async (obj: any) => {
    let result: any = {}, joiObject
    for(let key in obj){
        joiObject = await obj[key](lang);
        const arr = joiToParameterQuery(joiObject)
        for(let item of arr){
            result[item.name] = item
        }
    }
    return result
}

const autoGen =async () => {
    await initI18n()
    const obj = await require("./object/user").getLoginUserObject(lang)
    const doc = {
        info: {
          title: "BLOG API",
          description: "Description",
        },
        host: "localhost:3300",
        schemes: ["http"],
        components: {
            schemas:{
                Enc: {
                    type: "object",
                    title: "Encrypted object",
                    properties: {
                        enc: {
                            type: "string",
                            description: "Encrypted body"
                        }
                    },
                    required: ["enc"]
                },
                Empty: {},
                ...await toSwagger(require("./object/user")),
                ...await toSwagger(require("./object/post")),
            },
            parameters: {
                ...await toSwaggerQueryParam(require("./object/user")),
                ...await toSwaggerQueryParam(require("./object/post")),
            },
            securitySchemes: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
      };
      
      const outputFile = "./swagger-output.json";
      const endpointsFiles = ["./routers/*.routes.ts"];
      
      swaggerAutogen(outputFile, endpointsFiles, doc);
}
autoGen()
