import axios from "axios";
import { GET_TYPE } from "./system";

/**
 * Pesquisa o cep de acordo com value
 * @param value
 * @constructor
 */
export async function GET_CEP(value: string) {
    let cep = value.length === 0 ? "00000000" : value.replace("-", "");
    return axios.get("https://viacep.com.br/ws/" + cep + "/json/")
        .then(res => GET_TYPE<{
            bairro: string
            cep: string
            complemento: string
            localidade: string
            logradouro: string
            uf: string
        }>(res.data));
}
