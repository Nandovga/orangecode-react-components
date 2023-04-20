import React, {useEffect} from "react";
import {ITable} from "./index";
import {
    handleContent,
    handleFilter,
    handleHeader,
    handleKeyPress,
    handlePagination
} from "./TableHandle";

/**
 * Componente de TABELA - Bootstrap5
 * @param tableStyle
 * @param props
 * @constructor
 */
function TableBootstrap<T>({...props}: ITable<T>) {

    //CONFIG ≥ Configuração do componente
    let tableSize = props.tableSize === "small" ? "table-sm" : props.tableSize === "large" ? "table-lg" : "";
    let tableStyle = props.tableStyle
    let tableConfig = {
        classes: `table m-0 ${tableSize} ${}`
    }

    let emptyValue = !props.tableEmptyValue ? "Não há registros disponíveis no momento." : props.tableEmptyValue

    //STATE ≥ Carregamento do componente
    useEffect(() => {
        document.addEventListener("keydown", ev => handleKeyPress(ev, props))
        return () => document.removeEventListener("keydown", ev => handleKeyPress(ev, props))
    }, [props.tableSelect])

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        <div className="w-100 table-responsive-xxl">
            <table className={"m-0 table " + size + " " + props.tableClasses + " table-" + tableStyle}>
                <thead>
                <tr>
                    {props.tableOnSelect ? <th className="text-center"><i className="bi bi-filter"/></th> : null}
                    {props.tableHeader.map(value => handleHeader<T>(value))}
                </tr>
                </thead>
                <tbody>
                {props.tableDTO.length > 0
                    ? props.tableDTO.map(value => handleContent<T>(value, props))
                    : <tr><td className="text-center" colSpan={props.tableHeader.length}>{emptyValue}</td></tr>
                }
                </tbody>
                {handlePagination<T>(props)}
            </table>
        </div>
        {handleFilter<T>(props)}
    </>
}


/**
 * Componente TABELA
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Table<T>({frameworkStyle = "bootstrap", ...props}: ITable<T>) {
    return frameworkStyle === "bootstrap"
        ? <TableBootstrap<T> {...props}/>
        : <></>
}

export default Table
