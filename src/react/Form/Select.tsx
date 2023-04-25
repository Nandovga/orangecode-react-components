import React from "react";
import {IIcon} from "../../@types/icon";
import {GET_ICON} from "../../ts/system";
import {IInputBase} from "../../@types/form";

export type ISelectData = {
    id: any,
    name: any
}

export interface ISelect extends IInputBase, IIcon {
    data: Array<ISelectData>
    init?: boolean | string
}

/**
 * Componente Select Bootstrap5
 * @param props
 * @constructor
 */
const SelectBootstrap = ({...props}: ISelect) => {

    //Configuração do componente
    let init = !props.init ? null
        : (typeof props.init === 'boolean'
            ? <option value=''>Selecione {props.legend.toLowerCase()}</option>
            : <option value=''>{props.init}</option>)
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        <label className="form-label">
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <select className={"form-select " + fieldClasses}
                id={props.name}
                name={props.name}
                required={props.required}
                disabled={props.disabled}
                value={!props.value ? "" : props.value}
                placeholder={!props.placeholder ? "Digite " + props.name : props.placeholder}
                onChange={event => !props.onChange ? null : props.onChange(event.target.value)}>
            {init}
            {props.data.length > 0 ? props.data.map(row =>
                <option key={row.id} value={row.id}>{row.name}</option>) : null}
        </select>
        <div id="j_feedback" data-name={props.name}/>
    </div>
}

/**
 * Componente Select
 * @param frameworkStyle
 * @param box
 * @param props
 * @constructor
 */
const Select = ({frameworkStyle = "bootstrap", box = "100", ...props}: ISelect) => {
    return frameworkStyle === "bootstrap"
        ? <SelectBootstrap {...props} box={box}/> : <></>
}
export default Select
