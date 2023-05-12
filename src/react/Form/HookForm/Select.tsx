import React from "react";
import {ISelectData} from "../Select";
import {IIcon} from "../../../@types/icon";
import {GET_ICON} from "../../../ts/system";
import {IHookForm, IInputBase} from "../../../@types/form";

interface Props extends IInputBase, IHookForm, IIcon {
    data: Array<ISelectData>
    init?: boolean | string
}

/**
 * Componente Select Bootstrap5
 * @param props
 * @constructor
 */
const SelectBootstrap = ({...props}: Props) => {

    //Configuração do componente
    let init = !props.init ? null
        : (typeof props.init === 'boolean'
            ? <option value=''>Selecione {props.legend.toLowerCase()}</option>
            : <option value=''>{props.init}</option>)
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses
    let fieldClasses: string = !props.fieldClasses ? "" : props.fieldClasses

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        <label className="form-label" htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <select className={"form-select " + fieldClasses + (!props.errors[props.name] ? "" : "is-invalid")}
                disabled={props.disabled}
                id={props.name}
                placeholder={!props.placeholder ? "Digite " + props.name : props.placeholder}
                {...props.register(props.name, {
                    required: !props.required ? false : "Campo obrigatório",
                    onChange: (e) => props.onChange ? props.onChange(e.target.value) : null
                })}>
            {init}
            {props.data.length > 0 ? props.data.map(row =>
                <option key={row.id} value={row.id}>{row.name}</option>) : null}
        </select>
        <div className={(!props.errors[props.name] ? "" : "invalid-feedback")}
             id="j_feedback" data-name={props.name}>{!props.errors[props.name] ? '' : props.errors[props.name].message}</div>
    </div>
}

/**
 * Componente Select
 * @param frameworkStyle
 * @param box
 * @param props
 * @constructor
 */
const Select = ({frameworkStyle = "bootstrap", box = "100", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <SelectBootstrap {...props} box={box}/> : <></>
}
export default Select
