import React, {ReactNode, useState} from "react";
import ReactPaginate, {ReactPaginateProps} from "react-paginate";
import {IFrameworkStyle} from "../@types/style";

export interface IPagination<T> extends ReactPaginateProps {
    pageCount: number,
    paginationDTO: Array<T>,
    paginationRender(state: Array<T>): ReactNode
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
function Pagination<T> ({pageCount, paginationDTO, paginationRender, frameworkStyle = "bootstrap", ...rest}: IPagination<T>) {

    //Style
    const classePage = frameworkStyle === "bootstrap" ? "pagination justify-content-center" : "";
    const classePageItem = frameworkStyle === "bootstrap" ? "page-item" : "";
    const classePageLink = frameworkStyle === "bootstrap" ? "page-link" : "";

    //Estado do componente
    const [itemOffeset, setItemOffset] = useState(0);
    const endOffset = itemOffeset + pageCount;
    const itemPerPage = Math.ceil(paginationDTO.length / pageCount);
    const currentItem = paginationDTO.slice(itemOffeset, endOffset);

    //Executa evento da paginação
    const handlePageClick = (event): void => {
        const newOffset: number = (event.selected * pageCount) % paginationDTO.length;
        setItemOffset(newOffset);
    };

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <>
        {paginationRender(currentItem)}
        {itemPerPage > 1
            ? <nav>
                <ReactPaginate {...rest}
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
                               previousLinkClassName={classePageLink}/>
            </nav> : null}
    </>
}
export default Pagination
