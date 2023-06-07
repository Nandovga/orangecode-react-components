import axios from "axios";
import {BASE, TOKEN} from "./config";
import {globalMessageFieldsClear, globalResponse} from "./response";

/**
 * Realiza o POST no servidor
 * @param route
 * @param body
 * @param form
 * @param options
 * @constructor
 */
export const POST = (
    route: string,
    body: null | any,
    form: string = "",
    options?: { blockedToManyRequest: boolean }
): Promise<any> => {
    return new Promise((resolve, reject) => {
        globalMessageFieldsClear(form);
        let url = BASE + (route.substr(0, 1) === "/" ? "" : "/") + route

        if (options?.blockedToManyRequest)
            handleToManyRequest(url, form)
        else axios.interceptors.response.eject(0)
        axios({
            method: "post",
            url: url,
            headers: {"X-CSRF-TOKEN": TOKEN},
            data: !body ? {} : body,
        }).then(response => {
            if (response?.data !== undefined)
                resolve(response.data)
        }).catch(error => {
            globalResponse(error.response?.data, form)
            reject(error)
        })
    })
}

/**
 * Realiza o bloqueio de multiplas requisições simutaneas
 * @param url
 * @param reject
 * @param block
 * @param form
 */
function handleToManyRequest(
    url: string,
    form: string
): void {
    let requestCount = 0;
    axios.interceptors.request.use(config => {
        requestCount = requestCount + 1
        if (requestCount > 1 && axios.getUri(config) === url)
            config.timeout = 1
        return config;
    })

    axios.interceptors.response.use(response => {
        requestCount = requestCount - 1
        return response;
    }, function (error) {
        requestCount = requestCount - 1
        globalResponse(error.response?.data, form)
        return Promise.reject(error);
    });
}
