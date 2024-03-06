import React from "react";
import { IRadioValue } from "../Radio";
import { IIcon } from "../../../@types/icon";
import { GET_ICON } from "../../../ts/system";
import { IHookForm, IInputBase } from "../../../@types/form";

interface Props extends IInputBase, IHookForm, IIcon {
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
const RadioBootstrap = ({ box = "100", radioAlign = "row", ...props }: Props) => {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses;
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses;

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"box-" + box + " " + boxClasses + " d-flex flex-wrap " + "flex-" + radioAlign}>
        <label className="form-label w-100"
               htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        {props.radioValue.map(row =>
            <div
                className={"form-check " + (radioAlign === "row" ? "me-2" : "mb-2") + (!props.errors[props.name] ? "" : " is-invalid")}
                key={row.value}>
                <input className={"form-check-input " + fieldClasses + (!props.errors[props.name] ? "" : "is-invalid")}
                       disabled={props.disabled || row.disabled}
                       id={props.name}
                       type="radio"
                       value={row.value}
                       {...props.register(props.name, {
                           required: !props.required ? false : "Campo obrigatório"
                       })}/>
                <label className="form-check-label">{row.legend}</label>
            </div>)}
        <div className={(!props.errors[props.name] ? "" : "invalid-feedback is-invalid")}
             data-name={props.name}
             id="j_feedback">{!props.errors[props.name] ? "" : props.errors[props.name].message}</div>
    </div>;
};

/**
 * Componente Radio
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Radio = ({ frameworkStyle = "bootstrap", ...props }: Props) => {
    return frameworkStyle === "bootstrap"
        ? <RadioBootstrap {...props}/> : <></>;
};
export default Radio;
