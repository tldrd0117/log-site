import getQueryClient from "@/app/getQueryClient"
import { getPublicKey } from "../api/auth"
import { QUERY_KEYS } from "./common/queryKeys"
import { getPost, getPostList } from "../api/post"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"

const DEFAULT_LIMIT = 20;

const getMdxPost = async (id: string) => {
    const post: any = await getPost({_id: id})
    console.log("post", post)
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
    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
        },
        parseFrontmatter: true
    }})
    if(source.indexOf("---")>=0){
        source = source.slice(source.indexOf("---")+3)
        source = source.slice(source.indexOf("---")+3)
    }
    let tagStr = frontmatter.tags as string
    let tags: string[] = []
    if(tagStr && tagStr.indexOf("(((")){
        tags = (frontmatter.tags as string).split("(((").slice(1)
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

export const prefetchPost = (id: string) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.POST, id], async () => {
        const mdxPost =  await getMdxPost(id)
        return mdxPost
    })
}

export const usePost = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST.POST, id],
        queryFn: async () => {
            return await getMdxPost(id)
        }
    })
}

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