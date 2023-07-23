
import { serialize } from 'next-mdx-remote/serialize'
import { Home } from './home'
import remarkGfm from 'remark-gfm'
import { AppBarContentsTemplate } from '@/templates/AppBarContentsTemplate'
import { prefetchRecentPostList } from '@/data/query/post/prefetch'
import { prefetchVisit } from '@/data/query/visit/prefetch'
import { VISIT_TARGET } from '@/data/query/common/constants'
import { prefetchPublicKey } from '@/data/query/auth'
import { VisitRecord } from './common/VisitRecord'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getQueryClient from './getQueryClient'

export default async function HomePage() {
    await prefetchPublicKey()
    await prefetchRecentPostList()
    await prefetchVisit(VISIT_TARGET.BLOG)
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <AppBarContentsTemplate>
                <VisitRecord>
                    <Home/>
                </VisitRecord>
            </AppBarContentsTemplate>
        </Hydrate>
    </>
}
