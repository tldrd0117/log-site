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
import { useRecentPostList } from '@/data/query/post/post'
import { useRouter } from 'next/navigation'

export function Home({ data }: any) {
    const { calendar, siteMap}: any = data
    const { data: recentPostList} = useRecentPostList()
    const router = useRouter()

    const handleItemClick = (id: string) => {
        console.log(id)
        router.push(`/post/${id}`)
    }
    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }]}/>
        <Text className='mt-8' h5>Recent Post</Text>
        <FlexList className='flex-nowrap overflow-auto mt-4'>
        {
            recentPostList?.list.map((item: any) => {
                return <>
                    <CardListItem onClick={() => handleItemClick(item._id)} key={item._id} title={item.summary} subTitle={item.createAt} summary={item.authorName}/>
                </>
            })
        }
        </FlexList>
        <Text className='mt-8' h5>usage</Text>
        <DynamicCalendarCart data={calendar}/>
    </>
}
