import React from "react";
import Hashids from "hashids";
import Modal, {IModal} from "./Modal";
import {IFrameworkStyle} from "../@types/style";

interface Props extends Omit<IModal, "modalTitle"> {
    modalMessage: string
    modalTitle?: string
    modalAcceptInvert?: boolean
    modalAcceptLabel?: string
    modalAcceptColor?: string
    modalLoadAccept?: boolean
    modalRejectLabel?: string
    modalRejectColor?: string
    modalOptionsPosition?: "center" | "start" | "end"
    frameworkStyle?: IFrameworkStyle
    onModalAccept(): void
}

/**
 * Componente de Message
 * @param modalTitle
 * @param frameworkStyle
 * @param modalAcceptLabel
 * @param modalRejectLabel
 * @param modalOptionsPosition
 * @param props
 * @constructor
 */
const Message = (
    {
        modalTitle = "Confirmação",
        frameworkStyle = "bootstrap",
        modalAcceptLabel = "Confirmar",
        modalRejectLabel = "Cancelar",
        modalOptionsPosition = "end",
        ...props
    }: Props) => {
    const rejectColor = !props.modalRejectColor ? "btn-danger text-white" : props.modalRejectColor
    const acceptColor = !props.modalAcceptColor ? "btn-info text-white" : props.modalAcceptColor
    const modalId = new Hashids(props.modalMessage).encode([1, 2, 3])
    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return frameworkStyle === "bootstrap"
        ? <Modal modalId={modalTitle + "-" + modalId}
                 modalTitle={modalTitle}
                 modalVisible={props.modalVisible}
                 modalBackdrop={true}
                 onModalVisible={props.onModalVisible}
                 frameworkStyle="bootstrap"
                 icon="cone-striped fs-4">
            <p className="fw-semibold">{props.modalMessage}</p>
            <div className={"w-100 d-flex mt-3 " +
                (props.modalAcceptInvert ? "flex-row-reverse " : "") +
                "justify-content-" + modalOptionsPosition}>
                <a href="#"
                   className={"btn btn-sm me-2 " + rejectColor}
                   onClick={() => props.onModalVisible("closed")}>
                    <i className="bi bi-slash-circle me-1"/>{modalRejectLabel}</a>
                <a href="#"
                   className={"btn d-flex align-items-center btn-sm me-2 " + acceptColor}
                   onClick={props.onModalAccept}>
                    {props.modalLoadAccept ? <>
                            <div className="spinner-border" style={{width: "20px", height: "20px"}}>
                                <span className="visually-hidden">Loading...</span>
                            </div><span className="ms-1">Processando...</span></>
                        : <><i className="bi bi-check-lg me-1"/>{modalAcceptLabel}</>}</a>
            </div>
        </Modal> : <></>
}
export default Message
