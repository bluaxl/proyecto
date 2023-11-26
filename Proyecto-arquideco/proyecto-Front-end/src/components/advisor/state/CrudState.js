import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CrudStates() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Ajusta el número de elementos por página según tus necesidades
  const [states, setStates] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [searchId, setSearchId] = useState([]);
  const [searchType, setSearchType] = useState([]);


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

        if (data.decodeToken.rolUser === 3) {
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

    fetchStates();
  }, [currentPage]);

   //metodo de filtrado

   const searcher1 = (e) => {
    setSearchId(e.target.value);
    console.log(e.target.value);
  }

  const searcher2 = (e) => {
    setSearchType(e.target.value);
    console.log(e.target.value);

  }


  const fetchStates = () => {
    // Lógica para obtener los inmuebles de la página actual desde el servidor
    fetch(`http://localhost:3001/verInmuebles`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        setStates(response.rows);
      })
      .catch(error => console.error('Error:', error));
  };

  let results = states;

  if (searchId) {
    results = results.filter((inmueble) => inmueble.idInmueble === parseInt(searchId));
  }

  if (searchType) {
    results = results.filter((inmueble) => inmueble.tipoInmueble === searchType);
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStates = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function verInmueble({ idInmueble }) {
    fetch(`http://localhost:3001/verInmueble/${idInmueble}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        navigate(`/advisory/state-advisory/${idInmueble}`);
      })
      .catch(error => console.error("Error", error));
  }
  if (userRole === 3) {

    return (
      <>
        <div className="information-crud">
          <div className="title-box-crud">
            <h2>Inmuebles en Arquideco</h2>
            <div className="filter-crud-box">
              <input className="filter-crud" value={searchId} onChange={searcher1} type="text" placeholder="Filtrar por Id"></input>
              <select className="filter-crud" value={searchType} onChange={searcher2}>
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
              <th>Nombre Inmueble</th>
              <th>Área Construida</th>
              <th>Estado Construcción</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody className="crud-state-tbody">
            {currentStates.map(state => (
              <tr key={state.idInmueble} className="crud-state-tr">
                <td>{state.tipoInmueble} {state.barrio}</td>
                <td>{state.areaConstruida} m²</td>
                <td>{state.estadoConstruccion}</td>
                <td>
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
