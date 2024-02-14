import React from "react";
import Text from "./Text";
import Date from "./Date";
import {IIcon} from "../../../@types/icon";
import {IInputBase} from "../../../@types/form";
import Autocomplete, {IFilterAutocomplete} from "./Autocomplete";

export interface IFilterOperationProps {
    operation: "=" | "!=" | "<=" | ">=" | "<" | ">" | "{}" | "%" | "!%"
    legend: "Igual a" | "Diferente de" | "Menor ou igual a" | "Maior o igual a" | "Menor do que" | "Maior do que" | "Intervalo" | "Contém o que" | "Não contém o que"
}

export type IFilterProps = IInputBase & IIcon & {
    value: string | null
    onChange(value: any): void
    operation: IFilterOperationProps[]
    type?: "text" | "date" | "autocomplete"
    borderColor?: string
    autocompleteData?: IFilterAutocomplete[]
    autocompleteDataOriginal?: IFilterAutocomplete[]
    onAutocompleteSearch?: (value: string) => void
}

/**
 * Exibe o componente de filtro
 * @param borderColor
 * @param type
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const Index = ({borderColor = "--bs-primary", type = "text", value, onChange, ...props}: IFilterProps) => {
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses;

    //Retorna a operação de acordo com VALUE
    function getOperation(value: string): string {
        return props.operation.filter(item => {
            let data: string[] = value === null
                ? []
                : value.split(item.operation);
            if (data.length > 1) {
                return item;
            }
        })[0]?.operation ?? props.operation[0]?.operation;
    }

    //Retorna os dados do VALUE separado pela operação
    function getValue(value: string): string[] {
        let operation = getOperation(value);
        return value === null || value.length === 0
            ? ["", ""]
            : value.split(operation);
    }

    //Atualiza o valor do VALUE
    function setValue(dto: any, field: "1" | "2" = "1") {
        let operation = getOperation(value);
        let data = value === null
            ? ["", ""]
            : value.split(operation);

        if (typeof dto === "object") {
            if (field === "1") {
                data[0] = dto.map(row => row.id.toString()).join(";");
            } else {
                data[1] = dto.map(row => row.id.toString()).join(";");
            }
        } else {
            if (field === "1") {
                data[0] = dto;
            } else {
                data[1] = dto;
            }
        }

        if (operation !== "{}") {
            data[1] = "";
        }
        onChange(`${data[0]}${operation}${data[1]}`);
    }

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
                    value={getOperation(value)}
                    onChange={event => {
                        let str = value === null ? "" : value.toString();
                        if (str.indexOf(getOperation(value)) === -1) {
                            str += getOperation(value);
                        }
                        onChange(str.replace(getOperation(value), event.target.value));
                    }}>
                {props.operation.map(item =>
                    <option key={item.operation}
                            value={item.operation}>{item.legend}</option>
                )}
            </select>
            <div className="ms-2 box-60 my-1">
                {type === "text" ?
                    <>
                        <Text setValue={setValue}
                              value={getValue(value)[0]}/>
                        {getOperation(value) === "{}"
                            && <Text className="mt-2"
                                     setValue={dto => setValue(dto, "2")}
                                     value={getValue(value)[1]}/>}
                    </>
                    : type === "date"
                        ? <>
                            <Date setValue={setValue}
                                  value={getValue(value)[0]}/>
                            {getOperation(value) === "{}"
                                && <Date className="mt-2"
                                         setValue={dto => setValue(dto, "2")}
                                         value={getValue(value)[1]}/>}
                        </>
                        : <>
                            <Autocomplete data={props.autocompleteData === undefined ? [] : props.autocompleteData}
                                          dataOriginal={props.autocompleteDataOriginal ?? []}
                                          setValue={setValue}
                                          value={getValue(value)[0]}
                                          onSearch={props.onAutocompleteSearch}/>
                            {getOperation(value) === "{}"
                                &&
                                <Autocomplete data={props.autocompleteData === undefined ? [] : props.autocompleteData}
                                              dataOriginal={props.autocompleteDataOriginal ?? []}
                                              setValue={dto => setValue(dto, "2")}
                                              value={getValue(value)[1]}
                                              onSearch={props.onAutocompleteSearch}/>}
                        </>
                }
            </div>
        </div>
    </div>;
};
export default Index;
