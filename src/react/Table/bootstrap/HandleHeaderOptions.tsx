import React from "react";
import {ITable} from "../types";
import Tooltip from "../../Tooltip";

/**
 * ACTION ≥ Exibe as opções no cabeçalho da TABELA
 * @param props
 */
export function handleHeaderOptions<T>(props: ITable<T>) {
    return <tr className={!props.tableClassesOptions ? "" : props.tableClassesOptions.box}>
        <th colSpan={props.tableDTO.length + 1}>
            <div className="w-100 d-flex justify-content-end">
                <Tooltip title="Cadastrar" size="small" arrow position="top">
                    <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.create}
                       href="#"><i className="bi bi-plus-lg"/></a>
                </Tooltip>
                {!props.tableEditMode && props.tableOnEdit
                    ? <Tooltip title="Editar" size="small" arrow position="top">
                        <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.edit}
                           onClick={event => {
                               event.preventDefault();
                               if (props.tableOnEdit) props.tableOnEdit(props.tableDTO)
                           }}
                           href="#"><i className="bi bi-pencil"/></a>
                    </Tooltip> : null}
                <Tooltip title="Excluir" size="small" arrow position="top">
                    <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.delete}
                       href="#"><i className="bi bi-trash"/></a>
                </Tooltip>
            </div>
        </th>
    </tr>
}
