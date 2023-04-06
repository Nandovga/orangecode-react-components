import $ from "jquery"
import React, {useEffect} from "react";

import {IIcon} from "../@types/icon";
import {GET_ICON} from "../ts/system";
import {IFrameworkStyle} from "../@types/style";

export type IModalVisible = "open" | "closed"

export type IModalSize = "sm" | "lg" | "xl"

export type IModalFullScreen = "sm" | "md" | "lg" | "xl" | "xxl"

export interface IModal {
    modalTitle: string
    modalVisible: IModalVisible
    modalId?: string
    onModalVisible(state: IModalVisible): void
}

type Props = IModal & {
    children: React.ReactNode
    modalCenter?: boolean
    modalSize?: IModalSize
    modalFullScreen?: IModalFullScreen
    modalBackdrop?: boolean
    frameworkStyle?: IFrameworkStyle
} & IIcon

/**
 * Modal Bootstrap5
 * @param modalCenter
 * @param props
 * @constructor
 */
const ModalBootstrap: React.FC<Props> = ({modalCenter = true, ...props}: Props) => {

    //STATE ≥ Estado do componente
    const modalId: string = !props.modalId
        ? props.modalTitle.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, '')
        : props.modalId.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, '');
    const modalSize: string = (!props.modalSize ? "" : "modal-" + props.modalSize);
    const modalFullScreen: string = (!props.modalFullScreen ? "" : "modal-fullscreen-" + props.modalFullScreen + "-down")

    //CORE ≥ Aplica a regra de visibilidade das modal
    function bsModalVisible(modalVisible: IModalVisible, onModalVisible: (state: IModalVisible) => void, modalId: string): void {
        let myModal = document.getElementById(modalId)
        if (myModal && modalVisible === "open") {
            let openModal = $("body").find("#openModal[data-bs-target='#" + modalId + "']");
            openModal.trigger("click")
        } else if (myModal && modalVisible === "closed") {
            myModal.addEventListener('hidden.bs.modal', function () {
                onModalVisible("closed")
            })
            let closed = $("body").find("#" + modalId + " .btn-close");
            closed.trigger("click");
        }
    }

    //CORE ≥ Aplica a regra de funcionamento das modais
    useEffect((): void => {
        bsModalVisible(props.modalVisible, props.onModalVisible, modalId)
    }, [props.modalVisible])

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <>
        <span id="openModal" data-bs-toggle="modal" data-bs-target={"#" + modalId}></span>
        <div className="modal fade" id={modalId} tabIndex="-1"
             data-bs-backdrop={!props.modalBackdrop ? "true" : "static"}
             data-bs-keyboard="false">
            <div
                className={"modal-dialog "
                    + modalSize + " "
                    + modalFullScreen
                    + (modalCenter ? " modal-dialog-centered" : "")}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className={GET_ICON() + props.icon}/>{props.modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                </div>
            </div>
        </div>
    </>
}

/**
 * Componente Modal
 * @param children
 * @param frameworkStyle
 * @param props
 * @constructor
 */
const Modal: React.FC<Props> = ({frameworkStyle = "bootstrap", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <ModalBootstrap {...props}>{props.children}</ModalBootstrap> : <></>
}
export default Modal
