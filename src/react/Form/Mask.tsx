import React from "react";
import {InputMask} from "primereact/inputmask";

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
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses;
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses;

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        <label className="form-label"
               htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <InputMask className={"form-control " + fieldClasses}
                   disabled={props.disabled}
                   id={props.name}
                   mask={props.mask}
                   name={props.name}
                   placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                   required={props.required}
                   type="text"
                   value={props.value}
                   onBlur={event => !props.onBlur ? null : props.onBlur(event.target.value)}
                   onChange={event => !props.onChange ? null : props.onChange(event.target.value)}/>
        <div data-name={props.name}
             id="j_feedback"/>
    </div>;
};

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
        ? <InputBootstrapMask {...props}
                              box={box}/>
        : <></>;
};
export default Mask;
