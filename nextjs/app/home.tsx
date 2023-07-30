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
import { useRecentPostList } from '@/data/query/post/query'
import { useRouter } from 'next/navigation'
import { usePopularVisit, useVisit } from '@/data/query/visit/query'
import { VISIT_TARGET, VISIT_TYPES } from '@/data/query/common/constants'
import { parseISO } from 'date-fns'
import { TagInput } from '@/components/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/Input/StylableInput'

export function Home() {
    const { data: recentPostList, isFetching} = useRecentPostList()
    const { data: tags} = usePopularVisit(500, VISIT_TYPES.TAG)
    const { data: categories} = usePopularVisit(30, VISIT_TYPES.CATEGORY)
    const { data: posts} = usePopularVisit(10, VISIT_TYPES.POST)
    const { data: calendar } = useVisit(VISIT_TARGET.TODAY, VISIT_TYPES.BLOG)
    const router = useRouter()
    console.log(posts)
    const handleItemClick = (id: string) => {
        router.push(`/post/${id}`)
        
    }
    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }]}/>
        <Text className='mt-8' h5>최신 포스트</Text>
        {
            <FlexList className='flex-nowrap overflow-auto mt-4'>
            {
                recentPostList?.list?.map((item: any) => {
                    return <CardListItem onClick={() => handleItemClick(item._id)} 
                        key={item._id} 
                        title={item.title} 
                        date={parseISO(item.createAt)}
                        tags={item.tags.map((tag:any) => tag.name)}
                        author={item.authorName}/>
                })
            }
            </FlexList>
        }
        <Text className='mt-8' h5>인기 포스트</Text>
        {
            <FlexList className='flex-nowrap overflow-auto mt-4'>
            {
                posts?.map((post: any) => {
                    const item = post.target
                    console.log(item)
                    return <CardListItem onClick={() => handleItemClick(item._id)} 
                        key={item._id} 
                        title={item.title} 
                        date={parseISO(item.createAt)}
                        tags={item.tags.map((tag:any) => tag.name)}
                        author={item.authorName}/>
                })
            }
            </FlexList>
        }
        <Text className='mt-8' h5>인기 카테고리</Text>
        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" 
            tagValue={categories?.map((item:any) => item.target.name)} readOnly/>
        <Text className='mt-8' h5>인기 태그</Text>
        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" 
            tagValue={tags?.map((item:any) => item.target.name)} readOnly/>
        
        <Text className='mt-8' h5>방문자</Text>
        <DynamicCalendarCart data={calendar}/>
    </>
}
