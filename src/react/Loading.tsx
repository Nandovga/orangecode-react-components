import React from "react";
import {IColor} from "../@types/color";
import {IFrameworkStyle} from "../@types/style";

export interface ILoading {
    loadingVisible: boolean
    loadingText?: string
    loadingColor?: IColor
    loadingType?: "button" | "box"
    loadingStyle?: "border" | "grow"
}

type Props = ILoading & {
    frameworkStyle?: IFrameworkStyle
}

/**
 * Componente de Loading Box - Bootstrap5
 * @param loadingText
 * @param props
 * @constructor
 */
const LoadingBootstrapBox = ({loadingText = "Processando os dados...", ...props}: Props) => {
    return <div className={"flex-column position-absolute justify-content-center align-items-center " + (props.loadingVisible ? "d-flex" : "d-none")}
                style={{width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", top: 0, left: 0, zIndex: 2000}}>
        <div className={"spinner-" + (!props.loadingStyle ? "border" : props.loadingStyle) +  " text-" + props.loadingColor} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className={"mt-2 text-" + props.loadingColor}>{loadingText}</p>
    </div>
}

/**
 * Componente de Loading Button - Bootstrap5
 * @param props
 * @constructor
 */
const LoadingBootstrapButton = ({...props}: Props) => {
    return props.loadingVisible
        ? <span className={"spinner-border spinner-border-sm text-" + props.loadingColor}/> : <></>
}

/**
 * Loading
 * @param frameworkStyle
 * @param loadingType
 * @param loadingColor
 * @param props
 * @constructor
 */
const Loading = ({frameworkStyle = "bootstrap", loadingType = "box", loadingColor = "white", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? loadingType === "box"
            ? <LoadingBootstrapBox {...props} loadingColor={loadingColor}/>
            : <LoadingBootstrapButton {...props} loadingColor={loadingColor}/>
        : <></>
}
export default Loading
