import {format, formatISO} from "date-fns";
import pt from "date-fns/locale/pt";

/**
 * Realiza a formatação da data
 * @param date
 * @param formatDate
 * @param type
 * @returns {string}
 */
export function format_date(date: string = "", formatDate: string = "dd/MM/yyyy", type: "ISO 8601" | "Date-fns" = "Date-fns"): string {
    if (type === "ISO 8601") {
        let data = new Date(date);
        let dia = String(data.getUTCDate()).padStart(2, "0");
        const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    if (date !== null && date.length > 0) {
        let d = new Date(date);
        d.setDate(d.getDate() + 1);
        if (formatDate === "yyyy-MM-dd") {
            return formatISO(d, {representation: "date"});
        } else {
            return format(d, formatDate, {locale: pt});
        }
    }
    let d = new Date();
    return d.toLocaleDateString();
}
