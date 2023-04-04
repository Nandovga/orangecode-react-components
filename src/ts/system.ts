import axios from "axios";
import $ from "jquery"
import {Breakpoint} from "../@types/system";

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
 * Pesquisa o cep de acordo com value
 * @param value
 * @constructor
 */
export async function GET_CEP(value: string) {
    let cep = value.length === 0 ? "00000000" : value.replace("-", "")
    return axios.get("https://viacep.com.br/ws/" + cep + "/json/")
        .then(res => GET_TYPE<{
            bairro: string
            cep: string
            complemento: string
            localidade: string
            logradouro: string
            uf: string
        }>(res.data))
}

/**
 * Alterna o retorno da string de acordo com tamanho da janela
 * @param breakpoint
 * @constructor
 */
export function WINDOWS_RESIZE(breakpoint: Breakpoint): string {
    let screen: number | undefined = $(window).width();
    if (screen && screen < 380) {
        return (breakpoint.xm === undefined ? breakpoint.default : breakpoint.xm);
    } else if (screen && screen < 576) {
        return (breakpoint.sm === undefined ? breakpoint.default : breakpoint.sm);
    } else if (screen && screen <= 768) {
        return (breakpoint.md === undefined ? breakpoint.default : breakpoint.md);
    } else if (screen && screen <= 992) {
        return (breakpoint.lg === undefined ? breakpoint.default : breakpoint.lg)
    } else if (screen && screen <= 1200) {
        return (breakpoint.xg === undefined ? breakpoint.default : breakpoint.xg);
    } else if (screen && screen <= 1400) {
        return (breakpoint.xxl === undefined ? breakpoint.default : breakpoint.xxl);
    } else {
        return breakpoint.default
    }
}
