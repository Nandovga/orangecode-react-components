import React from "react";
import {ITable, ITableHeader} from "../types";

/**
 * ACTION ≥ Monta o conteúdo da TABELA
 * @param row
 * @param props
 */
export function handleContent<T>(
    row: T & { id: any },
    props: ITable<T>
) {
    let select = !props.tableSelect ? false : props.tableSelect?.id === row.id

    let renderSelect = () => {
        return props.tableOnSelect && props.tableSelect !== undefined
            ? <td className={"text-center bg-light " + (select ? "bg-light" : "")}
                  style={{width: "0px"}}>
                {select ? <i className="bi bi-caret-right-fill"/> : ''}
            </td> : null
    }

    let renderCell = (header: ITableHeader<T>) => {
        const {id, body, align} = header
        const cellProps = {
            key: `${row.id}-${id}`,
            className: `${!align ? "" : "text-" + align} ${select ? "fw-bold bg-light" : ""}`,
            style: {cursor: !props.tableOnSelect ? "initial" : "pointer"}
        }
        return <td {...cellProps}>{body ? body(row, id) : row[id]}</td>
    }

    const rowProps = {
        key: row.id,
        onClick: () => props.tableOnSelect ? props.tableOnSelect(row) : null
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <tr {...rowProps}>
        {renderSelect()}
        {props.tableHeader.map(header => renderCell(header))}
    </tr>
}
