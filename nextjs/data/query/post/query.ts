import { QUERY_KEYS } from "../common/constants"
import { getPost, getPostList, createPost, deletePostList } from "../../api/post"
import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"
import { PostCreate, PostDelete, PostRawCreate } from "../../api/interfaces/post"
import { KeyLike } from "jose"
import { makeStringErrorByResponse } from "../../api/utils/common"
import { useRouter } from "next/navigation"
import { useEncPubicKey } from "../auth"
import { useRecoilState } from "recoil"
import { tokenState, userInfoState } from "../../recoil/states/user"
import { PaginationState } from "@tanstack/react-table"
import { parsePostText } from "@/data/post/util"
import { convertList, convertMdxPost } from "../common/converters"

const DEFAULT_LIMIT = 20;
const RECENT_LIST_LIMIT = 10;
export const TAG_SEPARATOR = "(/*/)";

export const usePost = (_id: string) => {
    return useQuery<any, any, any, any>({
        queryKey: [QUERY_KEYS.POST.POST, _id],
        queryFn: async () => {
            const post = await getPost({_id})
            const mdxPost =  await convertMdxPost(post)
            return mdxPost
        },
        initialData: () => {
            return {
                source: "",
                mdxContent: "",
                tags: [],
                title: "",
                category: "",
            }
        }
    })
}

const sendCreatePost = async (encPublicKey: KeyLike, token: string, userInfo: any, postData: PostRawCreate) => {
    const postInfo: PostCreate = {
        title: postData.title,
        author: userInfo._id,
        authorName: userInfo.name,
        summary: postData.title,
        text: postData.text,
        tags: postData.tags,
        category: postData.category,
    }

    const res = await createPost(postInfo, encPublicKey, token)
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
}

export const usePostMutation = () => {
    const router = useRouter()
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    return useMutation({
        mutationFn: (post: PostRawCreate) => {
            return sendCreatePost(encPublicKey!!, token, userInfo, post)
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: async () => {
            router.push("/post/list")
        }
    })
}

export const useDeletePostListMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useMutation({
        mutationFn: async (data: Array<PostDelete>) => {
            return await deletePostList(data, encPublicKey!!, token!!)
        }
    })
}

export const useRecentPostList = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST.LIST, RECENT_LIST_LIMIT],
        queryFn: async () => {
            let list =  await getPostList({ limit: RECENT_LIST_LIMIT, offset: 0 })
            return await convertList(list)
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 10,
    })
}


export const usePostListInfinity = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.LIST, DEFAULT_LIMIT],
        queryFn: async ({ pageParam = 0}) => {
            let list = await getPostList({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT })
            return await convertList(list)
        },
        getNextPageParam: (lastPage, allPage) => {
            // DEFAULT_LIMIT * lastPage
            if( allPage.length * DEFAULT_LIMIT < lastPage.total)
                return allPage.length + 1
        },
        getPreviousPageParam: (firstPage) => {
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 10,
    })
}

export const usePostList = (fetchDataOptions: PaginationState) => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST.LIST, fetchDataOptions],
        queryFn: async () => {
            const items = await getPostList({ limit: fetchDataOptions.pageSize, 
                offset: fetchDataOptions.pageSize * fetchDataOptions.pageIndex })
            return convertList(items)
        },
    })
}