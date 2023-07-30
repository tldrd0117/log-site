import { CardBox } from "@/components/Box/CardBox";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { TextInput } from "@/components/Input/TextInput";
import { Modal } from "@/components/Modal/Modal";
import { Select } from "@/components/Select/Select";
import { Text } from '@/components/Text/Text'
import { QUERY_KEYS } from "@/data/query/common/constants";
import { useTypes } from "@/data/query/info/query";
import { useAddSettingMutation } from "@/data/query/setting/query";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';

export interface SettingModalProps {
    isShow: boolean
    onClose: () => void
}

export const SettingModal = ({isShow, onClose}: SettingModalProps) => {
    const queryClient = useQueryClient()
    const {mutate} = useAddSettingMutation()
    const {data: typeData} = useTypes()

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
                    queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST])
                    onClose()
                }
            })
        }
    })
    return <Modal isShow={isShow} onClose={()=>onClose()}>
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
                        tagtype: CardBox,
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
                    <PrimaryButton onClick={() => onClose()} className='mt-4' label="취소"/>
                    <PrimaryButton type='submit' className='mt-4 ml-4' label="추가"/>
                </div>
            </form>
        </div>
    </Modal>
}