import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function UserProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [userRole, setUserRole] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correoElectronico: '',
    telefono: '',
    // Agrega otros campos según sea necesario
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

        if (data.decodeToken.rolUser === 2) {
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
                nombre: data.nombre,
                apellido: data.apellido,
                correoElectronico: data.correoElectronico,
                telefono: data.telefono,
                // Actualiza otros campos según sea necesario
              });
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          navigate('/access-denied');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, [navigate, idUser, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/updateUser/${idUser}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Actualizar la interfaz de usuario según sea necesario
      })
      .catch((error) => {
        console.error('Error:', error);
        // Manejar el error
      });
  };

  if (userRole === 2) {
    return (
      <div className="Principal-content">
        {/* ... (resto del código) */}

        {/* Formulario de actualización */}
        <form onSubmit={handleUpdate}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </label>
          {/* Repite esto para otros campos según sea necesario */}

          <button type="submit">Actualizar mis datos</button>
        </form>

        {/* ... (resto del código) */}
      </div>
    );
  }

  return null;
}
