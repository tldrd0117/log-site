'use client'
import React from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { SettingTable } from '@/app/user/setting/SettingTable'
import { DynamicLoginRequired } from '@/app/common/DynamicLoginRequired'
import { PostTable } from './PostTable'
import { CategoryTable } from './CategoryTable'


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
                <CategoryTable/>
                <PostTable/>
                <SettingTable />
            </DynamicLoginRequired>
        </>
    )
}