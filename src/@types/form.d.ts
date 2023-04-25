import {IFrameworkStyle} from "../@types/style";

export interface IInputBase{
    legend: string,
    name: string,
    value?: any
    required?: boolean,
    disabled?: boolean,
    placeholder?: string
    box?: '10' | '12_5' | '15' | '17_5' | '20' | '25' | '30' | '33' | '35' | '40' | '50' | '65' | '75' | '100'
    boxClasses?: string
    fieldClasses?: string
    frameworkStyle?: IFrameworkStyle
    onChange?(value: any): void
}

export interface IHookForm {
    register: any
    errors: object
}

export type IInputType = 'text' | 'email' | 'number' | 'password' | 'date'
