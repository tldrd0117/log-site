import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getCategories } from "@/data/api/setting"
import { getVisit } from "@/data/api/visit"
import { format, parseISO } from "date-fns"

export const prefetchVisit = (target: string) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.VISIT.LIST], async () => {
        const items = await getVisit(target)
        return items?.list.map((item: any) => {
            return {
                day:  format(parseISO(item.createAt), "yyyy-MM-dd"),
                value: item.count
            }
        })
            
    })
}