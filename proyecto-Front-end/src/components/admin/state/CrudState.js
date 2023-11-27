import "../../../css/Admin/cruds.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function CrudState() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [states, setStates] = useState([]);
  const [searchParams, setSearchParams] = useState({ id: '', type: '' });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

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
          navigate('/access-denied');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Session Expira');
        navigate('/login');
      });

    fetchStates();
  }, [currentPage, searchParams]); // Agregamos searchId y searchType a las dependencias

  const searcher1 = (e) => {
    setSearchParams({ ...searchParams, id: e.target.value });
  };
  
  const searcher2 = (e) => {
    setSearchParams({ ...searchParams, type: e.target.value });
  };
  

  const fetchStates = () => {
    fetch(`http://localhost:3001/verInmuebles`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        let fetchedStates = response.rows;
  
        if (searchParams.id) {
          fetchedStates = fetchedStates.filter((inmueble) => inmueble.idInmueble === parseInt(searchParams.id));
        }
  
        if (searchParams.type) {
          fetchedStates = fetchedStates.filter((inmueble) => inmueble.tipoInmueble === searchParams.type);
        }
  
        setStates(fetchedStates);
      })
      .catch(error => console.error('Error:', error));
  };
  
  console.log(states);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStates = states.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function verInmueble({ idInmueble }) {
    fetch(`http://localhost:3001/verInmueble/${idInmueble}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        navigate(`/admin/view-state/${idInmueble}`);
      })
      .catch(error => console.error("Error", error));
  }

  const opciones = { style: 'decimal', maximumFractionDigits: 2 };


  if (userRole === 2) {
    return (
      <>
        <div className="information-crud">
          <div className="title-box-crud">
            <h2>Inmuebles en Arquideco</h2>
            <div className="filter-crud-box">
              <input className="filter-crud" value={searchParams.id} onChange={searcher1} type="text" placeholder="Filtrar por Id"></input>
              <select className="filter-crud" value={searchParams.type} onChange={searcher2}>
              <option value="">Tipo Inmueble</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="lote">Lote</option>
              <option value="casaLote">Casa Lote</option>
            </select>
            </div>
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
          {currentStates.map(state => (
            <tr key={state.idInmueble} className="crud-state-tr">
              <td className="td-small">{state.idInmueble}</td>
              <td className="td-big">{state.tipoInmueble} {state.direccion}</td>
              <td className="td-big">{state.areaConstruida} m²</td>
              <td className="td-big">$ {Number(state.precio).toLocaleString('es-ES', opciones)}</td>
              <td className="td-small">{state.numPisos}</td>
              <td className="td-small">
                <button className="action-button" onClick={() => verInmueble({ idInmueble: state.idInmueble })}>
                  <i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {states.length > itemsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(states.length / itemsPerPage) }, (_, index) => (
              <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active txt-black' : 'txt-black'}>
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
