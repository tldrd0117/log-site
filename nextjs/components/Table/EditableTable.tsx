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
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table'
import { Select } from '../Select/Select'
import { INPUT_STYLE_TYPE } from '../Input/StylableInput'
import { CardBox } from '../Box/CardBox'
import { format } from 'date-fns'
import _ from 'lodash'
import { PrimaryButton } from '../Button/PrimaryButton'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    isEditable?: boolean
    onDeleteRow?: (rowIndex: number) => void
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    inputType?: string
    selectList?: any
  }
}

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: function Cell(cellProps){
    const { getValue, row: { index }, column: { id, getSize, columnDef}, table } = cellProps
    const initialValue = getValue()
    const inputType = columnDef?.meta?.inputType;
    const selectList = columnDef?.meta?.selectList;
    const [value, setValue]: any = useState(initialValue)
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }
    const onDeleteRow = () => {
        if(table.options.meta?.onDeleteRow)
            table.options.meta?.onDeleteRow(index)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if(!table.options.meta?.isEditable){
        let formatId = ""
        let formatValue = ""
        if(value !== undefined){
            formatId = typeof value === "string" ? value : value._id ? value._id : value.name
            formatValue = typeof value === "string" ? value : value.name
        }
        if(inputType === "calendarReadOnly"){
            return <div className='flex'>
                <p className='ml-2 h-full'>{format(new Date(formatValue), "yyyy-MM-dd")}</p>
            </div> 
        } else {
            return <div className='flex'>
                <p className='ml-2 h-full'>{formatValue}</p>
            </div>
        }

    } else {
        let formatId = ""
        let formatValue = ""
        if(value !== undefined){
            formatId = typeof value === "string" ? value : value._id ? value._id : value.name
            formatValue = typeof value === "string" ? value : value.name
        }
        if(inputType === "textReadOnly"){
            return <p className='ml-2'>{formatValue}</p>
        }
        else if(inputType === "select"){
            let selectedValue = {id: formatId, value: formatValue}
            return <Select 
                inputProps={{
                bgClassName: "w-20 ring-slate-200",
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
        else if(inputType === "calendarReadOnly"){
            return <p className='ml-2'>{format(new Date(formatValue), "yyyy-MM-dd")}</p>
        }
        else if(inputType === "deleteButton"){
            return <PrimaryButton label='삭제' onClick={() => onDeleteRow()} />
        }
        else {
            return (
                <input
                  className='pl-2'
                  style={{width: "100%"}}
                  value={formatValue}
                  onChange={e => setValue(e.target.value)}
                  onBlur={onBlur}
                />
              )
        }
    }

    
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

export interface TableProps<Type>{
    items: any
    columns: ColumnDef<Type>[]
    isEditable?: boolean
    onDeleteRow?: (rowIndex: number) => void
    setPagination: OnChangeFn<PaginationState>
}

// const columnHeader = (text: string) => {
//     return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
// }

export function EditableTable<Type>({ items, columns, isEditable, onDeleteRow, 
    setPagination}: TableProps<Type>) {

  const rerender = React.useReducer(() => ({}), {})[1]
  const displayData = (items: Array<Type>) => {
    return items//_.cloneDeep(items)
  }

  const [data, setData] = React.useState(() => items.list)
  const refreshData = () => setData(() => items.list)

  useEffect(() => {
    refreshData()
  }, [items.pageIndex])
  console.log(data)
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable<Type>({
    data,
    columns,
    defaultColumn,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    pageCount: items.pageCount,
    state: {
        pagination: { pageIndex: items.pageIndex, pageSize: items.pageSize },
    },
    manualPagination: true,
    meta: {
        isEditable: isEditable,
        updateData: (rowIndex, columnId, value) => {
            // Skip page index reset until after next rerender
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
        onDeleteRow: onDeleteRow
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
            value={table.getState().pagination.pageIndex + 1}
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
