import React from "react";
import {IIcon} from "../../@types/icon";
import {GET_ICON} from "../../ts/system";
import {IInputBase} from "../../@types/form";

export type IRadioValue = {
    value: string,
    legend: string,
    disabled?: boolean
}

export interface IRadio extends IInputBase, IIcon {
    radioValue: Array<IRadioValue>
    radioAlign?: "row" | "column"
}

/**
 * Componente Radio Bootstrap5
 * @param box
 * @param radioAlign
 * @param props
 * @constructor
 */
const RadioBootstrap = ({box = "100", radioAlign = "row", ...props}: IRadio) => {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"box-" + box + " " + boxClasses + " d-flex flex-wrap " + "flex-" + radioAlign}>
        <label className="form-label w-100" htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        {props.radioValue.map(row =>
            <div key={row.value} className={"form-check " + (radioAlign === "row" ? "me-2" : "mb-2")}>
                <input className={"form-check-input " + fieldClasses}
                       type="radio"
                       id={props.name + "-" + row.value}
                       disabled={props.disabled || row.disabled}
                       required={props.required}
                       name={props.name}
                       value={row.value}
                       onChange={event => {
                           if (props.onChange)
                               props.onChange(event.target.value)
                       }}
                       checked={props.value === row.value ?? false}/>
                <label className="form-check-label">{row.legend}</label>
            </div>)}
        <div id="j_feedback" data-name={props.name}/>
    </div>
}

/**
 * Componente Radio
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Radio = ({frameworkStyle = "bootstrap", ...props}: IRadio) => {
    return frameworkStyle === "bootstrap"
        ? <RadioBootstrap {...props}/> : <></>
}
export default Radio
