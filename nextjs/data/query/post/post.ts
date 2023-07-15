import getQueryClient from "@/app/getQueryClient"
import { getPublicKey } from "../../api/auth"
import { QUERY_KEYS } from "../common/queryKeys"
import { getPost, getPostList, createPost, deletePostList } from "../../api/post"
import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"
import { PostCreate, PostDelete, PostRawCreate } from "../../api/interfaces/post"
import { getEncPublicKey } from "../../security/enc"
import { KeyLike } from "jose"
import { makeStringErrorByResponse } from "../../api/utils/common"
import { useRouter } from "next/navigation"
import { UserLogin } from "../../api/interfaces/user"
import { useEncPubicKey } from "../auth"
import { useRecoilState } from "recoil"
import { tokenState, userInfoState } from "../../recoil/states/user"
import { ReactFragment } from "react"

const DEFAULT_LIMIT = 20;
const RECENT_LIST_LIMIT = 10;
export const TAG_SEPARATOR = "(/*/)";

const getMdxPost = async (id: string) => {
    console.log("getMdxPost", id)
    if(id==="") return {
        id: "",
        source: "",
        mdxContent: "",
        tags: [],
        title : "",
        category : "",
        categories : ["카테고리1", "카테고리2", "카테고리3"]
    }
    let post: any
    if(id==="example.mdx"){
        let text = await fetch(`http://localhost:3000/example.mdx`).then(res => res.text())
        post = {
            text,
            result: "success"
        }
    } else {
        post = await getPost({_id: id})
    }
    if(!post || post.result === "fail") {
        console.log("fail")
        return {
            id: "",
            source: "",
            mdxContent: "",
            tags: [],
            title: "",
            category: "",
            categories: ["카테고리1", "카테고리2", "카테고리3"]
        }
    }
    let {text: source} = post
    console.log(source)

    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
            development: true,  
        },
        parseFrontmatter: true,
        
    }})

    if(source.indexOf("---")>=0){
        source = source.slice(source.indexOf("---")+3)
        source = source.slice(source.indexOf("---")+3)
    }
    let tagStr = frontmatter.tags as string
    let tags: string[] = []

    console.log(content, frontmatter, source)
    
    if(tagStr && tagStr.indexOf(TAG_SEPARATOR)>=0){
        tags = tagStr.split(TAG_SEPARATOR).slice(1)
    }
    const title = frontmatter.title as string
    const category = frontmatter.category as string
    const categories = ["카테고리1", "카테고리2", "카테고리3"];
    return {
        id,
        source,
        mdxContent: content,
        tags,
        title,
        category,
        categories
    }
}

export const usePost = (id: string) => {
    return useQuery<any, any, any, any>({
        queryKey: [QUERY_KEYS.POST.POST, id],
        queryFn: async () => {
            return await getMdxPost(id)
        },
        initialData: () => {
            return {
                source: "",
                mdxContent: "",
                tags: [],
                title: "",
                category: "",
                categories: []
            }
        }
    })
}

const sendCreatePost = async (encPublicKey: KeyLike, token: string, userInfo: any, postData: PostRawCreate) => {
    const text = `---
title: ${postData.title}
category: ${postData.category}
tags: ${TAG_SEPARATOR}${postData.tags.join(TAG_SEPARATOR)}
---
${postData.text}`
    const postInfo: PostCreate = {
        author: userInfo._id,
        authorName: userInfo.name,
        summary: postData.title,
        text,
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
        queryKey: [QUERY_KEYS.POST.POST_LIST, RECENT_LIST_LIMIT],
        queryFn: async () => {
            return await getPostList({ limit: RECENT_LIST_LIMIT, offset: 0 })
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 10,
    })
}


export const usePostListInfinity = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.POST_LIST, DEFAULT_LIMIT],
        queryFn: async ({ pageParam = 0}) => {
            return await getPostList({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT })
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