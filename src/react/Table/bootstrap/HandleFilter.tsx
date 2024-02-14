import React, {useEffect, useState} from "react";
import {ITable} from "../types";
import Button from "../../Button";
import Input from "../../Form/Input";
import Select from "../../Form/Select";

/**
 * ACTION ≥ Realiza a filtragem dos dados da TABELA
 * @param props
 * @param setDTO
 */
export function handleFilter<T>(
    props: ITable<T>,
    setDTO: React.Dispatch<Array<T & { id: any }>>
) {

    //Configurações do componente
    let filter = props.tableHeader.filter(row => row.filter);
    let options = {};
    props.tableHeader.map(row => {
        return options[row.id] = row.filterOptions === undefined ? null : row.filterOptions;
    });

    //STATE ≥ Estado do componente
    const [filterField, setFilterField] = useState<any>(filter[0] === undefined ? null : filter[0].id);
    const [filterSearch, setFilterSearch] = useState<any>("");
    const [filterOptions, setFilterOptions] = useState<any>(null);
    const [inputDisabled, setInputDisabled] = useState<false | undefined>(false);
    const [filterLoad, setFilterLoad] = useState<boolean>(false);

    useEffect(() => {
        if (filterField !== null && options[filterField] !== null) {
            setInputDisabled(options[filterField].filter(row => row.id == filterOptions)[0]?.disabled);
        }
    });

    //Aplica o filtro
    const handleFilter = () => {
        let field = !props.tableFilter?.setField ? filterField : props.tableFilter.field === "" ? filter[0].id : props.tableFilter.field;
        let value = !props.tableFilter?.setValue ? filterSearch : props.tableFilter.value;

        if (props.tableOnFilter) {
            props.tableOnFilter(
                props.tableFilterStyle === "all" ? "all" : field,
                value,
                setFilterLoad,
                filterOptions);
        }

        if (props.tableFilterStyle !== "all") {
            let result = props.tableDTO.filter(item => {
                const regex = new RegExp(value, "i");
                return regex.test(item[field]);
            });
            setDTO(filterSearch.lenght === 0 ? props.tableDTO : result);
        }

        if (props.tableFilterStyle === "all") {
            let result = props.tableDTO.filter(item => {
                for (let i = 0; i < filter.length; i++) {
                    let valor = item[filter[i].id].toString()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase();
                    let pesquisa = filterSearch.toString()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase();
                    if (valor.includes(pesquisa)) {
                        return item;
                    }
                }
            });
            setDTO(filterSearch.lenght === 0 ? props.tableDTO : result);
        }
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return filter.length > 0 && (!props.tableFilterStyle || props.tableFilterStyle === "field")
        ? <div className="w-100 d-flex flex-column flex-md-row m-0 mt-1 align-items-start align-items-md-end">
            <Select data={filter.map(row => {
                return {id: row.id, name: row.title};
            })}
                    box="25"
                    boxClasses="mx-1"
                    icon="funnel-fill"
                    legend="Campo"
                    name="campo"
                    value={!props.tableFilter || props.tableFilter?.field === undefined ? filterField : props.tableFilter.field}
                    onChange={value => {
                        if (!props.tableFilter || props.tableFilter?.setField === undefined) {
                            setFilterField(value);
                        } else {
                            props.tableFilter.setField(value);
                        }
                    }}/>
            {options[filterField] !== null && props.tableOnFilter
                ? <Select init
                          box="33"
                          boxClasses="mx-2"
                          data={options[filterField]}
                          icon="funnel-fill"
                          legend="Opções"
                          name="options"
                          value={filterOptions}
                          onChange={setFilterOptions}/>
                : null}
            <Input boxClasses="mx-1 me-2"
                   disabled={inputDisabled}
                   icon="funnel-fill"
                   legend="Localizar"
                   name="pesquisa"
                   value={!props.tableFilter ? filterSearch : props.tableFilter.value}
                   onChange={value => {
                       if (!props.tableFilter) {
                           setFilterSearch(value);
                       } else {
                           props.tableFilter.setValue(value);
                       }
                   }}/>
            <div style={{minWidth: "100px"}}>
                <Button classes="btn-sm mb-2 mt-2 mt-md-0"
                        colors="secondary"
                        icon="funnel-fill"
                        legend="Filtrar"
                        load={filterLoad}
                        onClick={handleFilter}/>
            </div>
        </div>
        : filter.length && props.tableFilterStyle === "all"
            ? <div className="d-flex align-items-center box-25 m-0">
                <div className="position-relative box-100 m-0 p-0">
                    <input className="form-control form-control-sm w-100"
                           placeholder="Busca rápida"
                           value={filterSearch}
                           onKeyDown={event => {
                               if (event.keyCode === 13) {
                                   handleFilter();
                               }
                               if (event.keyCode === 27) {
                                   setFilterSearch("");
                               }
                           }}
                           onChange={event => setFilterSearch(event.target.value)}/>
                    <a className="d-flex align-items-center"
                       href="#"
                       style={{position: "absolute", right: "8px", top: "0", bottom: "0"}}
                       onClick={event => {
                           event.preventDefault();
                           handleFilter();
                       }}><i className="bi bi-search"/></a>
                </div>
            </div> : null;
}
