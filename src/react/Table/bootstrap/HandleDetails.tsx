import React from "react";
import {ITableDetail} from "@react/Table/types";

/**
 * Realiza a construção dos dados para detalhamento
 * @param array
 */
export function TableHandleDetails<T>(array: Array<T & ITableDetail>) {

    // Agrupa os dados pelo parent
    const result = array.reduce((arr, item) => {
        const value = item.parent;
        if (!arr[value === undefined || value === null ? "" : value])
            arr[value === undefined || value === null ? "" : value] = []
        arr[value === undefined || value === null ? "" : value].push(item)
        return arr;
    }, {});

    let build: Array<T & ITableDetail> = [];
    if (array.length > 0)
        for (let i = 0; i < array.length; i++)
            if (array[i].parent === undefined || array[i].parent === null)
                build[build.length] = array[i];

    function genereteTable(build: Array<T & ITableDetail>, result: {}) {
        let arr: Array<T & ITableDetail & { children?: any }> = [];
        for (let i = 0; i < build.length; i++) {
            arr[i] = build[i]
            if (result[arr[i].id] !== undefined)
                arr[i].children = genereteTable(result[arr[i].id], result)
        }
        return arr;
    }

    return genereteTable(build, result);
}
