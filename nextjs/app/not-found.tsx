import Link from 'next/link'
import { Text } from '@/components/Text/Text'
import { PageLayout } from '@/containers/layout/PageLayout'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { BorderBox } from '@/components/Box/BorderBox'
 
export default function NotFound() {
  return (
    <PageLayout className='flex flex-col items-center justify-center'>
        <ContentsLayout className='mt-4' tagType={BorderBox}>
            <Text h3>Not Found</Text>
            <Text p className='mt-4'>Could not find requested resource</Text>
            <Text span className='mt-4'>
                View <Link href="/">HOME</Link>
            </Text>
        </ContentsLayout>
    </PageLayout>
  )
}