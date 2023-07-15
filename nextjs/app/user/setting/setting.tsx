'use client'
import React from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { SettingTable } from '@/app/user/setting/SettingTable'
import { useSettingListInfinity } from '@/data/query/setting/setting'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { TextInput } from '@/components/Input/TextInput'
import { Select } from '@/components/Select/Select'
import { CardBox } from '@/components/Box/CardBox'
import { Modal } from '@/components/Modal/Modal'
import { useTypes } from '@/data/query/info/info'
import { useFormik } from 'formik'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth'
import { SettingModal } from './SettingModal'
import dynamic from 'next/dynamic'
import { DynamicLoginRequired } from '@/app/common/DynamicLoginRequired'


export interface SettingProps{
    id: string
}

export default function Setting (){
    const SETTING_PAGE_SIZE = 20;
    const [showAdd, setShowAdd] = React.useState(false);
    const [isEditable, setIsEditable] = React.useState(false);

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
                <div className='flex justify-end'>
                    <PrimaryButton label="설정 추가" onClick={()=>setShowAdd(true)}/>
                    <PrimaryButton label="설정 수정" onClick={()=>setIsEditable(!isEditable)}/>
                </div>
                <SettingModal isShow={showAdd} onClose={()=>setShowAdd(false)}/>
                <SettingTable isEditable={isEditable}/>
            </DynamicLoginRequired>
        </>
    )
}