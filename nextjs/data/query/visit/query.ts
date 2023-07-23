import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth"
import { addVisit, getVisit } from "@/data/api/visit"
import { format, parseISO } from "date-fns"


export const useVisit = (target: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.VISIT.LIST, target],
        queryFn: async () => {
            const items = await getVisit(target)
            return items?.list.map((item: any) => {
                return {
                    day:  format(parseISO(item.createAt), "yyyy-MM-dd"),
                    value: item.count
                }
            })
        },
        cacheTime: 1000 * 12 * 60,
        staleTime: 1000 * 12 * 60,
    })
}

export const useVisitMutation = () => {
    const queryClient = useQueryClient()
    const {data: encPublicKey, isSuccess} = useEncPubicKey()
    return useMutation({
        mutationFn: async (target: string) => {
            if(!encPublicKey) throw new Error("public Key not exist!")
            console.log(encPublicKey)
            const res = await addVisit({ target }, encPublicKey!!)
            if(res.modifiedCount > 0 || res.upsertedCount > 0){
                queryClient.invalidateQueries([QUERY_KEYS.VISIT.LIST, target])
            }
            return res
        },
        
    })  
}