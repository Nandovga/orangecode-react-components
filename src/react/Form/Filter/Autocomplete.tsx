import React from "react";
import {AutoComplete} from "primereact/autocomplete";

export interface IFilterAutocomplete {
    id: any
    label: string
}

export interface IFilterAutocompleteProps {
    value: string
    setValue: React.Dispatch<string>
    data: IFilterAutocomplete[]
    dataOriginal: IFilterAutocomplete[]
    onSearch?: (value: string) => void
}

/**
 * Exibe o compo de autocomplete dentro do filtro
 * @param value
 * @param setValue
 * @param data
 * @param dataOriginal
 * @param onSearch
 * @constructor
 */
const Autocomplete = ({value, setValue, data, dataOriginal, onSearch}: IFilterAutocompleteProps) => {
    let filtered = typeof value !== 'object'
        ? value.split(';').map(item => parseInt(item))
        : value

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className="d-flex flex-column w-100">
        <AutoComplete inputClassName="w-100 fs-7"
                      multiple
                      suggestions={data}
                      field="label"
                      value={typeof value !== "object" ? dataOriginal.filter(item => {
                          return filtered.includes(item.id)
                      }) : value}
                      completeMethod={e => {
                          if (onSearch) {
                              onSearch(e.query)
                          }
                      }}
                      onChange={e => setValue(e.value)}/>
    </div>
}
export default Autocomplete
