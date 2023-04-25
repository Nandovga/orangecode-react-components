import React from "react";
import {ITable} from "./Table/types";
import Bootstrap from "./Table/Bootstrap";
/**
 * Componente de TABELA
 * @param tableStyle
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Table<T>({frameworkStyle = "bootstrap", ...props}: ITable<T>) {
    return frameworkStyle === "bootstrap" ? <Bootstrap<T> {...props}/> : <></>
}

export default Table
