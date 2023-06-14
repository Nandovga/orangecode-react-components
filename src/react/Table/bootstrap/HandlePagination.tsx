import React, {useState} from "react";
import Pagination from "../../Pagination";
import {GET_TYPE} from "../../../ts/system";
import {ITable, ITablePagination} from "../types";

/**
 * Executa a ação de PAGINAÇÃO
 * @param props
 * @param setDTO
 * @param paginationRef
 * @constructor
 */
export function handlePagination<T>(
    props: ITable<T>,
    setDTO: React.Dispatch<Array<T & { id: any }>>,
    paginationRef: React.MutableRefObject<any>
) {
    const manual = () => {
        let {elements, pageTotal, pageNumber} = GET_TYPE<ITablePagination>(props.tablePagination)
        let pagerInit = (pageNumber - 3 < 1 ? 0 : pageNumber - 4);
        let pagerFinal = (pageNumber + 3 > pageTotal ? pageTotal : pageNumber + 3);
        let pager: any = [];
        for (let i = pagerInit; i < pagerFinal; i++)
            pager.push(i)

        //Renderização
        return pageTotal > 1 ? <td className="p-0" colSpan={props.tableHeader.length + (props.tableDetail ? 2 : 1)}>
            <div
                className={"w-100 d-flex align-items-center justify-content-" + (!props.tablePaginationAlign ? "end" : props.tablePaginationAlign)}>
                <p className="fs-7 mx-2 my-auto text-primary-300">Total de registro {elements}</p>
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
                                   if (props.tableOnPagination) props.tableOnPagination(row + 1)
                               }}>{row + 1}</a>
                        </li>
                    })}
                    <li className="page-item">
                        <a className="page-link"
                           href="#"
                           onClick={event => {
                               event.preventDefault()
                               if (props.tableOnPagination) props.tableOnPagination(pageTotal)
                           }}><i className="bi bi-chevron-double-right"/></a>
                    </li>
                </ul>
            </div>
        </td> : null
    }

    const auto = () => {
        const [row, setRow] = useState<number>(!props.tablePaginationRow ? 10 : props.tablePaginationRow)

        //Renderização
        return <td className="p-1" colSpan={props.tableHeader.length + (props.tableDetail ? 2 : 1)}>
            <div
                className={"w-100 d-flex align-items-center justify-content-" + (!props.tablePaginationAlign ? "end" : props.tablePaginationAlign)}>
                {paginationRef.current !== null ? <select className="form-select form-select-sm me-2"
                                                          value={row}
                                                          onChange={event => setRow(parseInt(event.target.value))}
                                                          style={{
                                                              maxWidth: "60px",
                                                              padding: "1px 3px",
                                                              fontSize: ".9em"
                                                          }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select> : null}
                <p className='m-0 mx-2'>Total de {props.tableDTO.length} registro</p>
                <Pagination<T> pageCount={row}
                               paginationDTO={props.tableDTO}
                               paginationState={value => setDTO(value)}
                               paginationRef={paginationRef}
                               nextLabel={<i className="bi bi-chevron-double-right"/>}
                               previousLabel={<i className="bi bi-chevron-double-left"/>}/>
            </div>
        </td>
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return !!props.tablePagination
        ? <tfoot>
        <tr>{props.tablePagination === "auto" ? auto() : !props.tableOnPagination ? null : manual()}</tr>
        </tfoot>
        : null
}
