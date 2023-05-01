import { Text } from '@/components/Text/Text'
import { TextInput } from '@/components/Input/TextInput'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import React from 'react'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { PageLayout } from '@/containers/Layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'

export interface LoginProps{
}

export default function Login (props: LoginProps) {
    return <>
        <PageLayout className='flex justify-center items-center'>
            <ContentsLayout tagType={BorderBox} className='w-80'>
                <Text h5 className="italic">Login</Text>
                <Text span className="text-gray-500 mt-8 block mb-1">아이디</Text>
                <TextInput/>
                <Text span className="text-gray-500 mt-2 block mb-1">비밀번호</Text>
                <PasswordInput/>
                <PrimaryButton className='w-full mt-8' label='로그인'/>
            </ContentsLayout>
        </PageLayout>
    </>
}