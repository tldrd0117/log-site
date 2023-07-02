'use client'

import { Text } from '@/components/Text/Text'
import { TextInput } from '@/components/Input/TextInput'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import React, { use, useEffect } from 'react'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { LOGIN_STATE, useLoginMutation, useLoginState } from '@/data/query/user'

export interface LoginProps{
}

export default function Login (props: LoginProps) {
    const { mutate, error, isError, isIdle, isPaused } = useLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('이메일 형식이 아닙니다').required('아이디를 입력하세요'),
            password: Yup.string().min(8, "8자리 이상 입력하세요").max(30, "30자리 이상 입력하세요")
                .required('비밀번호를 입력하세요')
        }),
        onSubmit: values => {
            mutate(values)
            console.log("submit",values, error, isError, isPaused)
        }
    })
    return <>
        <form onSubmit={formik.handleSubmit}>
            <Text h5 className="italic">Login</Text>
            <Text span className="text-gray-500 mt-8 block mb-1">이메일</Text>
            <TextInput {...formik.getFieldProps("email")}/>
            {
                formik.touched.email && formik.errors.email? (
                    <Text span className="text-red-500">{formik.errors.email}</Text>
                ) : null
            }
            <Text span className="text-gray-500 mt-2 block mb-1">비밀번호</Text>
            <PasswordInput {...formik.getFieldProps("password")}/>
            {
                formik.touched.password && formik.errors.password? (
                    <Text span className="text-red-500">{formik.errors.password}</Text>
                ) : null
            }
            {
                isError? <Text span className="text-red-500 mt-4 block">{error.message}</Text> : null
            }
            <PrimaryButton type='submit' className='w-full mt-8' label='로그인'/>
        </form>
    </>
}