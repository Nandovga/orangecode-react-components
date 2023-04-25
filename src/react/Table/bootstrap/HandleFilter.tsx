import React, {useState} from "react";
import {ITable} from "../types";
import Button from "../../Button";
import Input from "../../Form/Input";
import Select from "../../Form/Select";

/**
 * ACTION ≥ Realiza a filtragem dos dados da TABELA
 * @param props
 */
export function handleFilter<T>(props: ITable<T>) {

    //STATE ≥ Estado do componente
    let filter = props.tableHeader.filter(row => row.filter);
    const [filterField, setFilterField] = useState<any>(filter[0] === undefined ? null : filter[0].id)
    const [filterSearch, setFilterSearch] = useState<any>("")
    const [filterLoad, setFilterLoad] = useState<boolean>(false)
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return filter.length > 0 ? <div className="w-100 d-flex m-0 mt-1 align-items-end">
        <Select data={filter.map(row => {
            return {id: row.id, name: row.title}
        })}
                value={filterField}
                onChange={setFilterField}
                boxClasses="mx-0" box="25" legend="Campo"
                name="campo" icon="funnel-fill"/>
        <Input legend="Localizar" name="pesquisa" icon="funnel-fill"
               value={filterSearch} onChange={setFilterSearch}/>
        <div style={{minWidth: "80px"}}>
            <Button colors="secondary"
                    legend="Filtrar"
                    classes="btn-sm mb-1"
                    load={filterLoad}
                    onClick={() => {
                        if (props.tableOnFilter)
                            props.tableOnFilter(filterField, filterSearch, setFilterLoad);
                    }}
                    icon="funnel-fill"/>
        </div>
    </div> : null
}
