import "../../../css/Admin/statistics.css";
import React, { useState, useEffect } from 'react';

export function Statistics() {
    const [data, setData] = useState([]);
    const [advisory, setAdvisory] = useState([]);

    useEffect(() => {
        const today = new Date();
        const primerDia = new Date(today.getFullYear(), today.getMonth(), 1);
        const ultimoDia = new Date(today.getFullYear(), today.getMonth() + 1, 30);
        const fechaInicio = primerDia.toISOString().slice(0, 10);
        const fechaFin = ultimoDia.toISOString().slice(0, 10);

        fetch(`http://localhost:3001/getStatistics?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);

                if (data.asesorMasReservas) {
                    const asesorId = data.asesorMasReservas.idAsesor;
                    fetch(`http://localhost:3001/consultUser/${asesorId}`)
                        .then(response => response.json())
                        .then(response => {
                            setAdvisory(response);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            setAdvisory(null);
                        });
                }
            })
            .catch(error => {
                console.error('Error al obtener estadísticas:', error);
            });
    }, []);


    return (
        <>
            <div className="title-box-crud">
                <h2>Estadísticas</h2>
            </div>
            <div className="estatistics-box">
                {data && (
                    <div className="info-statistics">
                        <h3 className="txt-blue">Cantidad de reservas hasta hoy:</h3>
                        <h1 className="txt-black">{data.reservasEstado0}</h1>
                    </div>
                )}
                {data && (
                    <div className="info-statistics">
                        <h3 className="txt-blue">Cantidad de reservas de este mes:</h3>
                        <h1 className="txt-black">{data.reservasConFecha}</h1>
                    </div>
                )}
                {data && (
                    <div className="info-statistics">
                        <h3 className="txt-blue">Cantidad de usuarios activos:</h3>
                        <h1 className="txt-black">{data.usuariosActivos}</h1>
                    </div>
                )}
                {data && (
                    <div className="info-statistics">
                        <h3 className="txt-blue">Inmuebles Totales:</h3>
                        <h1 className="txt-black">{data.inmueblesClasificacion1}</h1>
                    </div>
                )}
                {data && (
                    <div className="info-statistics advisory-statistics">
                        <h3 className="txt-blue">Asesor con más reservas en total:</h3>
                        {advisory && data.asesorMasReservas && (
                            <h1 className="txt-black">{`${advisory.nombre} ${advisory.apellido} con ${data.asesorMasReservas.cantidadReservas} ${data.asesorMasReservas.cantidadReservas < 2 ? "reserva" : "reservas"}`}</h1>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}