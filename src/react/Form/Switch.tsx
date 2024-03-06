import React from "react";
import { IInputBase } from "../../@types/form";
import { GET_ICON } from "../../ts/system";
import { IIcon } from "../../@types/icon";

export interface ISwitch extends IInputBase, IIcon {
    value: boolean
    label: string
}

/**
 * Componente SwitchBootstrap5
 * @param box
 * @param props
 * @constructor
 */
const SwitchBootstrap = ({ box = "50", ...props }: ISwitch) => {
    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses;
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses;

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + box + " " + boxClasses}>
        <label className="form-label"
               htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <div className="form-check form-switch">
            <input checked={props.value}
                   className={"form-check-input " + fieldClasses}
                   disabled={props.disabled}
                   id={props.name}
                   name={props.name}
                   required={props.required}
                   type="checkbox"
                   onChange={event => {
                       if (props.onChange) {
                           props.onChange(event.target.checked);
                       }
                   }}/>
            <label className="form-check-label"
                   htmlFor={props.name}>{props.label}</label>
        </div>
    </div>;
};

/**
 * Componente Switch
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Switch = ({ frameworkStyle = "bootstrap", ...props }: ISwitch) => {
    return frameworkStyle === "bootstrap" ? <SwitchBootstrap {...props}/> : <></>;
};
export default Switch;
