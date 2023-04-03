import {format, parseISO} from "date-fns"
import pt from "date-fns/locale/pt"

/**
 * Realiza a formatação da data
 * @param date
 * @param formatDate
 * @returns {string}
 */
export function format_date(date: string = '', formatDate: string = "dd/MM/yyyy"): string {
    if (date !== null && date.length > 0)
        return format(parseISO(date), formatDate, {
            locale: pt
        });
    let d = new Date();
    return d.toLocaleDateString();
}
