import React, {useEffect, useRef, useState} from "react";
import {ITable} from "./types";
import {handleFilter} from "./bootstrap/HandleFilter";
import {handleHeader} from "./bootstrap/HandleHeader";
import {handleContent} from "./bootstrap/HandleContent";
import {handleKeyPress} from "./bootstrap/HandleKeyPress";
import {handlePagination} from "./bootstrap/HandlePagination";

/**
 * Componente de TABELA - Bootstrap5
 * @param props
 * @constructor
 */
function Bootstrap<T>(props: ITable<T>) {

    //STATE ≥ Estado do componente
    const paginationRef = useRef<any>(null)
    const [tableDTO, setTableDTO] = useState<Array<T & { id: any }>>(props.tableDTO)

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
        if (props.tableSelect !== undefined && props.tableSelect !== null)
            handleKeyPress(props, props.tablePagination === "auto" ? tableDTO : props.tableDTO, paginationRef)
        else
            props.tableOnSelect ? props.tableOnSelect((props.tablePagination === "auto" ? tableDTO[0] : props.tableDTO[0])) : null
    }, [props.tableSelect])

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        <div className="w-100 table-responsive">
            <table className={tableConfig.classes}>
                <thead>
                <tr>
                    {props.tableOnSelect ? <th className="text-center"><i className="bi bi-filter"/></th> : null}
                    {props.tableHeader.map(value => handleHeader<T>(value,  props,setTableDTO, paginationRef))}
                </tr>
                </thead>
                <tbody>
                {props.tablePagination === "auto" ?
                    tableDTO.length > 0
                        ? tableDTO.map(value => handleContent<T>(value, props))
                        : <tr><td className="text-center" colSpan={props.tableHeader.length + (props.tableOnSelect ? 1 : 0)}>{tableEmptyValue}</td></tr> : null}
                {props.tablePagination !== "auto"
                    ? props.tableDTO.length > 0
                        ? props.tableDTO.map(value => handleContent<T>(value, props))
                        : <tr><td className="text-center" colSpan={props.tableHeader.length + (props.tableOnSelect ? 1 : 0)}>{tableEmptyValue}</td></tr> : null}
                </tbody>
                {handlePagination<T>(props, setTableDTO, paginationRef)}
            </table>
        </div>
        {handleFilter<T>(props)}
    </>
}
export default Bootstrap
