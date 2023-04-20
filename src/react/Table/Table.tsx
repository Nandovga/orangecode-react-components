import React, {useEffect, useState} from "react";
import {ITable} from "./index";
import {
    handleContent,
    handleFilter,
    handleHeader,
    handleKeyPress,
    handlePagination
} from "./TableHandle";

/**
 * Componente TABELA - Bootstrap5
 * @param tablePaginationRow
 * @param props
 * @constructor
 */
function TableBootstrp<T>(props: ITable<T>) {

    //STATE ≥ Estado do componente
    const [tableDTO, setTableDTO] = useState<Array<T & {id: any}>>(props.tableDTO)

    //CONFIG ≥ Configuração do componente
    let tableSize = props.tableSize === "small" ? "table-sm" : props.tableSize === "large" ? "table-lg" : "";
    let tableClasse = !props.tableClasses ? "" : props.tableClasses
    let tableStyle = !props.tableStyle ? "" : "table-" + props.tableStyle
    let tableEmptyValue = !props.tableEmptyValue ? "Não há informações disponíveis no momento!" : props.tableEmptyValue
    let tableConfig = {
        classes: `table m-0 ${tableSize} ${tableClasse} ${tableStyle}`
    }

    //STATE ≥ Carregamento do componente
    useEffect(() => {
        document.addEventListener("keydown", ev => handleKeyPress(ev, props, tableDTO))
        return () => document.removeEventListener("keydown", ev => handleKeyPress(ev, props, tableDTO))
    }, [props.tableSelect])

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        <div className="w-100 table-responsive-xxl">
            <table className={tableConfig.classes}>
                <thead>
                <tr>
                    {props.tableOnSelect ? <th className="text-center"><i className="bi bi-filter"/></th> : null}
                    {props.tableHeader.map(value => handleHeader<T>(value))}
                </tr>
                </thead>
                <tbody>
                {tableDTO.length > 0
                    ? tableDTO.map(value => handleContent<T>(value, props))
                    : <tr><td className="text-center" colSpan={props.tableHeader.length}>{tableEmptyValue}</td></tr>
                }
                </tbody>
                {handlePagination<T>(props, setTableDTO)}
            </table>
        </div>
        {handleFilter<T>(props)}
    </>
}


/**
 * Componente de TABELA
 * @param tableStyle
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Table<T>({frameworkStyle = "bootstrap", ...props}: ITable<T>) {
    return frameworkStyle === "bootstrap" ? <TableBootstrp<T> {...props}/> : <></>
}

export default Table
