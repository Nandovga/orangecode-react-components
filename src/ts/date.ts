import {format, parseISO} from "date-fns"
import pt from "date-fns/locale/pt"

/**
 * Realiza a formatação da data
 * @param date
 * @param formatDate
 * @param type
 * @returns {string}
 */
export function format_date(date: string = '', formatDate: string = "dd/MM/yyyy", type: null | "ISO 8601" = null): string {
    if (type === "ISO 8601") {
        let data = new Date(date)
        let dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    if (date !== null && date.length > 0)
        return format(parseISO(date), formatDate, {
            locale: pt
        });
    let d = new Date();
    return d.toLocaleDateString();
}