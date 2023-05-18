import React, {useEffect, useState} from "react";

export interface ITransferList {
    id: number
    value: string
    label: string
    active?: boolean
}

/**
 * Exibe os itens INATIVOS
 * @param DTOInative
 * @constructor
 */
const TransferListInative = ({inative, inativeSelect, setInativeSelect}: {
    inative: Array<ITransferList>
    inativeSelect: Array<ITransferList>
    setInativeSelect: React.Dispatch<Array<ITransferList>>
}) => {
    return <div className="transfer-list-box">
        {inative.map(row => {
            return <div className="form-check item" key={row.id}>
                <input className="form-check-input"
                       type="checkbox"
                       value={row.id}
                       onChange={event => {
                           if (event.target.checked)
                               setInativeSelect([...inativeSelect, inative.filter(value => value.id === parseInt(event.target.value))[0]])
                           else
                               setInativeSelect(inativeSelect.filter(value => value.id !== parseInt(event.target.value)))
                       }}/>
                <label className="form-check-label">{row.label}</label>
            </div>
        })}
    </div>
}

/**
 * Exibe os itens ATIVOS
 * @param DTOActive
 * @constructor
 */
const TransferListActive = ({active, activeSelect, setActiveSelect}: {
    active: Array<ITransferList>
    activeSelect: Array<ITransferList>
    setActiveSelect: React.Dispatch<Array<ITransferList>>
}) => {
    return <div className="transfer-list-box">
        {active.map(row => {
            return <div className="form-check item" key={row.id}>
                <input className="form-check-input"
                       type="checkbox"
                       value={row.id}
                       onChange={event => {
                           if (event.target.checked)
                               setActiveSelect([...activeSelect, active.filter(value => value.id === parseInt(event.target.value))[0]])
                           else
                               setActiveSelect(activeSelect.filter(value => value.id !== parseInt(event.target.value)))
                       }}/>
                <label className="form-check-label">{row.label}</label>
            </div>
        })}
    </div>
}

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
const TransferListOptions = ({active, inative, setActive, setInative, activeSelect, setActiveSelect, inativeSelect, setInativeSelect}: {
    active: Array<ITransferList>
    activeSelect: Array<ITransferList>
    setActive: React.Dispatch<Array<ITransferList>>
    setActiveSelect: React.Dispatch<Array<ITransferList>>

    inative: Array<ITransferList>
    inativeSelect: Array<ITransferList>
    setInative: React.Dispatch<Array<ITransferList>>
    setInativeSelect: React.Dispatch<Array<ITransferList>>
}) => {
    const transferAll = (mode: "active" | "inative") => {
        var x: Array<ITransferList> = [];
        if (mode === "inative") {
            for (let i = 0; i < inative.length; i++) {
                x[i] = inative[i];
                x[i].active = true;
            }
            setActive([...active, ...x])
            setInative([])
        } else {
            for (let i = 0; i < active.length; i++) {
                x[i] = active[i];
                x[i].active = false;
            }
            setInative([...inative, ...x])
            setActive([])
        }
    }

    const transferSelect = (mode: "active" | "inative") => {
        var x: Array<ITransferList> = []
        if (mode === "inative") {
            let y: Array<ITransferList> = inative
            for (let i = 0; i < inativeSelect.length; i++){
                x[i] = inativeSelect[i];
                x[i].active = true;
                y = y.filter(row => row.id !== x[i].id)
            }
            setInativeSelect([])
            setActive([...active, ...x])
            setInative(y)
        } else {
            let y: Array<ITransferList> = active
            for (let i = 0; i < activeSelect.length; i++){
                x[i] = activeSelect[i];
                x[i].active = false;
                y = y.filter(row => row.id !== x[i].id)
            }
            setActiveSelect([])
            setInative([...inative, ...x])
            setActive(y)
        }
    }

    return <div className="transfer-list-options d-flex justify-content-center flex-column align-items-center">
        <a className={"options btn " + (inative.length === 0 ? "disabled" : "")}
           onClick={event => {
               event.preventDefault();
               transferAll("inative")
           }}
           href="#"><i className="bi bi-chevron-double-right"/></a>
        <a className={"options btn " + (inativeSelect.length === 0 ? "disabled" : "")}
           onClick={event => {
               event.preventDefault();
               transferSelect("inative")
           }}
           href="#"><i className="bi bi-chevron-right"/></a>

        <a className={"options btn " + (activeSelect.length === 0 ? "disabled" : "")}
           onClick={event => {
               event.preventDefault();
               transferSelect("active")
           }}
           href="#"><i className="bi bi-chevron-left"/></a>
        <a className={"options btn " + (active.length === 0 ? "disabled" : "")}
           onClick={event => {
               event.preventDefault();
               transferAll("active")
           }}
           href="#"><i className="bi bi-chevron-double-left"/></a>
    </div>
}

/**
 * Transferência de dados
 * @param data
 * @param onChange
 * @constructor
 */
const TransferList = ({data, onChange}: {
    data: Array<ITransferList>
    onChange(data: Array<ITransferList>): void
}) => {

    //STATE ≥ Estado do componente
    const [init, setInit] = useState(false)
    const [inative, setInative] = useState(data.filter(row => !row.active))
    const [inativeSelect, setInativeSelect] = useState<Array<ITransferList>>([])

    const [active, setActive] = useState(data.filter(row => row.active))
    const [activeSelect, setActiveSelect] = useState<Array<ITransferList>>([])

    //EFFECT ≥ Executa a ação de onChange
    useEffect(() => {
        if (init)
            onChange([...inative, ...active])
        setInit(true)
    }, [inative, active])

    //EFFECT ≥ Executa a ação quando altera os dados
    useEffect(() => {
        setActiveSelect([])
        setInativeSelect([])
        setActive(data.filter(row => row.active))
        setInative(data.filter(row => !row.active))
    }, [data])

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <div className="w-100 p-1 transfer-list d-flex">
        <TransferListInative inative={inative} inativeSelect={inativeSelect} setInativeSelect={setInativeSelect}/>
        <TransferListOptions active={active}
                             activeSelect={activeSelect}
                             setActive={setActive}
                             setActiveSelect={setActiveSelect}

                             inative={inative}
                             inativeSelect={inativeSelect}
                             setInative={setInative}
                             setInativeSelect={setInativeSelect}/>
        <TransferListActive active={active} activeSelect={activeSelect} setActiveSelect={setActiveSelect}/>
    </div>
}
export default TransferList
