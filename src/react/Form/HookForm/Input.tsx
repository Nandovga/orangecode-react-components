import React from "react";
import {GET_ICON} from "../../../ts/system";
import {IIcon} from "../../../@types/icon";
import {IHookForm, IInputBase, IInputType} from "../../../@types/form";

interface IInput extends IInputBase, IHookForm, IIcon {
    type?: IInputType
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrap = ({...props}: IInput) => {

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
        <input className={"form-control " + fieldClasses + (!props.errors[props.name] ? "" : "is-invalid")}
               name={props.name}
               type={props.type}
               disabled={props.disabled}
               placeholder={!props.placeholder ? "Digite " + props.name : props.placeholder}
               {...props.register(props.name, {
                   required: !props.required ? false : "Campo obrigatório",
                   onBlur: (e) => props.onBlur ? props.onBlur(e.target.value) : null ,
                   onChange: (e) => props.onChange ? props.onChange(e.target.value) : null
               })}
        />
        <div className={(!props.errors[props.name] ? "" : "invalid-feedback")}
             id="j_feedback" data-name={props.name}>{!props.errors[props.name] ? '' : props.errors[props.name].message}</div>
    </div>
}

/**
 * Componente Input HookForm
 * @param type
 * @param frameworkStyle
 * @param box
 * @param props
 * @constructor
 */
const Input = ({type = "text", frameworkStyle = "bootstrap", box = "100", ...props}: IInput) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrap box={box} type={type} {...props} /> : <></>
}
export default Input
