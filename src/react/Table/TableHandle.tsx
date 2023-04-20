import React, {useState} from "react";
import Button from "../Button";
import Input from "../Form/Input";
import Select from "../Form/Select";
import {GET_ICON, GET_TYPE} from "../../ts/system";
import {ITable, ITableHeader, ITablePagination} from "./index";

/**
 * Cabeçalho da TABELA
 * @param row
 */
export function handleHeader<T>(row: ITableHeader<T>) {
    const cellProps = {
        key: row.id,
        className: `${row.align ? `text-${row.align}` : ""} ${row.classes ? `${row.classes}` : ``}`
    }
    return <th {...cellProps}>
        <i className={GET_ICON(row.iconType) + row.icon}/>{row.title}
    </th>
}

/**
 * Conteúdo da TABELA
 * @param row
 * @param props
 */
export function handleContent<T>(row: T & { id: any }, props: ITable<T>) {
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
            style: {cursor: select ? "pointer" : "initial"}
        }
        return <td {...cellProps}>{body ? body(row, id) : row[id]}</td>
    }

    const rowProps = {
        key: row.id,
        onClick: () => props.tableOnSelect ? props.tableOnSelect(row) : null
    }

    return <tr {...rowProps}>
        {renderSelect()}
        {props.tableHeader.map(header => renderCell(header))}
    </tr>
}

/**
 * Event - Aplica o evento de keypress na TABELA
 * @param event
 * @param props
 */
export function handleKeyPress<T>(event, props: ITable<T>) {
    if (event.code === "ArrowUp" && props.tableSelect) {
        let index = props.tableDTO.findIndex(value => value.id === props.tableSelect?.id)
        if (index > 0 && props.tableOnSelect)
            props.tableOnSelect(props.tableDTO[index - 1])
    } else if (event.code === "ArrowDown" && props.tableSelect) {
        let index = props.tableDTO.findIndex(value => value.id === props.tableSelect?.id)
        if (index < props.tableDTO.length - 1 && props.tableOnSelect)
            props.tableOnSelect(props.tableDTO[index + 1])
    }
}

/**
 * Filtro da TABELA
 * @param props
 */
export function handleFilter<T>(props: ITable<T>) {

    //STATE ≥ Estado do componente
    let filter = props.tableHeader.filter(row => row.filter);
    const [filterField, setFilterField] = useState<any>(filter[0] === undefined ? null : filter[0].id)
    const [filterSearch, setFilterSearch] = useState<any>("")
    const [filterLoad, setFilterLoad] = useState<boolean>(false)

    //Renderização
    return filter.length > 0 ? <div className="w-100 d-flex m-0 mt-1 align-items-end">
        <Select data={filter.map(row => {
            return {id: row.id, name: row.title}
        })}
                value={filterField}
                onChange={setFilterField}
                boxClasses="mx-0" box="25" legend="Campo"
                name="campo" icon="funnel-fill"/>
        <Input legend="Localizar" name="pesquisa" icon="funnel-fill"
               value={filterSearch} onChange={setFilterSearch}/>
        <div style={{minWidth: "80px"}}>
            <Button colors="secondary"
                    legend="Filtrar"
                    classes="btn-sm mb-1"
                    load={filterLoad}
                    onClick={() => {
                        if (props.tableOnFilter)
                            props.tableOnFilter(filterField, filterSearch, setFilterLoad);
                    }}
                    icon="funnel-fill"/>
        </div>
    </div> : null
}

/**
 * Paginação da TABELA
 * @param props
 */
export function handlePagination<T>(props: ITable<T>) {

    //Manual
    const paginationManual = () => {
        let {elements, pageTotal, pageNumber} = GET_TYPE<ITablePagination>(props.tablePagination)
        let pagerInit = (pageNumber - 3 < 1 ? 0 : pageNumber - 4);
        let pagerFinal = (pageNumber + 3 > pageTotal ? pageTotal : pageNumber + 3);
        let pager: any = [];
        for (let i = pagerInit; i < pagerFinal; i++)
            pager.push(i)

        //Renderização
        return pageTotal > 1 ? <td className="p-0" colSpan={props.tableHeader.length + 1}>
            <div className="w-100 p-1 d-flex justify-content-end">
                <p className="fs-7 me-2 text-primary-300">Total de registro {elements}</p>
                <ul className="pagination pagination-sm m-0">
                    <li className="page-item">
                        <a className="page-link" href="#"
                           onClick={() => !props.tableOnPagination ? null : props.tableOnPagination(1)}><i
                            className="bi bi-chevron-double-left"/></a>
                    </li>
                    {pager.map((row) => {
                        return <li key={row}
                                   className={"page-item " + (row + 1 === pageNumber ? "active fw-bold" : "")}>
                            <a className="page-link" href="#"
                               onClick={() => !props.tableOnPagination ? null : props.tableOnPagination(row + 1)}>{row + 1}</a>
                        </li>
                    })}
                    <li className="page-item">
                        <a className="page-link" href="#"
                           onClick={() => !props.tableOnPagination ? null : props.tableOnPagination(pageTotal)}><i
                            className="bi bi-chevron-double-right"/></a>
                    </li>
                </ul>
            </div>
        </td> : null
    }

    //Renderização
    return !!props.tablePagination
        ? <tfoot>
        <tr>
            {props.tablePagination === "auto" ? <></> : !props.tableOnPagination ? null : paginationManual()}
        </tr>
        </tfoot> : null
}
