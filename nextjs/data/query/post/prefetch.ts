import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/queryKeys"
import { getPost, getPostList, createPost } from "../../api/post"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"

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

export const prefetchPost = (id: string) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.POST, id], async () => {
        const mdxPost =  await getMdxPost(id)
        return mdxPost
    })
}

export const prefetchRecentPostList = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.POST_LIST], async () => {
        const list = await getPostList({ limit: RECENT_LIST_LIMIT, offset: 0})
        return {
            pages: [list],
            pageParams: [0]
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
