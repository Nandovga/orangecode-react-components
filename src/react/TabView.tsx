import React from "react";
import { GET_ICON } from "../ts/system";
import { IIconType } from "../@types/icon";
import { IFrameworkStyle } from "../@types/style";

export interface ITabView {
    tab: string
    content: React.ReactNode
    disabled?: boolean
    active?: boolean
    icon?: string
    identify?: string
}

type Props = {
    tabs: Array<ITabView>
    identify?: string
    iconType?: IIconType
    frameworkStyle?: IFrameworkStyle
}

/**
 * TabView Bootstrap5
 * @param tabs
 * @param identify
 * @param iconType
 * @constructor
 */
const TabViewBootstrap = ({ tabs, identify, iconType = "bootstrap" }: Props) => {
    let icon: string = GET_ICON(iconType);
    return <div className="w-100"
                id={identify ?? ""}>
        <ul className="nav nav-tabs w-100">
            {tabs.map(row => <li className="nav-item"
                                 key={row.tab}>
                <button className={(row.disabled ? "disabled" : "") + " nav-link " + (row.active ? "active" : "")}
                        data-bs-target={"#" + (row.identify === undefined ? row.tab : row.identify)}
                        data-bs-toggle="tab"
                        type="button"><i className={"me-1 " + icon + row.icon}/>{row.tab}</button>
            </li>)}
        </ul>
        <div className="tab-content w-100">
            {tabs.map(row => {
                return <div className={"tab-pane fade " + (row.active ? "show active" : "")}
                            id={(row.identify === undefined ? row.tab : row.identify)}
                            key={(row.identify === undefined ? row.tab : row.identify)}>{row.content}</div>;
            })}
        </div>
    </div>;
};

/**
 * Componente TabView
 * @param tabs
 * @param iconType
 * @param frameworkStyle
 * @constructor
 */
const TabView = ({ tabs, identify, iconType = "bootstrap", frameworkStyle = "bootstrap" }: Props) => {
    return (frameworkStyle === "bootstrap" ? <TabViewBootstrap iconType={iconType}
                                                               identify={identify}
                                                               tabs={tabs}/> : <></>);
};
export default TabView;
