import React from 'react'

//
import {
  ColumnDef, PaginationState,
} from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { roleTypeSelectList, settingTypeSelectList } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/query'
import { EditableTable } from '@/components/Table/EditableTable'
import { useDeleteSettingsMutation, useSettingList, useUpdateSettingListMutation } from '@/data/query/setting/query'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { SettingModal } from './SettingModal'
import _ from 'lodash'

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

const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function SettingTable() {
    const {data: types} = useTypes()
    const settingTypes = useRecoilValue(settingTypeSelectList)
    const roleTypes = useRecoilValue(roleTypeSelectList)
    const [showAdd, setShowAdd] = React.useState(false);
    const [isEditable, setIsEditable] = React.useState(false);
    const {mutate} = useDeleteSettingsMutation()
    const {mutate: putMutate} = useUpdateSettingListMutation()
    const queryClient = useQueryClient()
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const {data: items, isSuccess} = useSettingList(pagination)
    const onHandleDelete = (rowIndex: number) => {
        mutate({ids: [items.list[rowIndex]._id]}, {
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST, pagination])
            }
        })
    }
    
    const [modifyItems, setModifyItems] = React.useState<string[]>([])

    const onHandleChange = (rowIndex: number, id: string, value: string) => {
        console.log("change",items['list'][rowIndex][id], value)
        items['list'][rowIndex][id] = value
        const data = items['list'][rowIndex]
        if(!modifyItems.includes(data._id)){
            setModifyItems([...modifyItems, data._id])
        }
    }

    const onHandleChangeComplete = () => {
        if(isEditable){
            const target = modifyItems.map( (id: string) => {
                const item = _.cloneDeep(items.list.find((item: Setting) => item._id === id))
                item.type = item.type._id
                item.role = item.role._id
                item.userId = item.userId._id
                delete item.__v
                delete item.createAt
                delete item.updateAt
                return item
            })
            console.log(target)
            putMutate({list: target}, {
                onSuccess: () => {
                    setModifyItems([])
                    queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST, pagination])
                }
            })
        }
        setIsEditable(!isEditable)
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
        <div className='flex justify-end'>
            <PrimaryButton label="설정 추가" onClick={()=>setShowAdd(true)}/>
            <PrimaryButton className='ml-4' label={isEditable?"수정 완료": "설정 수정"} onClick={()=>onHandleChangeComplete()}/>
        </div>
        <SettingModal isShow={showAdd} onClose={()=>setShowAdd(false)}/>
        {
            isSuccess?<EditableTable<Setting> 
                isEditable={isEditable} 
                items={items}
                columns={columns} 
                onDeleteRow={onHandleDelete}
                onChangeRow={onHandleChange}
                setPagination={setPagination}
            />: <p>loading</p>
        }
    </>

}