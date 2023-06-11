import getQueryClient from "@/app/getQueryClient"
import { getPublicKey } from "../api/auth"
import { QUERY_KEYS } from "./common/queryKeys"
import { getPostList } from "../api/post"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"

const DEFAULT_LIMIT = 20;

export const prefetchPostList = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.POST_LIST], async () => {
        const list = await getPostList({ limit: DEFAULT_LIMIT, offset: 0})
        return {
            pages: [list],
            pageParams: [0]
        }
    })
}

export const usePostListInfinity = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.POST_LIST],
        queryFn: async ({ pageParam = 0}) => {
            return await getPostList({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT })
        },
        getNextPageParam: (lastPage, allPage) => {
            // DEFAULT_LIMIT * lastPage
            if( allPage.length * DEFAULT_LIMIT < lastPage.total)
                return allPage.length + 1
        },
        getPreviousPageParam: (firstPage) => {
        }
    })
}