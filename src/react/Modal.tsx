import $ from "jquery"
import React, {useEffect, useState} from "react";
import {IFrameworkStyle} from "../@types/style";
import {IIcon} from "@/@types/icon";
import {GET_ICON} from "@/ts/system";

export type IModalVisible = "open" | "closed"

export type IModalSize = "sm" | "lg" | "xl"

export type IModalFullScreen = "sm" | "md" | "lg" | "xl" | "xxl"

type Props = {
    modalTitle: string
    modalVisible: IModalVisible
    onModalVisible(state: IModalVisible): void
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
    const modalId: string = props.modalTitle.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, '')
    const modalSize: string = (!props.modalSize ? "" : "modal-" + props.modalSize);
    const modalFullScreen: string = (!props.modalFullScreen ? "" : "modal-fullscreen-" + props.modalFullScreen + "-down")

    //CORE ≥ Aplica a regra de funcionamento das modais
    useEffect((): void => {
        let myModal = document.getElementById(modalId)
        if (myModal && props.modalVisible === "open") {
            let openModal = $("body").find("#openModal");
            openModal.trigger("click")
        } else if (myModal && props.modalVisible === "closed") {
            myModal.addEventListener('hidden.bs.modal', function () {
                props.onModalVisible("closed")
            })
        }
    }, [props.modalVisible])

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return <>
        <span id="openModal"
              data-bs-toggle="modal"
              data-bs-target={"#" + modalId}></span>
        <div className="modal fade"
             data-bs-backdrop={!props.modalBackdrop ? "true" : "static"}
             data-bs-keyboard="false"
             id={modalId}
             tabIndex="-1">
            <div
                className={"modal-dialog " + modalSize + " " + modalFullScreen + (modalCenter ? " modal-dialog-centered" : "")}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"><i
                            className={GET_ICON() + props.icon}/>{props.modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
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
const Modal: React.FC<Props> = ({children, frameworkStyle = "bootstrap", ...props}: Props) => {
    return frameworkStyle === "bootstrap"
        ? <ModalBootstrap modalTitle={props.modalTitle}
                          modalVisible={props.modalVisible}
                          onModalVisible={props.onModalVisible}>{children}</ModalBootstrap> : <></>
}
export default Modal
