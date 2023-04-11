import $ from "jquery"
import {IBreakpoint} from "../@types/system";
import {IIconType} from "../@types/icon";

/**
 * Função responsável por acessar o retorno
 * do POST "Request.js"
 * @param value
 * @constructor
 */
export function GET_TYPE<Type>(value: any): Type {
    return value;
}

/**
 * Função responsável por retorna a classe de icones
 * @param iconType
 * @constructor
 */
export function GET_ICON(iconType: IIconType = "bootstrap"): string {
    return iconType === "bootstrap" ? "me-1 bi bi-" : "";
}

/**
 * Alterna o retorno da string de acordo com tamanho da janela
 * @param breakpoint
 * @constructor
 */
export function WINDOWS_RESIZE(breakpoint: IBreakpoint): string {
    let screen: number | undefined = $(window).width();
    if (!screen)
        return breakpoint.default;
    switch (true){
        case screen <= 380:
            return breakpoint.xm === undefined ? breakpoint.default : breakpoint.xm;
        case screen <= 576:
            return breakpoint.sm === undefined ? breakpoint.default : breakpoint.sm;
        case screen <= 768:
            return breakpoint.md === undefined ? breakpoint.default : breakpoint.md;
        case screen <= 992:
            return breakpoint.lg === undefined ? breakpoint.default : breakpoint.lg;
        case screen <= 1200:
            return breakpoint.xg === undefined ? breakpoint.default : breakpoint.xg;
        case screen <= 1400:
            return breakpoint.xxl === undefined ? breakpoint.default : breakpoint.xxl;
        default:
            return breakpoint.default
    }
}
