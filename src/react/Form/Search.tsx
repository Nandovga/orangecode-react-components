import React from "react";
import {IIcon} from "../../@types/icon";
import {GET_ICON} from "../../ts/system";
import {IInputBase} from "../../@types/form";

export interface ISearchData {
    name: string
    search: number
    selected?: boolean
}

export interface ISearch<T> extends IInputBase, IIcon, Omit<IInputBase, "onChange" | "value"> {
    onChange(value: any): void
    value: T & ISearchData | null | string
    searchData: Array<T & ISearchData>
    searchValueType?: "search" | "name"
    onSearchData?: (value: T & ISearchData | null | string) => void
    onSearchClick?: () => void
}

/**
 * Pesquisa de dados - Bootstrap5
 * @param props
 * @constructor
 */
function SearchBootstrap<T>(props: ISearch<T>) {

    //Configuração do componente
    let boxClasses: string = (!props.boxClasses ? "" : props.boxClasses) + (props.modeStyle === "table" ? "m-0 p-0" : "");
    let fieldClasses: string = (!props.fieldClasses ? "" : props.fieldClasses) + " " + (props.modeStyle === "table" ? "form-control-sm" : "");

    //Executa a ação de pesquisa
    function handleBlur(value) {
        if (props.onSearchData) {
            return props.onSearchData(value);
        }
        let search = props.searchData.filter(row => row.search === parseInt(value));
        if (search.length === 0 || search[0].selected === false) {
            return props.onChange("");
        }
        return props.onChange(search[0]);
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"position-relative box-" + (!props.box ? "100" : props.box) + " " + boxClasses}>
        {props.modeStyle !== "table"
            ? <label className="form-label"
                     htmlFor={props.name}>
                <i className={GET_ICON(props.iconType) + props.icon}/>
                {props.legend}{props.required ? <span className="text-danger">*</span> : null}
            </label> : null}
        <input className={"form-control search " + fieldClasses}
               disabled={props.disabled}
               id={props.name}
               name={props.name}
               placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
               required={props.required}
               type="text"
               value={props.value === null ? "" : (typeof props.value === "string" ? props.value : props.value[!props.searchValueType ? "name" : props.searchValueType])}
               onChange={event => {
                   if (!isNaN(parseInt(event.target.value))) {
                       return props.onChange(event.target.value.replace(/\D/g, ""));
                   }
                   return props.onChange("");
               }}
               onKeyDown={ev => {
                   if (ev.code === "F2" && props.onSearchClick) {
                       props.onSearchClick();
                   }
                   if (ev.code === "NumpadEnter" || ev.code === "Enter") {
                       handleBlur(props.value);
                   }
               }}
               onBlur={event => handleBlur(event.target.value)}/>
        {props.onSearchClick
            ? <a className="form-control-search"
                 href="#"
                 onClick={event => {
                     event.preventDefault();
                     if (props.onSearchClick) {
                         props.onSearchClick();
                     }
                 }}><i className="bi bi-search"/></a> : null}
        <div data-name={props.name}
             id="j_feedback"/>
    </div>;
}

/**
 * Componente de Pesquisa de dados
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Search<T>({frameworkStyle = "bootstrap", ...props}: ISearch<T>) {
    return frameworkStyle === "bootstrap" ? <SearchBootstrap {...props}/> : <></>;
}

export default Search;
