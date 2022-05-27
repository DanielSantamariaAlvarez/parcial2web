import React, { useState, useEffect } from "react";
import Cuartos from "./cuartos";
import Casa from "../assets/img/casa.jpeg";
import Apto from "../assets/img/apartamento.jpeg";
import { FormattedMessage } from 'react-intl';

function Espacios () { 
    let [espacios, setEspacios] = useState([]);
    let [cuartos, setCuartos] = useState();

    useEffect(() => {
        const API = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        fetch(API).then((res) => res.json()).then((data) => {
                setEspacios(data);
            });
    }, [])

    function cuartoSeleccioando (cuart) {
        setCuartos(cuart);
    }

    return(
        <div className="container mt-4">
            <h2><FormattedMessage id="MySpaces"/></h2>
            <div className="row">
                {espacios.map((e) => {
                    return(
                        
                        <div className="col-3 " key={e.id}>
                            <div className="card justify-content-center" onClick={() => cuartoSeleccioando(e)} >
                                <img src={String(e.name).startsWith("Casa")? Casa : Apto} className="card-img-top w-100" alt={e.name} />
                                <div className="card-body">
                                    <h5 className="card-title"><FormattedMessage id={e.name}/></h5>
                                    <p className="card-text">{e.address}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {cuartos != null ? <Cuartos espacioSelecionado={cuartos.id} />: null}
        </div>
    );
}

export default Espacios;