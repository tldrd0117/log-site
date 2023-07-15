import React from 'react'

//
import {
  ColumnDef, PaginationState,
} from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { roleTypeSelectList, settingTypeSelectList } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/info'
import { EditableTable } from '../../../components/Table/EditableTable'
import { useDeleteSettingsMutation, useSettingList } from '@/data/query/setting/setting'
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
    isEditable?: boolean
}

const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function SettingTable({ isEditable }: TableProps) {
    const {data: types} = useTypes()
    const settingTypes = useRecoilValue(settingTypeSelectList)
    const roleTypes = useRecoilValue(roleTypeSelectList)
    const {mutate} = useDeleteSettingsMutation()
    const queryClient = useQueryClient()
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const {data: items, isSuccess} = useSettingList(pagination)
    const onHandleDelete = (rowIndex: number) => {
        mutate({ids: [items.list[rowIndex]._id]}, {
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST])
            }
        })
    }

    const columns = React.useMemo<ColumnDef<Setting>[]>(
        () => {
            let columnData = [
            {
                accessorKey: 'type',
                header: () => columnHeader('type'),
                size: 80,
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "select",
                    selectList: settingTypes,
                },
            },
            {
                accessorKey: 'role',
                size: 80,
                header: () => columnHeader('role'),
                inputType: "select",
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "select",
                    selectList: roleTypes,
                },
            },
            {
                accessorKey: 'userId',
                size: 100,
                header: () =>  columnHeader('userId'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'name',
                header: () => columnHeader('name'),
                footer: (props: any) => props.column.id,
                
            },
            {
                accessorKey: 'value',
                header: () => columnHeader('value'),
                footer: (props: any) => props.column.id,
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
    {
        isSuccess?<EditableTable<Setting> 
            isEditable={isEditable} 
            items={items}
            columns={columns} 
            onDeleteRow={onHandleDelete}
            setPagination={setPagination}
            pageCount={items.pageCount}
        />: <p>loading</p>
    }
        
    </>

}
