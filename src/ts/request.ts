import axios, {CancelTokenSource} from "axios";
import {BASE, TOKEN} from "./config";
import {globalMessageFieldsClear, globalResponse} from "./response";

/**
 * Realiza o POST no servidor
 * @param route
 * @param body
 * @param form
 * @param source
 * @constructor
 */
export const POST = (
    route: string,
    body: null | any,
    form: string = "",
    source: CancelTokenSource | null = null
): Promise<any> => {
    return new Promise((resolve, reject) => {
        let url = BASE + (route.substr(0, 1) === "/" ? "" : "/") + route
        globalMessageFieldsClear(form);

        let requestCount = 0;
        axios.interceptors.request.use(config => {
            requestCount = requestCount + 1
            return config;
        }, error => {
            return reject(error)
        })

        axios.interceptors.response.use(response => {
            requestCount = requestCount - 1
            return response;
        }, error => {
            requestCount = requestCount - 1
            return reject(error)
        });

        axios({
            method: "post",
            url: url,
            headers: {"X-CSRF-TOKEN": TOKEN},
            data: !body ? {} : body,
            cancelToken: !source ? undefined : source.token
        })
            .then(response => {
                if (source !== null && requestCount > 1)
                    source.cancel("Muitas requisições sendo executadas!");
                resolve(response.data)
            })
            .catch(error => {
                globalResponse(error.response?.data, form)
                reject(error)
            })
    })
}
