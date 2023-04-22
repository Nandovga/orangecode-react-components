import React, {useState} from "react";
import $ from "jquery"

import Button from "../Button";
import Input from "../Form/Input";
import Select from "../Form/Select";
import Pagination from "../Pagination";

import {GET_ICON, GET_TYPE} from "../../ts/system";
import {ITable, ITableHeader, ITablePagination} from "./index";

/**
 * ACTION ≥ Monta o cabeçalho da TABELA
 * @param row
 * @param DTO
 * @param setDTO
 */
export function handleHeader<T>(
    row: ITableHeader<T>
) {
    const cellProps = {
        key: row.id,
        className: `${row.align ? `text-${row.align}` : ""} ${row.classes ? `${row.classes}` : ``}`,
        style: {cursor: row.sort ? "pointer" : "initial"},
        onClick: () => {
            if (row.sort) null
        }
    }
    return <th {...cellProps}>
        <i className={GET_ICON(row.iconType) + row.icon}/>{row.title}
        {row.sort ? <i className={GET_ICON(row.iconType) + "arrow-down-up ms-2"}/> : null}
    </th>
}

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

    return <tr {...rowProps}>
        {renderSelect()}
        {props.tableHeader.map(header => renderCell(header))}
    </tr>
}

/**
 * EVENT ≥ Aplica o evento de keypress na TABELA
 * @param props
 * @param DTO
 * @param paginationRef
 */
export function handleKeyPress<T>(
    props: ITable<T>,
    DTO: Array<T & { id: any }>,
    paginationRef: any
) {
    const index = DTO.findIndex(value => value.id === props.tableSelect?.id);

    //STATE ≥ Realiza a ação de paginação via teclado
    let handlePagination = (page: number, type: "right" | "left" | "up" | "down") => {
        let pager;
        switch (type) {
            case "left":
                pager = page < 0 ? 0 : page
                if (page === -1)
                    props.tableOnSelect ? props.tableOnSelect(null) : null
                break;
            case "right":
                let pageCount = paginationRef.current.props.pageCount - 1;
                pager = page > pageCount ? pageCount : page;
                if(page > pageCount)
                    props.tableOnSelect ? props.tableOnSelect(null) : null
                break;
            case "up":
                pager = page > 1 ? page - 1 : 0
                if (page === 0)
                    props.tableOnSelect ? props.tableOnSelect(null) : null
                break;
            case "down":
                pager = (page + 1) >= paginationRef.current.props.pageCount ? page : page + 1
                if (pager === page)
                    props.tableOnSelect ? props.tableOnSelect(null) : null
                break;
        }
        paginationRef.current.props.onPageChange({selected: pager})
        paginationRef.current.setState({selected: pager})
    }

    //EVENT ≥ KeyDown
    $(document).one("keydown", ev => {
        if (ev.code === "ArrowUp" && props.tableSelect) {
            if (index > 0 && props.tableOnSelect)
                props.tableOnSelect(DTO[index - 1])
            else if (paginationRef.current !== null && index === 0)
                handlePagination(paginationRef.current.state.selected, "up")
        } else if (ev.code === "ArrowDown" && props.tableSelect) {
            if (index < DTO.length - 1 && props.tableOnSelect)
                props.tableOnSelect(DTO[index + 1])
            else if (paginationRef.current !== null)
                handlePagination(paginationRef.current.state.selected, "down")
        } else if (ev.code === "ArrowRight") {
            if (paginationRef.current === null)
                return;
            handlePagination(paginationRef.current.state.selected + 1, "right")
        } else if (ev.code === "ArrowLeft") {
            if (paginationRef.current === null)
                return;
            handlePagination(paginationRef.current.state.selected - 1, "left");
        }
    })
}

/**
 * ACTION ≥ Realiza a filtragem dos dados da TABELA
 * @param props
 */
export function handleFilter<T>(
    props: ITable<T>
) {

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
 * ACTION ≥ Monta a paginação da TABELA
 * @param props
 * @param setDTO
 * @param paginationRef
 */
export function handlePagination<T>(
    props: ITable<T>,
    setDTO: React.Dispatch<Array<T & { id: any }>>,
    paginationRef: React.Ref<any>
) {

    //Manual
    const manual = () => {
        let {elements, pageTotal, pageNumber} = GET_TYPE<ITablePagination>(props.tablePagination)
        let pagerInit = (pageNumber - 3 < 1 ? 0 : pageNumber - 4);
        let pagerFinal = (pageNumber + 3 > pageTotal ? pageTotal : pageNumber + 3);
        let pager: any = [];
        for (let i = pagerInit; i < pagerFinal; i++)
            pager.push(i)

        //Renderização
        return pageTotal > 1 ? <td className="p-0" colSpan={props.tableHeader.length + 1}>
            <div className="w-100 p-1 d-flex align-items-center justify-content-end">
                <p className="fs-7 me-2 text-primary-300">Total de registro {elements}</p>
                <ul className="pagination pagination-sm m-0">
                    <li className="page-item">
                        <a className="page-link"
                           href="#"
                           onClick={event => {
                               event.preventDefault()
                               if (props.tableOnPagination) props.tableOnPagination(1)
                           }}>
                            <i className="bi bi-chevron-double-left"/></a>
                    </li>
                    {pager.map((row) => {
                        return <li key={row}
                                   className={"page-item " + (row + 1 === pageNumber ? "active fw-bold" : "")}>
                            <a className="page-link"
                               href="#"
                               onClick={event => {
                                   event.preventDefault()
                                   if (props.tableOnPagination) props.tableOnPagination(1)
                               }}>{row + 1}</a>
                        </li>
                    })}
                    <li className="page-item">
                        <a className="page-link"
                           href="#"
                           onClick={event => {
                               event.preventDefault()
                               if (props.tableOnPagination) props.tableOnPagination(1)
                           }}><i className="bi bi-chevron-double-right"/></a>
                    </li>
                </ul>
            </div>
        </td> : null
    }

    //Automático
    const auto = () => {
        const [row, setRow] = useState<number>(!props.tablePaginationRow ? 10 : props.tablePaginationRow)
        const [pagination] = useState(props.tableDTO)

        //Renderização
        return <td className="p-1" colSpan={props.tableHeader.length + 1}>
            <div className="w-100 d-flex justify-content-end align-items-center">
                <select className="form-select form-select-sm me-2"
                        value={row}
                        onChange={event => setRow(parseInt(event.target.value))}
                        style={{maxWidth: "60px", padding: "1px 3px", fontSize: ".9em"}}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <p className='m-0 mx-2'>Total de {pagination.length} registro</p>
                <Pagination<T> pageCount={row}
                               paginationDTO={pagination}
                               paginationState={value => {
                                   setDTO(value)
                                   if (props.tableOnSelect) props.tableOnSelect(value[0])
                               }}
                               paginationRef={paginationRef}/>
            </div>
        </td>
    }

    //Renderização
    return !!props.tablePagination
        ? <tfoot>
        <tr>{props.tablePagination === "auto" ? auto() : !props.tableOnPagination ? null : manual()}</tr>
        </tfoot> : null
}
