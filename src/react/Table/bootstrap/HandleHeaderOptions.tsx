import React from "react";
import { ITable } from "../types";
import Tooltip from "../../Tooltip";

/**
 * ACTION ≥ Exibe as opções no cabeçalho da TABELA
 * @param props
 * @param tableDTO
 */
export function handleHeaderOptions<T>(
    props: ITable<T>,
    tableDTO: Array<T & { id: any }>
) {
    return <tr className="p-0">
        <th colSpan={props.tableHeader.length + 1}>
            <div
                className={(!props.tableClassesOptions ? "w-100 d-flex justify-content-end" : props.tableClassesOptions.box)}>
                {props.tableOptionsCreate
                    ? <Tooltip arrow
                               position="top"
                               size="small"
                               title="Cadastrar">
                        <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.create}
                           href="#"
                           onClick={event => {
                               event.preventDefault();
                               if (props.tableOptionsCreate) {
                                   props.tableOptionsCreate();
                               }
                           }}><i className="bi bi-plus-lg"/></a>
                    </Tooltip> : null}

                {props.tableOnEdit && !props.tableEditMode
                    ? <Tooltip arrow
                               position="top"
                               size="small"
                               title="Editar">
                        <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.edit}
                           href="#"
                           onClick={event => {
                               event.preventDefault();
                               if (props.tableOnEdit) {
                                   props.tableOnEdit(props.tablePagination === "auto" ? tableDTO : props.tableDTO);
                               }
                           }}><i className="bi bi-pencil"/></a>
                    </Tooltip> : null}

                {props.tableOptionsDelete && props.tableSelect !== null
                    ? <Tooltip arrow
                               position="top"
                               size="small"
                               title="Excluir">
                        <a className={!props.tableClassesOptions ? "btn btn-sm btn-primary me-1" : props.tableClassesOptions.delete}
                           href="#"
                           onClick={event => {
                               event.preventDefault();
                               if (props.tableOptionsDelete) {
                                   props.tableOptionsDelete();
                               }
                           }}><i className="bi bi-trash"/></a>
                    </Tooltip> : null}
            </div>
        </th>
    </tr>;
}
