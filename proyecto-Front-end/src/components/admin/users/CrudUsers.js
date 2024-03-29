import "../../../css/Admin/cruds.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function CrudUsers() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [searchUsername, setSearchUsername] = useState('');

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
          // Redirigir al usuario a una página de acceso denegado
          navigate('/access-denied');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Session Expira')
        navigate('/login');
      });

    fetchUsers(); // Llama a fetchUsers al cargar la página
  }, [currentPage, searchUsername]);

  const fetchUsers = () => {
    fetch(`http://localhost:3001/consult`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        let filteredUsers = response;

        if (searchUsername) {
          filteredUsers = filteredUsers.filter(user => {
            const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
            return fullName.includes(searchUsername.toLowerCase());
          });
        }

        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error:', error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    fetchUsers(); // Llama a fetchUsers al cambiar de página
  };

  function verPerfil({ idUsuario }) {
    fetch(`http://localhost:3001/consultUser/${idUsuario}`)
      .then(response => response.json())
      .then(response => {
        if (response.idUsuario !== "") {
          navigate(`/admin/user-profile/${idUsuario}`);
        } else {
          alert("Error al mostrar el usuario")
        }
      })
      .catch(error => console.error("Error", error));
  }

  const usernameFilter = (e) => {
    setSearchUsername(e.target.value);
    fetchUsers(); // Llama a fetchUsers al cambiar el valor del input
  };

  if (userRole === 2) {
    return (
      <>
        <div className="information-crud">
          <div className="title-box-crud">
            <h2>Usuarios</h2>
            <input className="filter-crud" value={searchUsername} onChange={usernameFilter} type="text" placeholder="Filtrar por Nombre de Usuario"></input>
          </div>
        </div>
        {users.length === 0 ? (
          <div className="zero-data">
            <p>No hay Usuarios Disponibles.</p>
          </div>
        ) : (
          <div>
            <table className="crud-state-table">
              <thead>
                <tr>
                  <th>Nombre Cliente</th>
                  <th>Tipo Documento</th>
                  <th>Rol Usuario</th>
                  <th>Estado</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody className="crud-state-tbody">
                {currentUsers.map(user => (
                  <tr key={user.idUsuario} className="crud-state-tr">
                    <td >{user.nombre} {user.apellido}</td>
                    <td >{user.tipoIdentificacion}</td>
                    <td >{user.nombreRol}</td>
                    <td className="td-small">{user.estado === 1 ? "activo" : "inactivo"}</td>
                    <td className="td-small">
                      <button className="action-button" onClick={() => verPerfil({ idUsuario: user.idUsuario })}><i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length > itemsPerPage && (
              <ul className="pagination">
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
                  <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active  txt-black' : ' txt-black'}>
                    {index + 1}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    );
  }
  return null;
}
