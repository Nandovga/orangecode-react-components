import React from "react";

export interface IFilterDateProps {
    value: string
    setValue: React.Dispatch<string>
    className?: string
}

/**
 * Exibe o campo de data dentro do filtro
 * @param value
 * @param setValue
 * @param className
 * @constructor
 */
const Date = ({value, setValue, className}: IFilterDateProps) => {
    let date = value.split('/');
    return <div className={"d-flex " + (className)}>
        <input type="text"
               value={isNaN(parseInt(date[0])) ? "" : date[0]}
               onChange={event => {
                   value = event.target.value.replace(/\D/g, '')
                   let v = Math.min(Math.max(parseInt(value, 10), 1), 31);
                   if (isNaN(v))
                       setValue(`00/${date[1]}/${date[2]}`)
                   else
                       setValue(`${v.toString()}/${date[1]}/${date[2]}`)
               }}
               style={{flex: 1}}
               className="form-control me-1"/>
        <input type="text"
               value={isNaN(parseInt(date[1])) ? "" : date[1]}
               onChange={event => {
                   value = event.target.value.replace(/\D/g, '')
                   let v = Math.min(Math.max(parseInt(value, 10), 1), 12);
                   if (isNaN(v))
                       setValue(`${date[0]}/00/${date[2]}`)
                   else
                       setValue(`${date[0]}/${v.toString()}/${date[2]}`)
               }}
               style={{flex: 1}}
               className="form-control me-1"/>
        <input type="text"
               value={isNaN(parseInt(date[2])) ? "" : date[2]}
               onChange={event => {
                   value = event.target.value.replace(/\D/g, '')
                   let v = value.slice(0, 4);
                   if (isNaN(parseInt(v)))
                       setValue(`${date[0]}/${date[1]}/0000`)
                   else
                       setValue(`${date[0]}/${date[1]}/${v.toString()}`)
               }}
               style={{flex: 2}}
               className="form-control me-1"/>
    </div>
}
export default Date
