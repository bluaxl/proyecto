import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../../css/Admin/update-user.css';

export function UpdateProfile() {
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
                correoElectronico: data.correoElectronico,
                telefono: data.telefono,
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
        alert('Session Expira')
        navigate('/login');
      });
  }, [navigate, idUser, token]);


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
        navigate(`/admin/admin-profile/${idUser}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (userRole === 2) {
    return (
      <div className="content-update-data">
        <form onSubmit={handleUpdate} className="update-form">
        <h2 className='txt-black t'>Actualizar Mis Datos </h2>
          <div className="form-group">
            <label className='txt-black'>Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleInputChange}
              className="form-control txt-black"
            />
          </div>

          <div className="form-group">
            <label className='txt-black'>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="form-control txt-black"
            />
          </div>

          <button type="submit" className="btn-update">Actualizar mis datos</button>
        </form>
      </div>
    );
  }


  return null;
}
