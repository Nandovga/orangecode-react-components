/**
 * Agrupa os tipos de resposta do POST Request.js
 */
export type IResponseType = {
    data: null | any
    field: null | IResponseField
    message: null | IResponseMessage
    modal: null | IResponseModal
    redirect: null | string
}

/** Resposta do tipo CAMPO */
interface IResponseField {
    field: string,
    messageType: string
    message: object
}

/** Resposta do tipo MESSAGE */
interface IResponseMessage {
    icon: string,
    message: string,
    type: string
}

/** Resposta do tipo MODAL */
interface IResponseModal {
    modal: string,
    action: string
}
