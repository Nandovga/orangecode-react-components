import React from "react";
import {IIcon} from "../@types/icon";
import {GET_ICON} from "../ts/system";
import {IColor} from "../@types/color";
import {IInputBase} from "../@types/form";

export interface IButton extends Omit<IInputBase, "box" | "boxClasses" | "fieldClasses" | "value" | "required" | "name" | "placeholder" | "onChange">, IIcon {
    colors: IColor
    onClick(): void
    variant?: "roudend" | "initial"
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
    let disabled = props.disabled ? "disabled " : ""
    let variantClasse = variant === "initial"
        ? "btn btn-" + props.colors
        : "rounded-pill badge justify-content-center align-items-center d-flex bg-" + props.colors

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return frameworkStyle === "bootstrap" ?
        <a href="#"
           title={props.legend}
           style={variant === "roudend"
               ? {width: '30px', height: '30px', opacity: disabled ? '0.5' : ''}
               : {opacity: disabled ? '0.5' : ''}}
           className={disabled + variantClasse}
           onClick={event => {
               event.preventDefault();
               if (!props.disabled) props.onClick()
           }}>
            <i className={(variant === "roudend" ? "fs-6" : "") + " -" + GET_ICON(props.iconType) + props.icon}/>
            <span className={variant === "initial" ? "ms-1" : ""}>{variant === "initial" ? props.legend : ""}</span>
        </a>
        : null
}
export default Button
