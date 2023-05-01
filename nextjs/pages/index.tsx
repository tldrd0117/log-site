import Image from 'next/image'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

import { GetServerSideProps } from 'next'
import { PageLayout } from '@/containers/Layout/PageLayout'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import { Text } from '@/components/Text/Text'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { FlexList } from '@/components/List/FlexList'
import { CardListItem } from '@/components/ListItem/CardListItem'
import { BorderBox } from '@/components/Box/BorderBox'
import dynamic from "next/dynamic";
import { serialize } from 'next-mdx-remote/serialize'


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
                [...Array(10)].map((_, i) => {
                    return <>
                        <CardListItem size='sm' key={"HOME"+i} title="title" subTitle="subTitle" summary="summary"/>
                    </>
                })
            }
            </FlexList>
            <Text className='mt-8' h5>usage</Text>
            <DynamicCalendarCart data={calendar}/>
            <Text className='mt-8' h5>Site Map</Text>
            <SiteMap source={siteMap}/>
        </ContentsLayout>
    </PageLayout>
  </>
}


import fs from 'fs'
import { SiteMap } from '@/components/SiteMap/SiteMap'

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
    const mdxSource = await serialize(data)
    
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

