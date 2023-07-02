import LoginRequired from "@/app/LoginRequired"
import { AppBar } from "@/components/AppBar/AppBar"
import { BorderBox } from "@/components/Box/BorderBox"
import { Breadcrumbs, LinkProps } from "@/components/Breadcrumbs/Breadcrumbs"
import { ContentsLayout } from "@/containers/layout/ContentsLayout"
import { PageLayout } from "@/containers/layout/PageLayout"
import { ReactNode, Suspense } from "react"


export interface AppBarPageTemplateProps{
    children: ReactNode
}

export const AppBarContentsTemplate = ({children}: AppBarPageTemplateProps) => {
    return <>
        <ContentsLayout tagType={BorderBox} className='mt-4'>
            <Suspense fallback={<p>loading...</p>}>
                {children}
            </Suspense>
        </ContentsLayout>
    </>
}