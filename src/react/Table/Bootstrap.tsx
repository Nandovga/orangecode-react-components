import React, {useEffect, useRef, useState} from "react";
import {ITable} from "./types";
import {handleFilter} from "./bootstrap/HandleFilter";
import {handleHeader} from "./bootstrap/HandleHeader";
import {handleContent} from "./bootstrap/HandleContent";
import {handleKeyPress} from "./bootstrap/HandleKeyPress";
import {handlePagination} from "./bootstrap/HandlePagination";
import {handleHeaderOptions} from "./bootstrap/HandleHeaderOptions";

/**
 * Componente de TABELA - Bootstrap5
 * @param props
 * @constructor
 */
function Bootstrap<T>(props: ITable<T>) {

    //CONFIG ≥ Configuração do componente
    let tableSize = props.tableSize === "small" ? "table-sm" : props.tableSize === "large" ? "table-lg" : "";
    let tableClasse = !props.tableClasses ? "" : props.tableClasses;
    let tableStyle = !props.tableStyle ? "" : "table-" + props.tableStyle;
    let tableEmptyValue = !props.tableEmptyValue ? "Não há informações disponíveis no momento!" : props.tableEmptyValue;
    let tableConfig = {
        classes: `table m-0 ${tableSize} ${tableClasse} ${tableStyle}`
    };

    //STATE ≥ Estado do componente
    const paginationRef = useRef<any>(null);
    const [init, setInit] = useState(false);
    const [tableDTO, setTableDTO] = useState<Array<T & { id: any }>>(props.tableDTO);
    const [tablePageSelect, setTablePageSelect] = useState<number>(0);

    const [tableEdit, setTableEdit] = useState<null | T & { id: any }>(null);
    const [tableEditField, setTableEditField] = useState<string>("");

    //EFFECT ≥ Inicializa componente
    useEffect(() => {
        setInit(true);
        if (props.tableOnInit) {
            props.tableOnInit(true);
        }
    }, [init, props.tableInit]);

    //EFFECT ≥ Gerencia a ação de select
    useEffect(() => {
        if (props.tableSelect !== undefined && props.tableSelect !== null) {
            handleKeyPress(props, props.tablePagination === "auto" ? tableDTO : props.tableDTO, paginationRef);
        } else if (props.tableSelectAuto !== false && props.tableOnSelect && tableDTO.length > 0) {
            props.tableOnSelect((props.tablePagination === "auto" ? tableDTO[0] : props.tableDTO[0]));
        }
        setTableEditField("");
    }, [props.tableSelect]);

    //EFFECT - Gerencia a ação de select e paginação
    useEffect(() => {
        if (tableDTO.length > 0 && paginationRef.current !== null) {
            if (props.tableSelectAuto !== false && props.tableOnSelect && props.tablePagination === "auto" && paginationRef.current.state.selected !== tablePageSelect) {
                props.tableOnSelect(tableDTO[0]);
                setTablePageSelect(paginationRef.current.state.selected);
            }
        }
    }, [tableDTO]);

    //EFFECT - Muda para 1.º pagina quando os dados originais são alterados
    useEffect(() => {
        if (paginationRef.current !== null && props.tablePagination === "auto") {
            paginationRef.current.props.onPageChange({selected: 0});
            paginationRef.current.setState({selected: 0});
        }
    }, [props.tableDTO]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        {/*opções e filtro*/}
        <div className="w-100 d-flex flex-md-nowrap flex-wrap align-items-center">
            {props.tableFilterPosition === "top"
                ? handleFilter<T>(props, setTableDTO) : null}
            <div
                className={props.tableClassesOptions?.box}>{props.tableOptionsRender ? props.tableOptionsRender() : null}</div>
        </div>

        {/*tabela*/}
        <div className="w-100 table-responsive">
            <table className={tableConfig.classes}>
                <thead>
                {props.tableOptions ? handleHeaderOptions(props, tableDTO) : null}
                <tr>
                    {props.tableOnSelect ?
                        <th className="text-center"
                            style={{width: "0px"}}><i className="bi bi-filter"/></th> : null}
                    {props.tableMultiSelect ?
                        <th className="text-center"
                            style={{width: "0px"}}><i className="bi bi-filter"/></th> : null}
                    {props.tableDetail ? <th className="text-center"
                                             style={{width: "0px"}}/> : null}
                    {props.tableHeader.map(value => handleHeader<T>(value, props, setTableDTO, paginationRef))}
                </tr>
                </thead>
                <tbody>
                {props.tablePagination === "auto" ?
                    tableDTO.length > 0
                        ? tableDTO.map(value => handleContent<T>(value, props, {
                            edit: tableEdit,
                            editField: tableEditField,
                            setEdit: setTableEdit,
                            setEditField: setTableEditField
                        }, {data: tableDTO, setData: setTableDTO}))
                        : <tr>
                            <td className="text-center"
                                colSpan={props.tableHeader.length + (props.tableOnSelect ? 1 : 0) + (props.tableDetail ? 1 : 0)}>{tableEmptyValue}</td>
                        </tr> : null}
                {props.tablePagination !== "auto"
                    ? props.tableDTO.length > 0
                        ? props.tableDTO.map(value => handleContent<T>(value, props, {
                            edit: tableEdit,
                            editField: tableEditField,
                            setEdit: setTableEdit,
                            setEditField: setTableEditField
                        }, {data: props.tableDTO, setData: props.setTableDTO}))
                        : <tr>
                            <td className="text-center"
                                colSpan={props.tableHeader.length + (props.tableOnSelect ? 1 : 0) + (props.tableDetail ? 1 : 0)}>{tableEmptyValue}</td>
                        </tr> : null}
                </tbody>
                {handlePagination<T>(props, setTableDTO, paginationRef)}
            </table>
        </div>

        {/*filtro*/}
        {!props.tableFilterPosition || props.tableFilterPosition === "bottom"
            ? handleFilter<T>(props, setTableDTO) : null}
    </>;
}

export default Bootstrap;
