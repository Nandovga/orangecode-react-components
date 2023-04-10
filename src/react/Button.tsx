import React from "react";
import {IIcon} from "../@types/icon";
import {GET_ICON} from "../ts/system";
import {IColor} from "../@types/color";
import {IInputBase} from "../@types/form";
import Loading from "@react/Loading";

export interface IButton extends Omit<IInputBase, "box" | "boxClasses" | "fieldClasses" | "value" | "required" | "name" | "placeholder" | "onChange">, IIcon {
    colors: IColor
    onClick?: () => void
    variant?: "roudend" | "initial"
    load?: boolean
}

/**
 * Componente Botão
 * @param frameworkStyle
 * @param variant
 * @param props
 * @constructor
 */
const Button = ({frameworkStyle = "bootstrap", variant = "initial", ...props}: IButton) => {
    //Configuração do componente
    let disabled: string = !!props.load || props.disabled ? "disabled " : ""
    let type: string = variant === "initial"
        ? "btn btn-" + props.colors
        : "rounded-pill badge justify-content-center align-items-center d-flex bg-" + props.colors
    let style = variant === "roudend"
        ? {width: '30px', height: '30px', opacity: disabled ? '0.5' : '', border: "none"}
        : {opacity: disabled ? '0.5' : ''}
    let button = () => {
        return <>
            <Loading loadingVisible={!!props.load} loadingType="button"/>
            {!!props.load
                ? null
                : <i className={(variant === "roudend" ? "fs-6" : "") + " -" + GET_ICON(props.iconType) + props.icon}/>}
            <span className={variant === "initial" ? "ms-1" : ""}>{variant === "initial" ? props.legend : ""}</span>
        </>
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return frameworkStyle === "bootstrap" ?
        !props.onClick
            ? <button type="submit"
                      title={props.legend}
                      style={style}
                      className={disabled + type}>{button()}</button>
            : <a href="#"
                 title={props.legend}
                 style={style}
                 className={disabled + type}
                 onClick={event => {
                     event.preventDefault();
                     if (!props.disabled && props.onClick) props.onClick()
                 }}>{button()}</a>
        : null
}
export default Button
