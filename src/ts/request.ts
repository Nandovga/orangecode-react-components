import axios from "axios";
import {BASE, TOKEN} from "./config";
import {globalMessageFieldsClear, globalResponse} from "./response";

/**
 * Realiza o POST no servidor
 * @param route
 * @param body
 * @param form
 * @constructor
 */
export const POST = (route: string, body: null | any, form: string = ""): Promise<any> => {
    return new Promise((resolve, reject) => {
        let url = BASE + (route.substr(0, 1) === "/" ? "" : "/") + route
        globalMessageFieldsClear(form);
        axios({
            method: "post",
            url: url,
            headers: {"X-CSRF-TOKEN": TOKEN},
            data: !body ? {} : body
        })
            .then(response => resolve(response.data))
            .catch(error => {
                globalResponse(error.response?.data, form)
                reject(error)
            })
    })
}
