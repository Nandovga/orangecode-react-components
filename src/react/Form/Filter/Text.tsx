import React from "react";

export interface IFilterTextProps {
    value: string
    setValue: React.Dispatch<string>
    className?: string
}

/**
 * Exibe o campo de texto dentro do filtro
 * @param value
 * @param setValue
 * @param className
 * @constructor
 */
const Text = ({value, setValue, className}: IFilterTextProps) => {
    return <input type="text"
                  value={value}
                  onChange={event => setValue(event.target.value)}
                  className={"form-control w-100 " + (className)}/>
}
export default Text
