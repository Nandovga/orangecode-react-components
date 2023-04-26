import React from "react";
import {IIcon} from "../../../@types/icon";
import {GET_ICON} from "../../../ts/system";
import {IHookForm, IInputBase} from "../../../@types/form";

interface Props extends IInputBase, IHookForm, IIcon {
    label: string
}

/**
 * Componente SwitchBootstrap5
 * @param box
 * @param props
 * @constructor
 */
const SwitchBootstrap = ({box = "50", ...props}: Props) => {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + box + " " + boxClasses}>
        <label className="form-label">
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <div className="form-check form-switch ms-3">
            <input className={"form-check-input " + fieldClasses}
                   type="checkbox"
                   disabled={props.disabled}
                   {...props.register(props.name, {})}/>
            <label className="form-check-label" htmlFor={props.name}>{props.label}</label>
        </div>
    </div>
}

/**
 * Componente Switch
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Switch = ({frameworkStyle = "bootstrap", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <SwitchBootstrap {...props}/> : <></>
}
export default Switch
