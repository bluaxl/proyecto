// Importación de módulos y componentes
import { Link, Outlet,useNavigate } from "react-router-dom";
import "../../../css/Client/nav.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Componente de navegación
export const Nav = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  
    const [userRole, setUserRole] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({
      correoElectronico: '',
      telefono: ''
    });
  
    useEffect(() => {
      axios
        .get('http://localhost:3001/inicio', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then((response) => {
          const data = response.data;
  
            setUserRole(data.decodeToken.rolUser);
            setIdUser(data.decodeToken.idUser);
  
            axios
              .get(`http://localhost:3001/consultUser/${idUser}`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              })
              .then((response) => {
                const data = response.data;
                setUser(data);
                setFormData({
                  correoElectronico: data.correoElectronico,
                  telefono: data.telefono,
                });
              })
              .catch((error) => {
                console.error('Error:', error);
              });
         
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [navigate, idUser, token]);
        return (
            <div>
                <nav className="principal-nav nav-bg-color-dark">
                    <img src="./img/icons/Logo2.png"></img>
                    <div className="principal-nav-option">
                        <ul>
                            <li>
                                <Link to="/" className="nav-text">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/reservation" className="nav-text">Reservar</Link>
                            </li>
                            <li>
                                {user && userRole == 1 ? <Link to="/profile" className="nav-text"> <span className="material-symbols-outlined">person</span>{userRole == 1 ? "Perfil": ""}</Link>: <Link to="/login" className="nav-text"> <span className="material-symbols-outlined">person</span>Ingresar</Link>}
                            </li>
                        </ul>
                    </div>
                </nav>
                <Outlet />
            </div>
        )
}
