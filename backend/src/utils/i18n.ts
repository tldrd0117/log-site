import i18next from 'i18next'
import FsBackend from 'i18next-fs-backend'

let isInit = false;
let en: any, ko: any

export const geti18next = async (lang: string) => {
    const i18n: {[k:string]: any} = await getI18n()
    return i18n[lang]
}

export const getI18n = async () => {
    if(isInit) return {en, ko}
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
    isInit = true
    return {en, ko}
}
