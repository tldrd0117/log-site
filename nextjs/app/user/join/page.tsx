import { Text } from '@/components/Text/Text'
import { TextInput } from '@/components/Input/TextInput'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import React from 'react'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'

export interface JoinProps{
}

export default function Join (props: JoinProps) {
    return <>
        <PageLayout className='flex justify-center items-center'>
            <ContentsLayout tagType={BorderBox} className='w-96'>
                <Text h5 className="italic">Join</Text>
                <Text span className="text-gray-500 mt-8 block mb-1">이메일</Text>
                <TextInput/>
                <Text span className="text-gray-500 mt-2 block mb-1">닉네임</Text>
                <TextInput/>
                <Text span className="text-gray-500 mt-2 block mb-1">비밀번호</Text>
                <PasswordInput/>
                <Text span className="text-gray-500 mt-2 block mb-1">비밀번호 확인</Text>
                <PasswordInput/>
                <PrimaryButton className='w-full mt-8' label='가입'/>
            </ContentsLayout>
        </PageLayout>
    </>
}