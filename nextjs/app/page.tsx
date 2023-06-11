
import { PageLayout } from '@/containers/layout/PageLayout'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { Text } from '@/components/Text/Text'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { FlexList } from '@/components/List/FlexList'
import { CardListItem } from '@/components/ListItem/CardListItem'
import { BorderBox } from '@/components/Box/BorderBox'
import { FooterLayout } from '@/containers/layout/FooterLayout'
import { SiteMap } from '@/components/SiteMap/SiteMap'
import remarkGfm from 'remark-gfm'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import { DynamicCalendarCart } from './DynamicCalendarCart'
import { LOGIN_STATE, useLoginState } from '@/data/hooks/user'
import { Home } from './home'
import getQueryClient from './getQueryClient'

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
            - [Post Detail](/post/[:id])
            - [Post Write](/post/write)
        - User
            - [Login](/user/login)
            - [Join](/user/join)
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

