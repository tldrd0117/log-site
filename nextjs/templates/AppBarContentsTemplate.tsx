import LoginRequired from "@/app/common/LoginRequired"
import { AppBar } from "@/components/AppBar/AppBar"
import { BorderBox } from "@/components/Box/BorderBox"
import { Breadcrumbs, LinkProps } from "@/components/Breadcrumbs/Breadcrumbs"
import { TopMenu } from "@/components/TopMenu/TopMenu"
import { ContentsLayout } from "@/containers/layout/ContentsLayout"
import { PageLayout } from "@/containers/layout/PageLayout"
import { ReactNode, Suspense } from "react"


export interface AppBarPageTemplateProps{
    children: ReactNode
}

export const AppBarContentsTemplate = ({children}: AppBarPageTemplateProps) => {
    return <>
        <div className="p-4">
            <AppBar title='BLOG'/>
            <TopMenu className="mt-4" items={[{
                title: "홈",
                path: "/"
            },{
                title: "리스트",
                path: "post/list"
            },{
                title: "글작성",
                path: "post/write"
            }]}></TopMenu>
            <ContentsLayout tagtype={BorderBox} className='mt-4'>
                <Suspense fallback={<p>loading...</p>}>
                    {children}
                </Suspense>
            </ContentsLayout>
        </div>
    </>
}