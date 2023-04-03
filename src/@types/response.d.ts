/**
 * Agrupa os tipos de resposta do POST Request.js
 */
export type ResponseType = {
    data: null | any
    field: null | ResponseField
    message: null | ResponseMessage
    modal: null | ResponseModal
    redirect: null | string
}

/** Resposta do tipo CAMPO */
interface ResponseField {
    field: string,
    messageType: string
    message: object
}

/** Resposta do tipo MESSAGE */
interface ResponseMessage {
    icon: string,
    message: string,
    type: string
}

/** Resposta do tipo MODAL */
interface ResponseModal {
    modal: string,
    action: string
}
