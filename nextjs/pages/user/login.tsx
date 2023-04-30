import { Text } from '@/components/Text/Text'
import { TextInput } from '@/components/Input/TextInput'
import { ContentsLayout } from '@/containers/Layout/ContentsLayout'
import React from 'react'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { PrimaryButton } from '@/components/Button/PrimaryButton'

export interface LoginProps{
}

export const Login = (props: LoginProps) => {
    return <>
        <ContentsLayout className='container mx-auto w-80 h-auto'>
            <Text h5 className="italic">Login</Text>
            <Text span className="text-gray-500 mt-8 block mb-1">아이디</Text>
            <TextInput/>
            <Text span className="text-gray-500 mt-2 block mb-1">비밀번호</Text>
            <PasswordInput/>
            <PrimaryButton className='w-full mt-8' label='로그인'/>
        </ContentsLayout>
    </>
}