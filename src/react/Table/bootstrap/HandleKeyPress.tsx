import $ from "jquery";
import { ITable } from "../types";

/**
 * EVENT ≥ Aplica o evento de keypress na TABELA
 * @param props
 * @param DTO
 * @param paginationRef
 */
export function handleKeyPress<T>(props: ITable<T>, DTO: Array<T & { id: any }>, paginationRef: any): void {
    const index = DTO.findIndex(value => value.id === props.tableSelect?.id);

    //STATE ≥ Realiza a ação de paginação via teclado
    let handlePagination = (page: number, type: "right" | "left" | "up" | "down") => {
        let pager;
        switch (type) {
            case "left":
                pager = page < 0 ? 0 : page;
                if (page === -1) {
                    props.tableOnSelect ? props.tableOnSelect(null) : null;
                }
                break;
            case "right":
                let pageCount = paginationRef.current.props.pageCount - 1;
                pager = page > pageCount ? pageCount : page;
                if (page > pageCount) {
                    props.tableOnSelect ? props.tableOnSelect(null) : null;
                }
                break;
            case "up":
                pager = page > 1 ? page - 1 : 0;
                if (page === 0) {
                    props.tableOnSelect ? props.tableOnSelect(null) : null;
                }
                break;
            case "down":
                pager = (page + 1) >= paginationRef.current.props.pageCount ? page : page + 1;
                if (pager === page) {
                    props.tableOnSelect ? props.tableOnSelect(null) : null;
                }
                break;
        }
        paginationRef.current.props.onPageChange({ selected: pager });
        paginationRef.current.setState({ selected: pager });
    };

    //EVENT ≥ KeyDown
    $(document).stop().one("keydown", ev => {
        setTimeout(() => {
            if (ev.code === "ArrowUp" && props.tableSelect) {
                if (index > 0 && props.tableOnSelect) {
                    props.tableOnSelect(DTO[index - 1]);
                } else if (paginationRef.current !== null && index === 0) {
                    handlePagination(paginationRef.current.state.selected, "up");
                }
            } else if (ev.code === "ArrowDown" && props.tableSelect) {
                if (index < DTO.length - 1 && props.tableOnSelect) {
                    props.tableOnSelect(DTO[index + 1]);
                } else if (paginationRef.current !== null) {
                    handlePagination(paginationRef.current.state.selected, "down");
                }
            } else if (ev.code === "ArrowRight") {
                if (paginationRef.current === null) {
                    return;
                }
                handlePagination(paginationRef.current.state.selected + 1, "right");
            } else if (ev.code === "ArrowLeft") {
                if (paginationRef.current === null) {
                    return;
                }
                handlePagination(paginationRef.current.state.selected - 1, "left");
            }
        }, !props.tableSelectTimeOut ? 1 : props.tableSelectTimeOut);
    });
}
