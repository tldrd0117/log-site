'use client'
import { Text } from '@/components/Text/Text'
import { TextInput } from '@/components/Input/TextInput'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import React from 'react'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useJoinMutation } from '@/data/hooks/user'

export interface JoinProps{
}

export default function Join (props: JoinProps) {
    const { mutate, error, isError } = useJoinMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('이메일 형식이 아닙니다').required('아이디를 입력하세요'),
            name: Yup.string().min(2, "2자리 이상 입력하세요").max(30, "30자리 이하로 입력하세요").required('닉네임을 입력하세요'),
            password: Yup.string().min(8, "8자리 이상 입력하세요").max(30, "30자리 이하로 입력하세요")
                .required('비밀번호를 입력하세요'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다')
        }),
        onSubmit: values => {
            mutate(values)
            console.log("submit",values)
        }
    })
    return <>
        <PageLayout className='flex justify-center items-center'>
            <ContentsLayout tagType={BorderBox} className='w-96'>
                <form onSubmit={formik.handleSubmit}>
                    <Text h5 className="italic">Join</Text>
                    <Text span className="text-gray-500 mt-8 block mb-1">이메일</Text>
                    <TextInput {...formik.getFieldProps("email")}/>
                    {
                        formik.touched.email && formik.errors.email? (
                            <Text span className="text-red-500">{formik.errors.email}</Text>
                        ) : null
                    }
                    <Text span className="text-gray-500 mt-2 block mb-1">닉네임</Text>
                    <TextInput {...formik.getFieldProps("name")}/>
                    {
                        formik.touched.name && formik.errors.name? (
                            <Text span className="text-red-500">{formik.errors.name}</Text>
                        ) : null
                    }
                    <Text span className="text-gray-500 mt-2 block mb-1">비밀번호</Text>
                    <PasswordInput {...formik.getFieldProps("password")}/>
                    {
                        formik.touched.password && formik.errors.password? (
                            <Text span className="text-red-500">{formik.errors.password}</Text>
                        ) : null
                    }
                    <Text span className="text-gray-500 mt-2 block mb-1">비밀번호 확인</Text>
                    <PasswordInput {...formik.getFieldProps("passwordConfirm")}/>
                    {
                        formik.touched.passwordConfirm && formik.errors.passwordConfirm? (
                            <Text span className="text-red-500">{formik.errors.passwordConfirm}</Text>
                        ) : null
                    }
                    {
                        isError? <Text span className="text-red-500 mt-4 block">{error.message}</Text> : null
                    }
                    <PrimaryButton type='submit' className='w-full mt-8' label='가입'/>
                </form>
            </ContentsLayout>
        </PageLayout>
    </>
}