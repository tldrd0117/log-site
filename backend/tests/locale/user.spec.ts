import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';

describe("i18Next message test", function(){
    beforeAll(function(){
        return i18next.use(FsBackend)
            .init({
                backend: {
                    loadPath: './src/resources/{{ns}}/{{lng}}.json'
                },
                debug: true,
                lng: "ko",
                ns:["message"],
                defaultNS:["message"]
            })
    })
    it("duplicated Name - ko", function(){
        expect(i18next.t("hello")).toBe("안녕")
        expect(i18next.t("validate.duplicate")).toBe("{#label}이 중복되었습니다")
    })

    it("duplicated Name - en", async function(){
        await i18next.changeLanguage("en")
        expect(i18next.t("hello")).toBe("hello")
        expect(i18next.t("validate.duplicate")).toBe("{#label} is duplicated")
    })
})