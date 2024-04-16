import React from "react";
import { IIcon } from "../../@types/icon";
import { IFrameworkStyle } from "../../@types/style";
import { ISelectData } from "../Form/Select";

export interface ITableHeader<T> extends IIcon {
    id: string
    title: string
    align?: "center" | "start" | "end"
    classes?: string
    style?: object
    body?: (data: T, id: string) => React.ReactNode

    filter?: boolean
    filterOptions?: Array<ISelectData & { disabled?: boolean }>
    sort?: boolean

    editor?: (options: ITableOptionsEdit<T>) => JSX.Element
}

export interface ITableDetail {
    id: number
    parent?: number
    children?: Array<any & ITableDetail>
    open?: boolean
    title?: string
    titleFormatter?: (title: string) => React.JSX
}

export type ITable<T> = {
    tableHeader: Array<ITableHeader<T>>
    tableDTO: Array<T & { id: any }>
    setTableDTO?: React.Dispatch<Array<T & { id: any }>>

    tableStyle?: "bordered" | "borderless"
    tableSize?: "small" | "large"
    tableClasses?: string
    tableEmptyValue?: string
    tableDetail?: boolean

    tableInit?: boolean
    tableOnInit?(value: boolean): void

    tableOptions?: boolean
    tableClassesOptions?: {
        box?: string
        create?: string
        edit?: string
        delete?: string
    }
    tableLegend?(): React.ReactNode
    tableOptionsDelete?(): void
    tableOptionsCreate?(): void
    tableOptionsRender?(): React.ReactNode

    tableEditMode?: "single"
    tableOnEdit?(tableDTO: Array<T & { id: any }> | T & { id: any }): void

    tableFilter?: { value: string, setValue: React.Dispatch<string>, field?: any, setField?: React.Dispatch<any> }
    tableFilterPosition?: "top" | "bottom"
    tableFilterStyle?: "field" | "all"
    tableOnFilter?(field: string, value: string, setLoad: React.Dispatch<boolean>, options?: any): void
    tableOnSort?(field: string, value: "asc" | "desc"): void
    tableOnDoubleClick?(): void

    tableSelect?: T & { id: any } | null
    tableOnSelect?(state: T & { id: any } | null): void
    tableSelectAuto?: boolean
    tableSelectTimeOut?: number
    tableSelectIndicatorClasse?: string

    tableMultiSelect?: Array<T & { id: any }>
    tableOnMultiSelect?(state: Array<T & { id: any }>): void

    tablePagination?: "auto" | ITablePagination
    tablePaginationAlign?: "end" | "center" | "start"
    tablePaginationRow?: 0 | 5 | 10 | 15 | 20 | 25 | 50 | 100
    tableOnPagination?: (pageNumber: number, pageElements?: number) => void

    frameworkStyle?: IFrameworkStyle
}

export type ITablePagination = {
    elements: number
    pageTotal: number
    pageNumber: number
}

export type ITableOptionsEdit<T> = {
    row: T & { id: any }
    value: any
    setValue: (value: any) => void
    onBlur?: () => void
}
