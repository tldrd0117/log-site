import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';

describe("user 메시지", function(){
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
    it("중복된 이름 ko", function(){
        expect(i18next.t("hello")).toBe("안녕")
        expect(i18next.t("validate.duplicate")).toBe("{#label}이 중복되었습니다")
    })

    it("중복된 이름 en", async function(){
        await i18next.changeLanguage("en")
        expect(i18next.t("hello")).toBe("hello")
        expect(i18next.t("validate.duplicate")).toBe("{#label} is duplicated")
    })
})