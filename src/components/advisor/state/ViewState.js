import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import 'popper.js';

import "../../../css/Admin/view-state.css"

function ButtonState({ text, type }) {
    return (
        <>
            <button className="button-state" type={type}><p className="txt-white"> {text}</p></button>
        </>
    )
}

export function ViewStateAdvisory() {

    const { id } = useParams();
    const [state, setState] = useState(null);

    $(document).ready(function ($) {

        var slideCount = $("#slider ul li").length;
        var slideWidth = $("#slider ul li").width();
        var slideHeight = $("#slider ul li").height();
        var sliderUlWidth = slideCount * slideWidth;

        $("#slider").css({ width: slideWidth, height: slideHeight });

        $("#slider ul").css({ width: sliderUlWidth, marginLeft: -slideWidth });

        $("#slider ul li:last-child").prependTo("#slider ul");

        function moveLeft() {
            $("#slider ul").animate(
                {
                    left: +slideWidth
                },
                3000,
                function () {
                    $("#slider ul li:last-child").prependTo("#slider ul");
                    $("#slider ul").css("left", "");
                }
            );
        }

        function moveRight() {
            $("#slider ul").animate(
                {
                    left: -slideWidth
                },
                3000,
                function () {
                    $("#slider ul li:first-child").appendTo("#slider ul");
                    $("#slider ul").css("left", "");
                }
            );
        }

        $("a.control_prev").click(function () {
            moveLeft();
        });

        $("a.control_next").click(function () {
            moveRight();
        });

    });

    useEffect(() => {
        fetch(`http://localhost:3001/verInmueble/${id}`)
            .then(response => response.json())
            .then(response => {
                setState(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setState(null);
            });
    }, [id]);

    return (
        <div >
            {state ? (
                <>
                    <div className="information-header">
                        <h2 className="title-header">{state[0].tipoInmueble} {state[0].barrio}</h2>
                    </div>
                    <div className='container-propierty-state'>
                        <div className="information-body-div">
                            <div id="slider">
                                <a href="#" className="control_next">→</a>
                                <a href="#" className="control_prev">←</a>
                                <ul>
                                    <li><img src="https://th.bing.com/th/id/R.056d8824352d93244b1de482920af948?rik=Y53%2fqG76nUwzIQ&riu=http%3a%2f%2fverfachadasdecasas.com%2fwp-content%2fuploads%2f2015%2f11%2fFachadas-de-casas-bonitas-con-jardin-enfrente.jpg&ehk=RM5hiUoM9vckbrPWfd49ZaPKZKgUor%2f0lMY9FZ1NfdE%3d&risl=&pid=ImgRaw&r=0" className='img-slider-advisory'></img></li>
                                    <li ><img src="https://www.prefabricadas10.com/wp-content/uploads/2017/06/casa-modular-espectacular.jpg" className='img-slider-advisory'></img></li>
                                    <li><img src="https://th.bing.com/th/id/OIP.9v-ocyfRbCLU1fHxtcf3awHaFi?pid=ImgDet&rs=1" className='img-slider-advisory'></img></li>
                                    <li><img src="https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1528055514/p/photo/image/2581291/RandySanchez2017-1977.jpg" className='img-slider-advisory'></img></li>
                                </ul>
                            </div>
                            <div className="action-buttons">
                                <div className="input-div">
                                    <p className="txt-white mrg-5">Cambiar Imágenes</p>
                                    <input type="file" name="images" accept="image/*" multiple ></input>
                                </div>
                                <ButtonState text="Archivar" />
                                <ButtonState text="Editar" />
                                <ButtonState text="guardar" type="submit" />
                            </div>
                        </div>
                        <div className="action-div">
                            <div className="caracteristicas-div">
                                <h3 className="txt-black title-caracteristicas">Caracteristicas</h3>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Precio: </strong>{state[0].precio} </p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Barrio: </strong> {state[0].barrio}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Direccion: </strong> {state[0].direccion}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Área del lote: </strong> {state[0].areaLote}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Área construida: </strong> {state[0].areaConstruida}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Estado de construcción: </strong>{state[0].estadoConstruccion}</p>
                            </div>

                            <div className="distribucion-div">
                                <h3 className="txt-black title-caracteristicas">Distribución</h3>
                                <p className="txt-black mrg-5"><strong className="txt-black mrg-r">Número de habitaciones: </strong> {state[0].numHabitaciones}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Número de pisos: </strong> {state[0].numPisos}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Número de baños: </strong> {state[0].numBaños}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>

    )
}