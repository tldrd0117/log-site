import { parsePostText } from "@/data/post/util"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

export const convertMdxPost = async (post: any) => {
    let {text: source} = post
    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
            development: true,  
        },
        parseFrontmatter: true,
        
    }})
    return {
        id: post._id,
        source,
        mdxContent: content,
        tags: post.tags,
        title: post.title,
        category: post.category,
    }
}

export const convertList =async (result: any) => {
    result.list = result.list.map((item: any) => {
        const map = parsePostText(item.text)
        return {
            ...item,
            ...map
        }
    })
    return result
}