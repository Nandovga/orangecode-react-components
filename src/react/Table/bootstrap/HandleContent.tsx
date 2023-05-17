import React from "react";
import {ITable, ITableHeader} from "../types";
import {handleContentEditor} from "./HandleContentEditor";

/**
 * ACTION ≥ Monta o conteúdo da TABELA
 * @param row
 * @param props
 * @param tableEdit
 * @param tableDTO
 */
export function handleContent<T>(
    row: T & { id: any },
    props: ITable<T>,
    tableEdit: {
        edit: null | T & { id: any }
        editField: string
        setEdit: React.Dispatch<null | T & { id: any }>
        setEditField: React.Dispatch<string>
    },
    tableDTO: {
        data: Array<T & { id: any }>,
        setData?: React.Dispatch<Array<T & { id: any }>>
    }
) {
    let select = !props.tableSelect ? false : props.tableSelect?.id === row.id

    const rowProps = {
        key: row.id,
        onClick: () => props.tableOnSelect ? props.tableOnSelect(row) : null,
        onDoubleClick: () => props.tableOnDoubleClick ? props.tableOnDoubleClick() : null
    }

    let renderSelect = () => {
        if (!props.tableOnSelect || props.tableSelect === undefined)
            return null;
        return <td className={"text-center bg-light " + (select ? "bg-light" : "")}
                   style={{width: "0px"}}>{select ? <i className="bi bi-caret-right-fill"/> : ''}</td>
    }

    let renderCell = (header: ITableHeader<T>) => {
        const {id, body, align, classes} = header
        const cellProps = {
            key: `${row.id}-${id}`,
            className: `${!align ? "" : "text-" + align} ${select ? "fw-bold bg-light" : ""} ${!classes ? "" : classes}`,
            style: {cursor: !props.tableOnSelect ? "initial" : "pointer", verticalAlign: "middle"}
        }
        return tableEdit.edit?.id === row.id && header.editor && tableEdit.editField === header.id
            ? <td key={`${row.id}-${id}`}>{header.editor({
                row: row,
                value: row[tableEdit.editField],
                setValue: value => handleContentEditor({data: tableDTO.data, setData: tableDTO.setData}, {
                    edit: row,
                    field: tableEdit.editField
                }, value),
                onBlur: () => {
                    tableEdit.setEditField("")
                    if (!props.tableOnEdit || props.tableEditMode !== "single")
                        return;
                    let indice = tableDTO.data.findIndex(item => item.id === row.id)
                    props.tableOnEdit(tableDTO.data[indice])
                }
            })}</td>
            : <td {...cellProps}
                  onClick={() => {
                      if (!header.editor || !select) return;
                      tableEdit.setEdit(row)
                      tableEdit.setEditField(header.id)
                  }}>
                {body ? body(row, id) : row[id]}
                {header.editor && select ? <i style={{fontSize: ".8em"}} className="me-2 ms-1 bi bi-pencil"/> : null}
            </td>
    }

    return <tr {...rowProps}>
        {renderSelect()}
        {props.tableHeader.map(header => renderCell(header))}
    </tr>
}
