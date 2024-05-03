import React from "react";
import { handleContentEditor } from "./HandleContentEditor";
import { ITable, ITableDetail, ITableHeader } from "../types";

/**
 * ACTION ≥ Monta o conteúdo da TABELA
 * @param row
 * @param props
 * @param tableEdit
 * @param tableDTO
 * @param tableDetailOpen
 */
export function handleContent<T>(
    row: T & ITableDetail,
    props: ITable<T>,
    tableEdit: {
        edit: null | T & { id: any }
        editField: string
        setEdit: React.Dispatch<null | T & { id: any }>
        setEditField: React.Dispatch<string>
    },
    tableDTO: {
        data: Array<T & { id: any }>,
        setData?: React.Dispatch<Array<T & { id: any }>>
    },
    tableDetailOpen: boolean | null = null
) {
    let select = !props.tableSelect ? false : props.tableSelect?.id === row.id;
    let multiSelect = !props.tableMultiSelect ? false : props.tableMultiSelect.some(r => r.id === row.id);
    let selectIndicator = props.tableSelectIndicatorClasse ?? "bg-light";

    const rowProps = {
        className: !props.tableDetail ? "" : (row.parent === undefined ? "" : tableDetailOpen ? "" : "table-row-closed"),
        onClick: () => props.tableOnSelect && !(props.tableDetail === true && row.title !== undefined) ? props.tableOnSelect(row) : null,
        onDoubleClick: () => props.tableOnDoubleClick ? props.tableOnDoubleClick() : null
    };

    //Gestão do Details
    let renderDetail = () => {
        if (!props.tableDetail) {
            return null;
        }
        return row.children === undefined ? <td/>
            : <td className="text-center"
                  style={{ width: "0px" }}>
                <a className="table-button-details"
                   href="#"
                   onClick={event => {
                       event.preventDefault();
                       let icon = event.currentTarget.children[0];
                       if (icon.classList.contains("bi-chevron-right")) {
                           icon.classList.remove("bi-chevron-right");
                           icon.classList.add("bi-chevron-down");
                       } else {
                           icon.classList.add("bi-chevron-right");
                           icon.classList.remove("bi-chevron-down");
                       }

                       function handleShowHide(id: string | null, show: boolean) {
                           let data = document.querySelectorAll("tr[data-parent='" + id + "']");
                           for (var i = 0; i < data.length; i++) {
                               let el = data[i];
                               handleShowHide(el.getAttribute("data-id"), show);
                               let classes = "table-row-closed";
                               if (show) {
                                   el.classList.remove(classes);
                               } else {
                                   el.classList.add(classes);
                               }
                           }
                       }

                       let id = event.currentTarget.parentElement?.parentElement?.getAttribute("data-id");
                       let data = document.querySelectorAll("tr[data-parent='" + id + "']");
                       for (var i = 0; i < data.length; i++) {
                           let el = data[i];
                           let classes = "table-row-closed";
                           handleShowHide(el.getAttribute("data-id"), el.classList.contains(classes));
                           if (el.classList.contains(classes)) {
                               el.classList.remove(classes);
                           } else {
                               el.classList.add(classes);
                           }
                       }
                   }}>{row.open || row.open === undefined ? <i className="bi bi-chevron-down"/> :
                   <i className="bi bi-chevron-right"/>}</a>
            </td>;
    };

    //Gestão do SELECT
    let renderSelect = () => {
        if (!props.tableOnSelect || props.tableSelect === undefined || (props.tableDetail === true && row.title !== undefined)) {
            return null;
        }
        return <td className={selectIndicator + " text-center " + (select ? selectIndicator : "")}
        style={{ width: "0px" }}>{select ? <i className="bi bi-caret-right-fill"/> : ""}</td>;
    };

    //Gestão do MultiSelect
    let renderMultiSelect = () => {
        return props.tableMultiSelect ?
            <td className={"text-center" + (multiSelect ? " bg-light" : "")}
                style={{ width: "0px" }}>
                <input checked={multiSelect}
                       className="form-check-input"
                       type="checkbox"
                       onChange={event => {
                           if (props.tableOnMultiSelect && props.tableMultiSelect) {
                               if (event.target.checked) {
                                   props.tableOnMultiSelect([...props.tableMultiSelect, row]);
                               } else {
                                   props.tableOnMultiSelect(props.tableMultiSelect.filter(r => r.id !== row.id));
                               }
                           }
                       }}/>
            </td> : <></>;
    };

    //Exibe os dados normais
    let renderCell = (header: ITableHeader<T>) => {
        const { id, body, align, classes } = header;
        const cellProps = {
            className: `${!align ? "" : "text-" + align} ${select || multiSelect ? "fw-bold " + selectIndicator : ""} ${!classes ? "" : classes}`,
            style: { cursor: !props.tableOnSelect ? "initial" : "pointer", verticalAlign: "middle" }
        };
        return tableEdit.edit?.id === row.id && header.editor && tableEdit.editField === header.id
            ? <td className={(select ? selectIndicator : "")}
                  key={`${row.id}-${id}`}>{header.editor({
                row: row,
                value: row[tableEdit.editField],
                setValue: value => handleContentEditor({ data: tableDTO.data, setData: tableDTO.setData }, {
                    edit: row,
                    field: tableEdit.editField
                }, value),
                onBlur: () => {
                    tableEdit.setEditField("");
                    if (!props.tableOnEdit || props.tableEditMode !== "single") {
                        return;
                    }
                    let indice = tableDTO.data.findIndex(item => item.id === row.id);
                    props.tableOnEdit(tableDTO.data[indice]);
                }
            })}</td>
            : <td {...cellProps}
                  key={`${row.id}-${id}`}
                  onClick={() => {
                      if (!header.editor || !select) {
                          return;
                      }
                      tableEdit.setEdit(row);
                      tableEdit.setEditField(header.id);
                  }}>
                {body ? body(row, id) : row[id]}
                {header.editor && select ? <i className="me-2 ms-1 bi bi-pencil"
                                              style={{ fontSize: ".8em" }}/> : null}
            </td>;
    };

    return <React.Fragment key={row.id}>
        <tr {...rowProps}
            data-id={row.id}
            data-open={row.open}
            data-parent={row.parent}
            key={row.id}>
            {renderSelect()}
            {renderMultiSelect()}
            {renderDetail()}
            {(row.title === undefined || props.tableDetail === undefined) && props.tableHeader.map(header => renderCell(header))}
            {row.title !== undefined && props.tableDetail
                && <td colSpan={props.tableHeader.length + 1}
                       key={row.id}>
                    {row.titleFormatter !== undefined ? row.titleFormatter(row.title) : row.title}
                </td>}
        </tr>
        {props.tableDetail && row.children !== undefined
            ? row.children.map(r => handleContent(r, props, tableEdit, tableDTO, row.open === undefined || row.open)) : null}
    </React.Fragment>;
}
