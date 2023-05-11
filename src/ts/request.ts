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

        let url = BASE + (route.substr(0, 1) === "/" ? "" : "/") + route
        globalMessageFieldsClear(form);
        handleToManyRequest(!options ? false : options.blockedToManyRequest)
        axios({
            method: "post",
            url: url,
            headers: {"X-CSRF-TOKEN": TOKEN},
            data: !body ? {} : body
        }).then(response => {
            if (response.data)
                resolve(response.data)
        }).catch(error => {
            globalResponse(error.response?.data, form)
            reject(error)
        })
    })
}

/**
 * Realiza o bloqueio de multiplas requisições simutaneas
 * @param reject
 * @param block
 */
function handleToManyRequest(block: boolean = true) {

    let requestCount = 0;
    axios.interceptors.request.use(config => {
        requestCount = requestCount + 1
        if (requestCount > 1 && block)
            config.timeout = 1
        return config;
    })

    axios.interceptors.response.use(response => {
        requestCount = requestCount - 1
        return response;
    }, () => requestCount = requestCount - 1);
}
