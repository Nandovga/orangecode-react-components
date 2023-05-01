import React from "react";
import {IIcon} from "../../@types/icon";
import {IFrameworkStyle} from "../../@types/style";
import {ISelectData} from "../Form/Select";

export interface ITableHeader<T> extends IIcon {
    id: string
    title: string
    align?: "center" | "start" | "end"
    classes?: string
    style?: object
    body?: (data: T, id: string) => React.ReactNode
    filter?: boolean
    filterOptions?: Array<ISelectData & {disabled?: boolean}>
    sort?: boolean
}

export type ITable<T> = {
    tableHeader: Array<ITableHeader<T>>
    tableDTO: Array<T & { id: any }>

    tableStyle?: "bordered" | "borderless"
    tableSize?: "small" | "large"
    tableClasses?: string
    tableEmptyValue?: string
    tableOnFilter?(field: string, value: string, setLoad: React.Dispatch<boolean>, options?: any): void
    tableOnSort?(field: string, value: "asc" | "desc"): void

    tableSelect?: T & { id: any } | null
    tableOnSelect?(state: T & { id: any } | null): void

    tablePagination?: "auto" | ITablePagination
    tablePaginationAlign?: "end" | "center" | "start"
    tablePaginationRow?: 5 | 10 | 25 | 50 | 100
    tableOnPagination?: (pageNumber: number) => void

    frameworkStyle?: IFrameworkStyle
}

export type ITablePagination = {
    elements: number
    pageTotal: number
    pageNumber: number
}
