import React, {useState} from "react";

import {GET_ICON} from "../../ts/system";
import {IIcon} from "../../@types/icon";
import {IInputBase, IInputType} from "../../@types/form";

export interface IInput extends IInputBase, IIcon {
    type?: IInputType
    previewPass?: boolean
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrap = ({...props}: IInput) => {

    //Configuração do componente
    const [type, setType] = useState(props.type)
    let boxClasses: string = (!props.boxClasses ? "" : props.boxClasses) + (props.modeStyle === "table" ? "m-0 p-0" : "")
    let fieldClasses: string = (!props.fieldClasses ? "" : props.fieldClasses) + " " + (props.modeStyle === "table" ? "form-control-sm" : "")

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        {props.modeStyle !== "table"
            ? <label htmlFor={props.name} className="form-label">
                <i className={GET_ICON(props.iconType) + props.icon}/>
                {props.legend}{props.required ? <span className="text-danger">*</span> : null}
            </label> : null}
        <div className="input-group">
            <input className={"form-control " + fieldClasses}
                   id={props.name}
                   name={props.name}
                   type={type}
                   value={props.value}
                   required={props.required}
                   disabled={props.disabled}
                   placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                   onChange={event => !props.onChange ? null : props.onChange(event.target.value)}
                   onBlur={event => !props.onBlur ? null : props.onBlur(event.target.value)}/>
            {props.previewPass && props.type === "password"
                ? <span className="input-group-text"><a href="#" className="form-control-view"
                                                        onClick={() => setType(type === "password" ? "text" : "password")}>
                        <i className={"bi bi-" + (type === "password" ? "eye" : "eye-slash")}/></a></span> : null}
        </div>
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
const Input = ({type = "text", box = "100", frameworkStyle = "bootstrap", ...props}: IInput) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrap {...props} box={box} type={type}/>
        : <></>
}
export default Input
