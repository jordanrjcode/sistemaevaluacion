import React, { useContext } from "react";
import "./ListadoAlumnos.css";
import AuthContext from "../../Context/users/authContext";
const ListadoAlumnos = ({ cursoSeleccionado, carreraSeleccionada }) => {
  const authContext = useContext(AuthContext);
  const { listaestudiantesadmin } = authContext;

  if (listaestudiantesadmin === null) return null;
  return (
    <div className="listado__lista">
      <table>
        <tbody>
          <tr>
            <th className="lista__campos">Nombre</th>
            <th className="lista__campos">Cedula</th>
            <th className="lista__campos">Curso</th>
            <th className="lista__campos">Carrera</th>
            <th className="lista__campos">Email</th>
          </tr>
          {listaestudiantesadmin.map((estudiante) => (
            <tr key={estudiante._id}>
              <td className="lista__registros">{estudiante.nombre}</td>
              <td className="lista__registros">{estudiante.cedula}</td>
              <td className="lista__registros">{estudiante.curso}</td>
              <td className="lista__registros">{estudiante.carrera}</td>
              <td className="lista__registros">
                {estudiante.emailInstitucional}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAlumnos;
