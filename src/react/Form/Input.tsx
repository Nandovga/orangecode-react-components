import React from "react";
import {GET_ICON} from "../../ts/system";
import {IIcon} from "../../@types/icon";
import {IInputBase} from "../../@types/form";
import {IFrameworkStyle} from "../../@types/style";

export type IInputType = 'text' | 'email' | 'number' | 'password' | 'date'

export interface IInput extends IInputBase, IIcon {
    type?: IInputType
    placeholder?: string
    frameworkStyle?: IFrameworkStyle
    onChange?(value: any): void
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrap = ({...props}: IInput) => {
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
            {props.legend}
        </label>
        <input className={"form-control " + fieldClasses}
               id={props.name}
               name={props.name}
               type={props.type}
               value={props.value}
               required={props.required}
               disabled={props.disabled}
               placeholder={!props.placeholder ? "Digite " + props.name : props.placeholder}
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
const Input = (
    {
        type = "text",
        box = "100",
        frameworkStyle = "bootstrap",
        ...props
    }: IInput) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrap {...props} box={box} type={type}/>
        : <></>
}
export default Input
