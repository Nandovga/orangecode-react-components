import React, {useState} from "react";
import $ from "jquery"

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

    //Ajusta posicionamento do View Pass
    $(document).ready(() => {
        $.each($("body").find(".form-control[type='password']"), function () {
            let position = $(this).position()
            let height = $(this).outerHeight()
            console.log(height)
            $(this).parent().find(".form-control-view").css(({
                "top": position.top,
                "right": 8,
                "height": height + "px"
            }))
        })
    })

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
               type={type}
               disabled={props.disabled}
               placeholder={!props.placeholder ? "Digite " + props.name : props.placeholder}
               {...props.register(props.name, {
                   required: !props.required ? false : "Campo obrigatório",
                   onBlur: (e) => props.onBlur ? props.onBlur(e.target.value) : null ,
                   onChange: (e) => props.onChange ? props.onChange(e.target.value) : null
               })}/>
        {props.previewPass && props.type === "password"
            ? <span className={"bi bi-" + (type === "password" ? "eye" : "eye-slash") + " form-control-view"}
                    onClick={() => setType(type === "password" ? "text" : "password")}/> : null}
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
const Input = ({type = "text", frameworkStyle = "bootstrap", box = "100", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrap box={box} type={type} {...props} />
        : <></>
}
export default Input
