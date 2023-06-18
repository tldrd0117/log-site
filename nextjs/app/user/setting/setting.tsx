'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'


export interface SettingProps{
    id: string
}

export default function Setting (){
    return (
        <>
            <PageLayout>
                <AppBar title='blog'/>
                <ContentsLayout tagType={BorderBox} className='mt-4'>
                    <Breadcrumbs items={[{
                        href: "/",
                        label: "Home"
                    }, {
                        href: "/setting",
                        label: "Setting"
                    }]}/>
                    설정
                </ContentsLayout>
            </PageLayout>
        </>
    )
}