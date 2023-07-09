'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import LoginRequired from '@/app/LoginRequired'
import { SettingTable } from '@/components/Table/SettingTable'
import { useAddSettingMutation, useSetting } from '@/data/query/setting/setting'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { TextInput } from '@/components/Input/TextInput'
import { Text } from '@/components/Text/Text'
import { Select } from '@/components/Select/Select'
import { CardBox } from '@/components/Box/CardBox'
import { Modal } from '@/components/Modal/Modal'
import { useTypes } from '@/data/query/info/info'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useRecoilState, useRecoilValue } from 'recoil'
import { settingTypeMapState } from '@/data/recoil/states/user'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth'


export interface SettingProps{
    id: string
}

export default function Setting (){
    const {data: settingData, isSuccess} = useSetting()
    const [showAdd, setShowAdd] = React.useState(false);
    const {data: typeData} = useTypes()
    const {mutate} = useAddSettingMutation()
    const queryClient = useQueryClient()
    console.log("settingData", settingData)

    const formik = useFormik({
        initialValues: {
            type: '',
            name: '',
            value: ''
        },
        validationSchema: Yup.object({
            type: Yup.string().required('설정 타입을 선택하세요'),
            name: Yup.string().max(64, "64자리 이하로 입력하세요").required('아이디를 입력하세요'),
            value: Yup.string().max(64, "64자리 이하로 입력하세요").required('비밀번호를 입력하세요')
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries([QUERY_KEYS.SETTING.DATA])
                    setShowAdd(false)
                }
            })
        }
    })
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
                <div className='flex justify-end'>
                    <PrimaryButton label="설정 추가" onClick={()=>setShowAdd(!showAdd)}/>
                </div>
                <Modal isShow={showAdd} onClose={()=>setShowAdd(!showAdd)}>
                    <div className='bg-white ring-slate-200 ring-1 p-4 rounded-lg w-auto inline-block'>
                        <form onSubmit={formik.handleSubmit}>
                            <Text span className="text-gray-500 block mb-1">설정 타입</Text>
                            <Select
                                inputProps={{
                                    ...formik.getFieldProps("type"),
                                }}
                                onItemSelect={(item) => {
                                    formik.setFieldValue("type", item.value)
                                }}
                                contextMenuProps={{
                                    className: "mt-2",
                                    tagType: CardBox,
                                    firstListItemProps: {
                                        className: "rounded-t-lg",
                                    },
                                    lastListItemProps: {
                                        className: "rounded-b-lg",
                                    },
                                    listProps: {
                                        className: "w-60",
                                    },
                                    listItemProps: {
                                        className: "w-60",
                                    },
                                    listItemsData: typeData && typeData.settingTypes.length ? typeData.settingTypes.map((item: any)=> ({
                                        id: item._id,
                                        value: item.name
                                    })) : []
                                }}
                            />
                            {
                                formik.touched.type && formik.errors.type? (
                                    <Text span className="text-red-500">{formik.errors.type}</Text>
                                ) : null
                            }
                            <Text span className="text-gray-500 block mb-1 mt-4">설정 이름</Text>
                            <TextInput {...formik.getFieldProps("name")} bgClassName='w-60' placeholder="설정 이름"/>
                            {
                                formik.touched.name && formik.errors.name? (
                                    <Text span className="text-red-500">{formik.errors.name}</Text>
                                ) : null
                            }
                            <Text span className="text-gray-500 block mb-1 mt-4">설정 값</Text>
                            <TextInput {...formik.getFieldProps("value")} bgClassName='w-60' placeholder="설정 값"/>
                            {
                                formik.touched.value && formik.errors.value? (
                                    <Text span className="text-red-500">{formik.errors.value}</Text>
                                ) : null
                            }
                            <div className='flex justify-end'>
                                <PrimaryButton onClick={() => setShowAdd(false)} className='mt-4' label="취소"/>
                                <PrimaryButton type='submit' className='mt-4 ml-4' label="추가"/>
                            </div>
                        </form>
                    </div>
                </Modal>
                {isSuccess?<SettingTable items={settingData ? settingData.list : []}/>:null}
            </LoginRequired>
        </>
    )
}