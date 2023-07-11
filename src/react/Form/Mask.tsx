import React from "react";
import InputMask from "react-input-mask";

import {GET_ICON} from "../../ts/system";
import {IIcon} from "../../@types/icon";
import {IInputBase} from "../../@types/form";

export interface IInput extends IInputBase, IIcon {
    mask: string
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrapMask = ({...props}: IInput) => {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        <label htmlFor={props.name} className="form-label">
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <InputMask id={props.name}
                   name={props.name}
                   mask={props.mask}
                   type="text"
                   disabled={props.disabled}
                   required={props.required}
                   placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                   value={props.value}
                   className={"form-control " + fieldClasses}
                   onChange={event => !props.onChange ? null : props.onChange(event.target.value)}
                   onBlur={event => !props.onBlur ? null : props.onBlur(event.target.value)}/>
        <div id="j_feedback" data-name={props.name}/>
    </div>
}

/**
 * Componente de Input
 * @param type
 * @param box
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Mask = ({box = "100", frameworkStyle = "bootstrap", ...props}: IInput) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrapMask {...props} box={box}/>
        : <></>
}
export default Mask
