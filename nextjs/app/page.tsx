
import { serialize } from 'next-mdx-remote/serialize'
import { Home } from './home'
import remarkGfm from 'remark-gfm'

export default async function HomePage() {
    const data = await getData()
    return <>
        <Home data={data}/>
    </>
}

async function getData() {
    const data =`
        - [Home](/)
        - Post
            - [Post List](/post/list)
            - [Post Detail](/post/example.mdx)
            - [Post Write](/post/write)
        - User
            - [Login](/user/login)
            - [Join](/user/join)
            - [Setting](/user/setting)
    `

// | [Home](/)                | Post          | User           |
// | -----------------------  | ------------ | ------------------ |
// |                          | [Post List](/post/list)  | [Login](/user/login)       |
// |                          | [Post Detail](/post/[:id])   | [Join](/user/join) |
// |                          | [Post Write](/post/write) |       |
    const mdxSource = await serialize(data, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: []
        },
        parseFrontmatter: true
    })
    
    const source = await fetch(`http://localhost:3000/calendarExample.json`).then(res => res.text())
    // const source = 'Some **mdx** text, with a component '
    console.log(source)
    const calendar = JSON.parse(source)
    return {
        calendar,
        siteMap: mdxSource
    }
}

