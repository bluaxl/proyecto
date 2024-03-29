import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../css/Admin/cruds.css"


export function CrudProyects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token') 

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser === 2) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Session Expira')
                navigate('/login');
            });

    fetchProjects();
    
  }, [currentPage]);

  const fetchProjects = () => {
    fetch(`http://localhost:3001/consultProyects`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response) {
          console.log(response.rows)
          setProjects(response);
          setError(null);
        } else {
          setError('No se pudo obtener la lista de proyectos.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Error al obtener la lista de proyectos.');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects && projects.length > 0 ? projects.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function viewProject({ idProyecto }) {
    navigate(`/admin/view-proyect/${idProyecto}`);
  }

  const opciones = { style: 'decimal', maximumFractionDigits: 2 };

  if (userRole === 2) {
    return (
      <>
        <div className="information-crud">
          <div className="title-box-crud">
            <h2>Proyectos en Arquideco</h2>
          </div>
        </div>
        <table className="crud-state-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Inmueble</th>
            <th>Área Construida</th>
            <th>Precio</th>
            <th>No. Pisos</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody className="crud-state-tbody">
          {currentProjects.map(state => (
            <tr key={state.idInmueble} className="crud-state-tr">
              <td className="td-small">{state.idInmueble}</td>
              <td className="td-big">{state.tipoInmueble} {state.direccion}</td>
              <td className="td-big">{state.areaConstruida} m²</td>
              <td className="td-big">$ {Number(state.precio).toLocaleString('es-ES', opciones)}</td>
              <td className="td-small">{state.numPisos}</td>
              <td className="td-small">
                    <button className="action-button" onClick={() => viewProject({ idProyecto: state.idInmueble })}>
                      <i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i>
                    </button>
                    </td>
            </tr>
          ))}
          </tbody>
        </table>
        {Array.isArray(projects) && projects.length > itemsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, index) => (
              <li key={index} onClick={() => paginate(index + 1)} className={currentProjects === index + 1 ? 'active txt-black' : 'txt-black'}>
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
  return null; 
}
