import React, {ReactNode, useEffect, useState} from "react";
import ReactPaginate, {ReactPaginateProps} from "react-paginate";
import {IFrameworkStyle} from "../@types/style";

export interface IPagination<T> extends ReactPaginateProps {
    pageCount: number,
    paginationDTO: Array<T & { id: any }>,
    paginationRender?(state: Array<T>): ReactNode
    paginationState?: React.Dispatch<Array<T & { id: any }>>
    frameworkStyle?: IFrameworkStyle
}

/**
 * Componente de paginação
 * @param paginationDTO
 * @param pageCount
 * @param paginationRender
 * @param frameworkStyle
 * @param rest
 * @constructor
 */
function Pagination<T>({frameworkStyle = "bootstrap", ...props}: IPagination<T>) {
    const classePage = frameworkStyle === "bootstrap" ? "pagination mb-0 justify-content-center" : "";
    const classePageItem = frameworkStyle === "bootstrap" ? "page-item" : "";
    const classePageLink = frameworkStyle === "bootstrap" ? "page-link" : "";

    //STATE ≥ Estado do componente
    const [itemOffeset, setItemOffset] = useState(0);
    const endOffset = itemOffeset + props.pageCount;
    const itemPerPage = Math.ceil(props.paginationDTO.length / props.pageCount);
    const currentItem: Array<T & { id: any }> = props.paginationDTO.slice(itemOffeset, endOffset);

    //STATE ≥ Efeito de quando muda de página
    useEffect(() => {
        if (props.paginationState) props.paginationState(currentItem)
    }, [itemOffeset, props.pageCount])

    //STATE ≥ Ação de paginação
    const handlePageClick = (event): void => {
        const newOffset: number = (event.selected * props.pageCount) % props.paginationDTO.length;
        setItemOffset(newOffset);
    };


    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <>
        {!props.paginationRender ? null : props.paginationRender(currentItem)}
        {itemPerPage > 1 ? <ReactPaginate {...props}
                                          nextLabel="Próximo"
                                          previousLabel="Anterior"
                                          pageCount={itemPerPage}
                                          onPageChange={handlePageClick}
                                          className={classePage}
                                          pageClassName={classePageItem}
                                          nextClassName={classePageItem}
                                          previousClassName={classePageItem}
                                          disabledClassName="disabled"
                                          activeClassName="active"
                                          pageLinkClassName={classePageLink}
                                          nextLinkClassName={classePageLink}
                                          previousLinkClassName={classePageLink}/> : null}
    </>
}

export default Pagination
