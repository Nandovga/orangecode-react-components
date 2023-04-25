import React from "react";
import {ITableHeader} from "../types";
import {GET_ICON} from "../../../ts/system";

/**
 * ACTION ≥ Monta o cabeçalho da TABELA
 * @param row
 * @param DTO
 * @param setDTO
 */
export function handleHeader<T>(row: ITableHeader<T>) {
    const cellProps = {
        key: row.id,
        className: `${row.align ? `text-${row.align}` : ""} ${row.classes ? `${row.classes}` : ``}`
    }
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <th {...cellProps}>
        <i className={GET_ICON(row.iconType) + row.icon}/>{row.title}
    </th>
}
