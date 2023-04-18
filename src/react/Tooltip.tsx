import React, {useRef, useState} from "react";
import {usePopper} from "react-popper";

import {IFrameworkStyle} from "../@types/style";

export interface ITooltip {
    children
    tooltip: string
    tooltipAlign: "top" | "left" | "bottom" | "right"
    frameworkStyle?: IFrameworkStyle
}

/**
 * Tooltip Bootstrap5
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const TooltipBootstrap = ({frameworkStyle = "bootstrap", ...props}: ITooltip) => {
    const ref = useRef<HTMLElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
    const {styles, attributes} = usePopper(ref.current, popperElement, {
        placement: props.tooltipAlign,
        modifiers: [
            {name: "arrow", options: {element: arrowElement}},
            {name: "offset", options: {offset: [0, 8]}}
        ]
    });
    const childrenElement = React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
            ref: ref,
            onMouseEnter: () => setIsVisible(true),
            onMouseLeave: () => setIsVisible(false)
        })
    })

    const alignBootstrap = props.tooltipAlign === "top" ? "bs-tooltip-top"
        : props.tooltipAlign === "bottom" ? "bs-tooltip-bottom"
            : props.tooltipAlign === "left" ? "bs-tooltip-start" : "bs-tooltip-end"
    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <>
        {childrenElement}
        {isVisible ? <>
            <div {...attributes.popper}
                 style={styles.popper}
                 ref={setPopperElement}
                 className={"tooltip show " + alignBootstrap}>
                <div ref={setArrowElement} style={styles.arrow} className="tooltip-arrow"/>
                <div className="tooltip-inner">{props.tooltip}</div>
            </div>
        </> : null}
    </>
}

/**
 * Componente Tooltip
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Tooltip = ({frameworkStyle = "bootstrap", ...props}: ITooltip) => {
    return frameworkStyle === "bootstrap" ? <TooltipBootstrap {...props}>
        {props.children}
    </TooltipBootstrap> : <></>
}
export default Tooltip
