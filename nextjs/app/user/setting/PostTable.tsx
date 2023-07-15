import React from 'react'

//
import {
  ColumnDef,
} from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { roleTypeSelectList, settingTypeSelectList } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/info'
import { EditableTable } from '../../../components/Table/EditableTable'
import { useDeleteSettingsMutation } from '@/data/query/setting/setting'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth'

export type Setting = {
    _id: string
    type: any
    role: any
    userId: any
    name: string
    value: string
    createAt: string
    updateAt: string
}

export interface TableProps{
    items: Array<Setting>
    isEditable?: boolean
}

const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function PostTable({ items, isEditable }: TableProps) {
    const {data: types} = useTypes()
    const {mutate} = useDeleteSettingsMutation()
    const queryClient = useQueryClient() 
    const onHandleDelete = (rowIndex: number) => {
        mutate({ids: [items[rowIndex]._id]}, {
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.POST.POST_LIST])
            }
        })
    }

    const columns = React.useMemo<ColumnDef<Setting>[]>(
        () => {
            let columnData = [
            {
                accessorKey: 'author',
                header: () => columnHeader('type'),
                size: 80,
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'authorName',
                size: 80,
                header: () => columnHeader('role'),
                inputType: "select",
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'summary',
                size: 100,
                header: () =>  columnHeader('userId'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'text',
                header: () => columnHeader('name'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
                
            },
            {
                accessorKey: 'createAt',
                size: 100,
                header: () => columnHeader('createAt'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "calendarReadOnly"
                }
            },
            {
                accessorKey: 'updateAt',
                size: 100,
                header: () => columnHeader('updateAt'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "calendarReadOnly"
                }
            },
            {
                accessorKey: 'order',
                size: 100,
                header: () => columnHeader('updateAt'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            }
            ]
            if(isEditable){
                columnData = columnData.concat({
                    accessorKey: 'delete',
                    size: 100,
                    header: () => columnHeader('delete'),
                    footer: (props: any) => props.column.id,
                    meta: {
                        inputType: "deleteButton",
                    }
                })
            }
            return columnData
        },
        [isEditable]
    )
    return <>
        <EditableTable isEditable={isEditable} items={items} columns={columns} onDeleteRow={onHandleDelete} />
    </>

}
