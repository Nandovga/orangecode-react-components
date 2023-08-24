import $ from "jquery";

/**
 * Verifica se atributo existe no array informado
 * @param data
 * @param attribute
 * @param value
 */
export function handleVerifyAtributes(data: any[], attribute: string, value: any): null | any {
    if (data.length === 0)
        return null;
    for (let i = 0; i < data.length; i++)
        if (data[i][attribute] === value)
            return data[i];
    return null;
}

/**
 * Retorna a data de hoje
 */
export function handleDateNow(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

/**
 * Mudar de campo quando acionado a tecla enter dentro do formulário
 * @param form
 */
export function handleEnterForm(form: string): void {
    $(document).ready(function () {
        $("input").keypress(function (e) {
            if (e.which !== 13)
                return;
            e.preventDefault();

            let name = $(this).attr("name");
            let index: number = -1;
            $("body").find("form[id='" + form + "']").find("input:not(:disabled), select:not(:disabled)").each(function (el, val) {
                let element = $(val)
                if (name === element.attr('name'))
                    index = el
                if (index !== -1 && (index + 1) === el)
                    val.focus();
            })
        });
    });
}

/**
 * Realiza a formatação para valor decimal ou monetário
 * @param valor
 * @param format
 */
export function handleMoney(valor: string, format: 'money' | 'decimal' = "decimal"): string {
    let value = valor.replace(/[^0-9.,]/g, '');
    if (format === "decimal")
        return value.replace(",", ".").replace(/(\..*)\./g, '$1')
    return parseFloat(value.replace(",", ".")).toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    }).replace(".", " ");
}

/**
 * Realiza a formatação para valor no formato de Horas
 * @param valor
 */
export function handleHours(valor: string): string {
    let v = valor.replace(/\D/g, '');
    if (v.length > 2)
        if (v.length < 5)
            v = `${v.slice(0, 2)}:${v.slice(2)}`;
        else {
            let end = v.slice(v.length - 2)
            v = `${v.slice(0, v.length - 2)}:${end}`;
        }
    return v;
}
