import React, {useState} from "react";

import {GET_ICON} from "../../../ts/system";
import {IIcon} from "../../../@types/icon";
import {IHookForm, IInputBase, IInputType} from "../../../@types/form";

interface Props extends IInputBase, IHookForm, IIcon {
    type?: IInputType
    previewPass?: boolean
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrap = ({...props}: Props) => {

    //Configuração do componente
    const [type, setType] = useState(props.type)
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
        <div className="input-group">
            <input className={"form-control " + fieldClasses + (!props.errors[props.name] ? "" : "is-invalid")}
                   id={props.name}
                   type={type}
                   disabled={props.disabled}
                   placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                   {...props.register(props.name, {
                       required: !props.required ? false : "Campo obrigatório",
                       onBlur: (e) => props.onBlur ? props.onBlur(e.target.value) : null,
                       onChange: (e) => props.onChange ? props.onChange(e.target.value) : null
                   })}/>
            {props.previewPass && props.type === "password"
                ? <span className="input-group-text">
                    <a href="#" className="form-control-view"
                       onClick={() => setType(type === "password" ? "text" : "password")}><i
                        className={"bi bi-" + (type === "password" ? "eye" : "eye-slash")}/></a></span> : null}
        </div>
        <div className={(!props.errors[props.name] ? "" : "invalid-feedback is-invalid")}
             id="j_feedback"
             data-name={props.name}>{!props.errors[props.name] ? '' : props.errors[props.name].message}</div>
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
const Input = ({type = "text", frameworkStyle = "bootstrap", box = "100", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrap box={box} type={type} {...props} />
        : <></>
}
export default Input
