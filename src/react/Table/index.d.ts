import React from "react";
import {IIcon} from "../../@types/icon";
import {IFrameworkStyle} from "src/@types/style";

export interface ITableHeader<T> extends IIcon {
    id: string
    title: string
    align?: "center" | "start" | "end"
    classes?: string
    body?: (data: T, id: string) => React.ReactNode
    filter?: boolean
}

export type ITablePagination = {
    elements: number
    pageTotal: number
    pageNumber: number
}

export type ITable<T> = {
    tableHeader: Array<ITableHeader<T>>
    tableDTO: Array<T & { id: any }>

    tableStyle?: "" | "bordered" | "borderless"
    tableSize?: "small" | "normal" | "large"
    tableClasses?: string
    tableSelect?: T & { id: any } | null
    tablePagination?: "auto" | ITablePagination
    frameworkStyle?: IFrameworkStyle

    tableOnSelect?(state: T & { id: any }): void
    tableOnFilter?(field: string, value: string, setLoad: React.Dispatch<boolean>): void
    tableOnPagination?(pageNumber: number): void
}
