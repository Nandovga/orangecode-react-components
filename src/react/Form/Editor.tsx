import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { IIcon } from "../../@types/icon";
import { GET_ICON } from "../../ts/system";
import { IInputBase } from "../../@types/form";

export interface IEditorProps extends IInputBase, IIcon {
    module?: "basic" | "complete"
}

/**
 * Componente Editor - Quill React
 * @param module
 * @param props
 * @constructor
 */
const EditorQuill = ({ module = "basic", ...props }: IEditorProps) => {
    let boxClasses: string = !props.boxClasses ? "" : props.boxClasses;
    let editorModules = {
        toolbar: module === "complete"
            ? [
                [{ "font": [] }, { "size": ["small", false, "large", "huge"] }, { "header": [1, 2, 3, 4, 5, 6, false] }],
                [{ "color": [] }, { "background": [] }],
                [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
                ["bold", "italic", "underline", "strike", "blockquote", "code"],
                [{ "direction": "rtl" }],
                ["link", "image", "video"],
                ["clean"]
            ]
            : [
                [{ "font": [] }, { "size": ["small", false, "large", "huge"] }],
                [{ "color": [] }],
                [{ "list": "ordered" }, { "list": "bullet" }],
                ["bold", "italic", "underline", "code"],
                ["link", "image"]
            ]
    };

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className={"box-" + props.box + " " + boxClasses}>
        <label className="form-label"
               htmlFor={props.name}>
            <i className={GET_ICON(props.iconType) + props.icon}/>
            {props.legend}{props.required ? <span className="text-danger">*</span> : null}
        </label>
        <ReactQuill className="quill-theme"
                    id={props.name}
                    modules={editorModules}
                    placeholder={props.placeholder === undefined ? "Digite " + props.name : props.placeholder}
                    readOnly={props.disabled}
                    value={props.value}
                    onChange={value => props.onChange ? props.onChange(value) : null}/>
        <div data-name={props.name}
             id="j_feedback"/>
    </div>;
};

/**
 * Componente Editor
 * @param props
 * @constructor
 */
const Editor = ({ ...props }: IEditorProps) => {
    return !props.frameworkStyle ? <EditorQuill {...props}/> : <></>;
};
export default Editor;
