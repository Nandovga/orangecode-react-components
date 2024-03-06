import { IFrameworkStyle } from "../@types/style";
import React, { ReactNode, useEffect, useState } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

export interface IPagination<T> extends ReactPaginateProps {
    pageCount: number,
    paginationDTO: Array<T & { id: any }>,
    paginationRender?(state: Array<T>): ReactNode
    paginationState?: React.Dispatch<Array<T & { id: any }>>
    paginationRef?: React.Ref<any>
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
function Pagination<T>({ frameworkStyle = "bootstrap", ...props }: IPagination<T>) {
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
        if (props.paginationState) {
            props.paginationState(currentItem);
        }
    }, [itemOffeset, props.pageCount, props.paginationDTO]);

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
                                          activeClassName="active"
                                          className={classePage}
                                          disabledClassName="disabled"
                                          nextClassName={classePageItem}
                                          nextLabel={props.nextLabel ?? "Próximo"}
                                          nextLinkClassName={classePageLink}
                                          pageClassName={classePageItem}
                                          pageCount={itemPerPage}
                                          pageLinkClassName={classePageLink}
                                          previousClassName={classePageItem}
                                          previousLabel={props.previousLabel ?? "Anterior"}
                                          previousLinkClassName={classePageLink}
                                          ref={props.paginationRef}
                                          onPageChange={handlePageClick}/> : null}
    </>;
}

export default Pagination;
