// Importar componentes de react, TablaDispositivos, FotoSala, FotoComedos, FotoCocina, GraficoTorta y FormattedMessage
import React, { useState, useEffect } from "react";
import TablaDispositivos from "./tabla";
import { FormattedMessage } from 'react-intl';
import cocina from '../assets/img/cocina.jpeg';
import sala from '../assets/img/sala.jpeg';

// Funcion GaleriaCuartos recibe props
function Cuartos (props) {
    // Variables de estado 
    let [cuartos, setCuartos] = useState([]);
    let [cuartoSeleccionado, setCuartoSeleccionado] = useState();

    // Hook de efecto para obtener la informacion del JSON que implementa PWA
    useEffect(() => {
        const API = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        
        fetch(API).then((res) => res.json()).then((data) => {
            let cuartosEspacio = data.filter((d) => d.homeId === props.espacioSelecionado);
            setCuartos(cuartosEspacio);
        });

        setCuartoSeleccionado();
    }, [props.espacioSelecionado]);

    function manejadorCuartoSelec (cuarto) {
        setCuartoSeleccionado(cuarto);
    }

    function determinarImagenCuarto (cuarto) {
        if(cuarto === "Kitchen") {
            return cocina;
        } else  {
            return sala;
        }
    }

    return(
        <div className="container mt-4 mb-5">
            <h2><FormattedMessage id="MyRooms"/></h2>
            <div className="row mt-4">
                <div className={cuartoSeleccionado != null ? "col-8": ""}>
                    <div className="row">
                        {cuartos.map((c) => {
                            return(
                                <div className="col" key={c.name}>
                                    <div className="card" onClick={() => manejadorCuartoSelec(c)}>
                                        <div className="card-body">
                                            <h5 className="card-title"><FormattedMessage id={c.name}/></h5>
                                        </div>
                                        <img src={determinarImagenCuarto(String(c.name))} className="card-img-top" alt={c.name} style={{height: "14rem"}}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cuartoSeleccionado != null ? "col-4": ""}>
                    {cuartoSeleccionado != null ? <TablaDispositivos dispositivosCuarto={cuartoSeleccionado.devices} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Cuartos;