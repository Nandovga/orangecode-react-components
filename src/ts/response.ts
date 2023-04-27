import $ from "jquery"
import Snackbar from "node-snackbar/dist/snackbar"
import {IResponseType} from "../@types/response";

/**
 * Realzia a gestão resposta da aplicação
 * @param response
 * @param form
 */
export const globalResponse = (response: IResponseType, form: string = ''): void => {
    let data: IResponseType = response
    if (!response)
        return;

    //mensagem nos campos - ERROR
    if (data.errors)
        globalMessageFields(data.errors, form.length === 0 ? "" : form)

    //mensagem nos campos - ACCEPT
    if (data.accept)
        globalMessageFields(data.accept, form.length === 0 ? "" : form, "is-valid")

    //mensagem nos campos - ALL
    if (data.field && data.field.message && data.field.messageType)
        globalMessageFields(data.field.message, form.length === 0 ? "" : form, data.field.messageType)

    //Exibe mensage no sistema
    if (data.message && data.message.message)
        globalMessage(data.message)

    //Redireciona navegação
    if (data.redirect)
        window.location.href = data.redirect;
}

/**
 * Apaga a mensagem do campo formulário parametrizado
 * @param form
 */
export const globalMessageFieldsClear = (form: string = ''): void => {
    let formulario = $("body").find("#" + (form === '' ? null : form));

    //INPUT
    $.each(formulario.find('input'), function () {

        //INPUT - Default
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .parent()
            .find("#j_feedback")
            .removeClass('invalid-feedback')
            .removeClass('valid-feedback')
            .html('');

        //INPUT - Default com mais de um parent
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .parent()
            .parent()
            .find("#j_feedback")
            .removeClass('invalid-feedback')
            .removeClass('valid-feedback')
            .html('');

        //INPUT - Default com mais de um parent
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .parent()
            .parent()
            .parent()
            .find("#j_feedback")
            .removeClass('invalid-feedback')
            .removeClass('valid-feedback')
            .html('');
    });

    //SELECT
    $.each(formulario.find('select'), function () {
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .parent()
            .find("#j_feedback")
            .removeClass('invalid-feedback')
            .removeClass('valid-feedback')
            .html('');
    });

    //TEXTAREA
    $.each(formulario.find('textarea'), function () {
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .parent()
            .find("#j_feedback")
            .removeClass('invalid-feedback')
            .removeClass('valid-feedback')
            .html('');
    });

    //DEFAULT
    $.each(formulario.find('#j_feedback'), function () {
        $(this).removeClass('is-invalid')
            .removeClass('is-valid')
            .html('');
    });
}

/**
 * Ativa a TabView quando campo apresentar error
 * @param form
 * @param errors
 */
export const globalTabViewActiveError = (form, errors): void => {
    let TabView = $("#" + form).find("#TabView")
    if (TabView.length === 0)
        return;
    let field = Object.keys(errors)[0]
    TabView.find(".nav-link").each(function (value: any): void {
        if (typeof value !== 'undefined') {
            // @ts-ignore
            let TabViewContent = $(value).attr("data-bs-target").replace("#", "");
            if ($("body").find(".tab-pane[id=" + TabViewContent + "]").find("*[name=" + field + "]").length === 0) {
                $("body").find(".tab-pane[id=" + TabViewContent + "]").removeClass("show active")
                $(value).removeClass("active");
            } else {
                $("body").find(".tab-pane[id=" + TabViewContent + "]").addClass("show active")
                $(value).addClass("active");
            }
        }
    });
}

/**
 * Exibe a mensagem dentro do campo do formulário parametrizado
 * @param data
 * @param form
 * @param type
 */
const globalMessageFields = (data, form: string = "", type = 'is-invalid'): void => {
    let formulario = $("body").find("#" + form)
    globalTabViewActiveError(form, data)

    $.each(data, (key: any, value: any) => {
        let text = '';
        value.forEach(value => text += value + "<br>")

        //INPUT - Default
        formulario.find("input[name='" + key + "']")
            .addClass(type)
            .parent()
            .find("#j_feedback[data-name='" + key + "']")
            .addClass(type === 'is-invalid' ? 'invalid-feedback' : 'valid-feedback')
            .html(text)

        //INPUT - Default com mais de um parent
        formulario.find("input[name='" + key + "']")
            .addClass(type)
            .parent()
            .parent()
            .find("#j_feedback[data-name='" + key + "']")
            .addClass(type === 'is-invalid' ? 'invalid-feedback' : 'valid-feedback')
            .html(text)

        //INPUT - Default com mais de um parent
        formulario.find("input[name='" + key + "']")
            .addClass(type)
            .parent()
            .parent()
            .parent()
            .find("#j_feedback[data-name='" + key + "']")
            .addClass(type === 'is-invalid' ? 'invalid-feedback' : 'valid-feedback')
            .html(text)

        //SELECT - Default
        formulario.find("select[name='" + key + "']")
            .addClass(type)
            .parent()
            .find("#j_feedback[data-name='" + key + "']")
            .addClass(type === 'is-invalid' ? 'invalid-feedback' : 'valid-feedback')
            .html(text)

        //TEXTAREA - Default
        formulario.find("textarea[name='" + key + "']")
            .addClass(type)
            .parent()
            .find("#j_feedback[data-name='" + key + "']")
            .addClass(type === 'is-invalid' ? 'invalid-feedback' : 'valid-feedback')
            .html(text)

        //Default - Feedback
        formulario.find("#j_feedback[data-name='" + key + "']")
            .addClass(type)
            .html(text)
    })
}

/**
 * Exibe a mensagem suspensa
 * @param message
 * @param type
 * @param position
 */
const globalMessage = (message, position = "top-right"): void => {
    Snackbar.show({
        pos: position,
        showAction: false,
        customClass: message.type,
        text: "<p class='d-flex m-0 align-items-center'><i class='me-2 " + message.icon + "'></i>" + message.message + "</p>",
    });
}
