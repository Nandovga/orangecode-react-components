import {IFrameworkStyle} from "../@types/style";

export interface IInputBase{
    legend: string,
    name: string,
    value?: any
    required?: boolean,
    disabled?: boolean,
    placeholder?: string
    box?: '5' | '10' | '12_5' | '15' | '17_5' | '20' | '22_5' | '25' | '30' | '33' | '35' | '40' | '50' | '55' | '60' | '65' | '75' | '100'
    boxClasses?: string
    fieldClasses?: string
    modeStyle?: "table"
    frameworkStyle?: IFrameworkStyle
    onChange?(value: any): void
}

export interface IHookForm {
    register: any
    errors: object
}

export type IInputType = 'text' | 'email' | 'number' | 'password' | 'date'
