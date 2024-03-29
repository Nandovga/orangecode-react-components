import React from "react";
import { IIcon } from "../../../@types/icon";
import { GET_ICON } from "../../../ts/system";
import { IHookForm, IInputBase } from "../../../@types/form";

export interface IInput extends IInputBase, IHookForm, IIcon {
    rows?: number
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const TextAreaBootstrap = ({ ...props }: IInput) => {

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
        <textarea className={"form-control " + fieldClasses + (!props.errors[props.name] ? "" : "is-invalid")}
                  disabled={props.disabled}
                  id={props.name}
                  placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                  rows={!props.rows ? 3 : props.rows}
                  {...props.register(props.name, {
                      required: !props.required ? false : "Campo obrigatório",
                      onBlur: (e) => props.onBlur ? props.onBlur(e.target.value) : null,
                      onChange: (e) => props.onChange ? props.onChange(e.target.value) : null
                  })}/>
        <div className={(!props.errors[props.name] ? "" : "invalid-feedback is-invalid")}
             data-name={props.name}
             id="j_feedback">{!props.errors[props.name] ? "" : props.errors[props.name].message}</div>
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
const TextArea = ({ box = "100", frameworkStyle = "bootstrap", ...props }: IInput) => {
    return frameworkStyle === "bootstrap"
        ? <TextAreaBootstrap {...props}
                             box={box}/>
        : <></>;
};
export default TextArea;
