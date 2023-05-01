import React, {useState} from "react";
import $ from "jquery"
import {ITable} from "@react/Table/types";

/**
 * Executa a ação de ordenação
 * @param field
 * @param props
 * @param setDTO
 * @param paginationRef
 */
export function handleSort<T>(
    field: string,
    props: ITable<T>,
    setDTO: React.Dispatch<Array<T & { id: any }>>,
    paginationRef: any
) {
    if (paginationRef.current !== null) {
        paginationRef.current.props.onPageChange({selected: 1})
        paginationRef.current.setState({selected: 1})
    }

    let data = props.tableDTO
    let sort = $("body").find("table thead th[name='" + field + "'] a[data-name='sort']");

    if (sort.find("i").hasClass("bi-filter")) {
        data.sort(function (a, b) {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });
        sort.attr("data-sort", "asc")
    } else {
        data.sort(function (a, b) {
            if (a[field] > b[field]) {
                return -1;
            }
            if (a[field] < b[field]) {
                return 1;
            }
            return 0;
        });
        sort.attr("data-sort", "desc")
    }

    if (paginationRef.current === null)
        setDTO([])
    setTimeout(() => {
        if (paginationRef.current !== null) {
            paginationRef.current.props.onPageChange({selected: 0})
            paginationRef.current.setState({selected: 0})
        }

        $.each($("body").find("table thead th a"), function () {
            $(this).removeClass("text-secondary")
            $(this).find("i").addClass("bi-filter").removeClass("bi-sort-alpha-up").removeClass("bi-sort-alpha-down")
        })
        sort.addClass("text-secondary")

        if (sort.attr("data-sort") === "desc")
            sort.find("i").removeClass("bi-sort-alpha-down").addClass("bi-sort-alpha-up");
        if (sort.attr("data-sort") === "asc")
            sort.find("i").removeClass("bi-filter").removeClass("bi-sort-alpha-up").addClass("bi-sort-alpha-down");
        setDTO(data)
    })
}
