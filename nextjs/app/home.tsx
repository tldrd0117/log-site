'use client'
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
import { DynamicCalendarCart } from './DynamicCalendarCart'

export function Home({ data }: any) {
    const { calendar, siteMap}: any = data
    return <>
        <PageLayout>
            <AppBar title={"BLOG"}  />
            <ContentsLayout className='mt-4' tagType={BorderBox}>
                <p>app</p>
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
