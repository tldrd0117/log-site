'use client'
import React, { ReactNode, useContext } from 'react'
import { AppBar } from '@/components/AppBar/AppBar'
import { ContentsLayout } from '@/containers/layout/ContentsLayout'
import { PageLayout } from '@/containers/layout/PageLayout'
import { BorderBox } from '@/components/Box/BorderBox'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Text } from '@/components/Text/Text'
import { TagInput } from '@/components/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/Input/StylableInput'
import { useDeletePostListMutation, usePost } from '@/data/query/post/query'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/data/recoil/states/user'
import { ConfirmDeleteModal } from '../common/fragments/ConfirmDeleteModal'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth'
import { POST_LIST } from '@/data/query/common/constants'
import { set } from 'date-fns'


export interface PostProps{
    id: string
}

export default function Post ({id}: PostProps){
    const {data} = usePost(id)
    const queryClient = useQueryClient()
    const userInfo = useRecoilValue(userInfoState)
    const router = useRouter()
    let {
        source,
        mdxContent,
        tags,
        title,
        category,
    }: any = data

    console.log(data)

    const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)

    const { mutate } =  useDeletePostListMutation()

    const handleOnClickEdit = () => {
        router.push(`/post/write/${id}`)
    }

    const handleOnClickDelete = () => {
        setIsShowDeleteModal(true)
    }

    const handleDeleteConfirm = () => {
        mutate([{_id: data._id}], {
            onSuccess: async () => {
                setIsShowDeleteModal(false)
                setTimeout(() => {
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.POST.LIST],
                    })
                    router.push('/post/list')
                }, 500)
                
            }
        })
    }

    return (
        <>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/post/list",
                label: "PostList"
            }, {
                href: "/post/list",
                label: "title"
            }]}/>
            {
                userInfo?._id === data?.author?._id ? <>
                    <div className='flex justify-end'>
                        <PrimaryButton className='mt-4' label='수정' onClick={handleOnClickEdit}/>
                        <PrimaryButton className='mt-4 ml-4' label='삭제' onClick={handleOnClickDelete}/>
                    </div>
                </>: null
            }
            {
                isShowDeleteModal? <ConfirmDeleteModal isShow={isShowDeleteModal} 
                    onClose={() => setIsShowDeleteModal(false)} 
                    onConfirm={handleDeleteConfirm}/>: null
            }
            
            <div className ={"prose mt-16 mx-auto"}>
                <Text h3>{title}</Text>
                <Text p>{category?.name}</Text>
                <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tags?.map((item:any) => item.name)} readOnly/>
                {
                    mdxContent
                }
            </div>
        </>
    )
}