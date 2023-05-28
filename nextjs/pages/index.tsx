
import { PageLayout } from '@/containers/Layout/PageLayout'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import { Text } from '@/components/Text/Text'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { FlexList } from '@/components/List/FlexList'
import { CardListItem } from '@/components/ListItem/CardListItem'
import { BorderBox } from '@/components/Box/BorderBox'
import dynamic from "next/dynamic";
import { FooterLayout } from '@/containers/Layout/FooterLayout'


const DynamicCalendarCart = dynamic(() => import('@/components/Chart/CalendarChart').then((module) => module.CalendarChart), { 
    loading: () => <p>loading...</p>,
    ssr: false
});


export default function Home({calendar, siteMap}: any) {
  return <>
    <PageLayout>
        <AppBar title={"BLOG"} login account join/>
        <ContentsLayout className='mt-4' tagType={BorderBox}>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }]}/>
            <Text className='mt-8' h5>Recent Post</Text>
            <FlexList className='flex-nowrap overflow-auto mt-4'>
            {
                [...Array(10).fill(0)].map((_, i) => {
                    return <CardListItem size='sm' key={"HOME"+i} title="title" subTitle="subTitle" summary="summary"/>
                })
            }
            </FlexList>
            <Text className='mt-8' h5>usage</Text>
            <DynamicCalendarCart data={calendar}/>
        </ContentsLayout>
        <FooterLayout className='mt-4'>
            <SiteMap source={siteMap}/>
        </FooterLayout>
    </PageLayout>
  </>
}


import fs from 'fs'
import { SiteMap } from '@/components/SiteMap/SiteMap'
import remarkGfm from 'remark-gfm'
import { serialize } from 'next-mdx-remote/serialize'

export async function getServerSideProps() {
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
    
    const source = fs.readFileSync('./pages/calendarExample.json', 'utf8')
    // const source = 'Some **mdx** text, with a component '
    const calendar = JSON.parse(source)
    return {
      props: {
        calendar,
        siteMap: mdxSource
      }
    }
}

