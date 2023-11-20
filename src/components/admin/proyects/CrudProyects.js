import "../../../css/Admin/cruds.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CrudProyects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = () => {
    fetch(`http://localhost:3001/consultProyects`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        setProjects(response.rows);
      })
      .catch(error => console.error('Error:', error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects && projects.length > 0 ? projects.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function viewProject({ idProyecto }) {
    navigate(`/admin/view-project/${idProyecto}`);
  }

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
            <th>Nombre Proyecto</th>
            <th>Precio</th>
            <th>Estado Construcción</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody className="crud-state-tbody">
          {currentProjects.map(project => (
            <tr key={project.idProyecto} className="crud-state-tr">
              <td>{project.nombreProyecto}</td>
              <td>{project.precio}</td>
              <td>{project.estadoConstruccion}</td>
              <td>
                <button className="action-button" onClick={() => viewProject({ idProyecto: project.idProyecto })}>
                  <i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length > itemsPerPage && (
        <ul className="pagination">
          {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, index) => (
            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active txt-black' : 'txt-black'}>
              {index + 1}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}