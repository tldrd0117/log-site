'use client'
import React from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { SettingTable } from '@/app/user/setting/fragments/SettingTable'
import { DynamicLoginRequired } from '@/app/common/DynamicLoginRequired'
import { PostTable } from '@/app/user/setting/fragments/PostTable'
import { CategoryTable } from '@/app/user/setting/fragments/CategoryTable'
import { Text } from '@/components/Text/Text'


export interface SettingProps{
    id: string
}

export default function Setting (){
    const SETTING_PAGE_SIZE = 20;

    return (
        <>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/setting",
                label: "Setting"
            }]}/>
            <DynamicLoginRequired>
                <Text className='mt-8' h5>카테고리</Text>
                <CategoryTable/>
                <Text className='mt-8' h5>포스트</Text>
                <PostTable/>
                <Text className='mt-8' h5>설정</Text>
                <SettingTable />
            </DynamicLoginRequired>
        </>
    )
}