import React from "react";
import * as Tippy from "react-tippy";
import "react-tippy/dist/tippy.css";
import {IFrameworkStyle} from "../@types/style";

export interface ITooltip extends Tippy.TooltipProps {
    children: React.ReactNode
    frameworkStyle?: IFrameworkStyle
}

/**
 * Componente Tooltip
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Tooltip({frameworkStyle = "bootstrap", ...props}: ITooltip) {
    return frameworkStyle === "bootstrap" ? <Tippy.Tooltip {...props}>{props.children}</Tippy.Tooltip> : <></>;
}

export default Tooltip;
