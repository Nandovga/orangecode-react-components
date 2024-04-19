import React, { useState } from "react";
import Pagination from "../../Pagination";
import { GET_TYPE } from "../../../ts/system";
import { ITable, ITablePagination } from "../types";

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
    const [pageElements, setPageElements] = useState<number>(!props.tablePaginationRow ? 10 : props.tablePaginationRow);
    const colspan = props.tableHeader.length
        + (props.tableOnSelect ? 1 : 0)
        + (props.tableDetail ? 1 : 0)
        + (props.tableOnMultiSelect ? 1 : 0);

    const manual = () => {
        let { elements, pageTotal, pageNumber } = GET_TYPE<ITablePagination>(props.tablePagination);
        let pagerInit = (pageNumber - 3 < 1 ? 0 : pageNumber - 4);
        let pagerFinal = (pageNumber + 3 > pageTotal ? pageTotal : pageNumber + 3);
        let pager: any = [];
        for (let i = pagerInit; i < pagerFinal; i++) {
            pager.push(i);
        }

        //Renderização
        return pageTotal > 1
            && <td className="p-0"
                   colSpan={colspan}>
                <div
                    className={"w-100 d-flex align-items-center justify-content-" + (!props.tablePaginationAlign ? "end" : props.tablePaginationAlign)}>
                    {props.tableLegend && props.tableLegend()}
                    <select className="form-select form-select-sm me-2"
                            style={{ maxWidth: "60px", padding: "1px 3px", fontSize: ".9em" }}
                            value={pageElements}
                            onChange={event => {
                                setPageElements(parseInt(event.target.value));
                                if (props.tableOnPagination) {
                                    props.tableOnPagination(1, parseInt(event.target?.value));
                                }
                            }}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={0}>Todos</option>
                    </select>
                    <p className='m-0 mx-2'>Total de registro {elements}</p>
                    <ul className="pagination pagination-sm m-0">
                        <li className="page-item">
                            <a className="page-link"
                               href="#"
                               onClick={event => {
                                   event.preventDefault();
                                   if (props.tableOnPagination) {
                                       props.tableOnPagination(1, pageElements);
                                   }
                               }}>
                                <i className="bi bi-chevron-double-left"/></a>
                        </li>
                        {pager.map((row) => {
                            return <li className={"page-item " + (row + 1 === pageNumber ? "active fw-bold" : "")}
                                       key={row}>
                                <a className="page-link"
                                   href="#"
                                   onClick={event => {
                                       event.preventDefault();
                                       if (props.tableOnPagination) {
                                           props.tableOnPagination(row + 1, pageElements);
                                       }
                                   }}>{row + 1}</a>
                            </li>;
                        })}
                        <li className="page-item">
                            <a className="page-link"
                               href="#"
                               onClick={event => {
                                   event.preventDefault();
                                   if (props.tableOnPagination) {
                                       props.tableOnPagination(pageTotal, pageElements);
                                   }
                               }}><i className="bi bi-chevron-double-right"/></a>
                        </li>
                    </ul>
                </div>
            </td>;
    };

    const auto = () => {
        const [row, setRow] = useState<number>(!props.tablePaginationRow ? 10 : props.tablePaginationRow);

        //Renderização
        return <td className="p-1"
                   colSpan={colspan}>
            <div
                className={"w-100 d-flex align-items-center justify-content-" + (!props.tablePaginationAlign ? "end" : props.tablePaginationAlign)}>
                {props.tableLegend && props.tableLegend()}
                <select className="form-select form-select-sm me-2"
                        style={{ maxWidth: "60px", padding: "1px 3px", fontSize: ".9em" }}
                        value={row}
                        onChange={event => setRow(parseInt(event.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <p className='m-0 mx-2'>Total de {props.tableDTO.length} registro</p>
                <Pagination<T> nextLabel={<i className="bi bi-chevron-double-right"/>}
                               pageCount={row}
                               paginationDTO={props.tableDTO}
                               paginationRef={paginationRef}
                               paginationState={value => setDTO(value)}
                               previousLabel={<i className="bi bi-chevron-double-left"/>}/>
            </div>
        </td>;
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.tablePagination === undefined || props.tablePagination === null
        ? null : <tfoot>
            <tr>{props.tablePagination === "auto"
            ? auto()
            : !props.tableOnPagination ? null : manual()}</tr>
        </tfoot>;
}
