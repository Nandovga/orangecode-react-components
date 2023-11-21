import React, {useEffect, useState} from "react";
import {IInputBase} from "src/@types/form";
import {IIcon} from "src/@types/icon";
import Text from "./Text";
import Date from "./Date";
import Autocomplete, {IFilterAutocomplete} from "./Autocomplete";

export interface IFilterOperationProps {
    operation: '=' | '!=' | '<=' | '>=' | '<' | '>' | '{}'
    legend: 'Igual a' | 'Diferente de' | 'Menor ou igual a' | 'Maior o igual a' | 'Menor do que' | 'Maior do que' | 'Intervalo'
}

export type IFilterProps = IInputBase & IIcon & {
    operation: IFilterOperationProps[]
    type?: 'text' | 'date' | 'autocomplete'
    borderColor?: string
    autocompleteData?: IFilterAutocomplete[]
    onAutocompleteSearch?: (value: string) => void
}

/**
 * Exibe o componente de filtro
 * @param borderColor
 * @param type
 * @param props
 * @constructor
 */
const Index = ({borderColor = '--bs-primary', type = 'text', ...props}: IFilterProps) => {
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses

    //STATE ≥ Estado do componente
    const [init, setInit] = useState(true);
    const [field1, setField1] = useState<any>(getValue()[0])
    const [field2, setField2] = useState<any>(getValue()[1])
    const [operation, setOperation] = useState<any>(typeof props.value !== "string"
        ? props.operation[0]?.operation
        : props.operation.filter(item => {
        let data: string[] = props.value.split(item.operation)
        if (data.length > 1)
            return item;
    })[0]?.operation ?? props.operation[0]?.operation)

    //Realizar a formatação do componente para valor
    function setValue() {
        if (operation === "{}" && props.onChange) {
            props.onChange(`${field1}${operation}${field2}`)
        } else if (props.onChange) {
            if (typeof field1 !== 'object')
                props.onChange(`${field1}${operation}`)
            else
                props.onChange(`${field1.map(row => row.id.toString()).join(';')}${operation}`)
        }
    }

    //Realizar a formatação do valor para componente
    function getValue() {
        let value: string[] = [];
        props.operation.forEach(item => {
            let data: string[] = typeof props.value !== "string"
                ? []
                : props.value.split(item.operation)
            if (data.length > 1)
                value = data
        })
        return value.length > 1 ? value : ["", ""]
    }

    useEffect(() => {
        if (!init)
            setValue()
        setInit(false)
    }, [field1, field2, operation]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className={"rounded p-1 px-2 box-" + props.box + " " + boxClasses}
                style={{border: "1px dashed var(" + borderColor + ")"}}>
        <label className="form-label">
            <i className={"bi me-1 bi-" + props.icon}/>{props.legend}
            {props.required ? <span className="text-danger">*</span> : null}
        </label>
        <div className="w-100 d-flex align-items-start">
            <select className="form-select box-40 my-1"
                    value={operation}
                    onChange={event => setOperation(event.target.value)}>
                {props.operation.map(item =>
                    <option key={item.operation}
                            value={item.operation}>{item.legend}</option>
                )}
            </select>
            <div className="ms-2 box-60 my-1">
                {type === 'text' ?
                    <>
                        <Text value={field1} setValue={setField1}/>
                        {operation === "{}" && <Text value={field2} setValue={setField2} className="mt-2"/>}
                    </>
                    : type === 'date'
                        ? <>
                            <Date value={field1} setValue={setField1}/>
                            {operation === "{}" && <Date value={field2} setValue={setField2} className="mt-2"/>}
                        </>
                        : <>
                            <Autocomplete value={field1}
                                          setValue={setField1}
                                          data={props.autocompleteData === undefined ? [] : props.autocompleteData}
                                          onSearch={props.onAutocompleteSearch}/>
                        </>
                }
            </div>
        </div>
    </div>
}
export default Index
