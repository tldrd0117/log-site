import { selector } from "recoil";
import { tokenState } from "../states/user";
import { BasicTypes } from "@/data/api/interfaces/common";

export const isLoginSelector = selector({
    key: "isLogged",
    get: ({ get }) => {
        const token = get(tokenState);
        return !!token;
    }
});
