import React from "react";
import {GET_ICON} from "../ts/system";
import {IIconType} from "../@types/icon";
import {IFrameworkStyle} from "../@types/style";

export interface ITabView {
    tab: string
    content: React.ReactNode
    disabled?: boolean
    active?: boolean
    icon?: string
}

type Props = {
    tabs: Array<ITabView>
    iconType?: IIconType
    frameworkStyle?: IFrameworkStyle
}

/**
 * TabView Bootstrap5
 * @param tabs
 * @param iconType
 * @constructor
 */
const TabViewBootstrap = ({tabs, iconType = "bootstrap"}: Props) => {
    let icon: string = GET_ICON(iconType);
    return <>
        <ul className="nav nav-tabs w-100">
            {tabs.map(row => <li key={row.tab} className="nav-item">
                <button className={(row.disabled ? "disabled" : "") + " nav-link " + (row.active ? "active" : "")}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + row.tab}
                        type="button"><i className={"me-1 " + icon + row.icon}/>{row.tab}</button>
            </li>)}
        </ul>
        <div className="tab-content w-100">
            {tabs.map(row => {
                return <div key={row.tab}
                            className={"tab-pane fade " + (row.active ? "show active" : "")}
                            id={row.tab}>{row.content}</div>
            })}
        </div>
    </>
}

/**
 * Componente TabView
 * @param tabs
 * @param iconType
 * @param frameworkStyle
 * @constructor
 */
const TabView = ({tabs, iconType = "bootstrap", frameworkStyle = "bootstrap"}: Props) => {
    return (frameworkStyle === "bootstrap" ? <TabViewBootstrap tabs={tabs}
                                                               iconType={iconType}/> : <></>)
}
export default TabView
