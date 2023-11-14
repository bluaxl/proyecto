import React from 'react';
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



export function ViewState() {


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

  return (
    <>
      <div className="information-header">
        <h2 className="title-header">Inmueble</h2>
      </div>
      <div className="information-body-div">
        <div id="slider">
          <a href="#" className="control_next">→</a>
          <a href="#" className="control_prev">←</a>
          <ul>
            <li><img src="https://th.bing.com/th/id/R.056d8824352d93244b1de482920af948?rik=Y53%2fqG76nUwzIQ&riu=http%3a%2f%2fverfachadasdecasas.com%2fwp-content%2fuploads%2f2015%2f11%2fFachadas-de-casas-bonitas-con-jardin-enfrente.jpg&ehk=RM5hiUoM9vckbrPWfd49ZaPKZKgUor%2f0lMY9FZ1NfdE%3d&risl=&pid=ImgRaw&r=0"></img></li>
            <li ><img src="https://www.prefabricadas10.com/wp-content/uploads/2017/06/casa-modular-espectacular.jpg"></img></li>
            <li><img src="https://th.bing.com/th/id/OIP.9v-ocyfRbCLU1fHxtcf3awHaFi?pid=ImgDet&rs=1"></img></li>
            <li><img src="https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1528055514/p/photo/image/2581291/RandySanchez2017-1977.jpg"></img></li>
          </ul>
        </div>
        <div className="caracteristicas-div">
          <h3 className="txt-black title-caracteristicas">Caracteristicas</h3>
          <p className="txt-black mrg-5"><strong className="txt-black">Precio: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Barrio: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Direccion: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Área del lote: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Área construida: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Dimensiones: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Estado de construcción: </strong></p>
        </div>
      </div>
      <div className="action-div">
        <div className="action-buttons">
          <div className="input-div">
            <p className="txt-white mrg-5">Cambiar Imágenes</p>
            <input type="file" name="images" accept="image/*" multiple ></input>
          </div>
          <ButtonState text="Archivar" />
          <ButtonState text="Editar" />
          <ButtonState text="guardar" type="submit" />
        </div>
        <div className="distribucion-div">
          <h3 className="txt-black title-caracteristicas">Distribución</h3>
          <p className="txt-black mrg-5"><strong className="txt-black">Número de habitaciones: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Número de pisos: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Número de baños: </strong> </p>
          <p className="txt-black mrg-5"><strong className="txt-black">Garaje: </strong> </p>
        </div>
      </div>

    </>
  )
}