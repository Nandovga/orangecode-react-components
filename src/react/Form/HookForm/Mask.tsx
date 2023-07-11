import React from "react";
import {Controller} from "react-hook-form";
import InputMask from "react-input-mask";

import {GET_ICON} from "../../../ts/system";
import {IIcon} from "../../../@types/icon";
import {IInputBase} from "../../../@types/form";

interface Props extends IInputBase, IIcon {
    mask: string
    control: any
    onBlur?(value: any): void
}

/**
 * Componente de InputBoostrap5
 * @param props
 * @constructor
 */
const InputBootstrapMask = ({...props}: Props) => {

    //Configuração do componente
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    console.log(props.placeholder?.length)
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
        <Controller
            control={props.control}
            name={props.name}
            render={({field: {onChange, value}, formState: {errors}}) => {
                let message = !errors[props.name] ? '' : errors[props.name]?.message
                return <>
                    <InputMask mask={props.mask}
                               id={props.name}
                               type="text"
                               disabled={props.disabled}
                               placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                               className={"form-control " + fieldClasses + (!errors[props.name] ? "" : "is-invalid")}
                               value={value === undefined || value === null ? "" : value}
                               required={props.required}
                               onChange={(e) => onChange(e.target.value)}
                               onBlur={event => {
                                   if (props.onBlur) props.onBlur(event.target.value)
                               }}/>
                    <div id="j_feedback"
                         className={(!errors[props.name] ? "" : "invalid-feedback is-invalid")}
                         data-name={props.name}>{typeof message === "string" ? message : ""}</div>
                </>
            }}/>
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
const Mask = ({frameworkStyle = "bootstrap", box = "100", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <InputBootstrapMask box={box} {...props} />
        : <></>
}
export default Mask
