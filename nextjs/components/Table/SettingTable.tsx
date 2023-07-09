import React, { useEffect, useState } from 'react'

//
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  ColumnSizing,
} from '@tanstack/react-table'
import { Select } from '../Select/Select'
import { INPUT_STYLE_TYPE } from '../Input/StylableInput'
import { CardBox } from '../Box/CardBox'
import { SelectCalendar } from '../Select/SelectCalendar'
import { format } from 'date-fns'
import { useRecoilValue } from 'recoil'
import { roleTypeMapState, settingTypeMapState } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/info'
import { BasicTypes } from '@/data/api/interfaces/common'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<Setting>> = {
  cell: function Cell({ getValue, row: { index }, column: { id, getSize }, table }){
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue]: any = useState(initialValue)
    const {data: typeData} = useTypes()

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    const selecTypeId = ["type", "role"]
    const calendarTypeId = ["createAt", "updateAt"]
    if(id==="userId"){
        return <p>{value.name}</p>
    }
    if(selecTypeId.includes(id)){
        let selectList = [], selectedValue = {id: value as string, value: value as string}
        console.log(typeData)
        if(id === "type"){
            selectList = typeData?.settingTypes.map((type: BasicTypes) => ({
                id: type._id,
                value: type.name
            }))
            selectedValue = {id: value._id, value: value.name}
        }
        if(id === "role"){
            selectList = typeData?.roleTypes.map((type: BasicTypes) => ({
                id: type._id,
                value: type.name
            }))
            selectedValue = {id: value._id, value: value.name}
        }
        return <Select 
            inputProps={{
            bgClassName: "mt-4 w-20 ring-slate-200",
            placeholder: "카테고리",
            inputStyleType: INPUT_STYLE_TYPE.OUTLINE,
            inputClassName: "w-20 pl-2",
        }} contextMenuProps={{
            className: "mt-2",
            tagType: CardBox,
            firstListItemProps: {
                className: "rounded-t-lg",
            },
            lastListItemProps: {
                className: "rounded-b-lg",
            },
            listProps: {
                className: "w-20",
            },
            listItemProps: {
                className: "w-20",
            },
            listItemsData: selectList
        }}
        selected={selectedValue}
        />
    }
    if(calendarTypeId.includes(id)){
        return <p>{format(new Date(value as string), "yyyy-MM-dd")}</p>
    }
    return (
      <input
        className='pl-2'
        style={{width: "100%"}}
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

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
}

const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function SettingTable({ items }: TableProps) {
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Setting>[]>(
    () => [
          {
            accessorKey: 'type',
            header: () => columnHeader('type'),
            size: 80,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'role',
            size: 80,
            header: () => columnHeader('role'),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'userId',
            size: 100,
            header: () =>  columnHeader('userId'),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'name',
            header: () => columnHeader('name'),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'value',
            header: () => columnHeader('value'),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'createAt',
            size: 100,
            header: () => columnHeader('createAt'),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'updateAt',
            size: 100,
            header: () => columnHeader('updateAt'),
            footer: props => props.column.id,
          },
    ],
    []
  )
  const settingTypeMap = useRecoilValue(settingTypeMapState)
  const roleTypeMap = useRecoilValue(roleTypeMapState)

  const displayData = (items: Array<Setting>) => {
    return items.map((item) => {
        // if(item.type){
        //     item.type = {
        //         id: item.type._id,
        //         value: item.type.name
        //     }
        // }
        // if(item.role){
        //     item.role = {
        //         id: item.role._id,
        //         value: item.role.name
        //     }
        // }
        // if(item.userId)
        //     item.userId = item.userId.name
        return item
    })
  }

  const [data, setData] = React.useState(() => displayData(items))
  const refreshData = () => setData(() => displayData(items))

  useEffect(() => {
    refreshData()
  },[items.length])

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    debugTable: true,
  })

  return (
    <div className="p-2 block max-w-full overflow-x-auto overflow-y-hidden">
        <div className="h-2" />
      <table className='w-full border-x-0'>
        <thead className='bg-slate-100'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-x-0'>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} 
                    colSpan={header.colSpan}
                    className='border-x-0 h-12'
                    style={{ position: 'relative', width: header.getSize() }}
                    >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }} className='h-12'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div className='hidden'>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div className=''>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </div>
  )
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-full border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-full border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-full border shadow rounded"
    />
  )
}

