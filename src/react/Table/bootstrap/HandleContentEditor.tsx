import React from "react";

/**
 * ACTION ≥ Realiza a gestão de EDITAR da TABELA
 * @param DTO
 * @param DTOEdit
 * @param value
 */
export function handleContentEditor<T>(
    DTO: { data: Array<T & { id: any }>, setData?: React.Dispatch<Array<T & { id: any }>> },
    DTOEdit: { edit: T & { id: any }, field: string },
    value: string
): void {
    const array = [...DTO.data];
    const element = array.find(item => item.id === DTOEdit.edit.id);
    if (!element) {
        return;
    }

    const modify = {...element};
    const indice = array.findIndex(item => item.id === DTOEdit.edit.id);
    modify[DTOEdit.field] = value;
    array[indice] = modify;
    if (DTO.setData) {
        DTO.setData(array);
    }
}
