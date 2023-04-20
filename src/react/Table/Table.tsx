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
 * Exibe o componente de tabela
 * @param tableStyle
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Table<T>({tableStyle = "", frameworkStyle = "bootstrap", ...props}: ITable<T>) {

    //VARIABLE ≥ Configuração do componente
    let size = props.tableSize === "small" ? "table-sm" : props.tableSize === "large" ? "table-lg" : "";

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
                {props.tableDTO.length > 0 ? props.tableDTO.map(value => handleContent<T>(value, props))
                    : <tr>
                        <td className="text-center" colSpan={props.tableHeader.length}>Não há dados para serem exibidos
                            no
                            momento!
                        </td>
                    </tr>}
                </tbody>
                {handlePagination<T>(props)}
            </table>
        </div>
        {handleFilter<T>(props)}
    </>
}

export default Table
