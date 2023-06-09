import React, {useEffect, useState} from "react";
import {ITable} from "../types";
import Button from "../../Button";
import Input from "../../Form/Input";
import Select from "../../Form/Select";

/**
 * ACTION ≥ Realiza a filtragem dos dados da TABELA
 * @param props
 */
export function handleFilter<T>(props: ITable<T>) {

    //Configurações do componente
    let filter = props.tableHeader.filter(row => row.filter);
    let options = {}
    props.tableHeader.map(row => {
        return options[row.id] = row.filterOptions === undefined ? null : row.filterOptions
    })

    //STATE ≥ Estado do componente
    const [filterField, setFilterField] = useState<any>(filter[0] === undefined ? null : filter[0].id)
    const [filterSearch, setFilterSearch] = useState<any>("")
    const [filterOptions, setFilterOptions] = useState<any>(null)
    const [inputDisabled, setInputDisabled] = useState<false | undefined>(false)
    const [filterLoad, setFilterLoad] = useState<boolean>(false)

    useEffect(() => {
        if (filterField !== null && options[filterField] !== null)
            setInputDisabled(options[filterField].filter(row => row.id == filterOptions)[0]?.disabled)
    })

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return filter.length > 0 ? <div className="w-100 d-flex flex-column flex-md-row m-0 mt-1 align-items-start align-items-md-end">
        <Select data={filter.map(row => {
            return {id: row.id, name: row.title}
        })}
                value={filterField}
                onChange={setFilterField}
                boxClasses="mx-0" box="25" legend="Campo"
                name="campo" icon="funnel-fill"/>
        {options[filterField] !== null
            ? <Select box="33"
                      boxClasses="mx-2 mx-md-0"
                      init icon="funnel-fill"
                      data={options[filterField]}
                      legend="Opções"
                      name="options"
                      value={filterOptions}
                      onChange={setFilterOptions}/>
            : null}
        <Input legend="Localizar" boxClasses="mx-0 mx-md-2" name="pesquisa" icon="funnel-fill"
               value={!props.tableFilter ? filterSearch : props.tableFilter.value}
               onChange={value => {
                   if (!props.tableFilter) setFilterSearch(value)
                   else props.tableFilter.setValue(value)
               }} disabled={inputDisabled}/>
        <div style={{minWidth: "80px"}}>
            <Button colors="secondary"
                    legend="Filtrar"
                    classes="btn-sm mb-2 mt-2 mt-md-0"
                    load={filterLoad}
                    onClick={() => {
                        if (props.tableOnFilter)
                            props.tableOnFilter(filterField, !props.tableFilter ? filterSearch : props.tableFilter.value, setFilterLoad, filterOptions);
                    }}
                    icon="funnel-fill"/>
        </div>
    </div> : null
}
