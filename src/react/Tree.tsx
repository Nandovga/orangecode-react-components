import $ from "jquery";
import React, {useEffect, useState} from "react";
import Input from "./Form/Input";
import {GET_TYPE} from "../ts/system";
import {IColor} from "../@types/color";
import {IFrameworkStyle} from "../@types/style";

export type ITreeData = {
    id: number
    name: string
    parent: number | null
    open?: boolean
    color?: IColor
    selected?: boolean
}

export interface ITree<T> {
    treeName: string
    treeData: Array<T & ITreeData>
    treeFitler?: boolean
    treeValue?: T & ITreeData | null
    treeBuild?: boolean
    frameworkStyle?: IFrameworkStyle
    onTreeSelect?: (value) => void
    onTreeDoubleClick?: () => void
}

/**
 * Componente TREE - Boostrap5
 * @param props
 * @constructor
 */
function TreeBootstrap<T>(props: ITree<T>) {

    //STATE ≥ Configuração do componente
    const [treeData, setTreeData] = useState<Array<T & ITreeData & { children?: any }>>([])
    const [treefilter, setTreeFilter] = useState("")
    const ICON_OPEN = "bi-folder-symlink-fill"
    const ICON_CLOSED = "bi-folder-fill"

    //STATE ≥ Configuração do componente
    useEffect(() => {
        if (props.treeBuild === false)
            setTreeData(props.treeData)
        else
            setTreeData(buildTree(props.treeData))
    }, [props.treeData])

    //STATE ≥ Estrutura da árvore dados
    function buildTree(array: Array<T & ITreeData>) {
        // Agrupa os dados pelo parent
        const result = array.reduce((arr, item) => {
            const value = item.parent;
            if (!arr[value === null ? "" : value])
                arr[value === null ? "" : value] = []
            arr[value === null ? "" : value].push(item)
            return arr;
        }, {});

        let build: Array<T & ITreeData> = [];
        if (array.length > 0)
            for (let i = 0; i < array.length; i++)
                if (array[i].parent === null)
                    build[build.length] = array[i];

        function genereteTree(build: Array<T & ITreeData>, result: {}){
            let arr: Array<T & ITreeData & {children?: any}> = [];
            for (let i = 0; i < build.length; i++){
                arr[i] = build[i]
                if(result[arr[i].id] !== undefined)
                    arr[i].children = genereteTree(result[arr[i].id], result)
            }
            return arr;
        }
        return genereteTree(build, result);
    }

    //STATE ≥ Estrutura da arvore view
    function renderTree(a: Array<T & ITreeData & { children: Array<any> }>) {
        return a.length === 0 ? <></>
            : <div className="tree-view">
                {a.map(row => {
                    return <div key={row.id}
                                className={"tree-line " + (row.open === undefined ? "" : (!row.open ? "hide" : ""))}
                                data-parent={row.parent}
                                data-id={row.id}>
                        {renderItem(row)}
                        {row.children !== undefined && row.children.length > 0 ? renderTree(row.children) : null}
                    </div>
                })}
            </div>
    }

    //STATE ≥ Estrutura da árvore item
    function renderItem(row) {
        return <div className={"tree-item " + (props.treeValue?.id === row.id ? "selected" : "")}
                    data-parent={row.parent} data-id={row.id}>
            {row.children !== undefined && row.children.length > 0
                ? <a href="#"
                     onClick={handleOpen}
                     className="tree-item-action">{(row.open === undefined ? "-" : (!row.open ? "+" : "-"))}</a>
                : <span className="me-4"/>}
            <a href="#" className="link"
               onKeyDown={ev => {
                   if ((ev.code === "NumpadEnter" || ev.code === "Enter") && props.onTreeDoubleClick && props.treeValue?.id !== undefined)
                       props.onTreeDoubleClick()
               }}
               onDoubleClick={event => {
                   event.preventDefault();
                   if (props.onTreeDoubleClick && (row.selected === undefined || row.selected)) props.onTreeDoubleClick()
               }}
               onClick={event => {
                   event.preventDefault();
                   if (props.onTreeSelect && (row.selected === undefined || row.selected))
                       props.onTreeSelect(row)
               }}>
                <i className={"bi fs-6 " +
                    (row.open === undefined ? ICON_OPEN : (!row.open ? ICON_CLOSED : ICON_OPEN)) +
                    (!row.color ? " text-primary" : " text-" + row.color)
                }/> {row.name}
            </a>
        </div>
    }

    //EVENT - Abrir a arvoré de elemento
    function handleOpen(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const element = event.currentTarget;

        //Expandir
        const parent = element.parentNode;
        if (parent && parent.parentNode && parent.parentNode instanceof HTMLElement) {
            parent.parentNode.classList.toggle('hide');
            if (element.textContent === "+") parent.querySelector('i')?.classList.replace(ICON_CLOSED, ICON_OPEN)
            else parent.querySelector('i')?.classList.replace(ICON_OPEN, ICON_CLOSED)
        }

        //Trocar texto
        if (element.textContent === "+") element.innerText = '-'
        else element.innerText = '+'
    }

    //JQUERY -> Ajusta posicionamento do Search
    useEffect(() => {
        let tree = $("body").find(".tree[id='" + props.treeName + "']");
        $.each(tree.find(".tree-line"), function () {
            let parent = $(this).attr("data-parent")
            if (!parent) return;
            let margin = parseInt($(this).parent().parent(".tree-line[data-id='" + parent + "']").css("margin-left"));
            $(this).css({"margin-left": (margin === 0 ? 22 : margin) + 'px'});
        })
    })

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <div className="box-100 tree" id={props.treeName}>
        {treeData.map((row) => {
            return <div key={row.id}
                        className={"tree-line " + (row.open === undefined ? "" : (!row.open ? "hide" : ""))}
                        data-id={row.id}
                        data-parent={row.parent}>
                {renderItem(row)}
                {row.children !== undefined ? renderTree(row.children) : null}
            </div>
        })}
        {props.treeFitler && props.onTreeSelect ? <div className="w-100">
            <Input legend="Filtrar" name="filtrar" icon="filter" boxClasses="m-0 mt-1"
                   value={treefilter}
                   onChange={value => {
                       setTreeFilter(value)
                       if (!props.onTreeSelect)
                           return;
                       if (GET_TYPE<string>(value).length === 0)
                           return props.onTreeSelect(null)
                       let result = props.treeData.filter(item => {
                           const regex = new RegExp(value, "i");
                           return regex.test(item.name)
                       })
                       if (result.length > 0 && result[0].selected !== false)
                           return props.onTreeSelect(result[0])
                   }}/>
        </div> : null}
    </div>
}

/**
 * Exibe o componente TREE
 * @param frameworkStyle
 * @param props
 * @constructor
 */
function Tree<T>({frameworkStyle = "bootstrap", ...props}: ITree<T>) {
    return frameworkStyle === "bootstrap" ? <TreeBootstrap<T> {...props}/> : <></>
}

export default Tree
