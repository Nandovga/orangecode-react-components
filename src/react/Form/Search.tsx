import React from "react";
import {IIcon} from "../../@types/icon";
import {GET_ICON} from "../../ts/system";
import {IInputBase} from "../../@types/form";

export interface ISearchData {
    search: number
    name: string
    selected?: boolean
}

export interface ISearch<T> extends IInputBase, IIcon, Omit<IInputBase, "onChange" | "value"> {
    value: T & ISearchData | null | string

    onChange(value: any): void

    searchData: Array<T & ISearchData>
    searchValueType?: "search" | "name"
    onSearchClick?: () => void
}

/**
 * Pesquisa de dados - Bootstrap5
 * @param props
 * @constructor
 */
function SearchBootstrap<T>(props: ISearch<T>) {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    //Executa a ação de pesquisa
    function handleBlur(value) {
        let search = props.searchData.filter(row => row.search === parseInt(value))
        if (search.length === 0 || search[0].selected === false)
            return props.onChange("")
        return props.onChange(search[0])
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"position-relative box-" + (!props.box ? "100" : props.box) + " " + boxClasses}>
        <label htmlFor={props.name} className="form-label">
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <input className={"form-control search " + fieldClasses}
               id={props.name}
               name={props.name}
               type="text"
               value={props.value === null ? "" : (typeof props.value === "string" ? props.value : props.value[!props.searchValueType ? "name" : props.searchValueType])}
               required={props.required}
               disabled={props.disabled}
               placeholder={!props.placeholder ? "" : props.placeholder}
               onKeyDown={ev => {
                   if (ev.code === "F2" && props.onSearchClick)
                       props.onSearchClick();
                   if (ev.code === "NumpadEnter" || ev.code === "Enter")
                       handleBlur(props.value)
               }}
               onChange={event => {
                   if (!isNaN(parseInt(event.target.value)))
                       return props.onChange(event.target.value.replace(/\D/g, ''))
                   return props.onChange("")
               }}
               onBlur={event => handleBlur(event.target.value)}/>
        {props.onSearchClick
            ? <a href="#"
                 onClick={event => {
                     event.preventDefault();
                     if (props.onSearchClick) props.onSearchClick();
                 }}
                 className="form-control-search">
                <i className="bi bi-search"/>
            </a> : null}
        <div id="j_feedback" data-name={props.name}/>
    </div>
}

/**
 * Componente de Pesquisa de dados
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Search<T>({frameworkStyle = "bootstrap", ...props}: ISearch<T>) {
    return frameworkStyle === "bootstrap" ? <SearchBootstrap {...props} /> : <></>
}

export default Search
