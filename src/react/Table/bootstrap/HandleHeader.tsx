import React from "react";
import { handleSort } from "./HandleSort";
import { GET_ICON } from "../../../ts/system";
import { ITable, ITableHeader } from "../types";

/**
 * ACTION ≥ Monta o cabeçalho da TABELA
 * @param row
 * @param props
 * @param setDTO
 * @param paginationRef
 */
export function handleHeader<T>(
    row: ITableHeader<T>,
    props: ITable<T>,
    setDTO: React.Dispatch<Array<T & { id: any }>>,
    paginationRef: any
) {
    const cellProps = {
        key: row.id,
        className: `${row.align ? `text-${row.align}` : ""} ${row.classes ? `${row.classes}` : ""}`,
        style: row.style,
        name: row.id
    };
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <th {...cellProps}>
        <i className={GET_ICON(row.iconType) + row.icon}/>{row.title}
        {row.sort ? <a className="ms-1 fs-6"
                       data-name="sort"
                       data-sort=""
                       href="#"
                       onClick={event => {
                           event.preventDefault();
                           handleSort(!props.tableOnSort ? "auto" : "manual", row.id, props, setDTO, paginationRef);
                       }}><i className="bi bi-filter"/></a> : null}
    </th>;
}
