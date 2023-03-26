import i18next from 'i18next'
import FsBackend from 'i18next-fs-backend'
import { Context } from 'koa';

let isInit = false;
let en: any, ko: any

export const getI18next = (lang: string) => {
    if(lang === "ko") return ko
    else return en
}

export const getI18nextByCtx = (ctx: Context) => {
    if(ctx.acceptsLanguages().length === 0) return en
    if(ctx.acceptsLanguages()[0] === "ko") return ko
    else return en
}

export const initI18n = async () => {
    en = i18next.createInstance()
    ko = i18next.createInstance()
    await en
        .use(FsBackend)
        .init({
            lng: "en",
            backend: {
                loadPath: './src/resources/{{ns}}/{{lng}}.json'
            },
            debug: false,
            ns:["message"],
            defaultNS:["message"]
        })
    await ko
        .use(FsBackend)
        .init({
            lng: "ko",
            backend: {
                loadPath: './src/resources/{{ns}}/{{lng}}.json'
            },
            debug: false,
            ns:["message"],
            defaultNS:["message"]
        })
}
