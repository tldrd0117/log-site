'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import LoginRequired from '@/app/LoginRequired'
import { Table } from '@/components/Table/Table'
import { useSetting } from '@/data/query/setting/setting'


export interface SettingProps{
    id: string
}

export default function Setting (){
    const {data: settingData, isSuccess} = useSetting()
    console.log(settingData)
    return (
        <>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/setting",
                label: "Setting"
            }]}/>
            <LoginRequired>
                설정
                {isSuccess?<Table items={settingData.list}/>:null}
            </LoginRequired>
        </>
    )
}