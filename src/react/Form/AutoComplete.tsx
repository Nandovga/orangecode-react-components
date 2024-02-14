import React, {JSX, useEffect, useState} from "react";

import {GET_ICON} from "../../ts/system";
import {IIcon} from "../../@types/icon";
import {IColor} from "../../@types/color";
import {IInputBase} from "../../@types/form";

export type IAutoCompleteData = {
    id: any,
    value: string,
    selected?: boolean
    element?: JSX.Element
}

export interface IAutoComplete extends IInputBase, IIcon {
    autoCompleteValue: IAutoCompleteData | null | string
    autoCompleteData: Array<IAutoCompleteData>
    onAutoCompleteValue(value: IAutoCompleteData | string | null): void
    onAutoCompleteData?: (value: string, setDTO: React.Dispatch<IAutoCompleteData[]>) => void

    autoCompleteLaod?: boolean
    autoCompleteLoadColors?: IColor
}

/**
 * Exibe o componente de Autocomplete bootstrap
 * @param props
 * @constructor
 */
const AutoCompleteBootstrap = (props: IAutoComplete) => {

    //Configuração do componente
    let boxClasses: string = (!props.boxClasses ? "" : props.boxClasses) + (props.modeStyle === "table" ? "m-0 p-0" : "");
    let fieldClasses: string = (!props.fieldClasses ? "" : props.fieldClasses) + " " + (props.modeStyle === "table" ? "form-control-sm" : "");

    //STATE ≥ Estado do componente
    const [DTO, setDTO] = useState<IAutoCompleteData[]>([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //DATA - Realiza a pesquisa do autocomplete dentro dos dados
    const handleFilterAutoComplete = (value: string): Array<IAutoCompleteData> => {
        if (typeof props.autoCompleteValue !== "string") {
            return [];
        }
        return props.autoCompleteData.filter(item => {
            let valor = item.value.toString()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            let pesquisa = value.toString()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            if (valor.includes(pesquisa)) {
                return item;
            }
        });
    };

    //DATA - Retorna os itens da Lista de seleção
    const handleItem = (item: IAutoCompleteData) => {
        return <div className={"autocomplete-element-selected " + (item.selected === false ? "disabled" : "")}
                    key={item.id}
                    onClick={event => {
                        event.preventDefault();
                        if (item.selected !== false) {
                            props.onAutoCompleteValue(item);
                            setIsFocus(false);
                        }
                    }}>{!item.element ? item.value : item.element}</div>;
    };

    //STATE ≥ Loading
    useEffect(() => {
        if (typeof props.autoCompleteValue === "string") {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [props.autoCompleteValue]);

    //STATE ≥ Loading
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [isLoading]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"autocomplete box-" + props.box + " " + boxClasses}>
        {props.modeStyle !== "table" ?
            <label className="form-label"
                   htmlFor={props.name}>
                <i className={GET_ICON(props.iconType) + props.icon}/>
                {props.legend}{props.required ? <span className="text-danger">*</span> : null}
            </label> : null}
        <div
            className={"d-flex align-items-center form-control " + (props.disabled ? "disabled" : "") + " " + fieldClasses}>
            <i className="bi bi-search me-2"/>
            <input className="autocomplete-input"
                   disabled={props.disabled}
                   placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                   required={props.required}
                   type="text"
                   value={typeof props.autoCompleteValue === "string" ? props.autoCompleteValue : props.autoCompleteValue?.value}
                   onBlur={() => {
                       setTimeout(() => {
                           setIsFocus(false);
                       }, 100);
                   }}
                   onChange={event => {
                       props.onAutoCompleteValue(event.target.value);
                       if (props.onAutoCompleteData) {
                           props.onAutoCompleteData(event.target.value, setDTO);
                       }
                   }}
                   onFocus={() => setIsFocus(true)}/>
            {props.autoCompleteLaod || isLoading
                ? <div className={"autocomplete-load spinner-border text-" + props.autoCompleteLoadColors}>
                    <span className="visually-hidden">Loading...</span>
                </div> : null}
        </div>
        <div className="position-relative">
            <div className={"autocomplete-element shadow-sm "
                + (isFocus && typeof props.autoCompleteValue !== "object" && props.autoCompleteValue.length > 0 ? "" : "closed")}>
                {typeof props.autoCompleteValue === "string"
                    ? !props.onAutoCompleteData
                        ? handleFilterAutoComplete(props.autoCompleteValue).map(item => handleItem(item))
                        : DTO.map(item => handleItem(item))
                    : null}
            </div>
        </div>
    </div>;
};

/**
 * Componente de Autocomplete
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const AutoComplete = ({frameworkStyle = "bootstrap", ...props}: IAutoComplete) => {
    return frameworkStyle === "bootstrap"
        ? <AutoCompleteBootstrap {...props}/> : null;
};
export default AutoComplete;
