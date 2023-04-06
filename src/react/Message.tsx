import React, {useState} from "react";
import Modal, {IModal, IModalVisible} from "./Modal";

import {IFrameworkStyle} from "../@types/style";
import $ from "jquery";

interface Props extends Omit<IModal, "modalTitle"> {
    modalMessage: string

    onModalAccept(): void
    onModalReject(): void

    modalTitle?: string
    frameworkStyle?: IFrameworkStyle

    modalAcceptLabel?: string
    modalAcceptColor?: string

    modalRejectLabel?: string
    modalRejectColor?: string
}

const Message = (
    {
        modalTitle = "Confirmação",
        frameworkStyle = "bootstrap",
        modalAcceptLabel = "Confirmar",
        modalRejectLabel = "Cancelar",
        ...props
    }: Props) => {
    const [visible, setVisible] = useState<IModalVisible>("closed")

    const rejectColor = !props.modalRejectColor ? "btn-danger text-white" : props.modalRejectColor
    const acceptColor = !props.modalAcceptColor ? "btn-info text-white" : props.modalAcceptColor

    /*
    |--------------------------------------
    | render() - Renderização do componente
    |--------------------------------------
    */
    return frameworkStyle === "bootstrap" ? <>
        <a href="#" onClick={() => setVisible("open")}>confirmar</a>
        <Modal modalTitle={modalTitle}
               modalVisible={visible}
               onModalVisible={setVisible}
               frameworkStyle="bootstrap"
               icon="cone-striped">
            <p className="fw-semibold">{props.modalMessage}</p>
            <div className="w-100 d-flex justify-content-end">
                <a href="#"
                   className={"btn btn-sm me-2 " + rejectColor}
                   onClick={() => setVisible("closed")}>
                    <i className="bi bi-slash-circle me-1"/>{modalRejectLabel}</a>
                <a href="#"
                   className={"btn btn-sm me-2 " + acceptColor}
                   onClick={props.onModalAccept}>
                    <i className="bi bi-check-lg me-1"/>{modalAcceptLabel}</a>
            </div>
        </Modal>
    </> : <></>
}
export default Message
