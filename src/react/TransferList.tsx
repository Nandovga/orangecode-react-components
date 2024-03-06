import React, { useContext, useEffect, useReducer, useState } from "react";

export interface ITransferList {
    id: number
    label: string
    active?: boolean
}

type Props = {
    data: ITransferList[]
    active: ITransferList[]
    inative: ITransferList[]
    disabled?: boolean
}

const TransferListContext = React.createContext<{ state: any, setState: React.Dispatch<any> }>({
    state: null, setState: () => null
});

type STOREAction = { type: STOREType, payload: any }

type STOREType = "setData" | "setActive" | "setInative";

function reducer(state: Props, action: STOREAction) {
    switch (action.type) {
        case "setData":
            return { ...state, data: action.payload };
        case "setActive":
            return { ...state, active: action.payload };
        case "setInative":
            return { ...state, inative: action.payload };
        default:
            return { ...state };
    }
}

/**
 * Exibe os itens INATIVOS
 * @param DTOInative
 * @constructor
 */
const TransferListInative = () => {
    const { state, setState } = useContext<{ state: Props, setState: React.Dispatch<STOREAction> }>(TransferListContext);
    const inative = state.data.filter(row => !row.active);

    return <div className="transfer-list-box">
        {inative.map(row => {
            return <div className="form-check item"
                        key={row.id}>
                {state.disabled ? null
                    : <input className="form-check-input"
                             type="checkbox"
                             value={row.id}
                             onChange={event => {
                                 if (event.target.checked) {
                                     setState({
                                         type: "setInative",
                                         payload: [...state.inative, inative.filter(row => row.id === parseInt(event.target.value))[0]]
                                     });
                                 } else {
                                     setState({
                                         type: "setInative",
                                         payload: state.inative.filter(row => row?.id !== parseInt(event.target.value))
                                     });
                                 }
                             }}/>}
                <label className="form-check-label">{row.label}</label>
            </div>;
        })}
    </div>;
};

/**
 * Exibe os itens ATIVOS
 * @param DTOActive
 * @constructor
 */
const TransferListActive = () => {
    const { state, setState } = useContext<{ state: Props, setState: React.Dispatch<STOREAction> }>(TransferListContext);
    const active = state.data.filter(row => row.active);

    return <div className="transfer-list-box">
        {active.map(row => {
            return <div className="form-check item"
                        key={row.id}>
                {state.disabled ? null
                    : <input className="form-check-input"
                             type="checkbox"
                             value={row.id}
                             onChange={event => {
                                 if (event.target.checked) {
                                     setState({
                                         type: "setActive",
                                         payload: [...state.active, active.filter(row => row.id === parseInt(event.target.value))[0]]
                                     });
                                 } else {
                                     setState({
                                         type: "setActive",
                                         payload: state.active.filter(row => row?.id !== parseInt(event.target.value))
                                     });
                                 }
                             }}/>}
                <label className="form-check-label">{row.label}</label>
            </div>;
        })}
    </div>;
};

/**
 * Exibe as opções da LISTA
 * @param active
 * @param inative
 * @param setActive
 * @param setInative
 * @param activeSelect
 * @param setActiveSelect
 * @param inativeSelect
 * @param setInativeSelect
 * @constructor
 */
const TransferListOptions = () => {

    const { state, setState } = useContext<{ state: Props, setState: React.Dispatch<STOREAction> }>(TransferListContext);
    const active = state.data.filter(row => row.active);
    const inative = state.data.filter(row => !row.active);

    const transferAll = (mode: "active" | "inative") => {
        var x: Array<ITransferList> = [];
        if (mode === "inative") {
            for (let i = 0; i < inative.length; i++) {
                x[i] = inative[i];
                x[i].active = true;
            }
            setState({ type: "setData", payload: [...active, ...x] });
            setState({ type: "setInative", payload: [] });
        } else {
            for (let i = 0; i < active.length; i++) {
                x[i] = active[i];
                x[i].active = false;
            }
            setState({ type: "setData", payload: [...inative, ...x] });
            setState({ type: "setActive", payload: [] });
        }
    };

    const transferSelect = (mode: "active" | "inative") => {
        if (mode === "inative") {
            let x: Array<ITransferList> = [];
            let y: Array<ITransferList> = inative;
            for (let i = 0; i < state.inative.length; i++) {
                if (state.inative[i] !== undefined) {
                    x[i] = state.inative[i];
                    x[i].active = true;
                    y = y.filter(row => row.id !== x[i].id);
                }
            }
            setState({ type: "setData", payload: [...active, ...x, ...y] });
            setState({ type: "setInative", payload: [] });
        } else {
            let x: Array<ITransferList> = [];
            let y: Array<ITransferList> = active;
            for (let i = 0; i < state.active.length; i++) {
                if (state.active[i] !== undefined) {
                    x[i] = state.active[i];
                    x[i].active = false;
                    y = y.filter(row => row.id !== x[i].id);
                }
            }
            setState({ type: "setData", payload: [...inative, ...x, ...y] });
            setState({ type: "setActive", payload: [] });
        }
    };

    return <div className="transfer-list-options d-flex justify-content-center flex-column align-items-center">
        <a className={"options btn " + (inative.length === 0 || state.disabled ? "disabled" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               transferAll("inative");
           }}><i className="bi bi-chevron-double-right"/></a>
        <a className={"options btn " + (state.inative.length === 0 || state.disabled ? "disabled" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               transferSelect("inative");
           }}><i className="bi bi-chevron-right"/></a>

        <a className={"options btn " + (state.active.length === 0 || state.disabled ? "disabled" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               transferSelect("active");
           }}><i className="bi bi-chevron-left"/></a>
        <a className={"options btn " + (active.length === 0 || state.disabled ? "disabled" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               transferAll("active");
           }}><i className="bi bi-chevron-double-left"/></a>
    </div>;
};

/**
 * Transferência de dados
 * @constructor
 * @param props
 */
const TransferList = (props: {
    data: Array<ITransferList>
    disabled?: boolean
    onChange(data: Array<ITransferList>): void
}) => {

    const initState: Props = { data: props.data, active: [], inative: [], disabled: props.disabled };
    const [init, setInit] = useState(false);
    const [state, setState] = useReducer(reducer, initState);

    //EFFECT ≥ Executa a ação de onChange
    useEffect(() => {
        if (init) {
            props.onChange(state.data);
        }
        setInit(true);
    }, [state.data]);

    //EFFECT ≥ Executa a ação quando altera os dados
    useEffect(() => {
        setState({ type: "setData", payload: props.data });
    }, [props.data]);

    return <TransferListContext.Provider value={{ state, setState }}>
        <div className="w-100 p-1 transfer-list d-flex">
            <TransferListInative/>
            <TransferListOptions/>
            <TransferListActive/>
        </div>
    </TransferListContext.Provider>;
};
export default TransferList;
