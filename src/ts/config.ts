/**
 * url base utilizadas nas requisições assincronas
 * @return {string | null}
 */
let url: null | any = document.getElementById("react-base");
url = url === null ? null : (url.content).replace(".br/", ".br");
export const BASE = url === null ? null : url.substr(-1) === "/" ? url.slice(0, url.length - 1) : url;

/**
 * Utilizada para verificar a autenticidade da requisição HTTP
 * @return {string | null}
 */
let token: null | any = document.getElementById("csrf-token");
export const TOKEN = token === null ? null : token.content;

/**
 * Retorna o identificado de usuário logado na aplicação
 * @return {null | string}
 */
let user: null | any = document.getElementById("auth");
export const USER = user === null ? null : user.content;
